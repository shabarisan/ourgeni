import {
    Grid,
    useScrollTrigger,
    Zoom,
    Fab
} from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons'
import ProductHome from '../productsHome/productsHome'
import ProductList from '../productList/productList';
import ProductDetails from '../productDetails/productdetails';


import PrivateRoute from '../../PrivateRoute/PrivateRoute';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    useRouteMatch
} from "react-router-dom";
import useStyles from './mainStyles'

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
  }
function ScrollTop(props:Props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleBack = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );
    console.log(anchor)
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleBack} role="presentation" className={classes.backToTop}>
        {children}
      </div>
    </Zoom>
  );
}

const ProductCategory = (props) => {
    const classes = useStyles();
    let {path, url } = useRouteMatch();
    let match = useRouteMatch();
    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item xs={12} sm={12} >
                    <Switch>
                        {/* <Route path="/home/services/cart">
                            <Redirect to="/services/cart" />
                        </Route> */}
                        <Route exact path={path} component={ProductHome} />
                        <Route exact path={`${path}/product-list/:id`} component={ProductList} />
                        <Route exact path={`${path}/product/:id`} component={ProductDetails} />
                        {/* <Route path={`${path}/sub/service/:service`} component={Services} />
                        <Route path={`${path}/sub/service/:service`} component={SubServices} />
                        <Route path={`${path}/sub/:sub`} component={SubServicesDetails} />
                        <Route path={`${path}/sub/:sub`} component={SubCategory} />
                        <Route path={`${path}/product-list`} component={ProductList} />
                        <PrivateRoute path={`${path}/cart`} component ={Cart} />
                        <PrivateRoute path={`${path}/thank-you/:order_id`} component ={ServiceBookingThankYou} />
                        <PrivateRoute path={`${match.path}/service-booking-history/:topicId`} component ={ServiceBookingHistoryDetails} />
                        
                        <PrivateRoute path={`${path}/service-booking`} component ={ServiceBooking} />
                        <PrivateRoute path={`${path}/service-booking-history/`} component ={ServiceBookingHistory} />
                        <PrivateRoute path={`${path}/service-booking-history-details`} component ={ServiceBookingHistoryDetails} />
                        
                        <PrivateRoute path={`${path}/service-schedule-booking`} component ={ScheduleBooking} />
                        <Route path={`${path}/company-list`} component ={CompanyList} />
                        <PrivateRoute path={`${path}/payment`} component={PaymentScreen} /> */}
                    </Switch>
                   
                        <ScrollTop {...props}>
                        <Fab size="small" aria-label="scroll back to top">
                            <KeyboardArrowUpIcon fontSize="large" />
                        </Fab>
                        </ScrollTop>
                    
                </Grid>
            </Grid>
        </div >
    )
}
export default ProductCategory;