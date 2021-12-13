import {
    Container, Typography,
    Grid, Box, Button
} from '@material-ui/core';
import {
    BrowserRouter as Router,
    Link as RouterLink,
    useHistory
} from "react-router-dom";
//Styles imports
import registerStyles from './registerConfirmStyles';

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
                    <Box textAlign="center">
                        <Typography>Thanyou For Your Regsitration</Typography>
                        <Typography>Please Login With Your Account With Below Link</Typography>
                        <Button component={RouterLink} to="login" className={classes.joinButton}>Login</Button>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    )
}

export default ReisterConfirm;