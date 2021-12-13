import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Grid, Paper, Typography, Link, ButtonGroup, Snackbar, Container } from '@material-ui/core';
import SubServicesStyle from './serviceStyles';
import clsx from 'clsx';
import Plumbing from "../../../assets/img/cate-01.svg";
import CircularProgress from '@material-ui/core/CircularProgress';
import ShowMoreText from 'react-show-more-text';
import * as currencyCode from '../../../currencyCode';
import StarIcon from '@material-ui/icons/Star';
import { useCart } from "react-use-cart";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddIcon from '@material-ui/icons/Add';
import configData from "../../../constants.json";
import {Helmet} from 'react-helmet'
import { useLocation } from 'react-router-dom'


import {
    useHistory,
} from "react-router-dom";


const SubServiceCard = (props): any => {
    const classes = SubServicesStyle();
    const history = useHistory();
    const { addItem, getItem, isEmpty, totalItems, items, updateItemQuantity, cartTotal } = useCart();
    const [servicesList, setServicesList] = useState<any>(props.servicesList)
    const [open, setOpen] = useState<any>(true)
    const servicesInfo = props.servicesInfo
    const handleID = props.handleID

    useEffect(() => {
        // var List = servicesList
        servicesList.forEach(function (item, index) {
            item.addOn = false;
            if (getItem(item.id)) {
                item.counter = JSON.parse(getItem(item.id).quantity);
                item.addOn = true;
            }
            else {
                item.counter = 0;
            }
            setServicesList(servicesList)
        });

    }, [items,props.servicesList])

    function handleSubmit() {
        history.push(`/services/cart`);
    }
    useEffect(()=>{
        if(servicesList.length>0 ){
            
            servicesList[0].counter = 1;
            servicesList[0].addOn = true;
            
            addItem({
                id: servicesList[0].id,
                price_with_tax: servicesList[0].price_with_tax,
                image: configData.backendUrl + servicesList[0].service_icon,
                cgst: servicesList[0].cgst, sgst: servicesList[0].sgst,
                tax: (servicesList[0].cgst + servicesList[0].sgst),
                name: servicesList[0].service_name,
                price: servicesList[0].base_price,
                type:"service"
            }, 1)
            setServicesList(servicesList)
        }
    },[])

    const handleClick = ()=>{
        if(open){
            setOpen(false)
        }
    }
    const location = useLocation();
    console.log("currenturl:",location.pathname);
  
    return (
        <Grid item xs={12}>
         <Helmet>
        <title>Home Page our Geni app</title>
        <meta name="description" content="Some tags are vital for SEO. Others have little or no impact on rankings. Here's every type of meta tag you need to know about.The purpose of a meta description is to reflect the essence of a page, but with more details and context."/>        <meta name="theme-color" content="#008f68" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="http://example.com/" />



      </Helmet>
            {servicesList?.length > 0 ? servicesList.map((item, index: number) => (
                <Box className={classes.serviceSubCardBox} key={index}>
                    <Paper className={classes.serviceProductWrap}>
                        <Grid item container className={classes.categoryList}>
                            <Grid item md={8} sm={8} xs={12}>
                                <div className={classes.serviceItem}>
                                    <Box component="div" className={classes.serviceImage}>
                                        <img src={configData.backendUrl + item.service_icon} className={classes.serviceImage} alt="serviceImage" />
                                    </Box>
                                    <Box component="div" className={classes.serviceRightContent}>
                                        <Box component="div" className={classes.serviceTopItem}>
                                            <Typography className={classes.serviceTittle}>{item.slug}</Typography>
                                            <Typography className={classes.serviceRatingBox}>
                                                <span className={classes.mobile_rated_hide}>Rated</span>
                                                <span className={classes.ratingLabel}>{item.overall_rating}</span>
                                                <StarIcon className={classes.RatingWrapIcon} />
                                                Based on {item.no_of_views} reviews
                                            </Typography>
                                            <ul className={classes.serviceAmountCard}>
                                                <li>
                                                    Actual Amount
                                                    <b>
                                                    &#8377; {item.base_price}
                                                    </b>
                                                </li>
                                                {item.service_pricing.length>0 && item.service_pricing[0].hourly_rate != 0 &&
                                                    <li>
                                                        Turnaround Time
                                                        <b>
                                                            ₹{item.service_pricing.length>0 && item.service_pricing[0].hourly_rate == "0" ? "NA" : item.service_pricing[0].hourly_rate} / <span>Per Hour</span>
                                                        </b>
                                                    </li>
                                                }
                                            </ul>
                                        </Box>
                                    </Box>
                                </div>
                            </Grid>
                            <Grid item md={4} sm={4} xs={12} className={classes.serviceItem}>
                                <Box component="div" className={clsx(classes.serviceAddon , classes.viewMore)} >
                                    {(item.addOn) ?
                                        <ButtonGroup size="small" variant="text" aria-label="small outlined button group">
                                            <Button
                                                className={clsx(classes.button, classes.down)}
                                                onClick={() => {
                                                    updateItemQuantity(item.id, item.counter ? item.counter - 1 : 1);
                                                    handleClick()
                                                }}
                                            >-
                                            </Button >
                                            <Button disabled style={{ color: 'black' }}>{item.counter}</Button>
                                            <Button
                                                data-service={1}
                                                className={clsx(classes.button, classes.down)}
                                                onClick={() => {
                                                    addItem({
                                                        id: item.id,
                                                        price_with_tax: item.price_with_tax,
                                                        image: configData.backendUrl + item.service_icon,
                                                        cgst: item.cgst, sgst: item.sgst,
                                                        tax: (item.cgst + item.sgst),
                                                        name: item.service_name,
                                                        price: item.base_price,
                                                        type:"service"
                                                    }, 1);handleClick()
                                                }}
                                            >+
                                            </Button>
                                        </ButtonGroup>
                                        :
                                        <>
                                        
                                            <Link className={classes.addOnButton}
                                                onClick={() => {
                                                    addItem({
                                                        id: item.id,
                                                        name: item.service_name,
                                                        price_with_tax: item.price_with_tax,
                                                        image: configData.backendUrl + item.service_icon,
                                                        cgst: item.cgst, sgst: item.sgst,
                                                        tax: (item.cgst + item.sgst),
                                                        price: item.base_price,
                                                        type:"service"
                                                    }, 1)
                                                }}
                                            >
                                                Add
                                                <AddIcon className={classes.addOnButtonIcon} />
                                            </Link>
                                        </>
                                    }
                                    <a style={{cursor:"pointer"}} className={classes.viewMoreLinkTag} onClick={()=>handleID(item.id)} >View more <ChevronRightIcon className={classes.arrowRight} /></a>
                                </Box>

                                

                            </Grid>
                        </Grid>
                        <Grid item container>
                            <Grid item xs={12}>
                                <Box component="div" className={classes.serviceProduct}>
                                    <Box component="div" className={classes.serviceText}>
                                        {/* <Typography className={classes.serviceMoreText}>
                                            {item.summary}
                                        </Typography> */}
                                        {/* <Link className={classes.viewMoreLinkTag} component={RouterLink} to={`/services/sub/` + item.id} >View more <ChevronRightIcon className={classes.arrowRight} /></Link> */}
                                        {/* <a style={{cursor:"pointer"}} className={classes.viewMoreLinkTag} onClick={()=>handleID(item.id)} >View more <ChevronRightIcon className={classes.arrowRight} /></a> */}

                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                            
                            

                        
                    </Paper>
                </Box>
            ))
                :
                <Grid item xs={12} md={12} >
                    <Paper elevation={3} className={classes.tiles} style={{ width: '100%' }}>
                        <img src={Plumbing} className={classes.imgFluid} alt="Services" />
                        {/* <Typography className={classes.tileHeading}>No Services Available</Typography> */}
                        <Box className={classes.loder}>
                            <CircularProgress />
                        </Box>
                    </Paper>

                </Grid>
            }
            {!isEmpty ?
                <Paper className={classes.fixedCartFooter}>
                    <Typography style={{ fontWeight: 'bold', textAlign: 'center' }}>Total Addons : {totalItems} Total Price : {currencyCode.INR} {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(cartTotal)}
                        <Button className={classes.joinButton} onClick={() => { handleSubmit() }}>Continue</Button>
                    </Typography>
                </Paper>
                : null
            }

        </Grid>
    )
}
export default SubServiceCard