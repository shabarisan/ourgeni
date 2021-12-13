import { Box, Container, Grid, Typography} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from './profileStyles';
import profileIcon_4 from '../../assets/img/profileicon-4.svg';
import axios from 'axios';
import configData from "../../constants.json";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'
import Divider from '@material-ui/core/Divider';
import MyAccount from '../../components/profile/myAccount/myAccount';
import AccountInfo from '../../components/profile/accountInfo/accountInfo';
import ChangePassword from '../../components/profile/changePassword/changePassword';
import MyOrders from '../../components/profile/myOrders/myOrders';
import DeliveryAddress from '../../components/profile/deliveryAddress/deliveryAddress';
import firebaseConfig  from '../../firebaseConfig';
import firebase from "firebase";
import { useConfirm } from 'material-ui-confirm';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MediaQuery from 'react-responsive'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {

    
    const { children, value, index, ...other } = props;
  
    return (
      <div
        style={{width:"100%"}}
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Grid container>
              <Grid item sm={12}>
                <Box p={3}>
                        {children}
                </Box>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
  
  function a11yProps(index: any) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }


  
function Profile(props) {
    const confirm = useConfirm();
    const classes = useStyles();
    const [value, setValue] = React.useState(2);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const Moveto = (value)=>{
        setValue(value)
    }

    const Logout = () =>{
        localStorage.setItem("user_name",'');
        localStorage.setItem("UserId",'');
        localStorage.setItem("UserEmail","");
        localStorage.setItem("mobile_no","");
        localStorage.setItem("user_delivery_address","");
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
         }else {
            firebase.app(); // if already initialized, use that one
         }
        firebase.auth().signOut();
    
        window.location.href=('/');
    }
    

    const [user_details, setUser] = useState<any>();
    useEffect(() => {
         const fetchUserDetails = async ()  =>{
            const postData =localStorage.getItem('UserId');
            console.log("Post data : ", postData);
            axios.post(configData.localbackend+`api/v1/aapi/get-user?userid=${postData}`)
            .then((response)=>{
                if(response.data.success){
                    setUser(response.data.data);
                }
            },(error)=>{
                console.log(error);
            })
        }
        fetchUserDetails();
    }, [])

    return (
        <Grid container>
            <Grid item sm={12} className={classes.ProfileCard}>
               <Container>
                <Box >
                    <div className={classes.rootf}>
                        <MediaQuery query='(min-width: 768px)'>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Box p={3} textAlign="center" className={classes.profile_bx}>
                                <img src={profileIcon_4}  className={classes.profileIcon} />
                                <Typography className={classes.profileName}> {user_details?.first_name} {user_details?.last_name}</Typography>
                             </Box>
                            <Box>
                                <Divider />
                            </Box>
                            <Tab className={classes.profileTabs} icon={<SupervisorAccountOutlinedIcon />} label="Profile Information" {...a11yProps(2)} />
                            {/* <Tab className={classes.profileTabs} icon={<AccountCircleOutlinedIcon />} label="My Account" {...a11yProps(3)} /> */}
                            <Tab className={classes.profileTabs} icon={<VpnKeyIcon />} label="Change Password" {...a11yProps(3)} />                                                  
                            <Tab className={classes.profileTabs}  icon={<LocationOnOutlinedIcon />} label="Manage Address" {...a11yProps(4)} />                            
                            <Tab className={classes.profileTabs}  icon={<LocalShippingOutlinedIcon />} label="My Orders" {...a11yProps(5)} />   
                            <Tab className={classes.profileTabs} icon={<ExitToAppOutlinedIcon />} label="Logout" {...a11yProps(6)}
                                onClick={() => { 
                                   confirm({ description: 'Are you sure you want to logout?' })
                                    .then(() => { Logout();}) 
                                }
                            }
                            />
                        </Tabs>
                        </MediaQuery>
                        <TabPanel value={value} index={2}>
                            <div className={classes.tab_bx}>
                                {user_details &&
                                <AccountInfo UserDetails={user_details} onChange={Moveto} />
                                }
                            </div>
                        </TabPanel>
                        {/* <TabPanel value={value} index={3}>
                            <MyAccount UserDetails={user_details} />
                        </TabPanel> */}
                        <TabPanel value={value} index={3}>
                            <div className={classes.tab_bx}>
                                <ChangePassword UserDetails={user_details} />
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <div className={classes.tab_bx}>
                                <DeliveryAddress />
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            <div className={classes.tab_bx}>
                                <MyOrders />
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            <AccountInfo UserDetails={user_details} onChange={Moveto} />
                        </TabPanel>
                        <MediaQuery query='(max-width: 768px)'>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Box p={3} textAlign="center" className={classes.profile_bx}>
                                <img src={profileIcon_4}  className={classes.profileIcon} />
                                <Typography className={classes.profileName}> {user_details?.first_name} {user_details?.last_name}</Typography>
                             </Box>
                            <Box>
                                <Divider />
                            </Box>
                            <Tab className={classes.profileTabs} icon={<SupervisorAccountOutlinedIcon />} label="Profile Information" {...a11yProps(2)} />
                            {/* <Tab className={classes.profileTabs} icon={<AccountCircleOutlinedIcon />} label="My Account" {...a11yProps(3)} /> */}
                            <Tab className={classes.profileTabs} icon={<VpnKeyIcon />} label="Change Password" {...a11yProps(3)} />                                                  
                            <Tab className={classes.profileTabs}  icon={<LocationOnOutlinedIcon />} label="Manage Address" {...a11yProps(4)} />                            
                            <Tab className={classes.profileTabs}  icon={<LocalShippingOutlinedIcon />} label="My Orders" {...a11yProps(5)} />   
                            <Tab className={classes.profileTabs} icon={<ExitToAppOutlinedIcon />} label="Logout" {...a11yProps(6)}
                                onClick={() => { 
                                   confirm({ description: 'Are you sure you want to logout?' })
                                    .then(() => { Logout();}) 
                                }
                            }
                            />
                        </Tabs>
                        </MediaQuery>
                    </div>
                </Box>
                </Container> 
            </Grid>
        </Grid>
    )
}

export default Profile;