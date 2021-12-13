import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { TextField, FormControl } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import axios from 'axios';
import configData from "../../../constants.json";
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AlarmIcon from '@material-ui/icons/Alarm';
import EventIcon from '@material-ui/icons/Event';
import  * as currencyCode from '../../../currencyCode';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  tabLi: {
    background: "#F1F1F1 !important",
    font: "normal normal 16px/24px 'Montserrat-Medium'",
    padding: "17px 0 !important",
    color: '#000000',
    letterSpacing: "0px"
  },
  tabLiactive: {
    background: "#0D004C",
    font: "normal normal  16px/24px 'Montserrat-Medium'",
    color: "#FFFFFF !important",
    padding: "17px 0 !important",
    letterSpacing: "0px"
  },
  bgGrey: {
    background: "#f1f1f1",
    marginTop: '20px'
  },
  BookingHeading: {
    font: "normal normal 24px/24px 'Montserrat-Medium'",
    textAlign: 'center',
    color: "#000000",
    letterSpacing: '0px',
    paddingTop: '20px'
  },
  formContainer: {
    paddingTop: '30px'
  },
  formControllGroup: {
    marginTop: '20px',
    marginBottom: '20px',
    width: '100%'
  },
  formControllFields: {
    width: '100%'
  },
  Commands: {
    display: "flex",
    position: 'relative',
    paddingBottom: "12px",
    paddingLeft: "20px",
    marginBottom: "2rem",
    paddingRight: "10px",
    paddingTop: "20px"
  },
  CommentAvatar: {
    width: '64px'
  },
  CommentAvatarImage: {
    width: '64px',
    height: "auto",
    borderRadius: '100%'
  },
  CommentText: {
    width: '100%',
    paddingLeft: '14px'
  },
  CommentTextHeading: {
    textAlign: "left",
    font: "normal normal 16px/24px 'Montserrat-Medium'",
    letterSpacing: "0px",
    marginLeft:'10px',
    color: "#000000"
  },
  CommentTextContents: {
    marginBottom: "0.5rem",
    textAlign: "justify",
    width: "70%",
    font: "normal normal normal 14px/24px 'Montserrat-Regular'",
    letterSpacing: "0px",
    color: "#878787"
  },
  CommandServicePrice: {
    textAlign: "left",
    font: "normal normal 18px/22px 'Montserrat-Bold'",
    letterSpacing: "0px",
    color: '#000000'
  },
  ApprovedButton: {
    backgroundColor: '#0DA44E',
    borderRadius: '5px',
    padding: '11px 20px',
    color: "#fff",
    borderColor: '#28a745',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '1.5',
    marginTop: '20px',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#218838',
      borderColor: '#1e7e34',
    }
  },
  OnGoingButton: {
    backgroundColor: '#E98604',
    borderRadius: '5px',
    padding: '11px 20px',
    color: "#fff",
    borderColor: '#28a745',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '1.5',
    marginTop: '20px',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#E98604',
      borderColor: '#E98604',
    }
  },
  ChatButton: {
    borderRadius: '5px',
    padding: '11px 10px',
    color: "green",
    borderColor: '#28a745',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '1.5',
    marginTop: '10px'
  },
  breadcrumb: {
    color: "#000",
    marginBottom: '30px',
  },
  breadCrumblinks: {
    color: "#000",
    font: "normal normal normal 16px/19px Montserrat",
    '&:hover': {
      textDecoration: 'none'
    }
  },
  breadCrumblinksActive: {
    color: "#000",
    fontWeight: 'bold',
    font: "normal normal normal 16px/19px Montserrat",
    '&:hover': {
      textDecoration: 'none'
    }
  }

}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  let { path } = useRouteMatch();
  let match = useRouteMatch();

  const [orderDetails, setorderDetails] = useState<any[]>([]);
  const [serviceDetails, setserviceDetails] = useState<any[]>([]);

  const [sortingvalue, setSortingValue] = React.useState(orderDetails);
  const [inputValue, setInputValue] = React.useState('');

  // const [fromDate, setfromDate] = React.useState('');
  // const [toDate, settoDate] = React.useState('');

  const [visible,setVisible] = useState(3);

  const [completedOrderDetails, setCompletedOrderDetails] = useState<any[]>([]);
  const [completedserviceDetails, setCompletedServiceDetails] = useState<any[]>([]);

  const [inprogressOrderDetails, setInprogressOrderDetails] = useState<any[]>([]);
  const [inprogressserviceDetails, setInprogressServiceDetails] = useState<any[]>([]);

  const [dateRange, updateDateRange] = React.useState({ fromDate: '', toDate: '' });

  const fetchOrders = async () => {
    const postData = {
      user_id: localStorage.getItem('UserId')
    }
    const res = await axios.post(configData.serviceOrderHistoryApiUrl, postData)
    setorderDetails(res.data.data);
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  const categoryFilter = (sortString) => {

    if (sortString != null) {
      const updatedList = orderDetails.filter((item, index) => {
        return (
          //console.log(item.avilable_services)
          item.order_id == sortString.order_id
        );
      });
      setorderDetails(updatedList);
    }
    else {
      fetchOrders();
    }
  }

  const updateDate = (e) => {
    updateDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
    // if(e.target.name == 'fromDate'){
    //   setfromDate(e.target.value);
    // }
    // else{
    //   settoDate(e.target.value);
    // }
  }

  const dateFilter = async () => {
    if (dateRange.fromDate !== null || dateRange.toDate !== null) {
      const postData = {
        user_id: localStorage.getItem('UserId'),
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
      }
      axios.post(configData.serviceOrderHistoryApiUrl, postData)
        .then((res) => {
          if (res.data.success) {
            //console.log('success');
            setorderDetails(res.data.data);
          }
        }, (error) => {
          console.log(error);
        });
    }
  }
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const showMore = () =>{
    setVisible(prevValue => prevValue + 3)
  }

  const showLess = () =>{
    setVisible(prevValue => prevValue - 3)
  }

  return (
    <>
      <Box >
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.breadcrumb}>
          <Link className={classes.breadCrumblinks} component={RouterLink} to="/">
            Home
          </Link>
          <Typography className={classes.breadCrumblinksActive}>Booking History</Typography>
        </Breadcrumbs>
      </Box>
      <div className={classes.root}>

        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              label="New" {...a11yProps(0)}
              className={value === 0 ? classes.tabLiactive : classes.tabLi}
            />
            <Tab
              label="Ongoing" {...a11yProps(1)}
              className={value === 1 ? classes.tabLiactive : classes.tabLi}
            />
            <Tab
              label="Completed" {...a11yProps(2)}
              className={value === 2 ? classes.tabLiactive : classes.tabLi}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <Box className={classes.bgGrey}>
            <TabPanel value={value} index={0} dir={theme.direction} >
              <Typography className={classes.BookingHeading}>Booking History</Typography>
              <Grid container spacing={2}>
                <Grid item sm={4}>
                  <FormControl className={classes.formControllGroup}>
                    <label>Search By From Date</label>
                    <TextField
                      variant="outlined"
                      name="fromDate"
                      id="fromDate"
                      className={classes.formControllFields}
                      value={dateRange.fromDate}
                      onChange={(e) => { updateDate(e); }}
                      type="date"
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={4}>
                  <FormControl className={classes.formControllGroup}>
                    <label>Search By To Date</label>
                    <TextField
                      variant="outlined"
                      name="toDate"
                      id="toDate"
                      className={classes.formControllFields}
                      value={dateRange.toDate}
                      onChange={(e) => { updateDate(e); }}
                      type="date"
                    />
                  </FormControl>
                </Grid>
                {orderDetails && orderDetails.length > 0 ?
                  <Grid item sm={4}>
                    <FormControl className={classes.formControllGroup}>
                      <label>Search By To Order Id</label>
                      <Autocomplete
                        id="combo-box-demo"
                        options={orderDetails}
                        value={sortingvalue}
                        onChange={(event, newValue) => {
                          setSortingValue(newValue);
                          categoryFilter(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          setInputValue(newInputValue);
                        }}
                        className={classes.formControllFields}
                        getOptionLabel={(option) => option.order_id ? option.order_id : 'Select Order ID'}
                        renderInput={(params) => <TextField {...params} className={classes.formControllFields} variant="outlined" />}
                      />
                    </FormControl>
                  </Grid>
                  :
                  null
                }

                <Grid item sm={12}>
                  <Box style={{ textAlign: 'center' }}>
                    <Button onClick={() => { dateFilter(); }} variant="outlined">Submit</Button>
                  </Box>
                </Grid>
              </Grid>
              <Grid container >
                {orderDetails && orderDetails.length > 0 ? orderDetails.slice(0,visible).map((value) => (
                  <Grid container style={{ borderBottom: "2px solid #e0e0e0" }} key={value.id}>
                    <Grid item md={10}>
                      <Box className={classes.Commands}>
                        <Box className={classes.CommentAvatar}>
                          <ReceiptIcon className={classes.CommentAvatarImage} />
                        </Box>
                        <Box className={classes.CommentText}>
                          
                           <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                marginBottom:'10px',
                                marginTop:'10px'
                            }}>
                                <EventIcon />
                                <span className={classes.CommentTextHeading}>Booking Date : {value.booking_date}</span>
                            </div>  
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                marginBottom:'10px'
                            }}>
                                <AlarmIcon />
                                <span className={classes.CommentTextHeading}>Booking Time : {value.booking_time}</span>
                            </div> 
                            <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  flexWrap: 'wrap',
                                  marginBottom:'10px'
                              }}>
                                  <LibraryBooksIcon />
                                  <span className={classes.CommentTextHeading}>Total Services : {value.order_details.length}</span>
                              </div>  
                          <Box>
                            <Typography className={classes.CommandServicePrice}>{currencyCode.INR} {value.total_amount}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={2}>
                      {/* <Button className={classes.OnGoingButton} href={`${configData.siteUrl}home/services/service-booking-history-details/${value.id}`}>
                          In Progress
                        </Button> */}
                      <Button className={classes.OnGoingButton} component={RouterLink} to={`${path}${value.id}`}>
                        In Progress
                      </Button>
                      {/* <Button className={classes.ChatButton}>
                            Call Now
                        </Button> */}
                    </Grid>
                  </Grid>)) :
                  <Grid item md={12}>
                    <Typography className={classes.BookingHeading}> No services found</Typography>
                  </Grid>
                }
              </Grid>
              <Box textAlign="center" style={{marginTop:'40px'}}>
                {orderDetails && visible <= orderDetails.length ?
                        <>
                        <Button variant="outlined" color="default" style={{font:"normal normal normal 16px/24px 'Montserrat-Regular'"}} onClick={showMore}>View More</Button>
                        </>
                    :
                    null
                }
              </Box>
            </TabPanel>
              
          </Box>
          <Box className={classes.bgGrey}>
            <TabPanel value={value} index={1} dir={theme.direction}>

              <Typography className={classes.BookingHeading}>Booking History</Typography>
              {completedOrderDetails && completedOrderDetails.length > 0 ?
                <FormControl className={classes.formControllGroup}>
                  <TextField
                    variant="outlined"
                    name="name"
                    label="Name"
                    className={classes.formControllFields}
                    value=""
                  />
                </FormControl>
                :
                null
              }
              <Grid container spacing={2} >
                {completedOrderDetails && completedOrderDetails.length > 0 ? completedOrderDetails.map((value) => (
                  <Grid container spacing={2} style={{ borderBottom: "2px solid #e0e0e0" }}>
                    <Grid item md={9}>
                      <Box className={classes.Commands}>
                        <Box className={classes.CommentAvatar}>
                          <ReceiptIcon className={classes.CommentAvatarImage} />
                        </Box>
                        <Box className={classes.CommentText}>
                          <Typography className={classes.CommentTextHeading}>{value.order_id}</Typography>
                          <Typography className={classes.CommentTextContents}>
                            <EventIcon /> : {value.booking_date}
                          </Typography>
                          <Typography className={classes.CommentTextContents}>
                            <AlarmIcon /> : {value.booking_time}
                          </Typography>
                          <Box>
                            <Typography className={classes.CommandServicePrice}>₹ {value.total_amount}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Button className={classes.OnGoingButton} component={RouterLink} to={`${match.path}${value.id}`}>
                        In Progress
                      </Button>
                      <Button className={classes.ChatButton} startIcon={<WhatsAppIcon style={{ color: "green" }} />}>
                        Chat Now
                      </Button>
                    </Grid>
                  </Grid>)) :
                  <Grid item md={12}>
                    <Typography className={classes.BookingHeading}> No services found</Typography>
                  </Grid>
                }
              </Grid>

            </TabPanel>
          </Box>
          <Box className={classes.bgGrey}>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <Typography className={classes.BookingHeading}>Booking History</Typography>
              {inprogressOrderDetails && inprogressOrderDetails.length > 0 ?
                <FormControl className={classes.formControllGroup}>
                  <TextField
                    variant="outlined"
                    name="name"
                    label="Name"
                    className={classes.formControllFields}
                    value=""
                  />
                </FormControl>
                :
                null
              }
              <Grid container spacing={2} >
                {inprogressOrderDetails && inprogressOrderDetails.length > 0 ? inprogressOrderDetails.map((value) => (
                  <Grid container spacing={2} style={{ borderBottom: "2px solid #e0e0e0" }}>
                    <Grid item md={9}>
                      <Box className={classes.Commands}>
                        <Box className={classes.CommentAvatar}>
                          <ReceiptIcon className={classes.CommentAvatarImage} />
                        </Box>
                        <Box className={classes.CommentText}>
                          <Typography className={classes.CommentTextHeading}>{value.order_id}</Typography>
                          <Typography className={classes.CommentTextContents}>
                            <EventIcon /> : {value.booking_date}
                          </Typography>
                          <Typography className={classes.CommentTextContents}>
                            <AlarmIcon /> : {value.booking_time}
                          </Typography>
                          <Box>
                            <Typography className={classes.CommandServicePrice}>₹ {value.total_amount}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Button className={classes.ApprovedButton} component={RouterLink} to={`${match.path}${value.id}`}>
                        Approved
                      </Button>
                      <Button className={classes.ChatButton} startIcon={<WhatsAppIcon style={{ color: "green" }} />}>
                        Chat Now
                      </Button>
                    </Grid>
                  </Grid>))
                  :
                  <Grid item md={12}>
                    <Typography className={classes.BookingHeading}> No services found</Typography>
                  </Grid>
                }
              </Grid>
            </TabPanel>
          </Box>
        </SwipeableViews>
      </div>
    </>
  );
}