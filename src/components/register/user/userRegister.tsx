// node modules imports
import { Button, Grid, InputAdornment, Typography, Snackbar, FormControl,Box,Link } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useTranslation } from "react-i18next";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import "../../../translations/i18n";
import './userRegister.css';
import axios from 'axios';
import {useHistory} from "react-router-dom";
//Actions imports
import {
    addChange, addError,
    addFiles, removeError,
    addUser,
    removeAlert,
} from '../../../redux/actions/registerAction';
import configData from "../../../constants.json";
import firebase from "firebase";
import firebaseConfig from '../../../firebaseConfig';
//styles imports        
import useStyles from './userRegisterStyles';
import OtpTimer from './otpTimer'
//Assets imports
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import {
    TextField as FormikTextField,
} from 'formik-material-ui';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

declare var window: any;

function UserRegister(props) {

    const { t } = useTranslation();
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

    }, []);

    
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
        country_id:'1',
        state_id:'1',
        city_id:'1',
        area_id:'1',
        location:'N/A',
        place_id:'N/A',
        description:'N/A',
        address:'N/A',
        otp:'',
        profile_pic : "N/A",
        user_type : 'customer',
        terms : ''
    });

    const TogglePassword = () => {
        updateShowPasword(!showPassword);
    }

    const classes = useStyles();

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
          //console.log("Success");
          setPhoneNumber('+91'+Phone);
          //showVerifyOtpSection(true);
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
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
                    // User signed in successfully.
                    var user = result.user;
                    showOtpValidation(true);
                    setDisableActionButton(false);
                    setotpValidationMessage({message:'OTP Verified',color:'success.main',status:true})
                    
                })
                .catch(function (error) {
                    // User couldn't sign in (bad verification code?)
                if(error.code == 'auth/invalid-verification-code' || error.code == 400){
                    //alert('Invalid verfication Code');
                    showOtpValidation(true);
                    setDisableActionButton(true);
                    setotpValidationMessage({message:'Invalid verfication Code',color:'secondary.main',status:false})
                    }
                });
            }
            else{
                showfrontendValidation(true);
                setfrontendValidationMessage('You have not completed the captcha');
                setTimeout(function(){
                    window.location.reload();
                },3000);
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
        },3000);
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
        //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, t('passwordFormat')
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, t('passwordFormat')
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
    })


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
                        
                        const res = await axios.post(configData.userRegitrationApiUrl,postformData);
                
                        if(res.data.success == true){
                            history.push("/register-success");
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
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControllGroup}>
                                <Field component={FormikTextField} id="first_name" label="First Name *" name="first_name" fullWidth />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControllGroup}>
                                <Field component={FormikTextField} id="last_name" label="Last Name *" name="last_name" fullWidth />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl className={classes.formControllGroup}>
                            <Field
                                id="userid"
                                name="userid"
                                component={FormikTextField}
                                type="email"
                                label="Email *"
                                fullWidth
                            />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControllGroup}>
                                <Field 
                                    component={FormikTextField} 
                                    id="password" 
                                    name="password" 
                                    type={showPassword == false ? 'password' : 'text'}
                                    fullWidth
                                    label="Password *"
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
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControllGroup}>
                                <Field 
                                    component={FormikTextField} 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    type={showConfirmPassword == false ? 'password' : 'text'}
                                    fullWidth
                                    label="Confirm Password *"
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
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControllGroup}>
                                <Field 
                                    component={FormikTextField} 
                                    id="primary_phone_no" 
                                    name="primary_phone_no" 
                                    type="text"
                                    label="Phone *"
                                    fullWidth
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
                       
                        
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControllGroup}>
                                <Field 
                                    component={FormikTextField} 
                                    id="otp" 
                                    name="otp" 
                                    type="text"
                                    value={values.otp}
                                    fullWidth
                                    label="OTP *"
                                    onChange={(e)=>{setFieldValue('otp',e.target.value);verifyOtp(e.target.value)}}
                                 />
                            </FormControl>
                            {Otpvalidation ?
                                    <Box color={otpValidationMessage.color}>{otpValidationMessage.message}</Box>
                                    :null
                                }
                        </Grid>
                        <Grid item xs={12} sm={12}>
                                <Field
                                    type="checkbox"
                                    name="terms"
                                    id="terms"
                                    value="yes"
                                    fullWidth
                                />
                                <label htmlFor="terms">
                                By creating an account you agree to our*&nbsp;<Link className={classes.signUpLink}>Terms Of Service</Link> & <Link className={classes.signUpLink}>Privacy Policy</Link></label><br />
                                <label style={{color:'red'}}>{touched.terms ? errors.terms : ""}</label>
                        </Grid>
                        
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ textAlign: 'center' }}>
                        <Button disabled={disableActionButton} className={classes.register} type="submit">Sign Up</Button>
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

//mapping the redux store state to the component
const mapStateToProps = (states: any) => {
    return {
        state: states
    }
}

//mapping the redux dispatch action to the component
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return ({
        addChange: (field: any, fieldValue: string) => dispatch(addChange(field, fieldValue)),
        addFiles: (field: any, fieldVale: any) => dispatch(addFiles(field, fieldVale)),
        addError: (field: any) => dispatch(addError(field)),
        removeError: (field: any) => dispatch(removeError(field)),
        addUser: (userObj: any) => dispatch(addUser(userObj)),
        removeAlert: () => dispatch(removeAlert()),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);