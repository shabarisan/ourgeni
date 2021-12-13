import { Box, Grid,Typography,Container,Paper } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import loginStyles from './loginStyles';
import { logIn, removeAlert } from '../../../redux/actions/userAction'
import VerifyOtp from '../../../components/main/verifyOtp/VerifyOtp';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom'
const Login = (props) => {
    //console.log(props);
    const classes = loginStyles();
    const location=useLocation();
    console.log("currenturl:",location.pathname);

    return (
        <Container maxWidth="md">
                          <Helmet>
        <title> our Geni app Verify OTP</title>
        <meta name="description" content="Some tags are vital for SEO. Others have little or no impact on rankings. Here's every type of meta tag you need to know about.The purpose of a meta description is to reflect the essence of a page, but with more details and context."/>        <meta name="theme-color" content="#008f68" />
       <meta name="keyword" content="our geni app"/>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="http://example.com/" />



      </Helmet>
            <Paper className={classes.formContaineOtp} elevation={3}>
                <Grid container direction="row">
                    <Grid item sm={5}>
                        <Box className={classes.leftPannel} textAlign="center">
                            <Box p={2}>
                                <img src={process.env.PUBLIC_URL + '/img/security.png'} className={classes.logoIcon} alt="logoIcon" /> 
                                <Typography style={{fontFamily:'Montserrat-Regular'}}>Login using social media to get quick access</Typography>
                                {/* <GoogleLogin />
                                <FacebookLogin/> */}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={7} justify="center" alignItems="center" className={classes.inputContainer}>
                        <Box >
                        <Typography className={classes.heading}>Verify OTP To Continue</Typography>
                            <Box p={3}>
                                <VerifyOtp />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

//creating Alert Element

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