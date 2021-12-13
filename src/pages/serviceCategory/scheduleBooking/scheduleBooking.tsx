import { Container, Grid, Typography, Button, Snackbar, Box, Link } from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, DayValue, utils } from "react-modern-calendar-datepicker";
import useStyles from "./scheduleBookingStyles";
import './scheduleCalanderStyles.css';
import { useCart } from "react-use-cart";
import configData from "../../../constants.json";
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { useHistory, Link as RouterLink , useLocation} from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import * as currencyCode from '../../../currencyCode';

function ScheduleBooking() {

    const history = useHistory();
    const classes = useStyles();
    const currentDate = new Date();
    const daysCount = [1, 2, 3, 4, 5, 6, 7];
    const [time, setTime] = useState('');
    const [booingDate, setbooingDate] = React.useState('');
    const [timeslot, setTimeSlot] = useState<any>([]);
    const [userAlerts, sertuserAlerts] = React.useState(false);
    const [PaymentButtonDisabled, setPaymentButtonDisabled] = React.useState(false);
    const [showResetIcon, sershowResetIcon] = React.useState(false);
    const [userAlertMesasage, setuserAlertMesasage] = React.useState('');
    const { totalUniqueItems, totalItems, items} = useCart();
    const [companyTax, setCompanyTax] = React.useState(0);
    const location = useLocation<any>()

    const cartServices= JSON.parse(localStorage.getItem('cartServices') || '{}')
    var servicePriceTotal=0;

    

    const paymentFor = location.state?.paymentFor
    console.log("type",paymentFor)


    const getTaxDatafromDb = () => {
        axios.post(configData.allpApiUrl + 'get-tax-details').
            then((res) => {
                if (res.data.success) {
                    var cGst = res.data.data[0].cgst;
                    var cSst = res.data.data[0].sgst;
                    var tGst = (cGst + cSst);
                    setCompanyTax(tGst);
                }
            }, (error) => {
                console.log(error);
            })
    }

    var taxTotal = 0;
    var priceTotal = 0;
    var totalPrice = 0;

    items.forEach(function (ItemDetails, ItemIndes) {
        taxTotal += ItemDetails.price_with_tax - ItemDetails.price;
        if (ItemDetails.quantity) {
            priceTotal += (ItemDetails.price_with_tax * ItemDetails.quantity);
        }
        else {
            priceTotal += (ItemDetails.price_with_tax);
        }
    });

    cartServices.forEach(function (ItemDetails, ItemIndes) {
        taxTotal += ItemDetails.price_with_tax - ItemDetails.price;
        if (ItemDetails.quantity) {
            servicePriceTotal += (ItemDetails.price_with_tax * ItemDetails.quantity);
        }
        else {
            servicePriceTotal += (ItemDetails.price_with_tax);
        }

    });




    const minimumDate = {
        year: currentDate.getUTCFullYear(),
        month: currentDate.getUTCMonth() + 1,
        day: currentDate.getUTCDate()
    }
    const [selectedDay, setSelectedDay] = useState<DayValue>(minimumDate);

    const handleSubmit = async () => {
        if (booingDate && time) {
            setPaymentButtonDisabled(true);
            
            var totalItems=0;
            cartServices.forEach(element => {
                totalItems += (element.quantity)
            });
            var totalUniqueItems=cartServices.length
            const postData = {
                user_id: localStorage.getItem('UserId'),
                total_amount: ((servicePriceTotal * companyTax / 100) + servicePriceTotal).toFixed(2),
                total_items: totalItems,
                total_qty: totalUniqueItems,
                payment_status: 'process',
                gst_amount: currencyCode.TAX,
                payment_method_id: 1,
                booking_date: booingDate,
                booking_time: time,
                shipping_address_id: localStorage.getItem("user_delivery_address"),
                order_items: cartServices,
                transfor:"service"
            };

            try {

                const resp = await axios.post(configData.createOrderApiUrl, postData);

                if (resp.data.success == true) {
             
                    localStorage.setItem('ServiceOrderID', resp.data.data.order_id);
                    history.push(  {
                        pathname: `payment`,
                        state: {
                            paymentFor: paymentFor
                        }
                    });
                }
                else {
                    history.push('payment');
                }
            } catch (err) {
                console.error(err);
            }

        }
        else {
            sertuserAlerts(true);
            setuserAlertMesasage('Please select the booking date and time');
        }
    }
    console.log(1555,booingDate,time)
    function zerofill(i) {
        return (i < 10 ? '0' : '') + i;
    }

    const arrayColumn = (arr, n) => arr.map(x => x[n]);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function removeAlert() {
        sertuserAlerts(false);
    }

    function handleTime(timeString, Id) {
        sershowResetIcon(true);

        setTimeSlot(
            timeslot.map((task) =>
                task.id != Id ? { ...task, disabled: true } : task,
            )
        )
        setTime(timeString);
    }



    const handleDate = async (dateObject) => {
        var appendmonth = zerofill(dateObject.month);
        var createNewDate = new Date(dateObject.year, dateObject.month - 1, dateObject.day);
        var appendDate = dateObject.year + '-' + appendmonth + '-' + String(dateObject.day).padStart(2, '0');
        const updateslotData = { service_id: 1, day: daysCount[createNewDate.getDay()], date: appendDate };
        const res = await axios.post(configData.serviceSlotsApiUrl, updateslotData)
        setTimeSlot(res.data.data);
        setbooingDate(dateObject.year + '-' + dateObject.month + '-' + dateObject.day);
    }


    useEffect(() => {
        window.scrollTo(0, 0);
        if (localStorage.getItem('UserId') == '' || localStorage.getItem('UserId') == null) {
            sertuserAlerts(true);
            setuserAlertMesasage('Please login into your account');
            history.push('/login');
        }

        if (localStorage.getItem("user_delivery_address") == '' || localStorage.getItem("user_delivery_address") == null) {
            sertuserAlerts(true);
            setuserAlertMesasage('Please select the delievery address please');
            //history.push('service-booking');
            history.push(`/services/service-booking`);
        }
        getTaxDatafromDb();
        fetchTasks();
        handleDate(selectedDay)
    }, [])
    //console.log(arrayColumn(items,'id'));
    //alert(currentDate.getDay());
    var appendmonthToday = zerofill(currentDate.getMonth() + 1);
    var appendDateToday = currentDate.getFullYear() + '-' + appendmonthToday + '-' + String(currentDate.getDate()).padStart(2, '0');
    const slotData = { service_id: arrayColumn(items,'id'), day: daysCount[currentDate.getDay()], date: appendDateToday };
    const fetchTasks = async () => {
        const res = await axios.post(configData.serviceSlotsApiUrl, slotData)
        setTimeSlot(res.data.data);
    }
    return (
        <div >
            <Container>
                <Grid container spacing={5} className={classes.scheduleContent}>
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
                            <Link className={classes.breadCrumblinks} component={RouterLink} to={{
                                            pathname: "/services/service-booking",
                                            state: {
                                                paymentFor: paymentFor
                                            }
                                        }}>
                                Service Booking
                            </Link>

                            <Typography className={classes.breadCrumblinksActive}>Schedule Booking</Typography>
                        </Breadcrumbs>
                    </Box>
                    <Container>
                        <Grid item xs={12}>
                            <Typography className={classes.scheduleHeading}>When you need your service</Typography>
                        </Grid>
                        <Grid container spacing={2} justify="center">
                            <Grid item lg={4} md={6} sm={12} xs={12}>
                                <Calendar
                                    colorPrimary="linear-gradient(180deg, #0D004C 0%, #24AE90 100%) 0% 0% no-repeat padding-box"
                                    calendarClassName={classes.datePicker}
                                    value={selectedDay}
                                    onChange={(event) => { setSelectedDay(event); handleDate(event);  }}
                                    minimumDate={minimumDate}
                                />
                            </Grid>
                            <Grid item lg={4} md={6} sm={12} xs={12}>
                                <Grid container spacing={2} className={classes.scheduleClock}>
                                    <Grid item xs={12}>
                                        <Typography className={classes.scheduleHeading}>Select time</Typography>
                                    </Grid>
                                    <Grid item sm={12} xs={12} >
                                        <Grid container spacing={2}>
                                            {showResetIcon ?
                                                <div style={{ width: '100%', marginBottom: '30px', textAlign: 'center' }}>
                                                    <Button className='btn_width_control' style={{ fontFamily: 'Montserrat-Regular' }} variant="contained" color="primary" onClick={() => { fetchTasks(); setTime(''); setPaymentButtonDisabled(false); }} >
                                                        Reset Selection<RotateLeftIcon />
                                                    </Button>
                                                </div>
                                                :
                                                null
                                            }
                                            {timeslot && timeslot.length > 0 ? timeslot.map((slot) => (
                                                <Grid md={4} xs={6} key={slot.id}>
                                                    <div key={slot.id} style={{ margin: '5px' }}>
                                                        <Button className='btn_width_control'  variant="outlined" color="primary" disabled={slot.disabled} onClick={() => { handleTime(slot.display_time, slot.id); }} style={{ fontFamily: 'Montserrat-Regular', fontWeight: 600 }}>
                                                            {slot.display_time}
                                                        </Button>
                                                    </div>
                                                </Grid>
                                            ))
                                                :
                                                <div style={{ display: 'inline-block', textAlign: 'center' }}>
                                                    <Typography style={{ textAlign: 'center', fontFamily: 'Montserrat-Regular' }}>No Slots found</Typography>
                                                </div>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item md={12} lg={12} xs={10}>
                                <Box textAlign="center">
                                    <Button className={clsx(classes.button, classes.schedule)} disabled={PaymentButtonDisabled} onClick={handleSubmit}>Schedule</Button>
                                </Box>
                            </Grid>
                            <Snackbar open={userAlerts} onClose={removeAlert}>
                                <Alert onClose={removeAlert} severity="warning">
                                    {userAlertMesasage}
                                </Alert>
                            </Snackbar>
                        </Grid>
                    </Container>
                </Grid>
            </Container>
        </div >
    )
}

export default ScheduleBooking;