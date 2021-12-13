import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import configData from "../../../constants.json";
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AlarmIcon from '@material-ui/icons/Alarm';
import EventIcon from '@material-ui/icons/Event';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import NoImage from "../../../assets/img/Nodata.png";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import MediaQuery from 'react-responsive'
import TextField from '@material-ui/core/TextField';



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
          <Typography>{children}</Typography>
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
  },
  bgGrey: {
    background: "#fff",

  },
  BookingHeading: {
    font: "normal normal 24px/24px 'Montserrat-Medium'",
    textAlign: 'center',
    color: "#000000",
    letterSpacing: '0px',
    paddingTop: '20px',

  },
  BookingTabHeading: {
    font: "normal normal 14px/24px 'Montserrat-Medium'",
    textAlign: 'center',
    textTransform: 'capitalize'
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
    marginBottom: "2rem",
    paddingRight: "65px",
    paddingTop: "20px"
  },
  CommentAvatar: {
    width: '150px',
    textAlign: 'center'
  },
  CommentAvatarImage: {
    width: '64px',
    height: "auto",
    borderRadius: '100%',
    color: "#878787"
  },
  CommentText: {
    width: '100%',
    paddingLeft: '14px'
  },
  CommentTextHeading: {
    textAlign: "left",
    marginLeft: '10px',
    font: "normal normal 16px/24px 'Montserrat-Medium'",
    letterSpacing: "0px",
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
    marginTop: '20px',
    textAlign: "left",
    font: "normal normal 18px/22px 'Montserrat-Bold'",
    letterSpacing: "0px",
    color: '#000000',
    float: 'left'
  },
  ApprovedButton: {
    backgroundColor: '#0DA44E',
    borderRadius: '5px',
    padding: '5px 20px',
    color: "#fff",
    borderColor: '#28a745',
    textAlign: 'center',
    verticalAlign: 'middle',
    font: "normal normal 12px/22px 'Montserrat-Bold'",
    lineHeight: '1.5',
    margin: '20px 0 0 20px',
    float: 'right',
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
  profilePages: {
    border: "1px solid #C8C8C8",
    borderRadius: "2px",
    background: "#fff"
  },
  sectionHeading: {
    font: "normal normal normal 16px/19px Montserrat",
    fontWeight: 600,
    borderBottom: "1px solid #C8C8C8",
    padding: "20px 30px",
  },
  TabBar: {
    boxShadow: 'none',
    borderBottom: '1px solid #ddd',
    fontSize: '14px'
  },
  orderDetailItemTitle: {
    font: "normal normal normal 16px/19px Montserrat",
    fontWeight: 600,
    color: '#0D004C',
    marginBottom: '15px'
  },
  orderDetailItemData: {
    font: 'normal normal normal 12px/20px Montserrat',
    color: ' #6E7176'
  },
  NodataImage: {
    background: 'url(' + NoImage + ')',
    width: '218px',
    height: '192px',
    display: 'inline-block'
  },
  resetBtn: {
    width: '100px',
    height: '35px',
    background: '#DBDBDB',
    border: '1px solid #C1C1C1',
    borderRadius: '18px',
    opacity: 1,
    color: '#878787',
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '18px',
    margin: '0px 5px',
    textTransform: "capitalize",
  },
  searchBtn: {
    width: '100px',
    height: '35px',
    background: '#0D004C',
    border: 'none',
    borderRadius: '18px',
    opacity: 1,
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '18px',
    margin: '0px 5px',
    textTransform: "capitalize",
  },
  FilterBtnGroups: {
    textAlign: 'center',
  },
  filterContainer: {
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      display: 'none',
    },
    display: 'flex',
    alignItems: "flex-end",
    '& label': {
      color: '#000000',
      fontSize: '14px',
      fontWeight: 'normal',
      marginBottom: '10px',
      display: 'block',
    },
    '& input': {
      fontSize: '14px',
      height: '35px',
      lineHeight: '35px',
      width: '100%',
      maxWidth: '226px',
      borderRadius: 'none',
      padding: '0px 10px',
      backgroundColor: "#fff",
      color: '#000000',
      border: '1px solid #C1C1C1',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '0px !important',
    },
    '& .MuiOutlinedInput-input': {
      padding: '0 10px',
      height: '37px !important',
      lineHeight: '37px',
      backgroundColor: '#fff',
    },
    '& .MuiInput-underline:before': {
      display: 'none',
    }
  },
  textField: {
    marginLeft: '0',
    marginRight: '0',
    width: '100%',
    fontSize: '14px',
  },
  filterMain: {
    padding: '15px 30px',
  },
  filterByLabel: {
    fontSize: '14px',
    color: '#0D004C',
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'block',
  }
}));

