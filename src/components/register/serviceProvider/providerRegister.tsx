// node modules imports
import { Button, Grid, InputAdornment, Typography, Snackbar, FormControl,Box } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { useTranslation } from "react-i18next";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import "../../../translations/i18n";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import configData from "../../../constants.json";
import firebase from "firebase";
import firebaseConfig from '../../../firebaseConfig';
import useStyles from './providerRegisterStyles';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { TextField as FormikTextField} from 'formik-material-ui';
import OtpTimer from './otpTimer'
import './userRegister.css';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

declare var window: any;

function UserRegister(props) {
    const [appVerifier,updateAppVerifier] = React.useState<any>([]);
    const [phoneNumber,setPhoneNumber] = React.useState('');
    useEffect(() => {
        
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          } else {
            firebase.app(); // if already initialized, use that one
          }

          window.appVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
                //console.log(response);
              },
              'expired-callback': () => {
                showfrontendValidation(true);
                setfrontendValidationMessage('Captcha expired please try again');
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
              }
            }
          );
          updateAppVerifier(window.appVerifier);

    }, [])
    const { t } = useTranslation();
    const [successAlert,setSuccesAler] = useState({
        showAlert:false,
        alertMessage:''
    });
    const history = useHistory();
    const [showPassword, updateShowPasword] = useState(false);
    const [showConfirmPassword, updateConfirmShowPasword] = useState(false);
    const [Otpvalidation,showOtpValidation] = useState(false);
    const [otpValidationMessage,setotpValidationMessage] = useState({
        message : '',
        color : '',
        status : false
    });
    const [frontendValidation, showfrontendValidation] = React.useState(false);
    const [frontendValidationMessage, setfrontendValidationMessage] = React.useState('');
    const [disableActionButton, setDisableActionButton] = React.useState(true);
    const [yupInitialFormData,updateInitalFormData] = React.useState({
        first_name: '',
        last_name: '',
        userid: '',
        username: 'NA',
        password : '',
        confirmPassword:'',
        primary_phone_no:'',
        country_id:'0',
        state_id:'0',
        city_id:'0',
        area_id:'0',
        location:'N/A',
        place_id:'N/A',
        description:'N/A',
        address:'N/A',
        otp:'',
        profile_pic : 'NULL',
        user_type : 'service-provider',
        terms : ''
    });

    const TogglePassword = () => {
        updateShowPasword(!showPassword);
    }
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const [CountTimer,updateCountTimer] = useState({
        showTimer:false,
        InitialValue : 0
    });
    const [sendOtpButton,updateSendOtpButton] = useState('Send OTP');

    const sendOtp = (Phone) =>{
        
      firebase
        .auth()
        .signInWithPhoneNumber('+91'+Phone, appVerifier)
        .then(function (confirmationResult) {
            setPhoneNumber('+91'+Phone);
          window.confirmationResult = confirmationResult;
        })
        .catch(function (error) {
          //console.log("Error:" + error.code);
          setfrontendValidationMessage('Something Went wrong');
            setTimeout(function(){
                window.location.reload();
            },3000);
        });
    }

    const verifyOtp = (Otp) =>{
        if(Otp.length >=6 ){
            const verificationId = Otp;
            if(window.confirmationResult){
                window.confirmationResult
                .confirm(verificationId)
                .then(function (result) {
                    var user = result.user;
                    showOtpValidation(true);
                    setDisableActionButton(false);
                    setotpValidationMessage({message:'OTP Verified',color:'success.main',status:true})
                    
                })
                .catch(function (error) {
                if(error.code == 'auth/invalid-verification-code' || error.code == 400){
                    showOtpValidation(true);
                    setDisableActionButton(true);
                    setotpValidationMessage({message:'Invalid verfication Code',color:'secondary.main',status:false})
                    }
                });
            }
            else{
                showfrontendValidation(true);
                setfrontendValidationMessage('You have not completed the captcha');
                window.location.reload();
            }
        }
        
    }

    const resendOtp = () => 
    {
      // window.appVerifier.render().then(function(widgetId) {
      //   window.appVerifier.reset(widgetId);
      // });
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber,  appVerifier)
        .then(function (confirmationResult) {
          window.confirmationResult = confirmationResult;
        })
        .catch(function (error) {
          //console.log(error);
          showfrontendValidation(true);
          setfrontendValidationMessage('Something Went wrong');
          setTimeout(function(){
              window.location.reload();
          },);
        });
      
    }
  

    const validationSchema = yup.object({
        first_name: yup
        .string()
        .required('First Name'+t('required'))
        .min(5, t('min5Validation'))
        .max(100, t('max100Validation')),
        userid: yup
        .string()
        .email(t('invalidEmail'))
        .required('Email'+t('required')),
        last_name: yup
        .string()
        .max(100, t('max100Validation'))
        .required('Last Name' + t('required')),
        password:yup
        .string()
        .min(6, t('min6Validation'))
        .max(100, t('max100Validation'))
        .required('Password' + t('required'))
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, t('passwordFormat')
        ),
        confirmPassword:yup
        .string()
        .required('Confirm password' + t('required'))
        .oneOf([yup.ref("password"), null], t('passwordMatch')),
        primary_phone_no:yup.string()
        .min(10, t('must10Validation'))
        .max(10, t('must10Validation'))
        .required('Phone number' + t('required'))
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, t('invalidPhone')),
        otp:yup
        .string()
        .min(6, 'Please enter a valid OTP')
        .max(6, 'Please enter a valid OTP')
        .required('OTP' + t('required')),
        terms:yup
        .mixed()
        .required('Terms and conditions' + t('required')),
    });

    return (
        <div style={{ width: '100%' }}>

            <div id="recaptcha-containe"></div>
            <Formik
                initialValues={yupInitialFormData}
                validationSchema={validationSchema}
                onSubmit={async (values,{setStatus,setFieldError}) => {
                    if(otpValidationMessage.status){
                        setDisableActionButton(true);
                        const postformData = new FormData();
                        for (const key in values) {
                            let keys = key;
                            let value = values[key];
                            postformData.append(keys, value)
                        }
                        
                        const res = await axios.post(configData.providerRegitrationApiUrl,postformData);
                        if(res.data.success == true){
                            history.push("/register-success-partner");
                        }
                        
                        if(res.data.success == false)
                        {
                            setDisableActionButton(false);
                            for (const key in res.data.data) {
                                let keys = key;
                                let value = res.data.data[key];
                                setFieldError(key,value);
                            }
                        }
                    }
                    else
                    {
                        setDisableActionButton(false);
                        setFieldError('otp',otpValidationMessage.message);
                    }
                }}
                >   
                {({ setFieldValue, values,isValid ,errors,touched }) => (
                <Form>
                    <Grid container item sm={12} spacing={2} >
                        <Grid item sm={6}>
                            <FormControl className={classes.formControllGroup}>
                                <label htmlFor="first_name">First Name *</label>
                                <Field component={FormikTextField} id="first_name" name="first_name" />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl className={classes.formControllGroup}>
                                <label htmlFor="last_name">Last Name *</label>
                                <Field component={FormikTextField} id="last_name" name="last_name" />
                            </FormControl>
                        </Grid>
                        <Grid item sm={12}>
                            <FormControl className={classes.formControllGroup}>
                            <label htmlFor="userid">Email *</label>
                            <Field
                                id="userid"
                                name="userid"
                                component={FormikTextField}
                               
                                type="email"
                            />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl className={classes.formControllGroup}>
                                <label htmlFor="password">Password *</label>
                                <Field 
                                    component={FormikTextField} 
                                    id="password" 
                                    name="password" 
                                    
                                    type={showPassword == false ? 'password' : 'text'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                {showPassword == false ? <VisibilityOffIcon className={classes.passwordIcons} onClick={TogglePassword} /> : <VisibilityIcon className={classes.passwordIcons} onClick={TogglePassword} />}
                                            </InputAdornment>
                                        )
                                        
                                    }} 
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl className={classes.formControllGroup}>
                                <label htmlFor="confirmPassword">Confirm Password *</label>
                                <Field 
                                    component={FormikTextField} 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    
                                    type={showConfirmPassword == false ? 'password' : 'text'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                {showConfirmPassword == false ? <VisibilityOffIcon className={classes.passwordIcons} onClick={() => { updateConfirmShowPasword(!showConfirmPassword) }} /> : <VisibilityIcon className={classes.passwordIcons} onClick={() => { updateConfirmShowPasword(!showConfirmPassword) }} />}
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl className={classes.formControllGroup}>
                                <label htmlFor="phone">Phone *</label>
                                <Field 
                                    component={FormikTextField} 
                                    id="primary_phone_no" 
                                    name="primary_phone_no" 
                                    
                                    type="text"
                                />
                            </FormControl>
                            <Box className='otpButtonSection' style={{float:'right'}}>
                            {
                                values.primary_phone_no.length >= 10 ? 
                                <>
                                {CountTimer.showTimer ?

                                    <OtpTimer seconds= {CountTimer.InitialValue} minutes={0} resend={resendOtp} ButtonText="Resend OTP" />
                                    :
                                    null
                                }

                                {CountTimer.showTimer == false ?
                                    <Button size="small" className={classes.otpButton} onClick={(e)=>{sendOtp(values.primary_phone_no);updateCountTimer({showTimer:true,InitialValue:30});}}>{sendOtpButton}</Button>  
                                    :
                                    null
                                }
                                </>
                                :
                                null  
                            } 
                            </Box>
                        </Grid>
                       
                        
                        <Grid item sm={6}>
                            <FormControl className={classes.formControllGroup}>
                                <label htmlFor="otp">OTP * </label>
                                <Field 
                                    component={FormikTextField} 
                                    id="otp" 
                                    name="otp" 
                                    
                                    type="text"
                                    value={values.otp}
                                    onChange={(e)=>{setFieldValue('otp',e.target.value);verifyOtp(e.target.value)}}
                                 />
                            </FormControl>
                            {Otpvalidation ?
                                    <Box color={otpValidationMessage.color}>{otpValidationMessage.message}</Box>
                                    :null
                                }
                        </Grid>
                        <Grid item sm={12}>
                                <Field
                                    type="checkbox"
                                    name="terms"
                                    id="terms"
                                    value="yes"
                                />
                                <label htmlFor="terms">
                                Terms and Conditons * </label><br />
                                <label style={{color:'red'}}>{touched.terms ? errors.terms : ""}</label>
                        </Grid>
                        
                    </Grid>
                    <Grid item sm={12} style={{ textAlign: 'center' }}>
                        <Button className={clsx(classes.button, classes.cancel)} >Cancel</Button>
                        <Button disabled={disableActionButton} className={classes.register} type="submit">Register</Button>
                    </Grid>
                </Form>
                )}
            </Formik>
            
            
            <Grid item sm={12}>
                <div style={{ marginTop: '10px' }}>
                    <Typography style={{font:"normal normal bold 14px/12px 'Montserrat'",lineHeight:'30px'}}>* Mentioned fields are mandatory</Typography>
                </div>
            </Grid>
            <Snackbar open={frontendValidation} onClose={() => { showfrontendValidation(false) }}>
                <Alert onClose={() => { showfrontendValidation(false) }} severity="warning">
                    {frontendValidationMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={successAlert.showAlert} onClose={() => { setSuccesAler({showAlert:false,alertMessage:''}) }}>
                <Alert onClose={() => { setSuccesAler({showAlert:false,alertMessage:''}) }} severity="success">
                    {successAlert.alertMessage}
                </Alert>
            </Snackbar>
            <div id="recaptcha-container"></div>
        </div>
    )
}


function TextError(props) {
    return <div className='error'>{props.children}</div>
}

//mapping the redux store state to the component
const mapStateToProps = (states: any) => {
    return {
        state: states
    }
}

export default connect(mapStateToProps)(UserRegister);