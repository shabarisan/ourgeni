import React, { useState, useEffect } from 'react';
import firebaseConfig from '../../../firebaseConfig';
import firebase from "firebase";
import axios from 'axios';
import configData from "../../../constants.json";
import { useHistory } from "react-router-dom";
import {  Button, Grid, Snackbar} from '@material-ui/core';
import useStyles from './PhoneLoginStyles';
import MuiPhoneNumber from "material-ui-phone-number";
import './PhoneLogin.css';
import MuiAlert from '@material-ui/lab/Alert';
import OtpInput from 'react-otp-input';
import OtpTimer from './otpTimer'

const PhoneLogin = () => {

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [userAlerts, sertuserAlerts] = React.useState(false);
  const [verifyButtonDisabled, setverifyButtonDisabled] = React.useState(true);
  const [userAlertMesasage, setuserAlertMesasage] = React.useState('');
  const pathname = window.location.pathname;
  const segment = pathname.substring(pathname.lastIndexOf('/') + 1);

  function removeAlert() {
    sertuserAlerts(false);
  }

  const history = useHistory();
  const classes = useStyles();
  const [values, setVaues] = useState({ phone: '', verificationCode: '' });
  const [errors, setErros] = useState({ phone: '', verificationCode: '' })
  const [verifyOtpSection, showVerifyOtpSection] = useState(false);
  const [appVerifier,updateAppVerifier] = React.useState('');

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
    window.appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible"
      }
    );
    updateAppVerifier(window.appVerifier);
  }, [])

  const [successAlert, setSuccesAler] = useState({
    showAlert: false,
    alertMessage: ''
  });

  const handleLogin = async (Phone) => {
    const formData = { mobile_no: Phone, userid: segment };
    axios.post(configData.localbackend + 'api/v1/aapi/verify-otp', formData)
      .then((response) => {
        if (response.data.success == true) {
          setSuccesAler({ showAlert: true, alertMessage: response.data.message });
          localStorage.setItem("user_name", response.data.data.first_name + ' ' + response.data.data.last_name);
          localStorage.setItem("mobile_no", response.data.data.mobile_no);
          localStorage.setItem("UserId", response.data.data.id);
          localStorage.setItem('CityID', response.data.data.city_id);
          localStorage.setItem("UserEmail", response.data.data.email);
          setTimeout(function () {
            history.push("/user-profile");
          }, 3000);
          ///window.location.href = ("/home/user-profile");
        }
        else {
          setErros({verificationCode:response.data.message});
          //window.location.href = ("/home/register");
        }
      }, (error) => {
        console.log(error);
      })
  }

  const handlePhoneChange = (value) => {
    if (value) {
      setVaues({ phone: value });

    }
  }

  const handleOtp = (otp) => {
    if (otp.length > 5) {
      setverifyButtonDisabled(false);
    }
    else {
      setverifyButtonDisabled(true);
    }
    setVaues({ verificationCode: otp });
  }

  const handleSignUp = event => {
    event.preventDefault();
    if (values.phone == null || values.phone == '') {
      setErros({ phone: 'Please enter the phone number' });
    }
    else if (values.phone.length < 15) {
      setErros({ phone: 'Please enter a valid phone number' });
    }
    else {
      setErros({ phone: '' });
      
      firebase
        .auth()
        .signInWithPhoneNumber(values.phone, appVerifier)
        .then(function (confirmationResult) {
          console.log("Success");
          const postData = { userid: segment, mobile_no: values.phone }
          axios.post(configData.allpApiUrl + 'verify-phonenumber-otp', postData)
            .then((response) => {
              if (response.data.success) {
               showVerifyOtpSection(true);
                
              }
              else {
                //showVerifyOtpSection(true);
                setErros({ phone: response.data.message });
              }
            }, (error) => {
              console.log(error);
            })

          window.confirmationResult = confirmationResult;
        })
        .catch(function (error) {
          //console.log("Error:" + error);
          sertuserAlerts(true);
          setuserAlertMesasage('Oops something went wrong');
          setTimeout(function(){
            window.location.reload();
          },3000);
        });
    }


  };

  const resendOtp = () => 
  {
    // window.appVerifier.render().then(function(widgetId) {
    //   window.appVerifier.reset(widgetId);
    // });
    firebase
      .auth()
      .signInWithPhoneNumber(values.phone,  appVerifier)
      .then(function (confirmationResult) {
        console.log("Success");
        const postData = { userid: segment, mobile_no: values.phone }
        axios.post(configData.allpApiUrl + 'verify-phonenumber-otp', postData)
          .then((response) => {
            if (response.data.success) {
              showVerifyOtpSection(true);
              
            }
            else {
              
              setErros({ phone: response.data.message });
            }
          }, (error) => {
            console.log(error);
          })

        //showVerifyOtpSection(true);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }

  const onVerifyCodeSubmit = event => {
    event.preventDefault();
    const verificationId = values.verificationCode;
    window.confirmationResult
      .confirm(verificationId)
      .then(function (result) {
        // User signed in successfully.
        var user = result.user;
        handleLogin(user.phoneNumber);
        //console.log(user);
      })
      .catch(function (error) {
        // User couldn't sign in (bad verification code?)
        if (error.code == 'auth/invalid-verification-code') {
          sertuserAlerts(true);
          setuserAlertMesasage('Invalid verfication Code');
        }
      });
  };


  return (
    <>
      <div id="recaptcha-container"></div>
      <Grid container justify="center" alignItems="center" sm={12}>
        {verifyOtpSection == false ?
          <div style={{ textAlign: 'center' }}>
            <Grid>
              <MuiPhoneNumber
                name="phone"
                data-cy="user-phone"
                defaultCountry={"in"}
                onChange={handlePhoneChange}
                countryCodeEditable={false}
                dropdownClass={classes.dropdownClass}
              />
            </Grid>
            <p style={{ color: 'red' }}>{errors.phone ? errors.phone : ''}</p>
            <Grid >
              <Button className={classes.continueButton} onClick={handleSignUp}>Continue</Button>
            </Grid>

          </div>
          :
          <div style={{ textAlign: 'center' }}>
            <Grid className="otpFields">

              <OtpInput
                value={values.verificationCode}
                onChange={handleOtp}
                numInputs={6}
                className={classes.otpFields}
              />
            </Grid>
            <p style={{ color: 'red' }}>{errors.verificationCode ? errors.verificationCode : ''}</p>
            <Grid >
              <Button onClick={onVerifyCodeSubmit} className={classes.otpButton} disabled={verifyButtonDisabled}>Verify Otp</Button>
              <div className="resendOtp">
                <OtpTimer seconds= {30} minutes={0} resend={resendOtp} ButtonText="Resend Otp" />
              </div>
              {/* <Button onClick={resendOtp}  >Resend Otp</Button> */}
            </Grid>
          </div>
        }
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
    </>
  )

}

export default PhoneLogin;