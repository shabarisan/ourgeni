import {
    Container, Typography,
    Grid, Box,
} from '@material-ui/core';
import registerStyles from './passwordResetConfirmStyles';

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
                        <Typography>Thanyou</Typography>
                        <Typography>Password Reset mail sent to your email address please check</Typography>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    )
}

export default ReisterConfirm;