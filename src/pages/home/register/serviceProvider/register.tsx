// node module Imports
import React, { useState } from 'react';
import {
    Container, Typography,
    Grid, Box,Paper
} from '@material-ui/core';
import {
    
    useHistory
} from "react-router-dom";
// Assets  imports
import logo from '../../../assets/img/ourgenie-logo.svg';
//Styles imports
import registerStyles from './registerStyles';
//Component imports
import ProviderRegister from '../../../../components/register/serviceProvider/providerRegister';
import { ThunkDispatch } from 'redux-thunk';
import { addChange } from '../../../../redux/actions/registerAction';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/youtube'

const Register: React.FC = (props: any): JSX.Element => {
    
    const history = useHistory();
    const [isProfessional, setProfession] = useState(true);
    const classes = registerStyles();

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <Container>
            <ReactPlayer 
            url='https://www.youtube.com/watch?v=JS3C3eeYp-o'
            width='100%'
            muted={true}
            loop={true}
            autoPlay={1}
            className={classes.player}
            volume={0}
            controls={false}
             />
            <Paper elevation={3} className={classes.formContainer} >
                <Grid container>
                        <Grid item sm={4}>
                            <Box className={classes.leftPannel} textAlign="center">
                                <Box className={classes.leftPannelInner}>
                                    <img src={process.env.PUBLIC_URL + '/img/security.png'} className={classes.logoIcon} /> 
                                    <Typography style={{fontFamily:'Montserrat-Regular'}}>Register your details <br />and we will notify you soon</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item sm={8}>
                            <Box className={classes.containerWrapper} >
                                <Typography align='center' variant='h2' className={classes.registerHeading}>Service Provider Register</Typography>
                                <Grid container spacing={2} >
                                    <ProviderRegister isProfessional={isProfessional} />
                                </Grid>
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