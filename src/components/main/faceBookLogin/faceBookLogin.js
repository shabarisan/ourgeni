import React, {useState, useEffect } from 'react';
import firebaseConfig from '../../../firebaseConfig';
import firebase from "firebase";
import axios from 'axios';
import configData from "../../../constants.json";
import {useLocation, useHistory} from "react-router-dom";
import { Button, Grid, Snackbar } from '@material-ui/core';
import useStyles from './faceBookLoginStyles';
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';

const PhoneLogin = () => {

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const location = useLocation();
  const { state } = useLocation();
  const redirectTo = state && state.from ? state.from : {pathname: '/user-profile', state: { from: location } };
  const [userAlerts, sertuserAlerts] = React.useState(false);
  const [userAlertMesasage, setuserAlertMesasage] = React.useState('');

  function removeAlert() {
    sertuserAlerts(false);
  }

  const history = useHistory();
  const classes = useStyles();
  
  const [successAlert,setSuccesAler] = useState({
    showAlert:false,
    alertMessage:''
});


  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
  }, [])

  function handleSignUp(){
    const googleProvider = new firebase.auth.FacebookAuthProvider();
    firebase
    .auth()
    .signInWithPopup(googleProvider).then((res) => {

            const nameSplit = res.user.providerData[0].displayName.split(" ");
            const formData = new FormData();
            formData.append('email', res.user.providerData[0].email)
            formData.append('mobile_no', res.user.providerData[0].phoneNumber)
            formData.append('first_name', nameSplit[0])
            formData.append('provider', 'gmailLogin')
            formData.append('last_name', nameSplit[1] ? nameSplit[1] : nameSplit[0])
  
            axios.post(configData.allpApiUrl+'social-login',formData)
            .then((response)=>{
                if(response.data.success)
                {
                  if(response.data.data.redirect)
                  {
                      setSuccesAler({showAlert:true,alertMessage:"Please complete the mobile number verification"});
                      setTimeout(function(){
                            window.location.href = ("/verify-otp/" + response.data.data.user);
                      },2000);
                  }
                  else
                  {
                      setSuccesAler({showAlert:true,alertMessage:response.data.message});
                      localStorage.setItem("user_name", response.data.data.first_name + ' ' + response.data.data.last_name);
                      localStorage.setItem("mobile_no", response.data.data.mobile_no);
                      localStorage.setItem("UserId", response.data.data.id);
                      localStorage.setItem("user_type",response.data.data.user_type);
                      localStorage.setItem('CityID', response.data.data.city_id);
                      localStorage.setItem("UserEmail", response.data.data.email);
                      setTimeout(function(){
                         history.push(redirectTo);
                      },3000);
                  }
              }
              else
              {
                sertuserAlerts(true);
                setuserAlertMesasage(response.data.message);
              }
            },(error)=>{
                console.log(error);
            })
        }).catch((error) => {
        console.log(error.message)
    });   
  };


  return (
    <>
      <div id="recaptcha-container"></div>
      <Grid item sm={12}>
      <Button className={clsx(classes.button, classes.faceButton)} onClick={() => console.log(handleSignUp())}>
      <img src={process.env.PUBLIC_URL + '/img/facebook-color.svg'} className={classes.facebookSvg} alt="facebook-icon" />
            Sign With Facebook
        </Button>
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
    </>
  )

}

export default PhoneLogin;