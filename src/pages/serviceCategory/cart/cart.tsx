import {
    Grid,
    Typography,
    Button,
    Container,
    Box,
    Link,
} from '@material-ui/core';
import useStyles from './cartStyles';
import Percentage from '../../../assets/img/offer.svg';
import React  from 'react';
import { Paper } from '@material-ui/core';
import configData from "../../../constants.json";
import * as currencyCode from '../../../currencyCode';
import { useCart } from "react-use-cart";
import {
    Link as RouterLink,
    useHistory,
} from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CartList from '../../../components/serviceCategory/cart/cartTable';
import axios from 'axios';


const Cart = () => {
    const classes = useStyles();
    const history = useHistory();
    const [handlePopModal, setPopModal] = React.useState(false);
    const { cartTotal, items } = useCart();
    const [companyTax, setCompanyTax] = React.useState(0);
    const  ProductList = items.filter((item)=>item.type=="product")
    const  ServiceList = items.filter((item)=>item.type=="service")
    console.log(123456,ServiceList)
    console.log(123,ProductList)

    React.useEffect(() => {
        getTaxDatafromDb();
        window.scrollTo(0, 0);
    }, [])
    
    React.useEffect(() => {
       localStorage.setItem("cartProduct",JSON.stringify(ProductList))
       localStorage.setItem("cartServices",JSON.stringify(ServiceList))
    }, [ProductList,ServiceList])

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

    // items.forEach(function (ItemDetails, ItemIndes) {
    //     taxTotal += ItemDetails.price_with_tax - ItemDetails.price;
    //     if (ItemDetails.quantity) {
    //         priceTotal += (ItemDetails.price_with_tax * ItemDetails.quantity);
    //     }
    //     else {
    //         priceTotal += (ItemDetails.price_with_tax);
    //     }
    // });

    ServiceList.forEach(function (ItemDetails, ItemIndes) {
        taxTotal += ItemDetails.price_with_tax - ItemDetails.price;
        if (ItemDetails.quantity) {
            priceTotal += (ItemDetails.price_with_tax * ItemDetails.quantity);
        }
        else {
            priceTotal += (ItemDetails.price_with_tax);
        }
    });



    function handleSubmit(type) {
        if (localStorage.getItem('UserId') == '' || localStorage.getItem('UserId') == null) {
            //alert('Please login into your account');
            history.push('/login ');
            setPopModal(true);
        }
        else {
            history.push(  {
                pathname: `/services/service-booking`,
                state: {
                    paymentFor: type
                }
            });
          
            //window.location.href = configData.siteUrl+'home/services/service-booking';
        }
    }

    return (
        <div>
            <Box className={classes.serviceCategoryBanner}>
                <Box className={classes.cartBAnnerHeading}>
                    <Typography variant='h2' className={classes.cartBannerTitle}>A nice section heading goes here</Typography>
                    <Typography variant='h5' className={classes.cartBannerTitleContent}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</Typography>

                </Box>
            </Box>
            <Container maxWidth='md' className={classes.cartWrapper}>
                <Box >
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.breadcrumb}>
                        <Link className={classes.breadCrumblinks} component={RouterLink} to="/">
                            Home
                        </Link>
                        <Link className={classes.breadCrumblinks} component={RouterLink} to="/services">
                            Services
                        </Link>

                        <Typography className={classes.breadCrumblinksActive}>Cart</Typography>
                    </Breadcrumbs>
                </Box>
                <Paper elevation={3} style={{ background: "#f6f6f6" }}>
                    <Grid container item xs={12} >
                        <Grid container item className={classes.cartContainer}>
                            <Grid item sm={12} className={classes.cartHeading}>
                                <Typography variant='h4' style={{ fontFamily: 'Montserrat-Regular' }}>PAY YOUR PRICE</Typography>
                            </Grid>
                            <Grid container item xs={12} sm={12} spacing={1}>
                                <Grid item xs={12}>
                                    <h1 className={classes.add_cart} style={{ fontFamily: 'Montserrat-Regular' }}> Added items </h1>
                                </Grid>
                                <Grid container item sm={12}>
                                    <Box className={classes.cartProductContainer}>
                                        <CartList handleSubmit={handleSubmit} />
                                    </Box>
                                </Grid>
                            </Grid>

                        </Grid>
                        {/* <Grid item sm={12} className={classes.promoArea}>
                            <Button disabled className={classes.promoHeading}>
                                <img src={Percentage} className={classes.promoIcon} />
                                <Typography className={classes.promoCodeContent}>Offers and Promocode</Typography>
                            </Button>
                        </Grid>
                        <Grid item sm={12} className={classes.payButtonArea}>
                            <Button className={classes.payButton} onClick={handleSubmit}>PAY {currencyCode.INR} {( priceTotal).toFixed(2)} </Button>
                        </Grid> */}
                    </Grid>
                </Paper>
            </Container>
        </div>
    )

}


export default Cart;