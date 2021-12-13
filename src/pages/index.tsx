import React, { Suspense,useEffect,useState } from 'react';
import { Route, Switch,Redirect } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import {
    Theme,
    createStyles,
} from '@material-ui/core/styles';
import {
    Grid,
    useScrollTrigger,
    Zoom,
    Fab,
    Box,
    Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";
import * as configData from '../constants.json';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Footer from '../components/main/footer/footer';
import NavigatonBar from '../components/main/navigationBar/navigationBar';
import BookingHistory from './booking/bookingHistoryDetails/bookingHistory';
import ScheduleBooking from './booking/scheduleBooking/scheduleBooking';
import ServiceCategory from './serviceCategory/categoryMain';
import ProductCategory from './productsCategory/productMain';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Listing from './list/listMain';
import StoreCategory from '../pages/store/storeMain/index'
import ComingSoon from '../components/comingSoon/comingSoon'
const HomePage = React.lazy(() => import('./home/main/home'));
const ForgotPassword = React.lazy(() => import('./home/forgotPassword/forgotPassword'))
const ForgotPasswordEmail = React.lazy(() => import('./home/forgotPassword/forgotPasswordEmail'))
const PasswordResetSuccess = React.lazy(() => import('./home/forgotPassword/passwordResetScuccess'))
const PasswordResetConfirm = React.lazy(() => import('./home/forgotPassword/passwordResetConfirm'))
const Login = React.lazy(() => import('./home/login/login'))
const LoginWithOtp = React.lazy(() => import('./home/login/loginWithOtp'))
const VerifyOtp = React.lazy(() => import('./home/login/verifyOtp'))
const ProviderRegister = React.lazy(() => import('./home/register/serviceProvider/register'))
const ProviderSuccess = React.lazy(() => import('./home/register/serviceProvider/registerScuccess'))
const Register = React.lazy(() => import('./home/register/register'))
const RegisterConfirm = React.lazy(() => import('./home/register/registerConfirm'))
const RegisterSuccess = React.lazy(() => import('./home/register/registerScuccess'))
const Profile = React.lazy(() => import('./profile/profile'));
const SubscriptionConfirm = React.lazy(()=>import('./subscription/subscriptionConfirm'));
const SubscriptionSuccess = React.lazy(()=>import('./subscription/subscriptionSuccess'));


const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        gap: {
            [`@media (min-width: 600px)`]: {
                minHeight: '80px'
            },
            background: 'transparent',
            boxShadow: 'none'
        },
        root: {
            backgroundColor: '#f9f9f9',
            '& .MuiFab-root': {
                backgroundColor: '#1acc8d',
                color: '#ffff',
                borderRadius: '5px',
            }
        },
        loadingScreen: {
            margin: 'auto',
            display: 'felx',
      
          },
          lodingContainer: {
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh',
            margin: 'auto',
          },
          spinner: {
            color:'#4fb25d',
          },
    })
))

