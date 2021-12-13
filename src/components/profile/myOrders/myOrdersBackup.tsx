import React,{useEffect} from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import configData from "../../../constants.json";
import { Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AlarmIcon from '@material-ui/icons/Alarm';
import EventIcon from '@material-ui/icons/Event';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import NoImage from "../../../assets/img/Nodata.png";


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
  bgGrey:{
    background:"#fff",
    
  },
  BookingHeading:{
    font:"normal normal 24px/24px 'Montserrat-Medium'",
    textAlign:'center',
    color:"#000000",
    letterSpacing:'0px',
    paddingTop:'20px',
   
  },
  BookingTabHeading:{
    font:"normal normal 14px/24px 'Montserrat-Medium'",
    textAlign:'center',
    textTransform:'capitalize'
  },
  formContainer:{
    paddingTop:'30px'
  },
  formControllGroup:{
      marginTop:'20px',
      marginBottom:'20px',
      width:'100%'
  },
  formControllFields:{
      width:'100%'
  },
  Commands:{
    display:"flex",
    position:'relative',
    paddingBottom:"12px",
    marginBottom:"2rem",
    paddingRight:"65px",
    paddingTop:"20px"
  },
  CommentAvatar:{
    width:'150px',
    textAlign:'center'
  },
  CommentAvatarImage:{
    width:'64px',
    height:"auto",
    borderRadius:'100%',
    color:"#878787"
  },
  CommentText:{
    width:'100%',
    paddingLeft:'14px'
  },
  CommentTextHeading:{
    textAlign:"left",
    marginLeft:'10px',
    font:"normal normal 16px/24px 'Montserrat-Medium'",
    letterSpacing:"0px",
    color:"#000000"
  },
  CommentTextContents:{
    marginBottom:"0.5rem",
    textAlign:"justify",
    width:"70%",
    font:"normal normal normal 14px/24px 'Montserrat-Regular'",
    letterSpacing:"0px",
    color:"#878787"
  },
  CommandServicePrice:{
    marginTop:'20px',
    textAlign:"left",
    font:"normal normal 18px/22px 'Montserrat-Bold'",
    letterSpacing:"0px",
    color:'#000000',
    float:'left'
  },
  ApprovedButton:{
    backgroundColor:'#0DA44E',
    borderRadius:'5px',
    padding:'5px 20px',
    color:"#fff",
    borderColor:'#28a745',
    textAlign:'center',
    verticalAlign:'middle',
    font:"normal normal 12px/22px 'Montserrat-Bold'",
    lineHeight:'1.5',
    margin:'20px 0 0 20px',
    float:'right',
    '&:hover':{
      color:'#fff',
      backgroundColor:'#218838',
      borderColor:'#1e7e34',
    }
  },
  OnGoingButton:{
    backgroundColor:'#E98604',
    borderRadius:'5px',
    padding:'11px 20px',
    color:"#fff",
    borderColor:'#28a745',
    textAlign:'center',
    verticalAlign:'middle',
    lineHeight:'1.5',
    marginTop:'20px',
    '&:hover':{
      color:'#fff',
      backgroundColor:'#E98604',
      borderColor:'#E98604',
    }
  },
  ChatButton:{
    borderRadius:'5px',
    padding:'11px 10px',
    color:"green",
    borderColor:'#28a745',
    textAlign:'center',
    verticalAlign:'middle',
    lineHeight:'1.5',
    marginTop:'10px'
  },
  profilePages:{
    border:"1px solid #C8C8C8",
    borderRadius:"2px",
    background:"#fff"
}, 
sectionHeading:{
  font:"normal normal normal 16px/19px Montserrat",
  fontWeight:600,
  borderBottom:"1px solid #C8C8C8",
  padding:"20px 30px",    
},
TabBar:{
  boxShadow:'none',
  borderBottom:'1px solid #ddd',
  fontSize:'14px'
},
orderDetailItemTitle:{
  font:"normal normal normal 16px/19px Montserrat",
  fontWeight:600,
  color:'#0D004C',
  marginBottom:'15px'
},
orderDetailItemData:{
  font:'normal normal normal 12px/20px Montserrat',
  color:' #6E7176'
},
NodataImage:{
  background:'url(' + NoImage + ')',
  width:'218px',
  height:'192px',
  display:'inline-block'
}
}));

export default function FullWidthTabs() {

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [orderDetails, setorderDetails] = React.useState<any[]>([]);

  const fetchOrders = async () => {
    const postData = {
      user_id : localStorage.getItem('UserId')
    }
    const res = await axios.post(configData.serviceOrderHistoryApiUrl,postData)
    //console.log(res);
    setorderDetails(res.data.data);
    
}

  useEffect(()=>{
   
    fetchOrders();
  },[])

  


  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
  <>
     <Grid container className={classes.profilePages}>
            <Grid item sm={12}>
                <Typography className={classes.sectionHeading}>My Orders </Typography>
            </Grid>
            <Grid item sm={12}>
            <AppBar position="static" color="default" className={classes.TabBar}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab className={classes.BookingTabHeading} label="My Service List" {...a11yProps(0)} />
                <Tab className={classes.BookingTabHeading} label="My Product List" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            </Grid>
            <Grid md={12}>
            <SwipeableViews  md={12}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <Box  className={classes.bgGrey}>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <Grid container spacing={2} >
                {orderDetails && orderDetails.length > 0 ? orderDetails.slice(0,2).map((value) => (
                    <Grid container spacing={2} style={{borderBottom:"2px solid #e0e0e0"}}>
                        <Grid item md={9}>
                            <Box className={classes.Commands}>
                                <Box className={classes.CommentAvatar}>
                                    <ReceiptIcon className={classes.CommentAvatarImage} />
                                </Box>
                                <Box className={classes.CommentText}>
                                  <Typography className={classes.orderDetailItemTitle}>Refregrator Repair</Typography>
                                  <Typography className={classes.orderDetailItemData}>Ref. Id : 12345678</Typography>
                                  <Typography className={classes.orderDetailItemData}>Placed on : {value.booking_date} | {value.booking_time}</Typography>
                                  <Typography className={classes.orderDetailItemData}>Total Service : {value.order_details.length}</Typography>
                                  <Typography className={classes.orderDetailItemData}>Status : OPEN</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={3}>
                        <Typography className={classes.CommandServicePrice}>₹ {value.total_amount.toFixed(2)}</Typography>
                            <Button className={classes.ApprovedButton} component={RouterLink} to={`services/service-booking-history/${value.id}`}>
                                View
                            </Button>
                        </Grid>
                    </Grid>)):
                    <Grid item md={12} style={{textAlign: 'center'}}>
                      <Box className={classes.NodataImage}></Box>
                        <Typography className={classes.BookingHeading}>
                        
                           No services found</Typography>
                    </Grid>
                    }
                    {orderDetails && orderDetails.length> 0 ?
                        <Grid item md={12}>
                            <Box textAlign="center">
                                <Button style={{float: 'none'}} className={classes.ApprovedButton} component={RouterLink} to={`services/service-booking-history/`}>
                                    View All
                                </Button>
                            </Box>
                        </Grid>
                        :
                        null
                    }
                </Grid>
            </TabPanel>
        </Box>
        <Box  className={classes.bgGrey} style={{textAlign: 'center', minWidth:'100%'}}>
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
