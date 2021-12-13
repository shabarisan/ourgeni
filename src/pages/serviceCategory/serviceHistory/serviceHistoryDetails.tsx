import {
    Grid,
    Container,
    Typography,
    Button,
    Paper,
    Box,
    Divider,
    Snackbar,
} from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import useStyles from './serviceHistoryDetailsStyles';
import configData from "../../../constants.json";
import Plumbing from "../../../assets/img/cate-01.svg";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ServiceBookingDetailsTimeLine from '../../../components/serviceCategory/serviceBookingDetails/serviceBookingDetails';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import * as currencyCode from '../../../currencyCode';
import { useConfirm } from 'material-ui-confirm';
import { Calendar, DayValue, utils } from "react-modern-calendar-datepicker";
import CallIcon from '@material-ui/icons/Call';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });


export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


const ServiceBookingHistory = () => {

    const confirm = useConfirm();
    const [serviceDetails, setserviceDetails] = useState<any[]>([]);
    const [orderDetails, setorderDetails] = useState<any[]>([]);
    const pathname = window.location.pathname;
    const history = useHistory();
    const segment = pathname.substring(pathname.lastIndexOf('/') + 1);

    useEffect(() => {
        fetchTasks();
        fetchTimings();
        //emptyCart();
    }, [])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const fetchTasks = async () => {
        axios.post(configData.getOrderApiUrl + segment)
            .then((response) => {
                if (response.data.success) {
                    setorderDetails(response.data.data)
                    if (response.data.data[0].order_details && response.data.data[0].order_details.length > 0) {
                        setserviceDetails(response.data.data[0].order_details);
                    }
                }
            }, (error) => {
                console.log(error);
            });

        //console.log(orderDetails);
    }
    const currentDate = new Date();

    const [timeslot, setTimeSlot] = useState<any>([]);
    function zerofill(i) {
        return (i < 10 ? '0' : '') + i;
    }
    const daysCount = [1, 2, 3, 4, 5, 6, 7];
    var appendmonthToday = zerofill(currentDate.getMonth() + 1);
    var appendDateToday = currentDate.getFullYear() + '-' + appendmonthToday + '-' + String(currentDate.getDate()).padStart(2, '0');
    const slotData = { service_id: 1, day: daysCount[currentDate.getDay()], date: appendDateToday };
    const fetchTimings = async () => {
        const res = await axios.post(configData.serviceSlotsApiUrl, slotData)
        setTimeSlot(res.data.data);
    }
    const minimumDate = {
        year: currentDate.getUTCFullYear(),
        month: currentDate.getUTCMonth() + 1,
        day: currentDate.getUTCDate()
    }
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const [booingDate, setbooingDate] = React.useState('');
    const [showResetIcon, sershowResetIcon] = React.useState(false);
    const [userAlerts, sertuserAlerts] = React.useState(false);
    const [userAlertMesasage, setuserAlertMesasage] = React.useState('');
    const [severityType,setseverityType] = React.useState('');
    const [PaymentButtonDisabled, setPaymentButtonDisabled] = React.useState(false);
    const [time, setTime] = useState('');
    const handleDate = async (dateObject) => {
        var appendmonth = zerofill(dateObject.month);
        var createNewDate = new Date(dateObject.year, dateObject.month - 1, dateObject.day);
        var appendDate = dateObject.year + '-' + appendmonth + '-' + String(dateObject.day).padStart(2, '0');
        const updateslotData = { service_id: 1, day: daysCount[createNewDate.getDay()], date: appendDate };
        const res = await axios.post(configData.serviceSlotsApiUrl, updateslotData)
        setTimeSlot(res.data.data);
        setbooingDate(dateObject.year + '-' + dateObject.month + '-' + dateObject.day);
    }

    const handleSubmit = async () => {
        if (booingDate && time) 
        {
            const  rescheduleData = {user_id:localStorage.getItem('UserId'),order_id:segment,booking_time:time,booking_date:booingDate};
            const res = await axios.post(configData.allpApiUrl + 'reschedule-order', rescheduleData);
            sertuserAlerts(true);
            setOpen(false);
            setbooingDate('');
            setTime('');
            sershowResetIcon(false);
            fetchTasks();

            if(res.status)
            {
                setseverityType('success');
                setuserAlertMesasage('Rescheduled successfully');
            }
            else
            {
                setseverityType('warning');
                setuserAlertMesasage('Something went wrong please try again later');
            }  
        }
        else 
        {
            sertuserAlerts(true);
            setseverityType('warning');
            setuserAlertMesasage('Please select the booking date and time');
        }
    }

    const CancelOrder = async () => {
        const  rescheduleData = {user_id:localStorage.getItem('UserId'),order_id:segment};
        const res = await axios.post(configData.allpApiUrl + 'cancel-order', rescheduleData);
        sertuserAlerts(true);
        setOpen(false);
        setbooingDate('');
        setTime('');
        sershowResetIcon(false);
        fetchTasks();

        if(res.status)
        {
            setseverityType('success');
            setuserAlertMesasage('Service cancelled successfully');
        }
        else
        {
            setseverityType('warning');
            setuserAlertMesasage('Something went wrong please try again later');
        }  
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
    function removeAlert() {
        sertuserAlerts(false);
    }

    const classes = useStyles();
    return (
        <>
            <Grid container className={classes.OrderDetailpage}>
                {/* <Grid item sm={12}>
                <Box>BreadCrumb</Box>
            </Grid> */}
                <Grid item sm={9}>
                    <Box className={classes.OrderDetailLeft}>
                        <Box>
                            <Typography className={classes.sectionHeading}>Order Detail</Typography>
                        </Box>
                        {serviceDetails && serviceDetails.length > 0 ? serviceDetails.map((service_value) => (
                            <>
                                <Grid container key={service_value.id} className={classes.OrderDeatilItem}>
                                    <Grid item sm={8}>
                                        <Box className={classes.avatarBox}>
                                            <Box className={classes.CommentAvatar}>
                                                {service_value.service_details ? <img src={configData.backendUrl + service_value.service_details.service_icon} className={classes.CommentAvatarImage} /> : <img src={Plumbing} className={classes.CommentAvatarImage} />}
                                            </Box>
                                            <Box>
                                                <Typography className={classes.headtitle} >Household & Business</Typography>
                                                <Typography className={classes.subtitle}>Ref. Id : 12345678</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={4}>
                                    {orderDetails && orderDetails.length > 0 ? orderDetails.map((value, key) => (
                                        <>
                                            {value.status == 'cancel' ?
                                                <>
                                                    <Button className={classes.CancelledButton}>
                                                        Cancelled
                                                    </Button>
                                                </>                                                
                                                :
                                                <>
                                                    <Button className={classes.ApprovedButton}>
                                                        Approved
                                                    </Button>
                                                    <Button
                                                        className={classes.ChatButton}
                                                        variant="outlined"
                                                        startIcon={<CallIcon style={{ background: '#0D004C', color: '#fff', borderRadius: '15px', padding: '5px' }} />}
                                                    > Call Now</Button>
                                                </>
                                            }
                                            
                                            
                                        </>
                                        ))
                                            :
                                            null
                                    }
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.OrderDetailInfoBlock}>
                                    <Grid item sm={12} className={classes.OrderDetailInfoBlockHeading}>
                                        <Box>

                                            <Typography className={classes.CommentTextHeading}>{service_value.service_details ? service_value.service_details.service_name : 'NA'}</Typography>
                                            {orderDetails && orderDetails.length > 0 ? orderDetails.map((value, key) => (
                                                <>
                                                    <Typography className={classes.CommentTextinfo}>Job Id : {value.order_number}</Typography>
                                                    <Typography className={classes.CommentTextinfo}>Scheduled Date : {value.booking_date} | {value.booking_time}</Typography>
                                                </>
                                            ))
                                                :
                                                null
                                            }
                                            {orderDetails && orderDetails.length > 0 ? orderDetails.map((value, key) => (
                                                <>
                                                    {value.status == 'cancel' ?
                                                       <Button className={classes.CancelledButton}>
                                                            Cancelled
                                                        </Button>
                                                   
                                                    :
                                                    <>
                                                        <Button className={classes.RescheduleButton} style={{ marginTop: 10, marginLeft: 0 }} onClick={handleClickOpen}>
                                                        Reschedule
                                                    </Button>
                                                    </>
                                                }
                                                </>
                                                ))
                                                    :
                                                    null
                                            }
                                        </Box>
                                    </Grid>
                                    <Grid item sm={12} className={classes.OrderDetaiDesc}>
                                        <Box >
                                            <Typography className={classes.CommentTextContents}>{service_value.service_details ? service_value.service_details.summary : 'NA'}</Typography>
                                            <Typography className={classes.CommandServicePrice}>{currencyCode.INR} {service_value.service_details ? service_value.service_details.base_price : 'NA'}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item md={12} className={classes.BookingSections}>
                                    {orderDetails && orderDetails.length > 0 ? orderDetails.map((value, key) => (
                                        <>
                                        {console.log(11111,value)}
                                            {value.status == 'cancel' ?
                                                null
                                            :
                                            <>
                                                <ServiceBookingDetailsTimeLine activeStep={value.order_progress}/>
                                            </>
                                        }
                                        </>
                                        ))
                                            :
                                            null
                                    }
                                    </Grid>
                                    <Grid item md={12} className={classes.BookingCancelButton}>
                                    {orderDetails && orderDetails.length > 0 ? orderDetails.map((value, key) => (
                                        <>
                                            {value.status == 'cancel' ?
                                                null
                                                :
                                            <>
                                            <Button
                                                variant="outlined"
                                                style={{ font: "normal normal 600 14px/29px 'Montserrat-Regular'", color: 'red', border: 'none' }}

                                                onClick={() => { confirm({ description: 'Are you sure you want to cancel this service?' })
                                                .then(() => { CancelOrder();}); }}
                                                
                                            >
                                                Cancel Service
                                            </Button>
                                        </>
                                        }
                                        </>
                                        ))
                                            :
                                            null
                                    }
                                    </Grid>

                                </Grid>
                            </>
                        ))
                            :
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <Typography>No Service Found</Typography>
                                </Grid>
                            </Grid>
                        }
                    
                        {/* <Box className={classes.customerDetails}>
                            <Typography className={classes.customerTitle}>
                                Customer Details
                            </Typography>
                            <Typography className={classes.customerName}>
                                JohnDoe | 9876543210
                            </Typography>
                            <Typography component="p" className={classes.customerAddress}>
                            Minto Bridge colony <br/>Pandit Deen Dayal<br/> 194, Palika Bazar, Connaught Place, Bengaluru - 560002, India
                            </Typography>
                        </Box> */}

                    </Box>

                        

                </Grid>
                <Grid item sm={3}>
                    <Box className={classes.OrderDetailRight}>
                        <Box>
                            <Typography className={classes.sectionRightHeading}>Payment Detail</Typography>
                        </Box>
                        <Box className={classes.paymentDetailsTitle}>
                            <Typography className={classes.headtitle} >Refrigerator Repair</Typography>
                            <Typography className={classes.subtitle}>Motor and AC service + Full Cleaning</Typography>
                            {orderDetails && orderDetails.length > 0 ? orderDetails.map((value, key) => (
                            <>
                                <Box className={classes.OrderDetailRightPaymentAmount}>
                                    <Typography className={classes.PaymentAmountText}><span>Service Cost</span><strong>₹ {value.total_amount - 20}</strong></Typography>
                                </Box>
                                <Box className={classes.OrderDetailRightPaymentAmount}>
                                    <Typography className={classes.PaymentAmountText}><span>Tax</span><strong>₹ 20.08</strong></Typography>
                                </Box>
                                <Box className={classes.OrderDetailRightPaymentAmount}>
                                    <Typography className={classes.PaymentAmountText}><span>Total Cost</span><strong>₹ {value.total_amount}</strong></Typography>
                                </Box>
                            </>
                        ))
                            :
                            null
                        }
                        </Box>
                        {/* <Box className={classes.OrderDetailRightSummary}>
                            <Typography className={classes.PaymentSummaryText}>
                                <h2>Refrigerator Repair</h2>
                                <p>Motor and AC service + Full Cleaning</p>
                            </Typography>
                        </Box> */}
                       
                    </Box>
                </Grid>
                <Grid container justify="center">
                    <Snackbar open={userAlerts} onClose={removeAlert}>
                        <Alert onClose={removeAlert} severity={severityType}>
                            {userAlertMesasage}
                        </Alert>
                    </Snackbar>
                </Grid>

            </Grid>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="md">
                <DialogTitle id="customized-dialog-title" onClose={handleClose} >
                <Typography className={classes.scheduleHeading} style={{marginBottom:'10px'}}>Reschedule Booking Date & Time</Typography> 
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2} >
                        <Grid item md={5} xs={12}>
                            <Calendar
                                colorPrimary="linear-gradient(180deg, #0D004C 0%, #24AE90 100%) 0% 0% no-repeat padding-box"
                                calendarClassName={classes.datePicker}
                                value={selectedDay}
                                onChange={(event) => { setSelectedDay(event); handleDate(event); }}
                                minimumDate={minimumDate}
                            />
                        </Grid>
                        <Grid item md={7} xs={10}>
                            <Grid container spacing={2} className={classes.scheduleClock}>
                                <Grid item xs={12}>
                                    <Typography className={classes.scheduleHeading}>Select Date & time</Typography>
                                </Grid>
                                <Grid item sm={12} xs={12} >
                                    <Grid container spacing={2}>
                                        {showResetIcon ?
                                            <div style={{ width: '100%', marginBottom: '30px', textAlign: 'center' }}>
                                                <Button style={{ fontFamily: 'Montserrat-Regular' }} variant="contained" color="primary" onClick={() => { fetchTimings(); setTime(''); setPaymentButtonDisabled(false); }} >
                                                    Reset Selection<RotateLeftIcon />
                                                </Button>
                                            </div>
                                            :
                                            null
                                        }
                                        {timeslot && timeslot.length > 0 ? timeslot.map((slot) => (
                                            <Grid md={4} xs={6} key={slot.id}>
                                                <div key={slot.id} style={{ margin: '5px' }}>
                                                    <Button variant="outlined" color="primary" disabled={slot.disabled} onClick={() => { handleTime(slot.display_time, slot.id); }} style={{ fontFamily: 'Montserrat-Regular', fontWeight: 600 }}>
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
                                    <Grid item md={12} lg={12} xs={10}>
                                        <Box textAlign="center">
                                            <Button className={clsx(classes.button, classes.schedule)} disabled={PaymentButtonDisabled} onClick={handleSubmit}>Reschedule</Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                       
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default ServiceBookingHistory;