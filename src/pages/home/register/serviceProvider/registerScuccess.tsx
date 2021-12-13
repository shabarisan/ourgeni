import React  from 'react';
import {
    Container, Typography,
    Grid, Box,
    Paper,
} from '@material-ui/core';
import registerStyles from './registerScuccessStyles';
import Alert from '@material-ui/lab/Alert';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DraftsOutlinedIcon from '@material-ui/icons/DraftsOutlined';

function ReisterConfirm (){
    const classes = registerStyles();

    return(
        <Grid container>
            <Grid item sm={12} xs={12}>
                <Grid item className={classes.banner}>
                    <Box component='div' className={classes.container}>
                        <Box className={classes.headings} zIndex="modal">
                            <Typography className={classes.title}>A nice section heading goes here</Typography>
                            <Typography className={classes.description}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid item sm={12} style={{paddingTop:'60px',paddingBottom:'60px',background:"#fff"}}>
                <Container maxWidth="md">
                    <Box >
                        <Alert iconMapping={{ success: <CheckCircleOutlineIcon style={{fontSize:"60px"}} /> }}>
                            <Typography  style={{marginTop:'15px'}}>Thank you, we have received your details, Our team will get in touch with you soon</Typography>
                        </Alert>
                        <Paper elevation={3} style={{marginTop:'20px',padding:'20px'}}>
                            <Grid container>
                                <Grid item sm={12}>
                                    <Typography variant="h6" style={{color:'green',marginBottom:'20px'}}>What Next</Typography>
                                </Grid>
                                <Grid item sm={1}>
                                    <DraftsOutlinedIcon style={{fontSize:"60px"}}/>
                                </Grid>
                                <Grid item sm={11}>
                                    <Typography >Please check your email we have sent you a email with next steps<br/><small>If you have didn't find the email in inbox, Please check your spam folder or make sure it'not in there</small></Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    )
}

export default ReisterConfirm;