// node module Imports
import React, { useState,useEffect } from 'react';
import {
    Container, 
    Typography,
    Grid,Paper,
    Box,
    Slide,
    Link,
} from '@material-ui/core';
import {
    Link as RouterLink,
} from "react-router-dom";
import { TransitionProps } from '@material-ui/core/transitions';
import registerStyles from './registerStyles';
//Component imports
import UserRegister from '../../../components/register/user/userRegister';
import { ThunkDispatch } from 'redux-thunk';
import { addChange } from '../../../redux/actions/registerAction';
import { connect } from 'react-redux';
import GmailLogin from '../../../components/main/gmailLogin/gmailLogin';
import FacebookLogin from '../../../components/main/faceBookLogin/faceBookLogin';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Register: React.FC = (props: any): JSX.Element => {
    const [isProfessional, setProfession] = useState(true);
    const classes = registerStyles();
    
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
         <Container  fixed>
            <Paper elevation={3} className={classes.formContainer} >
                <Grid container>
                    <Grid item sm={4}>
                        <Box className={classes.leftPannel} textAlign="center">
                            <Box className={classes.leftPannelInner}>
                                <img src={process.env.PUBLIC_URL + '/img/security.png'} className={classes.logoIcon} /> 
                                    <Typography style={{fontFamily:'Montserrat-Regular'}}>Login using social media to get quick access</Typography>
                                    <GmailLogin />
                                <FacebookLogin/>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={8}>
                        <Box p={3}>
                                <Typography className={classes.heading}>Signup for free!</Typography>
                                <Typography style={{textAlign:'center',marginBottom:'30px'}}>Already have an account? <Link className={classes.signUpLink} component={RouterLink} to="login">Sign In</Link></Typography>
                                 <UserRegister isProfessional={isProfessional} />
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return ({
        addChange: (field: any, fieldValue: string) => dispatch(addChange(field, fieldValue)),
    })
}
export default connect(null, mapDispatchToProps)(Register);