export default function FullWidthTabs() {

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [orderType, setOrderType] = useState<any>('')
  const [status, setStatus] = useState<any>('')
  const [fromDate, setFromDate] = useState<any>('')
  const [toDate, setToDate] = useState<any>('')
  const [loder, setLoder] = useState<any>(false)
  const [visible,setVisible] = useState(3);
  const [filter , setFilter] = useState(false)


  // fromDate=13-10-2021
  // toDate=1

  const [orderDetails, setorderDetails] = React.useState<any[]>([]);

  const fetchOrders = async () => {
    setLoder(true)
    const postData = {
      user_id: localStorage.getItem('UserId')
    }
    const res = await axios.post(configData.serviceOrderHistoryApiUrl, postData)
    setorderDetails(res.data.data);
    setLoder(false)

  }

  useEffect(() => {

    fetchOrders();
  }, [])

 
  const handleSearch = async () => {
    setLoder(true)
    const postData = {
      user_id: localStorage.getItem('UserId'),
      orderType:orderType,
      orderStatus:status,
      fromDate:fromDate,
      toDate:toDate,
    }
    const res = await axios.post(configData.serviceOrderHistoryApiUrl, postData)
    setorderDetails(res.data.data);
    setLoder(false)
};

  
  const handleReset =()=>{
    fetchOrders();
    setFromDate('');
    setOrderType('');
    setToDate('');
    setStatus('');
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

  const handleOpen = () => {
    setFilter(!filter)
  }

  const handleClose = ()=>{
    setFilter(false)
  }

console.log(111,orderDetails)
  return (
    <>
      <Grid container className={classes.profilePages}>
        <Grid item sm={12}>
          <Typography className={classes.sectionHeading}> My Orders </Typography>
        </Grid>
        <Grid item sm={12}>
          {}
          <AppBar position="static" color="default" className={classes.TabBar}>
            <Box className={classes.filterMain} component="div">
              <MediaQuery query='(min-width:769px)'>  <label className={classes.filterByLabel}>Filter By</label> </MediaQuery>
              <MediaQuery query='(min-width:769px)'>
              <Box className="" component="div">
                <Grid container className={classes.filterContainer}>
                  <Grid item sm={9}>
                    <Grid container spacing={1}>
                      <Grid item sm={3}>
                        <Box component="div" className="form-group">
                          <label>Order type</label>
                          <FormControl fullWidth>
                            <Select
                              label="Service"
                              displayEmpty
                              value={orderType}
                              // label="Order type"
                              onChange={(e)=>{setOrderType(e.target.value)}}
                              input={<OutlinedInput />}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                            >
                              <MenuItem value="" > <em>Order type</em></MenuItem>
                              <MenuItem value="service">Service</MenuItem>
                              <MenuItem value="product">Product</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item sm={3}>
                        <Box component="div" className="form-group">
                          <label>Status</label>
                          <FormControl fullWidth>
                            <Select
                              label="Service"
                              displayEmpty
                              value={status}
                              // label="Order type"
                              onChange={(e)=>{setStatus(e.target.value)}}
                              input={<OutlinedInput />}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                            >
                              <MenuItem value="" > <em>Status</em></MenuItem>
                              <MenuItem value="new">new</MenuItem>
                              <MenuItem value="process">process</MenuItem>
                              <MenuItem value="delivered">delivered</MenuItem>
                              <MenuItem value="cancel">cancel</MenuItem>
                              <MenuItem value="active">active</MenuItem>
                              <MenuItem value="inactive">inactive</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item sm={3}>
                        <Box component="div" className="form-group">
                          <label>From</label>
                          <FormControl fullWidth>
                            <TextField
                              id="date"
                              type="date"
                              value={fromDate}
                              className={classes.textField}
                              onChange={(e)=>setFromDate(e.target.value)}
                            />
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item sm={3}>
                        <Box component="div" className="form-group">
                          <label>To</label>
                          <FormControl fullWidth>
                            <TextField
                              id="date"
                              type="date"
                              value={toDate}
                              className={classes.textField}
                              onChange={(e)=>setToDate(e.target.value)}
                            />
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={3}>
                    <Box className={classes.FilterBtnGroups}>
                      <Button className={classes.resetBtn} variant="contained" onClick={()=>handleReset()}>Reset</Button>
                      <Button className={classes.searchBtn} variant="contained" onClick={()=>{handleSearch(); handleClose();}}>Search</Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </MediaQuery>
             <MediaQuery query='(max-width:768px)'> <Button onClick={()=>handleOpen()}> Apply Filter </Button> </MediaQuery>
              <MediaQuery query='(max-width:768px)'>
              { (filter == true ) &&
              <Box className="" component="div">
                <Grid container className={classes.filterContainer}>
                  <Grid item sm={9}>
                    <Grid container spacing={1}>
                      <Grid item sm={3}>
                        <Box component="div" className="form-group">
                          <label>Order type</label>
                          <FormControl fullWidth>
                            <Select
                              label="Service"
                              displayEmpty
                              value={orderType}
                              // label="Order type"
                              onChange={(e)=>{setOrderType(e.target.value)}}
                              input={<OutlinedInput />}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                            >
                              <MenuItem value="" > <em>Order type</em></MenuItem>
                              <MenuItem value="service">Service</MenuItem>
                              <MenuItem value="product">Product</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item sm={3}>
                        <Box component="div" className="form-group">
                          <label>Status</label>
                          <FormControl fullWidth>
                            <Select
                              label="Service"
                              displayEmpty
                              value={status}
                              // label="Order type"
                              onChange={(e)=>{setStatus(e.target.value)}}
                              input={<OutlinedInput />}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                            >
                              <MenuItem value="" > <em>Status</em></MenuItem>
                              <MenuItem value="new">new</MenuItem>
                              <MenuItem value="process">process</MenuItem>
                              <MenuItem value="delivered">delivered</MenuItem>
                              <MenuItem value="cancel">cancel</MenuItem>
                              <MenuItem value="active">active</MenuItem>
                              <MenuItem value="inactive">inactive</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item sm={3}>
                        <Box component="div" className="form-group">
                          <label>From</label>
                          <FormControl fullWidth>
                            <TextField
                              id="date"
                              type="date"
                              value={fromDate}
                              className={classes.textField}
                              onChange={(e)=>setFromDate(e.target.value)}
                            />
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item sm={3}>
                        <Box component="div" className="form-group">
                          <label>To</label>
                          <FormControl fullWidth>
                            <TextField
                              id="date"
                              type="date"
                              value={toDate}
                              className={classes.textField}
                              onChange={(e)=>setToDate(e.target.value)}
                            />
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={3}>
                    <Box className={classes.FilterBtnGroups}>
                      <Button className={classes.resetBtn} variant="contained" onClick={()=>handleReset()}>Reset</Button>
                      <Button className={classes.searchBtn} variant="contained" onClick={()=>{handleSearch(); handleClose();}}>Search</Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              }
              </MediaQuery>
            </Box>
          </AppBar>
        </Grid>
        <Grid md={12}>
          <SwipeableViews md={12}
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <Box className={classes.bgGrey}>
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Grid container spacing={2} >
                {loder ?
                    <Box style={{ display: 'flex', margin: 'auto' }}>
                        <CircularProgress />
                    </Box>
                  :orderDetails && orderDetails.length > 0 ? orderDetails.slice(0, visible).map((value) => (
                    
                    <Grid container spacing={2} style={{ borderBottom: "2px solid #e0e0e0" }}>
                      <Grid item md={9}>
                        <Box className={classes.Commands}>
                          <Box className={classes.CommentAvatar}>
                            {/* <ReceiptIcon className={classes.CommentAvatarImage} /> */}
                            <img src={configData.backendUrl+value.order_details[0].service_details.service_icon} alt="Service-Icon"/>
                          </Box>
                          <Box className={classes.CommentText}>
                            <Typography className={classes.orderDetailItemTitle}>{value.order_details[0].service_details.slug}</Typography>
                            <Typography className={classes.orderDetailItemData}>Ref. Id : {value.order_number}</Typography>
                            <Typography className={classes.orderDetailItemData}>Placed on : {value.booking_date} | {value.booking_time}</Typography>
                            <Typography className={classes.orderDetailItemData}>Total Service : {value.order_details.length}</Typography>
                            <Typography className={classes.orderDetailItemData}>Status :{value.status} </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item md={3}>
                        <Typography className={classes.CommandServicePrice}>₹ {value.total_amount.toFixed(2)}</Typography>
                        <Button className={classes.ApprovedButton} component={RouterLink} to={`services/service-booking-history/${value.id}`}>
                          View
                        </Button>
                      </Grid>
                    </Grid>)) :
                    <Grid item md={12} style={{ textAlign: 'center' }}>
                      <Box className={classes.NodataImage}></Box>
                      <Typography className={classes.BookingHeading}>

                        No services found </Typography>
                    </Grid>
                  }
                  {!loder && orderDetails && orderDetails.length > 0 ?
                    <Grid item md={12}>
                      <Box textAlign="center">
                        <Button style={{ float: 'none' }} className={classes.ApprovedButton} onClick={showMore}>
                          View More
                        </Button>
                      </Box>
                    </Grid>
                    :
                    null
                  }
                </Grid>
              </TabPanel>
            </Box>
            <Box className={classes.bgGrey} style={{ textAlign: 'center', minWidth: '100%' }}>
              <Box className={classes.NodataImage}></Box>
              <TabPanel value={value} index={1} dir={theme.direction}>
                No Products Found 
              </TabPanel>
            </Box>
          </SwipeableViews>
        </Grid>
      </Grid>

    </>
  );
}
