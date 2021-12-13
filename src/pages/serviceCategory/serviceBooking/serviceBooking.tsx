import {
    Grid,
    Typography,
    Container,
    Box,
    Link,
    Snackbar
} from '@material-ui/core';
import useStyles from './serviceBookingStyles';
import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory, Link as RouterLink } from "react-router-dom";
import LoginPopUpModal from '../../../components/main/loginPopupModal/loginPopupModal';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import DeliveryAddress from '../../../components/serviceCategory/serviceBooking/deliveryAddress';

const ServiceBookingForm = () => {

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const removeAlert = () => {
        sertuserAlerts(false);
    }

    const classes = useStyles();
    const history = useHistory();
    const [userAlerts, sertuserAlerts] = React.useState(false);
    const [userAlertMesasage, setuserAlertMesasage] = React.useState('');
    const [handlePopModal, setPopModal] = React.useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (localStorage.getItem('UserId') == '' || localStorage.getItem('UserId') == null) {
            sertuserAlerts(true);
            setuserAlertMesasage('Please login into your account');
            history.push(`/login`);
        }

    }, []);

    // const handlenextStep = () => {
    //     if (localStorage.getItem("user_delivery_address") == null || localStorage.getItem("user_delivery_address") == '') {
    //         sertuserAlerts(true);
    //         setuserAlertMesasage('Please select any one address');
    //     }
    //     else {
    //         history.push('service-schedule-booking');
    //     }
    // }

    return (
        <div>
            <Box className={classes.serviceCategoryBanner}>
                <Box className={classes.cartBAnnerHeading}>
                    <Typography variant='h2' className={classes.cartBannerTitle}>A nice section heading goes here</Typography>
                    <Typography variant='h5' className={classes.cartBannerTitleContent}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</Typography>
                </Box>
            </Box>

            <Container maxWidth='md' className={classes.cartWrapper} >
            <Box >
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.breadcrumb}>
                    <Link className={classes.breadCrumblinks} component={RouterLink} to="/">
                        Home
                    </Link>
                    <Link className={classes.breadCrumblinks} component={RouterLink} to="/services">
                        Services
                    </Link>
                    <Link className={classes.breadCrumblinks} component={RouterLink} to="/services/cart">
                        Cart
                    </Link>
                    
                    <Typography className={classes.breadCrumblinksActive}>Service Booking</Typography>
                </Breadcrumbs>
            </Box>

                <Paper elevation={3} style={{ background: "#f6f6f6" }}>
                    <Grid item sm={12} className={classes.cartHeading}>
                        <Typography variant='h6' style={{ textAlign: 'center',font:"normal normal bold 23px/19px  Montserrat-Regular"}}>PAY YOUR SERVICE</Typography>
                    </Grid>
                    <DeliveryAddress />
                </Paper>
            </Container>
            
            <Snackbar open={userAlerts} onClose={removeAlert}>
                <Alert onClose={removeAlert} severity="warning">
                    {userAlertMesasage}
                </Alert>
            </Snackbar>
            <LoginPopUpModal openModal={handlePopModal} />
        </div>
    )
}

export default ServiceBookingForm;