export default function Home() {
    let { path, url } = useRouteMatch();
    const classes = useStyles();
    const [areaList, setAreaList] = useState<any>([]);
    const [serviceList, setServiceList] = useState<any>([]);
    const [topServices, setTopService] = useState<any>([]);
    const [footer_details, setDetails] = useState<any[]>([])
    const [footer_about_us, setFooterAboutUs] = useState<any[]>([])
    const [footer_social_media_links, setFooterSocialMediaLinks] = useState<any[]>([])
    const [footer_download_app_links, setFooterDownloadAppLinks] = useState<any[]>([])
    const [footerContent, setFooterContent] = useState<any[]>([])

    const fetchServices = () =>{
        axios.get(configData.allpApiUrl + 'static_content')
        .then((response)=>{
          if(response.data.success)
          {
            setServiceList(response.data.services);
            setAreaList(response.data.allCities);
            setTopService(response.data.topServices);
            setDetails(response.data.footerContactData);
            setFooterAboutUs(response.data.footerAboutUsData);
            setFooterSocialMediaLinks(response.data.footerSocialMediaLinks);
            setFooterDownloadAppLinks(response.data.footerDownloadAppData);
            setFooterContent(response.data.footerContent)

          }
        },(error)=>{
          console.log(error);
        });
    }
    useEffect(() => {
        fetchServices();
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={classes.root}>
            <div id='back-to-top-anchor'>
                <NavigatonBar backGround='transparent linear-gradient(180deg, #0D004C 0%, #24AE90 100%) 0% 0% no-repeat padding-box' shadow='none' serviceList={serviceList} />
            </div>
            {/* <div className={classes.gap}></div> */}
            <Suspense fallback={<div className={classes.lodingContainer}>
                <CircularProgress className={classes.spinner} thickness={4} size={50} />
              </div>}>
            <Grid container>
                <Switch>
                    <Route path="/home/services/sub/service/:service" render={ props => (
                        <Redirect to={`/services/sub/service/${props.match.params.service}`} />
                    )} />
                    <Route path="/home/services/thank-you/:order_id" render={ props => (
                        <Redirect to={`/services/thank-you/${props.match.params.order_id}`} />
                    )} />
                    <Route path="/home/services">
                        <Redirect to="/services" />
                    </Route>
                    <Route path="/home/list/service-provider/:service_id" render={ props => (
                        <Redirect to={`/list/service-provider/${props.match.params.service_id}`} />
                    )} />
                     
                    <Route path="/home/list/service-provider">
                        <Redirect to="/list/service-provider" />
                    </Route>
                    <Route path="/home/register-success">
                        <Redirect to="/register-success" />
                    </Route>
                    <Route path="/home/register-confirm">
                        <Redirect to="/register-confirm" />
                    </Route>
                    <Route path="/home/password-reset-confirm">
                        <Redirect to="/password-reset-confirm" />
                    </Route>
                    <Route path="/home/password-reset-success">
                        <Redirect to="/password-reset-success" />
                    </Route>
                    <Route path="/home/forgot-password/:email" render={ props => (
                        <Redirect to={`/forgot-password/${props.match.params.email}`} />
                    )} />
                    <Route path="/home/register">
                        <Redirect to="/register" />
                    </Route>
                    <Route path="/home/login">
                        <Redirect to="/login" />
                    </Route>
                    <Route path="/home/user-profile">
                        <Redirect to="/user-profile" />
                    </Route>
                    <Route path="/home/verify-otp/:user" render={ props => (
                        <Redirect to={`/verify-otp/${props.match.params.user}`} />
                    )} />
                    <Route path={`${path}/category`} component={ServiceCategory} />
                    <Route exact path = '/' component={HomePage} />
                    <Route path={`${path}/services`} component={ServiceCategory} />
                    <Route path='/services' component={ServiceCategory} />
                    <Route path='/products' component={ProductCategory} />
                    <Route path='/list' component={Listing} />
                    <Route path='/about-us' component={ComingSoon} />
                    <Route path='/blog' component={ComingSoon} />
                    <Route path='/house-hold' component={ComingSoon} />
                    <Route path='/store' component={StoreCategory} />
                    <PrivateRoute path={`/user-profile`} component={Profile} />
                    <Route path={`/register`}component={Register} />
                    <Route path={`/become-a-partner`}component={ProviderRegister} />
                    <Route path={`/register-success-partner`}component={ProviderSuccess} />
                    <Route path={`/register-confirm`}component={RegisterConfirm} />
                    <Route path='/register-success' component={RegisterSuccess} />
                    <Route path={`/subscription-confirm`}component={SubscriptionConfirm} />
                    <Route path='/subscription-success' component={SubscriptionSuccess} />
                    <Route path={`/password-reset-confirm`}component={PasswordResetConfirm} />
                    <Route path={`/password-reset-success`}component={PasswordResetSuccess} />
                    <Route path='/login' component={Login} />
                    <Route path={`/verify-otp/:user`} component={VerifyOtp} />
                    <Route path={`/login-with-otp`} component={LoginWithOtp} />
                    <Route path={`/forgot-password/:email`} component={ForgotPassword} />
                    <Route path={`/forgot-password`} component={ForgotPasswordEmail} />
                    <Route path={`/schedule-booking`} component={ScheduleBooking} />
                    <Route path={`/booking-history`} component={BookingHistory} />
                    {/* <PrivateRoute path={`${path}/user-profile`}>
                        <Profile />
                    </PrivateRoute> */}
                    {/* <Route path={`${path}/register`}component={Register} /> */}
                    {/* <Route path={`${path}/login`} component={Login} /> */}
                    {/* <Route path={`${path}/user-profile`} component={Profile} /> */}
                    {/* {<Route path={`${path}/verify-otp/:user`} component={VerifyOtp} />} */}
                    {/* <Route path={`${path}/list`} component={Listing} /> */}
                    {/* <Route path={`${path}/login-with-otp`} component={LoginWithOtp} />
                    <Route path={`${path}/forgot-password/:email`} component={ForgotPassword} />
                    <Route path={`${path}/forgot-password`} component={ForgotPasswordEmail} />
                    <Route path={`${path}/schedule-booking`} component={ScheduleBooking} />
                    <Route path={`${path}/booking-history`} component={BookingHistory} /> */}
                </Switch>
                </Grid>
            </ Suspense>
            <Footer footerContent={footerContent} footer_details={footer_details} footer_about_us={footer_about_us} footer_social_media_links={footer_social_media_links}  footer_download_app_links={footer_download_app_links} />
        </div>
    )
}

// function PrivateRoute({ children, ...rest }) {
//     const { user, isAuthenticated, isLoading } = useAuth0();
//     const [user_details, setDetails] = useState({
//         name:"",
//     })
//     useEffect(()=>{
//     const userName= localStorage.getItem('user_name')
//         isAuthenticated && localStorage.setItem("user_name",user.name);
//         if(userName){
//             setDetails({
//                 ...user_details,
//                 name:userName
//             })
//             };
//     })
//     return (
//       <Route
//         {...rest}
//         render={({ location }) =>
//         user_details.name ? (
//             children
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/home/login",
//                 state: { from: location }
//               }}
//             />
//           )
//         }
//       />
//     );
//   }