import { Box, Button, Grid, Snackbar,Typography,Link,Container,Paper } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import loginStyles from './forgotPasswordStyles';
import { logIn, removeAlert } from '../../../redux/actions/userAction'
import clsx from 'clsx';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import configData from "../../../constants.json";
import axios from 'axios';
import {
      Link as RouterLink,
      useHistory,
  } from "react-router-dom";

import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import {
    TextField as FormikTextField,
} from 'formik-material-ui';

import GmailLogin from '../../../components/main/gmailLogin/gmailLogin';
import FacebookLogin from '../../../components/main/faceBookLogin/faceBookLogin';

const Login = (props) => {
    const history = useHistory();
    //console.log(props);
    const classes = loginStyles();
    const [loginDetails, setValue] = useState({
        email: "",
    });
    //const [showPassword, updateShowPasword] = useState(false);
    const [disalebutton,setdisalebutton] = React.useState(false);
    // const handleChange = (event) => {
    //     setdisalebutton(false);
    //     setValue((loginDetails) => ({
    //         ...loginDetails,
    //         [event.target.id]: event.target.value
    //     }))
    // }
    const removeAlert = () => {
        sertuserAlerts(false);
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const [userAlerts, sertuserAlerts] = React.useState(false);
    const [userAlertMesasage, setuserAlertMesasage] = React.useState('');

    const [successAlert,setSuccesAler] = useState({
        showAlert:false,
        alertMessage:''
    });


    const validationSchema = yup.object({
        email: yup
        .string()
        .email('Please enter a valid email id')
        .required('Email is required'),
    })


    return (
        <Container maxWidth="md">
            <Paper className={classes.formContainer} elevation={3}>
                <Grid container direction="row">
                    <Grid item sm={5}>
                        <Box className={classes.leftPannel} textAlign="center">
                            <Box p={2}>
                                <img src={process.env.PUBLIC_URL + '/img/lock_flat.png'} className={classes.logoIcon} alt="logoIcon" /> 
                                <Typography style={{fontFamily:'Montserrat-Regular'}}>Login using social media to get quick access</Typography>
                                <GmailLogin />
                                <FacebookLogin/>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={7} justify="center" alignItems="center" className={classes.inputContainer}>
                        <Box className={classes.headingBox}>
                            <Typography className={classes.heading}>Recover your password</Typography>
                            <Typography>Fill in your e-mail address below and we will send you an email with further instructions.</Typography>
                        </Box>
                        <div style={{width:'100%',textAlign:'center'}}>
                        <Formik  initialValues={loginDetails}
                            validationSchema={validationSchema}
                            onSubmit={async (values,{setStatus,setFieldError}) => {
                                setdisalebutton(true);
                                const formData = new FormData();
                                formData.append('email', values.email)
                                axios.post(configData.allpApiUrl+'password/reset-email',formData)
                                .then((response)=>{
                                    if(response.data.success == true){
                                        history.push('/password-reset-confirm');
                                    }
                                    else{
                                        setFieldError('email',response.data.data.email);
                                    }
                                },(error)=>{        
                                    console.log(error);
                                });
                            }}>
                                {({ setFieldValue, values,isValid ,errors,touched,handleChange,handleBlur }) => (
                                <Form>
                                    <Grid justify="center" alignItems="center" container spacing={2} >
                                        <Grid item xs={10} sm={9} >
                                            <Field 
                                                id="email"
                                                name="email"
                                                onChange={(e)=>{handleChange(e);setdisalebutton(false);}}
                                                component={FormikTextField}
                                                label="Email *"
                                                fullWidth
                                            />
                                        </Grid>
                                        
                                        <Grid item sm={12} xs={12}>
                                            <Button disabled={disalebutton} className={clsx(classes.button, classes.continueButton)} type="submit">
                                                Recover Your Password
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Link component={RouterLink} to={'/login'} className={classes.signUpLink}>Already have an account?</Link>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Link component={RouterLink} to={'/register'} className={classes.signUpLink}>Don't have an account?</Link>
                                        </Grid>
                                    </Grid>
                                </Form>
                                )}
                            </Formik>
                            
                        </div>
                       
                        <Grid item xs={12}>
                            <Snackbar open={userAlerts} onClose={removeAlert}>
                                <Alert onClose={removeAlert} severity="warning">
                                    {userAlertMesasage}
                                </Alert>
                            </Snackbar>
                            <Snackbar open={successAlert.showAlert} onClose={() => { setSuccesAler({showAlert:false,alertMessage:''}) }}>
                                <Alert onClose={() => { setSuccesAler({showAlert:false,alertMessage:''}) }} severity="success">
                                    {successAlert.alertMessage}
                                </Alert>
                            </Snackbar>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

//creating Alert Element
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//mapping the redux store state to the component
const mapStateToProps = (states: any) => {
    return {
        state: states
    }
}
//mapping the redux dispatch action to the component
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return ({
        logIn: (formDate) => dispatch(logIn(formDate)),
        removeAlert:() =>dispatch(removeAlert()),
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);