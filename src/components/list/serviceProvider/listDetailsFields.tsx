import React,{ useEffect,useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { Paper,Grid, Typography, Link,Box,Button ,Container} from '@material-ui/core'
import listStyle from "./listFieldStylesDetails";
import configData from "../../../constants.json";
import { Link as RouterLink,useParams } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import StarIcon from '@material-ui/icons/Star';
import Divider from '@material-ui/core/Divider';
import ContactsIcon from '@material-ui/icons/Contacts';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import CallIcon from '@material-ui/icons/Call';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ReviewForm from './reviewForm/reviewForm';
import * as api from '../../../services/api/serviceListing';
import MailIcon from '@material-ui/icons/Mail';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PaymentIcon from '@material-ui/icons/Payment';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import './listdetailstyle.css';

interface ParamTypes {
    service_id: string
}

function UnsafeComponent({ html,className }) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

const ListDetailsFields = () => {
    const classes = listStyle();
    const [visible,setVisible] = useState(1);
    const [workingHoursvisible,setWorkingHoursVisible] = useState(2);
    const [servicevisible,setServiceVisible] = useState(8);
    const [serviceProviderDetails, setserviceProviderDetails] = useState<any>([]);
    // const [serviceProviderTimings, setserviceProviderTimings] = useState<any>([]);
    // const [serviceProviderServices, setserviceProviderServices] = useState<any>([]);
    const pathname = window.location.pathname;
    const segment = pathname.substring(pathname.lastIndexOf('/') + 1);
    const { service_id } = useParams<ParamTypes>();

    const [reviews,setreviews] = useState<any>([]);
    const [avgreviews,setavgreviews] = useState(0);
    
    const fetchProviders = async () =>{
        api.fetchServiceListingDetails(service_id)
        .then((response)=>{
            if(response.success)
            {
                response.data.forEach(function(row, index) {
                    setserviceProviderDetails(row);
                });
            }
        },(error)=>{
            console.log(error);
        })
    }

    const showMore = () =>{
        setVisible(prevValue => prevValue + 1)
    }

    // const showLess = () =>{
    //     setVisible(prevValue => prevValue - 1)
    // }

    const showMoreService = () =>{
        setServiceVisible(prevValue => prevValue + 8)
    }

    // const showLessService = () =>{
    //     setServiceVisible(prevValue => prevValue - 8)
    // }
    
    const showMoreWorkingHours = () =>{
        setWorkingHoursVisible(prevValue => prevValue + 2)
    }

    // const showLessWorkingHours = () =>{
    //     setWorkingHoursVisible(prevValue => prevValue - 2)
    // }

    const toggleReviewClass = (reviewCount) =>{
        var rclass = '';
        if(reviewCount >= 4)
        {
            rclass = 'green-box1';
        }
        else if(reviewCount >= 3)
        {
            rclass = 'yellow-box1';
        }
        else if(reviewCount >= 2)
        {
            rclass = 'red-box1';
        }
        else if(reviewCount >= 1)
        {
            rclass = 'red-box1';
        }

        return rclass;
    }

    const fetchReview = () =>{
        const formData = new FormData();
        formData.append('type','service_provider_id');
        formData.append('service_id',segment);
        api.fetchReview(formData)
        .then((response)=>{
            if(response.success)
             {
                 setreviews(response.data.review_lists);
                 setavgreviews(response.data.average);
             }
             //console.log(response);
         },(error)=>{
             console.log(error);
         })
    }

    const reloadReviews = () =>{
        fetchReview();
    }

    useEffect(()=>{
        api.createAccessLog();
        fetchReview();
        fetchProviders();
    },[]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Container >
                        <Breadcrumbs separator={"/"} aria-label="breadcrumb" className={classes.breadcrumb}>
                            <Link className={classes.breadCrumblinks} component={RouterLink} to="/">
                                Home
                            </Link>
                            <Link className={classes.breadCrumblinks} component={RouterLink} to="/list/service-provider/">
                                Service Providers Listing
                            </Link>
                            
                            <Typography className={classes.breadCrumblinksActive}>{serviceProviderDetails.service_provider_name}</Typography>
                        </Breadcrumbs>
                        <Paper elevation={3} style={{marginBottom:'30px'}}>
                            <div className={classes.providerSection} 
                                        style={{ 
                                            backgroundImage:`linear-gradient(
                                                rgba(0, 0, 0, 0.8),
                                                rgba(0, 0, 0, 0.8)
                                              ),url(${configData.backendUrl + serviceProviderDetails.photos})`,
                                            backgroundPosition : 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                        
                                        >
                                <Grid container>
                                    <Grid item sm={12}>
                                        <Typography className={classes.providerHeading}>{serviceProviderDetails.service_provider_name}</Typography>
                                     </Grid>
                                    <div className={classes.ContactUsListContainer}>
                                        <div className={classes.ContactUsIconContainer}>
                                            <ContactsIcon className={classes.WhtaspptIons} /><Typography className={classes.providerAddress}>{serviceProviderDetails.address}</Typography>
                                        </div>
                                        <div className={classes.ContactUsIconContainer}>
                                            <WhatsAppIcon className={classes.WhtaspptIons} /><Typography className={classes.ContaUsList}>+91 {serviceProviderDetails.whatsapp_number}</Typography>
                                        </div> 
                                        <div className={classes.ContactUsIconContainer}>
                                            <CallIcon className={classes.CallIons} /><Typography className={classes.ContaUsList}>+91 {serviceProviderDetails.primary_contact_no}</Typography>
                                        </div>
                                        {serviceProviderDetails.email_id ?
                                            <div className={classes.ContactUsIconContainer}>
                                                <MailIcon className={classes.CallIons} /><Typography className={classes.ContaUsList}>{serviceProviderDetails.email_id}</Typography>
                                            </div>
                                            :
                                            null
                                        }
                                        
                                    </div>
                                </Grid>
                                
                            </div>
                            
                            <div className={classes.providerServiceSection}>
                                <Typography className={classes.providerSeciceHeading}>
                                    Our Services
                                </Typography>
                                
                                <div style={{ width: '100%',marginTop:'10px',textAlign:'center' }}>
                                    <Grid container spacing={2} className="serviceslist">
                                        {serviceProviderDetails.available_services && serviceProviderDetails.available_services.length > 0 ? serviceProviderDetails.available_services.slice(0,servicevisible).map((service) =>(
                                            <Box key={service.id}>
                                                    <ListItem>
                                                        <CheckBoxIcon style={{marginRight:'5px',fontSize:'16px',color:"#219887" }} />
                                                    <ListItemText>
                                                        <Typography className={classes.OurServiceList}>{service.title}</Typography>
                                                        </ListItemText>
                                                    </ListItem>
                                            </Box>
                                            ))
                                            :
                                            <Grid item md={12}>
                                                <Typography>No service found</Typography>
                                            </Grid>
                                        }
                                    </Grid>
                                    <Grid item sm={12}> 
                                        <Box alignContent="center" textAlign='center'>
                                            {serviceProviderDetails.available_services && servicevisible <=  serviceProviderDetails.available_services.length  ?
                                                <>
                                                    <Button variant="outlined" color="default" size="small" style={{fontFamily:"Montserrat-Regular"}} onClick={showMoreService}>View More Timing</Button>
                                                </>
                                                :
                                                null
                                            }
                                        </Box>
                                    </Grid>
                                </div>
                            </div>
                            <Divider style={{border:"0.1px solid rgb(241 241 241)",width:'100%',marginTop:'20px'}} variant="fullWidth" />
                            <Grid container>
                                <Grid  item sm={6}>
                                    <div className={classes.WorkingHoursMainDiv} style={{justifyContent:'center'}}>
                                        <Typography className={classes.WorkingHoursHeading}>Working Hours</Typography>
                                        <Grid container>
                                            {serviceProviderDetails.available_timings && serviceProviderDetails.available_timings.length > 0 ? serviceProviderDetails.available_timings.slice(0,workingHoursvisible).map((timing)=>(
                                                <Grid item md={6} key={timing.id}>
                                                    <div className={classes.WorkingHoursListItems}>
                                                        
                                                        <Typography className={classes.WorkingHoursList}><ScheduleIcon style={{marginRight:'2px',fontSize:'16px',color:"#219887"}} /> {timing.display_time}</Typography>
                                                    </div>
                                                </Grid>
                                                ))
                                                :
                                                <Grid item md={6}>
                                                    <div className={classes.WorkingHoursListItems}>
                                                        <Typography className={classes.WorkingHoursList}>No Timing Found</Typography>
                                                    </div>
                                                </Grid>
                                            }
                                            <Grid item sm={12}> 
                                                <Box mt={2} alignContent="center" textAlign='center'>
                                                    {serviceProviderDetails.available_timings && workingHoursvisible <=  serviceProviderDetails.available_timings.length ?
                                                        <>
                                                        <Button variant="outlined" color="default" size="small" className="viewmoretiming" style={{fontFamily:"Montserrat-Regular"}} onClick={showMoreWorkingHours}>View More Timing</Button>
                                                        </>
                                                        :
                                                       null
                                                    }
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item sm={6}>
                                    <div className={classes.ContatctUsMainDiv}>
                                        <Typography className={classes.ContactUsHeading}>Company Info</Typography>
                                        <Box  style={{margin:'10px',fontFamily:"Montserrat-Regular"}}>
                                            <Typography style={{fontFamily:"Montserrat-Regular",display:'flex',justifyContent:'center',alignItems:'center'}}><DateRangeIcon style={{marginRight:'2px',fontSize:'16px',color:"#219887" }} /> Year Of Established : <b>{serviceProviderDetails.year_established}</b></Typography>
                                            <Typography style={{fontFamily:"Montserrat-Regular", marginTop:'10px',display:'flex',justifyContent:'center',alignItems:'center'}}><PaymentIcon style={{marginRight:'2px',fontSize:'16px',color:"#219887" }} /> Mode Of Payment : <b>Cash on Delivery</b> </Typography>
                                        </Box>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper elevation={3}>
                            <div className={classes.providerReviewSection}>
                                <Typography className={classes.providerBusinessInfoHeading}>Business Information</Typography>
                                <UnsafeComponent className={classes.providerDescription}  html={serviceProviderDetails.business_information} />
                            </div>
                        </Paper>
                            <Paper elevation={3}>
                                <div className={classes.providerReviewSection}>
                                <Typography className={classes.providerBusinessInfoHeading}>Rating & Reivews</Typography>
                                    
                                    <div style={{clear:'both'}}></div>
                                    <div style={{textAlign:'center',marginTop:'30px'}}> 
                                    {reviews.length > 0 ?
                                        <>
                                        <Typography className={classes.ReviewHeading}><Box className={toggleReviewClass(avgreviews)}>{avgreviews}</Box> <StarIcon className={classes.RatingWrapIcon} /> </Typography>
                                        <Typography className={classes.TotalReviews}>{reviews.length} Reviews</Typography>
                                        </>
                                        :
                                        null
                                    }
                                    </div>
                                </div>
                                <Divider style={{border:"0.1px solid rgb(241 241 241)",width:'100%',marginTop:'20px'}} variant="fullWidth" />
                                <Grid container>
                                    {reviews.length > 0 ? reviews.slice(0,visible).map((value) => (
                                        <div style={{width:'100%'}} key={value.id}>
                                            <div className={classes.providerReviewSection}>
                                                <Grid container spacing={3}>
                                                    <Grid item sm={2}>
                                                        <img src={process.env.PUBLIC_URL + '/img/userprofile-1.png' } className={classes.providerImage} alt="providerImage" />
                                                    </Grid>
                                                    <Grid item sm={10}>
                                                        <Box>
                                                            <Typography className={classes.ReviewUserName}>{value.user_details ? value.user_details.first_name+' '+value.user_details.last_name : ''}
                                                            {/* <CreateIcon style={{float:'right'}} /> */}
                                                            </Typography>
                                                        </Box>
                                                        <Box className={classes.ReviewDescription}>
                                                            {value.created_at}
                                                        </Box>
                                                        <Box className={classes.ReviewDescription}>
                                                            {value.comments}                                                    
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        <Divider style={{border:"0.1px solid rgb(241 241 241)",width:'100%',marginTop:'20px'}} variant="fullWidth" />
                                        </div>))
                                        :
                                        <div style={{width:'100%',marginTop:'20px'}}>
                                            <div style={{textAlign:'center'}}>
                                                <Typography style={{ fontFamily:"Montserrat-Regular"}}>No Reviews Found</Typography>
                                            </div>
                                        </div>
                                        
                                    }
                                    <Grid item sm={12}> 
                                        <Box p={3} alignContent="center"  textAlign='center'>
                                        {reviews && reviews.length > 3 && visible <= reviews.length ?
                                            <Button variant="outlined" color="default" style={{font:"normal normal normal 16px/24px 'Montserrat-Regular'"}} onClick={showMore}>View More</Button>
                                               
                                            :
                                             null
                                        }
                                        </Box>
                                    </Grid>
                                    {localStorage.getItem('UserId') ?
                                        <Grid item sm={12}> 
                                            <Box  mt={2} mr={3} mb={2} ml={3}>
                                                <ReviewForm ServiceType="service_provider_id" ServiceID={segment}  
                                                // onSubmit={reloadReviews} 
                                                />
                                            </Box>
                                        </Grid>
                                        :
                                        null
                                    }
                                    
                                </Grid>
                            </Paper>
                           
                    </Container>
                </Grid>
            </Grid>
        </>
    )
}

export default ListDetailsFields;