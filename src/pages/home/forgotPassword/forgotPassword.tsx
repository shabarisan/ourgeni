import { Box, Button, Grid, Snackbar, InputAdornment, Typography, Link, Container, Paper } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import loginStyles  from './forgotPasswordStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { logIn, removeAlert } from '../../../redux/actions/userAction'
import clsx from 'clsx';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import configData from "../../../constants.json";
import axios from 'axios';
import {
    Link as RouterLink,
    useHistory,
} from "react-router-dom";
import GmailLogin from '../../../components/main/gmailLogin/gmailLogin';
import FacebookLogin from '../../../components/main/faceBookLogin/faceBookLogin';

const Login = (props) => {
    const history = useHistory();
    //console.log(props);
    const classes = loginStyles();
    const pathname = window.location.pathname;
    const segment = pathname.substring(pathname.lastIndexOf('/') + 1);
    const [loginDetails, setValue] = useState({
        password: "",
        c_password: "",
        token: segment,
    });

    const [successAlert, setSuccesAler] = useState({
        showAlert: false,
        alertMessage: ''
    });

    const [showPassword, updateShowPasword] = useState(false);
    const [showConfirmPassword, updateShowConfirmPasword] = useState(false);
    const [disalebutton, setdisalebutton] = React.useState(false);
    const handleChange = (event) => {
        setdisalebutton(false);
        setValue((loginDetails) => ({
            ...loginDetails,
            [event.target.id]: event.target.value
        }))
    }
    const removeAlert = () => {
        sertuserAlerts(false);
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== loginDetails.password) {
            return false;
        }
        return true;
    });


    const [userAlerts, sertuserAlerts] = React.useState(false);
    const [userAlertMesasage, setuserAlertMesasage] = React.useState('');

    const handleLogin = async () => {
        setdisalebutton(true);
        const res = await axios.post(configData.allpApiUrl + 'password/reset', loginDetails);
        if (res.data.success === true) {
            setSuccesAler({ showAlert: true, alertMessage: res.data.message });
            setTimeout(function () {
                history.push('/login');
                setValue((loginDetails) => ({
                    ...loginDetails,
                    'password': '',
                    'c_password': ''
                }));
            }, 3000);
        }
        else {
            setdisalebutton(false);
            sertuserAlerts(true);
            setuserAlertMesasage(res.data.message);
        }
    }


    return (
        <Container maxWidth="md">
            <Paper className={classes.formContainer} elevation={3}>
                <Grid container direction="row">
                    <Grid item sm={5}>
                        <Box className={classes.leftPannel} textAlign="center">
                            <Box p={2}>
                                <img src={process.env.PUBLIC_URL + '/img/lock_flat.png'} className={classes.logoIcon} alt="lock_flat" />
                                <Typography style={{ fontFamily: 'Montserrat-Regular' }}>Login using social media to get quick access</Typography>
                                <GmailLogin />
                                <FacebookLogin />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={7} justify="center" alignItems="center" className={classes.inputContainer}>
                        <Box className={classes.headingBox}>
                            <Typography className={classes.heading}>Reset your password</Typography>
                        </Box>
                        <Box className={classes.formArea}>
                            <ValidatorForm onSubmit={handleLogin}>
                                <Grid container spacing={3}>
                                    <Grid item xs={11} >
                                        <TextValidator
                                            name="password"
                                            type={showPassword === false ? 'password' : 'text'}
                                            id='password'
                                            label="Password *"
                                            value={loginDetails.password}
                                            onChange={handleChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        {showPassword === false ? <VisibilityOffIcon className={classes.passwordIcons} onClick={() => { updateShowPasword(!showPassword) }} /> : <VisibilityIcon className={classes.passwordIcons} onClick={() => { updateShowPasword(!showPassword) }} />}
                                                    </InputAdornment>
                                                )
                                            }}
                                            fullWidth
                                            validators={['required', 'matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})']}
                                            errorMessages={['this field is required', 'Password must conains one capital letter one special character password and one number']}
                                        />
                                    </Grid>
                                    <Grid item xs={11} >
                                        <TextValidator
                                            name="c_password"
                                            type={showConfirmPassword === false ? 'password' : 'text'}
                                            id='c_password'
                                            label="Confirm Password *"
                                            value={loginDetails.c_password}
                                            onChange={handleChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        {showConfirmPassword === false ? <VisibilityOffIcon className={classes.passwordIcons} onClick={() => { updateShowConfirmPasword(!showConfirmPassword) }} /> : <VisibilityIcon className={classes.passwordIcons} onClick={() => { updateShowConfirmPasword(!showConfirmPassword) }} />}
                                                    </InputAdornment>
                                                )
                                            }}
                                            fullWidth
                                            validators={['required', 'isPasswordMatch']}
                                            errorMessages={['this field is required', 'Password mismatch']}
                                        />
                                    </Grid>

                                    <Grid item sm={10} xs={11}>
                                        <div className={classes.submitSection}>
                                            <Button disabled={disalebutton} className={clsx(classes.button, classes.continueButton)} type="submit" fullWidth={true}>
                                                CONTINUE
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Link component={RouterLink} to={'/login'}  className={classes.signUpLink}>Already have an account?</Link>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Link component={RouterLink} to={'/register'}  className={classes.signUpLink}>Don't have an account?</Link>
                                    </Grid>
                                </Grid>
                            </ValidatorForm>
                        </Box>
                        <Grid item xs={12}>
                            <Snackbar open={userAlerts} onClose={removeAlert}>
                                <Alert onClose={removeAlert} severity="warning">
                                    {userAlertMesasage}
                                </Alert>
                            </Snackbar>
                            <Snackbar open={successAlert.showAlert} onClose={() => { setSuccesAler({ showAlert: false, alertMessage: '' }) }}>
                                <Alert onClose={() => { setSuccesAler({ showAlert: false, alertMessage: '' }) }} severity="success">
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
        removeAlert: () => dispatch(removeAlert()),
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);