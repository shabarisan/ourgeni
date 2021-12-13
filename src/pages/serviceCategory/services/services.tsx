import { Box, Button, Grid, Paper, Typography, Link, ButtonGroup, Snackbar, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import serviceCategotryStyle from './serviceStyles';
import Plumbing from "../../../assets/img/cate-01.svg";
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import { useCart } from "react-use-cart";
import MuiAlert from '@material-ui/lab/Alert';
import {
  useParams,
  useHistory,
  Link as RouterLink,
} from "react-router-dom";
import configData from "../../../constants.json";
import axios from 'axios';
import ShowMoreText from 'react-show-more-text';
import * as currencyCode from '../../../currencyCode';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LocationPopupModal from '../../../components/main/locationPopupModal/locationPopupModal';

interface ParamTypes {
  service: string
}
const Services = () => {

  const [list, setList] = useState<any[]>([]);
  const [serviceInfo,setServiceInfo] = useState<any[]>([]);
  const history = useHistory();
  const { service } = useParams<ParamTypes>();
  const [openModal, setOpenModal] = React.useState(false);
  const [userAlerts, sertuserAlerts] = React.useState(false);
  const [userAlertMesasage, setuserAlertMesasage] = React.useState('');

  const { addItem, getItem, isEmpty, totalItems, items, updateItemQuantity, cartTotal } = useCart();
  const pathname = window.location.pathname;
  const segment = pathname.substring(pathname.lastIndexOf('/') + 1);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    fetchCategoryFromD();
    
    //console.log(items);
  }, [])

  const fetchCategoryFromD = () => {
    if (localStorage.getItem('CityID') && localStorage.getItem('CityID') !== null) {
      setOpenModal(false);
      const formData = { area_id: localStorage.getItem('CityID') };
      axios.post(configData.allpApiUrl + 'sub-services-by-area/' + service, formData)
        .then((res) => {
          if (res.data.success) {
            const result = res.data.data.service_list;
            setServiceInfo(res.data.data.service_info)
            
            result.forEach(function (row, index) {
              row.show_addOn_button = false;
              if (getItem(row.id)) {
                row.addOn_counter = JSON.parse(getItem(row.id).quantity);
                row.show_addOn_button = true;
              }
              else {
                row.addOn_counter = 0;
              }

            });
            setList(result);
          }

        }, (erorrs) => {
          console.log(erorrs);
        });
    }
    else {
      setOpenModal(true);
    }
  }

  function updateCart(serv_id) {
    items.forEach(function (row, index) {
      if (row.id == serv_id) {
        updateItemQuantity(row.id, row.quantity ? row.quantity - 1 : 1);
      }
    });
  }

 // const [state, setState] = useState({ counter: 1 });

  const handleIncrement = (service_id) => {
    setList(
      list.map((task) =>
        task.id === service_id ? { ...task, addOn_counter: task.addOn_counter + 1 } : task
      )
    )
  };

  const handleDecrement = (service_id) => {
    setList(
      list.map((task) =>
        task.id === service_id ? { ...task, addOn_counter: task.addOn_counter - 1 < 0 ? 0 : task.addOn_counter - 1 } : task, toggleReminder(service_id)
      )
    )
  };

  function toggleReminder(id) {
    setList(
      list.map((task) =>
        task.id === id ? { ...task, show_addOn_button: !task.show_addOn_button, addOn_counter: 1 } : task
      )
    )
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function removeAlert() {
    sertuserAlerts(false);
  }

  function handleSubmit() {
    history.push(`/services/cart`);
  }


  const showMore = () => {
    setVisible(prevValue => prevValue + 3)
  }



  const classes = serviceCategotryStyle();
  return (
    <Grid container>
      <Grid item xs={12} className={classes.serviceCategoryBanner}>
        <Box component='div' className={classes.container}>
          <Box className={classes.headings} zIndex="modal">
            <Typography className={classes.title} variant='h4'> A nice section heading goes here</Typography>
            <Typography className={classes.description} > Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</Typography>
          </Box>

        </Box>
      </Grid>
      <Container >
        <Box className={classes.serviceContainer}>

          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.breadcrumb}>
            <Link className={classes.breadCrumblinks} component={RouterLink} to="/">
              Home
            </Link>
            <Link className={classes.breadCrumblinks} component={RouterLink} to="/services">
              Services
            </Link>
            {serviceInfo && serviceInfo.length > 0 ? serviceInfo.map((service_info) => (
              <Typography className={classes.breadCrumblinksActive}>{service_info.service_name ? service_info.service_name : 'NA'}</Typography>
            )):
              null
            }
          </Breadcrumbs>
        </Box>


        <Grid item xs={12} className={classes.serviceMainWrap}>
          <Box >
            <Typography className={classes.locationButton}><Button variant="outlined" onClick={() => { setOpenModal(true); console.log(openModal); }}>Change Location</Button></Typography>
          </Box>
          <Box className={classes.serviceContainer}>

            <Paper className={classes.serviceProductWrap}>

              <Grid item container className={classes.categoryList} spacing={3}>
              
                {list && list.length > 0 ? list.slice(0, visible).map((service) =>  (
                  <Grid item md={12} lg={12} xs={12} className={classes.serviceItem} key={list.indexOf(service)}>
                    <Box component="div" >

                      <Box component="div" className={classes.serviceTopItem}>
                        <Box component="div" className={classes.serviceTopTittle}>
                          <Typography className={classes.serviceTittle}>{service.service_name}</Typography>
                        </Box>
                        <Box component="div" className={classes.serviceAddon}>
                          {service.show_addOn_button > 0 ?
                            <ButtonGroup size="small" variant="text" aria-label="small outlined button group">
                              <Button onClick={() => { 
                                      handleIncrement(service.id); 
                                      addItem({ 
                                            id: service.id, 
                                            type:"service",
                                            name: service.service_name, 
                                            image : configData.backendUrl + service.service_icon,
                                            price: service.service_pricing[0].base_or_fixed_price ? service.service_pricing[0].base_or_fixed_price : 0,  
                                            description: service.summary, 
                                            price_with_tax: service.price_with_tax, 
                                            cgst: service.cgst, 
                                            sgst: service.sgst, 
                                            tax: (service.cgst + service.sgst), 
                                            addOnservices: service.get_addon_services, 
                                            add_on_flag: false, 
                                            addon_parent: 0, 
                                            addon_parent_nmae: '' }
                                          , 1); 
                                        }} className={clsx(classes.button, classes.up)}>+</Button>
                              <Button disabled style={{ color: 'black' }}>{service.addOn_counter}</Button>
                              <Button onClick={() => { handleDecrement(service.id); updateCart(service.id); }} data-service={service.id} className={clsx(classes.button, classes.down)}>-</Button>
                            </ButtonGroup>
                            :
                            <>
                              {service.service_providers.length > 0 ?
                                <Link className={classes.addOnButton} id={`add_on-${service.id}`} data-addon={service.id} onClick={() => { 
                                    toggleReminder(service.id); 
                                     addItem({ 
                                       id: service.id, 
                                       name: service.service_name, 
                                       type:"service",
                                       image : configData.backendUrl + service.service_icon,
                                       price: service.service_pricing[0].base_or_fixed_price ? service.service_pricing[0].base_or_fixed_price : 0, 
                                       description: service.summary, 
                                       price_with_tax: service.price_with_tax, 
                                       cgst: service.cgst, sgst: service.sgst, 
                                       tax: (service.cgst + service.sgst), 
                                       addOnservices: service.get_addon_services, 
                                       add_on_flag: false, 
                                       addon_parent: 0, 
                                       addon_parent_nmae: '' }
                                    , 1); 
                                  }}>Add On <AddIcon className={classes.addOnButtonIcon} /></Link>
                                :
                                null
                              }

                            </>
                          }
                        </Box>
                        <Box component="div" className={classes.serviceClear}></Box>
                      </Box>
                    </Box>
                    <Box component="div" className={classes.serviceProduct}>
                      <Box component="div" className={classes.serviceImage}>
                        <img src={configData.backendUrl + service.service_icon} className={classes.serviceImage} alt="serviceImage" />
                      </Box>
                      <Box component="div" className={classes.serviceText}>
                        {service.summary.length > 0 ?
                          <ShowMoreText
                            /* Default options */
                            lines={1}
                            more='Show more'
                            less='Show less'
                            className={classes.serviceDescription}
                            anchorClass='my-anchor-css-class'
                            expanded={false}
                            width={1024}
                          >
                            <Typography className={classes.serviceDescription}>{service.summary}</Typography>
                          </ShowMoreText>
                          :
                          <ShowMoreText
                            /* Default options */
                            lines={1}
                            more={<span>View more</span>}
                            less='View less'
                            className={classes.serviceDescription}
                            anchorClass='myancho-css-class'
                            expanded={false}
                            width={1024}
                          >
                            <Typography className={classes.serviceDescription}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                          </ShowMoreText>
                        }
                        <Box component="div" className={classes.servicePricing}>
                          <span className={classes.servicePrice}> 
                              {/* {currencyCode.INR} {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(service.base_price)} */}
                              {currencyCode.INR} {service.service_pricing[0] ? new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(service.service_pricing[0].base_or_fixed_price)+' ( Base Price )' : 'NA'} 
                              
                            </span>
                            {service.service_pricing[1] ? 
                              <>
                              <br />
                              <div style={{marginTop:'20px'}} >
                               <small style={{fontFamily: "Montserrat-Regular",fontWeight:500}}>Additionally {currencyCode.INR} {service.service_pricing[1].hourly_rate ? service.service_pricing[1].hourly_rate : null} will be charged for the extra time work</small>
                              </div>
                              </>
                            :
                            null
                           }
                          {service.service_providers.length == 0 ?
                            <Typography color="error" style={{ marginTop: '10px' }}>No Service Provider Available For This Service</Typography>
                            :
                            null
                          }
                        </Box>
                      </Box>
                    </Box>
                  </Grid>)) :
                  <Grid item xs={12} md={12} >
                    <Paper elevation={3} className={classes.tiles} style={{ width: '100%' }}>
                      <img src={Plumbing} className={classes.imgFluid} alt="Services" />
                      <Typography className={classes.tileHeading}>No Services Available</Typography>
                    </Paper>
                  </Grid>
                }
                <Grid item xl={12} md={12} >
                  {/* <Button className={classes.tileHeading} variant="outlined" size="small">Load More</Button> */}
                  {list && visible <= list.length ?
                    <>
                      <Button variant="outlined" color="default" style={{ font: "normal normal normal 16px/24px 'Montserrat-Regular'" }} onClick={showMore}>View More</Button>
                    </>
                    :
                    null
                  }
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Container>
      {!isEmpty ?
        <Paper className={classes.fixedCartFooter}>
          <Typography style={{ fontWeight: 'bold', textAlign: 'center' }}>Total Addons : {totalItems} Total Price : {currencyCode.INR} {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(cartTotal)}
            <Button className={classes.joinButton} onClick={() => { handleSubmit() }}>Continue</Button>
          </Typography>
        </Paper>
        : null
      }
      <Snackbar open={userAlerts} onClose={removeAlert}>
        <Alert onClose={removeAlert} severity="warning">
          {userAlertMesasage}
        </Alert>
      </Snackbar>
      {openModal ?
        <LocationPopupModal />
        :
        null
      }

    </Grid>

  )

}
export default Services;