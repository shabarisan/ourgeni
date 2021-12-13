import { Box, Button, Grid, Snackbar, InputAdornment, Typography, Link, Paper, Container } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import loginStyles from './loginStyles';
import { logIn, removeAlert } from '../../../redux/actions/userAction'
import clsx from 'clsx';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import configData from '../../../constants.json';
import GmailLogin from '../../../components/main/gmailLogin/gmailLogin';
import FacebookLogin from '../../../components/main/faceBookLogin/faceBookLogin';
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import { Helmet } from 'react-helmet';

import {
    Link as RouterLink,
    useLocation,
    useHistory,
} from "react-router-dom";

import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import {
    TextField as FormikTextField,
} from 'formik-material-ui';
import axios from 'axios';
interface stateType {
    from: { pathname: string }
}
const Login = (props) => {
    const history = useHistory();
    const location = useLocation();
    const { state } = useLocation<stateType>();
    const redirectTo = state && state.from ? state.from : { pathname: '/user-profile', state: { from: location } };
    const { t } = useTranslation();
    const classes = loginStyles();
    const [loginDetails, setValue] = useState({
        userid: "",
        password: "",
        common: ""
    })

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [successAlert, setSuccesAler] = useState({
        showAlert: false,
        alertMessage: ''
    });

    const [disableButton, setDisableButton] = useState(false);

    const [showPassword, updateShowPasword] = useState(false);
    // const handleChange = (event) => {
    //     setValue((loginDetails) => ({
    //         ...loginDetails,
    //         [event.target.id]: event.target.value
    //     }))
    // }

    const validationSchema = yup.object({
        userid: yup
            .mixed()
            .required('Email Or Phone' + t('required')),
        password: yup
            .string()
            .min(6, t('min6Validation'))
            .max(100, t('max100Validation'))
            .required('Password' + t('required'))
    })
    
    // const handleLogin = () => {
    //     const formData = new FormData();
    //     for (const key in loginDetails) {
    //         let keys = key;
    //         let value = loginDetails[key];
    //         formData.append(keys, value)
    //     }
    //     props.logIn(formData);
    // }
  

    return (

        <Container fixed>
     
            <Paper className={classes.formContainer} elevation={3}>
                <Grid container direction="row">
                    <Grid item sm={5}>
                        <Box className={classes.leftPannel} textAlign="center">
                            <Box p={2}>
                                <img src={process.env.PUBLIC_URL + '/img/security.png'} className={classes.logoIcon} alt="logoIcon" /> 
                                <Typography style={{fontFamily:'Montserrat-Regular'}}>Login using social media to get quick access</Typography>
                                <GmailLogin />
                                <FacebookLogin/>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={7} justify="center" alignItems="center" className={classes.inputContainer}>
                        <Typography className={classes.heading}>Login to you account</Typography>
                        <Typography style={{textAlign:'center'}}>Don't have account? <Link className={classes.signUpLink} component={RouterLink} to="register">Sign Up</Link></Typography>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <Formik initialValues={loginDetails}
                                validationSchema={validationSchema}
                                onSubmit={async (values, { setStatus, setFieldError }) => {
                                    setDisableButton(true);
                                    const formData = new FormData();
                                    formData.append('userid', values.userid)
                                    formData.append('password', values.password)
                                    axios.post(configData.userLoginApiUrl, formData)
                                        .then((response) => {
                                            if (response.data.success === true) {
                                                localStorage.setItem("user_name", response.data.data.first_name + ' ' + response.data.data.last_name);
                                                localStorage.setItem("mobile_no", response.data.data.mobile_no);
                                                localStorage.setItem("UserId", response.data.data.id);
                                                localStorage.setItem("user_type", response.data.data.user_type);
                                                localStorage.setItem('CityID', response.data.data.city_id);
                                                localStorage.setItem("UserEmail", response.data.data.email);
                                                setSuccesAler({ showAlert: true, alertMessage: response.data.message });
                                                setTimeout(function () {
                                                    // history.push(redirectTo);
                                                    history.goBack()
                                                }, 1000);
                                            }
                                            else {
                                                setFieldError('common', response.data.data.error);
                                            }
                                        }, (error) => {
                                            console.log(error);
                                        });
                                }}>
                                {({ setFieldValue, values, isValid, errors, touched, handleChange, handleBlur }) => (
                                    <Form>
                                        <Grid justify="center" alignItems="center" container spacing={2} >
                                            <Grid item xs={9}  sm={9} style={{ marginTop: '15px' }}>
                                            <label style={{ color: 'red', marginBottom: '10px' }}>{touched.common ? errors.common : ""}</label>
                                                <Field
                                                    id="userid"
                                                    name="userid"
                                                    component={FormikTextField}
                                                    onChange={(e) => { handleChange(e); setDisableButton(false); }}
                                                    label="Email Or Phone *"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={9}  sm={9} style={{marginTop:'10px'}}>
                                                <Field
                                                    component={FormikTextField}
                                                    id="password"
                                                    label="Password *"
                                                    name="password"
                                                    onChange={(e) => { handleChange(e); setDisableButton(false); }}
                                                    type={showPassword === false ? 'password' : 'text'}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="start">
                                                                {showPassword === false ? <VisibilityOffIcon className={classes.passwordIcons} onClick={() => { updateShowPasword(!showPassword) }} /> : <VisibilityIcon className={classes.passwordIcons} onClick={() => { updateShowPasword(!showPassword) }} />}
                                                            </InputAdornment>
                                                        )

                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={9} sm={9}>
                                                <Link className={classes.forgotPasswordLink} component={RouterLink} to="forgot-password">
                                                        <Typography> Forgot password ?</Typography>
                                                    </Link>
                                            </Grid>
                                            <Grid xs={12}  item sm={12} >
                                                <Button disabled={disableButton} className={clsx(classes.button, classes.continueButton)} type="submit">
                                                    Login
                                                </Button>
                                                {/* <Button className={clsx(classes.button, classes.otpButton)} component={RouterLink} to="login-with-otp">Generate otp</Button> */}
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Grid>
                    <Snackbar open={props.state.userReducer.toggle} onClose={() => { props.removeAlert() }}>
                        <Alert onClose={() => { props.removeAlert() }} severity="warning">
                            {props.state.userReducer.error_message}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={successAlert.showAlert} onClose={() => { setSuccesAler({showAlert:false,alertMessage:''}) }}>
                        <Alert onClose={() => { setSuccesAler({showAlert:false,alertMessage:''}) }} severity="success">
                            {successAlert.alertMessage}
                        </Alert>
                    </Snackbar>
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
        removeAlert: () => dispatch(removeAlert()),
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);