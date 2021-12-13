import {
    Grid,
    Typography,
    Container,
    Box
} from '@material-ui/core';
import cleanKit from '../../../assets/img/cleaning-kit3.png';
import useStyles from './thankyouPageStyles';
import thumbicon from '../../../assets/img/thumb.svg';
import React, { useState,useEffect } from 'react';
import { Paper } from '@material-ui/core';
import configData from "../../../constants.json";
import ScheduleIcon from '@material-ui/icons/Schedule';
import EventNoteIcon from '@material-ui/icons/EventNote';
import axios from 'axios';
import PaymentIcon from '@material-ui/icons/Payment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import * as currencyCode from '../../../currencyCode';
import {Helmet} from 'react-helmet'
import { useLocation } from 'react-router-dom'

const ThankyouPage = () => {
    const classes = useStyles();
    const pathname = window.location.pathname;
    const [orderDetails,setorderDetails] = useState<any>([]);
    //const [orderPriceDetails,setorderPriceDetails] = useState<any>([]);
    const [serviceListDetails,setServiceListDetails] = useState<any>([]);
    const segment = pathname.substring(pathname.lastIndexOf('/') + 1);
    const location = useLocation();
    console.log("currenturl:",location.pathname);
  
    useEffect(()=>{
        const fetchTasks = async () => {
            axios.post(configData.getOrderApiUrl + segment)
            .then((response)=>{
            if(response.data.success)
            {
                console.log(123456,response.data.data)
                setorderDetails(response.data.data)
                if(response.data.data[0] && response.data.data[0].order_details.length > 0)
                {
                    setServiceListDetails(response.data.data[0].order_details);
                }
                
            }
            },(error)=>{
                console.log(error);
            })
            //console.log();
        }
        fetchTasks();
        
    },[])

    return (
       <div>
            <Helmet>
        <title>Home Page our Geni app</title>
        <meta name="description" content="Some tags are vital for SEO. Others have little or no impact on rankings. Here's every type of meta tag you need to know about.The purpose of a meta description is to reflect the essence of a page, but with more details and context."/>        <meta name="theme-color" content="#008f68" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="http://example.com/" />



      </Helmet>
            <Container maxWidth='lg' className={classes.cartWrapper}>
                <Paper elevation={3} style={{backgroundColor:"hsl(188deg 63% 28%)"}}>
                    <Grid container item xs={12} >
                        <Grid container item className={classes.cartContainer} style={{backgroundColor:"hsl(188deg 63% 28%)"}}>
                            <Grid item sm={12} className={classes.cartHeading} style={{backgroundColor:"hsl(188deg 63% 28%)"}} >
                                <img src={thumbicon} style={{ textAlign:'center',paddingTop:'30px'}} alt="thumicon" />
                                <Typography variant='h6' style={{color:"#fff",font:"normal normal normal 600 24px/24px 'Montserrat-Regular'",paddingTop:'20px',paddingBottom:'20px'}}>Thanks you for booking your service</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3} style={{background:"#9e9e9e3d",paddingTop:"30px",paddingLeft:'10px',paddingRight:'10px',paddingBottom:'30px'}}>
                    <Grid container spacing={3}>
                        <Grid item sm={7}>
                            <div className={classes.cartProductContainer}>
                            {serviceListDetails && serviceListDetails.length > 0 ? serviceListDetails.map((service,index)=>( 
                                    <Paper style={{padding:'30px',marginBottom:'30px'}} key={service.id}>
                                        <Typography style={{font:"normal normal 600 20px/24px 'Montserrat-Regular'",textAlign:"left",color:"#000000",marginBottom:'30px'}}>{service.service_details ? service.service_details.service_name : 'NA'}</Typography>
                                        <Box style={{display:"flex"}}>
                                            <Box style={{width:'70px'}}>
                                                <img src={service.service_details ? configData.backendUrl + service.service_details.service_icon : cleanKit } style={{width:'64px'}} alt="service-name" />
                                            </Box>
                                            <Typography style={{font:"normal normal normal 16px/24px 'Montserrat-Regular'",paddingLeft:"14px",color:"#000000",width:'100%'}}>{service.service_details ? service.service_details.summary : ''}</Typography>
                                            
                                        </Box>
                                        <Box ml={10} mt={3} style={{fontWeight:'bold'}}>
                                            <Typography style={{font:"normal normal bold 26px/24px 'Montserrat-bold'"}}>
                                                {currencyCode.INR} {service.service_details ? service.service_details.base_price : 'NA'}
                                            </Typography>
                                        </Box>
                                            
                                    </Paper>
                                    ))
                                    :
                                    null
                            }
                            </div>
                        </Grid>
                        <Grid item sm={5}>
                            <Paper style={{padding:'30px'}}>
                                <Typography style={{textAlign:'center',font:"normal normal 600 20px/24px 'Montserrat-Regular'",color:"#000000"}}>Your Service Time Will Be</Typography>
                                {orderDetails ? orderDetails.map((service)=>( 
                                 <Grid container alignContent="center" alignItems="center" spacing={3} style={{marginTop:'20px'}} key={service.id}>
                                        <Grid item sm={6} style={{textAlign:"center"}}>
                                            <Box>
                                                <ScheduleIcon/>
                                            </Box>
                                            <Box>
                                            {service.booking_time}
                                                
                                            </Box>
                                        </Grid>
                                        <Grid item sm={6} style={{textAlign:"center"}}>
                                            <Box>
                                                <EventNoteIcon/>
                                            </Box>
                                            <Box>
                                            {service.booking_date}
                                            </Box>
                                        </Grid>
                                       
                                        <Grid item sm={6} style={{textAlign:"center"}}>
                                            <Box>
                                                <ReceiptIcon/>
                                            </Box>
                                            <Box >
                                            TOTAL AMOUNT {currencyCode.INR} {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 5 }).format(service.total_amount)}
                                            </Box>
                                        </Grid>
                                        <Grid item sm={6} style={{textAlign:"center"}}>
                                            <Box color={service.payment_status === 'success' ? 'success.main' : 'error.main'}>
                                                <PaymentIcon/>
                                            </Box>
                                            <Box color={service.payment_status === 'success' ? 'success.main' : 'error.main'}>
                                            PAYMENT {service.payment_status.toUpperCase()}
                                            </Box>
                                        </Grid>
                                    </Grid>)):null
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    )

}
export default ThankyouPage;