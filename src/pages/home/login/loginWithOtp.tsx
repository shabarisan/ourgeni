import { Box, Grid,Typography,Container,Paper } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import loginStyles from './loginStyles';
import { logIn, removeAlert } from '../../../redux/actions/userAction'
import FirebasePhone from '../../../components/main/PhoneLogin';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import GoogleLogin from '../../../components/main/gmailLogin/gmailLogin';
import FacebookLogin from '../../../components/main/faceBookLogin/faceBookLogin';

const Login = (props) => {
    //console.log(props);
    //const history = useHistory();
    const classes = loginStyles();
    // const [loginDetails, setValue] = useState({
    //     userid: "",
    //     password: ""
    // })
    

    return (
        <Container maxWidth="md">
            <Paper className={classes.formContaineOtp} elevation={3}>
                <Grid container direction="row">
                    <Grid item sm={5}>
                        <Box className={classes.leftPannel} textAlign="center">
                            <Box p={2}>
                                <img src={process.env.PUBLIC_URL + '/img/security.png'} className={classes.logoIcon} /> 
                                <Typography style={{fontFamily:'Montserrat-Regular'}}>Login using social media to get quick access</Typography>
                                <GoogleLogin />
                                <FacebookLogin/>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={7} justify="center" alignItems="center" className={classes.inputContainer}>
                        <Box >
                        <Typography className={classes.heading}>Mobile Number Verification</Typography>
                            <Box p={3}>
                                <FirebasePhone />
                            </Box>
                        </Box>
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