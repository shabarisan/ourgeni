import { Box, Grid, Typography, Link, Button, Paper, Snackbar } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import React, { useEffect, useState } from 'react';
import useStyles from './deliveryAddressStyles';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import { TextField as FormikTextField, } from 'formik-material-ui';
import axios from 'axios';
import { useCart } from "react-use-cart";
import configData from "../../../constants.json"
import Alert from '@material-ui/lab/Alert';
import GoogleInputLocation from './googleInputLocation';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { useConfirm } from 'material-ui-confirm';
import { useHistory,useLocation } from "react-router-dom";
import * as deliveryAddressApi from '../../../services/api/deliveryAddress';
import CircularProgress from '@material-ui/core/CircularProgress';
import MediaQuery from 'react-responsive'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as currencyCode from '../../../currencyCode';


function MyAccount() {
    const classes = useStyles();
    const [alert, setAlert] = React.useState({ open: false, message: '', type: '' });
    const [errorsLocation, seterrorsLocation] = React.useState('');
    const confirm = useConfirm();
    const [editFormData, seteditFormData] = React.useState<any>([]);
    const { isEmpty, emptyCart , items} = useCart();
    const [showAddForm, setShowAddForm] = React.useState(false);
    const [addFormDisabled, setaddFormDisabled] = React.useState(false);
    const [showEditForm, setShowEditForm] = React.useState(false);
    const [showEditLocation, setShowEditLocation] = React.useState(false);
    const [loder, setLoder] = useState<any>(false)
    const location = useLocation<any>()

    const paymentFor = location.state?.paymentFor
    console.log("type",paymentFor)
    const [disablebutton, setdisablebutton] = React.useState(false);
    const history = useHistory();

    // const [countryList, setCountryList] = useState<any>([]);
    // const [stateList, setStateList] = useState<any>([]);
    // const [cityList, setCityList] = useState<any>([]);
    const [areaList, setAreaList] = useState<any>([]);

    const [addressList, setAddressList] = useState<any>([]);

    //const [value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

    //const [statevalue, setStateValue] = React.useState('');
    const [stateInputValue, setStateInputValue] = React.useState('');

    // const [cityvalue, setCityValue] = React.useState('');
    const [cityInputValue, setCityInputValue] = React.useState('');

    const [areavalue, setAreaValue] = React.useState(areaList);
    const [areaInputValue, setAreaInputValue] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [locationObject, setLocationobject] = useState({
        place_id: '',
        description: ''
    });
    const cartProduct=JSON.parse(localStorage.getItem('cartProduct') || '{}')
    const cartServices= JSON.parse(localStorage.getItem('cartServices') || '{}')
    const [companyTax, setCompanyTax] = React.useState(0);

    const [yupInitialFormData, updateyupInitialFormData] = React.useState({
        name: '',
        phone: '',
        location: locationObject,
        address: '',
        area_id: '',
        state_id: '',
        city_id: '',
        country_id: '',
        type: '',
        user_id: localStorage.getItem('UserId')
    });

    const toggleReminder = async (id) => {
        deliveryAddressApi.removeDeliveryAddress(id)
            .then((response) => {
                if (response.success) {
                    setAlert({ open: true, message: response.message, type: 'success' });
                    fetchDeliveryAddress();
                }
                else {
                    setAlert({ open: true, message: response.message, type: 'error' });
                    fetchDeliveryAddress();
                }
            }, (error) => {
                console.log(error)
            });

    }
    
    const handleIfProduct = () => {
       const checkData =  items.filter((item) => (
            item.type == "service"
        ))
        const data = checkData.length == 0 ? true : false ;
        return data;
    }
    var taxTotal = 0;
    var priceTotal = 0;
    var productPriceTotal= 0;
    var servicePriceTotal=0;

    cartProduct.forEach(function (ItemDetails, ItemIndes) {
        taxTotal += ItemDetails.price_with_tax - ItemDetails.price;
        if (ItemDetails.quantity) {
            productPriceTotal += (ItemDetails.price_with_tax * ItemDetails.quantity);
        }
        else {
            productPriceTotal += (ItemDetails.price_with_tax);
        }

    });
  

    cartServices.forEach(function (ItemDetails, ItemIndes) {
        taxTotal += ItemDetails.price_with_tax - ItemDetails.price;
        if (ItemDetails.quantity) {
            servicePriceTotal += (ItemDetails.price_with_tax * ItemDetails.quantity);
        }
        else {
            servicePriceTotal += (ItemDetails.price_with_tax);
        }

    });

    useEffect(() => {
        getTaxDatafromDb();

    }, [])

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

    const handleaddresSession = async (addressID, CityId) => {
        //console.log(localStorage.getItem("CityID")+'=>'+CityId);
        if (localStorage.getItem("CityID") == CityId) {
            localStorage.setItem("user_delivery_address", addressID);
            // const conditionCheck = handleIfProduct();
            var date = new Date ()
            
            if(paymentFor=='product'){
                var totalItems=0;
                cartProduct.forEach(element => {
                    totalItems += (element.quantity)
                });
                var totalUniqueItems=cartProduct.length
                const postData = {
                    user_id: localStorage.getItem('UserId'),
                    total_amount: ((productPriceTotal * companyTax / 100) + productPriceTotal).toFixed(2),
                    total_items: totalItems,
                    total_qty: totalUniqueItems,
                    payment_status: 'process',
                    gst_amount: currencyCode.TAX,
                    payment_method_id: 1,
                    booking_date: date.getFullYear() + "-"+date.getDate()+'-'+date.getMonth(),
                    booking_time: date.getHours() + ":"+date.getMinutes(),
                    shipping_address_id: localStorage.getItem("user_delivery_address"),
                    order_items: cartProduct,
                    transfor:"estore"
                };
                try {
                    const resp = await axios.post(configData.createOrderApiUrl, postData);
    
                    if (resp.data.success == true) {
                 
                        localStorage.setItem('ServiceOrderID', resp.data.data.order_id);
                        history.push(  {
                            pathname: `payment`,
                            state: {
                                paymentFor: paymentFor
                            }
                        });
                    }
                    else {
                        history.push('payment');
                    }
                } catch (err) {
                    console.error(err);
                }
            }else {
                history.push(  {
                    pathname: `service-schedule-booking`,
                    state: {
                        paymentFor: paymentFor
                    }
                });
              }
        }
       
        else {
            confirm({ description: 'Selected city and service provider city is not same the cart will be cleared, Are you sure you want to clear the cart?' })
                .then(() => { emptyCart(); localStorage.setItem("user_delivery_address", ''); history.push('/services') });
        }

        //localStorage.removeItem('user_delivery_address');
        // if (localStorage.getItem("user_delivery_address") == null || localStorage.getItem("user_delivery_address") == '') {
        //     localStorage.setItem("user_delivery_address", addressID);
        //     history.push('service-schedule-booking');
        // }
        // else {
        //     history.push('service-schedule-booking');
        // }
    }


    const fetchDeliveryAddress = () => {
        setLoder(true)
        deliveryAddressApi.fetchDeliveryAddres()
            .then((response) => {
                setLoder(false)
                if (response.success) {

                    setAddressList(response.data);
                    addressList.forEach((row, index) => {
                        row.showEditOption = false;
                    });
                }
            }, (error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (isEmpty) {
            history.push('/services');
        }
        fetchDeliveryAddress();
    }, [])

    const toggleEditForm = (addressData) => {
        seteditFormData(addressData);
        setInputValue(addressData.countries.country_name);
        setStateInputValue(addressData.states.state_name);
        setCityInputValue(addressData.cities.city_name);
        setAreaValue(addressData.areas.area_name);
        setAreaInputValue(addressData.areas.area_name);
        const obj = JSON.parse(addressData.location);
        setLocationobject({
            place_id: obj.place_id ? obj.place_id : '',
            description: obj.description ? obj.description : ''
        })
        setaddFormDisabled(!addFormDisabled);
        setShowEditForm(!showEditForm);
    }

    const { t, i18n } = useTranslation();

    const validationSchema = yup.object({
        name: yup
            .string()
            .required('First Name is required')
            .min(5, 'First name must be greater than 5 character')
            .max(100, 'First name must be less than 100 character'),
        phone: yup
            .string()
            .min(5, 'Last name must be greater than 5 character')
            .max(100, 'Last name must be less than 100 character')
            .required('Last Name is required'),
        area_id: yup
            .mixed()
            .required('Area Field is required'),
        city_id: yup
            .mixed()
            .required('City Field is required'),
        state_id: yup
            .mixed()
            .required('State Field is required'),
        country_id: yup
            .mixed()
            .required('Country Field is required'),
        address: yup
            .mixed()
            .required('Location Field is required'),
        type: yup
            .mixed()
            .required('Delivery Type Field is required'),
    })
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
   

    return (
        <Grid container>
            <Grid item sm={12} className={classes.ProfileCard}>
                <Box mb={2}>
                    <Button className={classes.addNewButton} variant="outlined" onClick={() => { setShowAddForm(!showAddForm) }} disabled={addFormDisabled}>Add New Location</Button>
                </Box>
                {showAddForm ?
                    <Paper elevation={1} style={{ marginBottom: '20px', padding: '20px' }}>
                        <Formik
                            initialValues={yupInitialFormData}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setStatus, setFieldError, resetForm }) => {
                                const addressPostData = {
                                    name: values.name,
                                    phone: values.phone,
                                    user_id: values.user_id,
                                    address: values.address,
                                    address_line_one: 'NA',
                                    address_line_two: 'NA',
                                    address_line_three: 'NA',
                                    total_amount: '0',
                                    paid_amount: '0',
                                    area_id: values.area_id,
                                    city_id: values.city_id,
                                    state_id: values.state_id,
                                    country_id: values.country_id,
                                    location: locationObject,
                                };

                                deliveryAddressApi.addDeliveryAddress(addressPostData).then()
                                    .then((response) => {
                                        if (response.success) {
                                            setAlert({ open: true, message: response.message, type: 'succcess' });
                                            setdisablebutton(true);
                                            setTimeout(function () {
                                                window.location.reload();
                                            }, 3000)
                                        }
                                        else {
                                            setAlert({ open: true, message: response.message, type: 'succcess' });
                                        }
                                    }, (error) => {
                                        console.log(error);
                                    })
                            }}
                        >
                            {({ touched, errors, setFieldValue, values, isValid, handleChange, handleBlur }) => (

                                <Form>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <GoogleInputLocation onChange={(loc) => {
                                                // getLocation(loc);
                                                // setFieldValue('location',loc ? loc.description : '');setFieldValue('address',loc ? loc.description : '');setFieldValue('place_id',loc ? loc.place_id : '');setFieldValue('description',loc ? loc.description : '')
                                                if (loc !== null) {
                                                    const plcaePostDat = new FormData;
                                                    plcaePostDat.append('placeid', loc.place_id);
                                                    axios.post(configData.allpApiUrl + 'get-location-details', plcaePostDat)
                                                        .then((response) => {
                                                            if (response.data.success) {
                                                                if (response.data.data.countryList) {
                                                                    setFieldValue('country_id', response.data.data.countryList[0].id);
                                                                    setInputValue(response.data.data.countryList[0].country_name);
                                                                }

                                                                if (response.data.data.stateList) {
                                                                    setFieldValue('state_id', response.data.data.stateList[0].id);
                                                                    setStateInputValue(response.data.data.stateList[0].state_name);
                                                                }

                                                                if (response.data.data.cityList) {
                                                                    setFieldValue('city_id', response.data.data.cityList[0].id);
                                                                    setCityInputValue(response.data.data.cityList[0].city_name);
                                                                }

                                                                if (response.data.data.areaList) {
                                                                    setAreaList(response.data.data.areaList);
                                                                }

                                                                seterrorsLocation('');
                                                                setdisablebutton(false);
                                                            }
                                                            else {
                                                                setdisablebutton(true);
                                                                seterrorsLocation(response.data.message);
                                                            }

                                                        }, (error) => {
                                                            console.log(error);
                                                        });

                                                    setLocationobject({
                                                        ...locationObject,
                                                        ['place_id']: loc ? loc.place_id : '',
                                                        ['description']: loc.description ? loc.description : '',

                                                    });

                                                    setFieldValue('address', loc ? loc.description : '');
                                                }
                                            }}
                                            />
                                            {errorsLocation ?
                                                <FormHelperText id="my-helper-text" error={true}>{errorsLocation}</FormHelperText>
                                                :
                                                null
                                            }
                                            {touched.address ?
                                                <FormHelperText id="my-helper-text" error={true}>{errors.address}</FormHelperText>
                                                :
                                                null
                                            }

                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>Name</label>
                                            <Field
                                                component={FormikTextField}
                                                variant="outlined"
                                                id="name"
                                                name="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>Phone</label>
                                            <Field
                                                component={FormikTextField}
                                                variant="outlined"
                                                id="phone"
                                                name="phone"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>Country</label>
                                            <Field
                                                component={FormikTextField}
                                                variant="outlined"
                                                id="country"
                                                name="country"
                                                value={inputValue}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                disabled
                                                fullWidth
                                            />
                                            {touched.country_id ?
                                                <FormHelperText id="my-helper-text" error={true}>{errors.country_id}</FormHelperText>
                                                :
                                                null
                                            }
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>State</label>
                                            <Field
                                                component={FormikTextField}
                                                variant="outlined"
                                                id="state"
                                                name="state"
                                                value={stateInputValue}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                disabled
                                                fullWidth
                                            />
                                            {touched.state_id ?
                                                <FormHelperText id="my-helper-text" error={true}>{errors.state_id}</FormHelperText>
                                                :
                                                null
                                            }
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>City</label>
                                            <Field
                                                component={FormikTextField}
                                                variant="outlined"
                                                id="city"
                                                name="city"
                                                value={cityInputValue}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                disabled
                                                fullWidth
                                            />
                                            {touched.city_id ?
                                                <FormHelperText id="my-helper-text" error={true}>{errors.city_id}</FormHelperText>
                                                :
                                                null
                                            }
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>Area</label>
                                            <Autocomplete
                                                value={areavalue}
                                                onChange={(event, newValue) => {
                                                    setAreaValue(newValue);
                                                    if (newValue !== null) {
                                                        setFieldValue('area_id', newValue.id);
                                                    }
                                                    else {
                                                        setFieldValue('area_id', '');
                                                    }
                                                }}
                                                inputValue={areaInputValue}
                                                onInputChange={(event, newInputValue) => {
                                                    setAreaInputValue(newInputValue);
                                                }}
                                                id="area-states-demo"
                                                options={areaList}
                                                getOptionLabel={(option) => option.area_name ? option.area_name : ''}
                                                renderInput={(params) =>
                                                    <Field
                                                        component={FormikTextField}
                                                        {...params}
                                                        variant="outlined"
                                                        name="area_id"
                                                        id="area_id"
                                                        value={values.area_id}
                                                    />}
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>Deliver To</label>
                                            <Box >
                                                <div style={{ marginTop: '10px' }} role="group" aria-labelledby="my-radio-group">
                                                    <label>
                                                        <Field type="radio" name="type" value="Home" />
                                                        Home
                                                    </label>
                                                    <label>
                                                        <Field type="radio" name="type" value="Office" />
                                                        Office
                                                    </label>
                                                    <label>
                                                        <Field type="radio" name="type" value="Other" />
                                                        Other
                                                    </label>
                                                </div>
                                                {touched.type ?
                                                    <FormHelperText id="my-helper-text" error={true}>{errors.type}</FormHelperText>
                                                    :
                                                    null
                                                }
                                            </Box>
                                        </Grid>

                                        <Grid item md={12} sm={12} xs={12} alignItems="center" style={{ textAlign: 'center' }}>
                                            <Button type="submit" disabled={disablebutton} className={classes.updateButton}>
                                                Add Location
                                            </Button>
                                            <Button onClick={() => { setShowAddForm(!showAddForm) }} className={classes.cancelButtton}>
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Paper>
                    :
                    null
                }

                {showEditForm ?
                    <Paper id="editForm" elevation={1} style={{ marginBottom: '20px', padding: '20px' }}>
                        <Formik
                            initialValues={{
                                name: editFormData.name ? editFormData.name : '',
                                phone: editFormData.phone ? editFormData.phone : '',
                                address_line_one: editFormData.address_line_one ? editFormData.address_line_one : '',
                                address_line_two: editFormData.address_line_two ? editFormData.address_line_two : '',
                                address_line_three: editFormData.address_line_three ? editFormData.address_line_three : '',
                                total_amount: editFormData.total_amount ? editFormData.total_amount : '0',
                                paid_amount: editFormData.paid_amount ? editFormData.paid_amount : '0',
                                location: locationObject,
                                address: editFormData.address ? editFormData.address : '',
                                area_id: editFormData.area_id ? editFormData.area_id : '',
                                state_id: editFormData.state_id ? editFormData.state_id : '',
                                city_id: editFormData.city_id ? editFormData.city_id : '',
                                country_id: editFormData.country_id ? editFormData.country_id : '',
                                type: editFormData.type ? editFormData.type : '',
                                address_id: editFormData.id,
                                user_id: localStorage.getItem('UserId')
                            }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setStatus, setFieldError }) => {
                                deliveryAddressApi.updateDeliveryAddress(values)
                                    .then((response) => {
                                        if (response.success) {
                                            setAlert({ open: true, message: response.message, type: 'succcess' });
                                            setdisablebutton(true);
                                            setTimeout(function () {
                                                window.location.reload();
                                            }, 3000)
                                        }
                                        else {
                                            setAlert({ open: true, message: response.message, type: 'succcess' });
                                        }

                                    }, (error) => {
                                        console.log(error);
                                    });
                            }}
                        >
                            {({ touched, errors, setFieldValue, values, isValid, handleChange, handleBlur }) => (

                                <Form>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>

                                            <GoogleInputLocation onChange={(loc) => {
                                                //getLocation(loc);setFieldValue('location',loc ? loc.description : '');setFieldValue('address',loc ? loc.description : '');setFieldValue('place_id',loc ? loc.place_id : '');setFieldValue('description',loc ? loc.description : '')
                                                if (loc !== null) {
                                                    const plcaePostDat = new FormData;
                                                    plcaePostDat.append('placeid', loc.place_id);
                                                    axios.post(configData.allpApiUrl + 'get-location-details', plcaePostDat)
                                                        .then((response) => {
                                                            if (response.data.success) {
                                                                if (response.data.data.countryList) {
                                                                    setFieldValue('country_id', response.data.data.countryList[0].id);
                                                                    setInputValue(response.data.data.countryList[0].country_name);
                                                                }

                                                                if (response.data.data.stateList) {
                                                                    setFieldValue('state_id', response.data.data.stateList[0].id);
                                                                    setStateInputValue(response.data.data.stateList[0].state_name);
                                                                }

                                                                if (response.data.data.cityList) {
                                                                    setFieldValue('city_id', response.data.data.cityList[0].id);
                                                                    setCityInputValue(response.data.data.cityList[0].city_name);
                                                                }

                                                                if (response.data.data.areaList) {
                                                                    setAreaList(response.data.data.areaList);
                                                                }

                                                                seterrorsLocation('');
                                                                setdisablebutton(false);
                                                            }
                                                            else {
                                                                setdisablebutton(true);
                                                                seterrorsLocation(response.data.message);
                                                            }

                                                        }, (error) => {
                                                            console.log(error);
                                                        });

                                                    setLocationobject({
                                                        ...locationObject,
                                                        ['place_id']: loc ? loc.place_id : '',
                                                        ['description']: loc.description ? loc.description : '',

                                                    });

                                                    setFieldValue('address', loc ? loc.description : '');
                                                }
                                            }}
                                            />
                                            {errorsLocation ?
                                                <FormHelperText id="my-helper-text" error={true}>{errorsLocation}</FormHelperText>
                                                :
                                                null
                                            }
                                            {touched.address ?
                                                <FormHelperText id="my-helper-text" error={true}>{errors.address}</FormHelperText>
                                                :
                                                null
                                            }
                                            <Box mt={2}>
                                                <Typography>{values.address}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>Name</label>
                                            <Field
                                                component={FormikTextField}
                                                variant="outlined"
                                                id="name"
                                                name="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>Phone</label>
                                            <Field
                                                component={FormikTextField}
                                                variant="outlined"
                                                id="phone"
                                                name="phone"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>Country</label>
                                            <Field
                                                component={FormikTextField}
                                                variant="outlined"
                                                id="country"
                                                name="country"
                                                value={inputValue}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                disabled
                                                fullWidth
                                            />
                                            {touched.country_id ?
                                                <FormHelperText id="my-helper-text" error={true}>{errors.country_id}</FormHelperText>
                                                :
                                                null
                                            }
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>State</label>
                                            <Field
                                                component={FormikTextField}
                                                variant="outlined"
                                                id="state"
                                                name="state"
                                                value={stateInputValue}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                disabled
                                                fullWidth
                                            />
                                            {touched.state_id ?
                                                <FormHelperText id="my-helper-text" error={true}>{errors.state_id}</FormHelperText>
                                                :
                                                null
                                            }
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>City</label>
                                            <Field
                                                component={FormikTextField}
                                                variant="outlined"
                                                id="city"
                                                name="city"
                                                value={cityInputValue}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                disabled
                                                fullWidth
                                            />
                                            {touched.city_id ?
                                                <FormHelperText id="my-helper-text" error={true}>{errors.city_id}</FormHelperText>
                                                :
                                                null
                                            }
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>Area</label>
                                            <Autocomplete
                                                value={areavalue}
                                                onChange={(event, newValue) => {
                                                    setAreaValue(newValue);
                                                    if (newValue !== null) {
                                                        setFieldValue('area_id', newValue.id);
                                                    }
                                                    else {
                                                        setFieldValue('area_id', '');
                                                    }
                                                }}
                                                inputValue={areaInputValue}
                                                onInputChange={(event, newInputValue) => {
                                                    setAreaInputValue(newInputValue);
                                                }}
                                                id="area-states-demo"
                                                options={areaList}
                                                getOptionLabel={(option) => option.area_name ? option.area_name : ''}
                                                renderInput={(params) =>
                                                    <Field
                                                        component={FormikTextField}
                                                        {...params}
                                                        variant="outlined"
                                                        name="area_id"
                                                        id="area_id"
                                                        value={values.area_id}
                                                    />}
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12}>
                                            <label>Deliver To</label>
                                            <Box >
                                                <div style={{ marginTop: '10px' }} role="group" aria-labelledby="my-radio-group">
                                                    <label>
                                                        <Field type="radio" name="type" value="Home" />
                                                        Home
                                                    </label>
                                                    <label>
                                                        <Field type="radio" name="type" value="Office" />
                                                        Office
                                                    </label>
                                                    <label>
                                                        <Field type="radio" name="type" value="Other" />
                                                        Other
                                                    </label>
                                                </div>
                                                {touched.type ?
                                                    <FormHelperText id="my-helper-text" error={true}>{errors.type}</FormHelperText>
                                                    :
                                                    null
                                                }
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} alignItems="center" style={{ textAlign: 'center' }}>
                                            <Button type="submit" disabled={disablebutton} className={classes.updateButton}>
                                                Update Location
                                            </Button>
                                            <Button className={classes.Cancelbutton} onClick={() => { toggleEditForm(editFormData); }}>
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Paper>
                    :
                    null
                }

                <Grid item sm={12}>
                    {
                        loder ?
                            <Box style={{ display: 'flex', margin: 'auto', alignItems: "center", justifyContent: "center" }}>
                                <CircularProgress />
                            </Box>
                            : addressList && addressList.length > 0 ? addressList.map((values) => (
                                <Paper elevation={1} style={{ marginBottom: '20px' }} key={values.id}>
                                    <Grid container>
                                        <Grid item sm={10}>
                                            <Box m={3}>
                                                <Typography className={classes.addressSectionContent}>{values.name}  <span style={{ fontWeight: 'bold', marginLeft: '20px' }}>{values.phone}</span></Typography>
                                            </Box>
                                            <Box m={3} lineHeight="30px">
                                                <Button variant="outlined" color="default">{values.type}</Button>
                                            </Box>
                                            <Box m={3} lineHeight="30px">
                                                <Typography className={classes.addressSectionContent}>{values.address}</Typography>
                                                <Typography className={classes.addressSectionContent}>{values.states.state_name}, {values.cities.city_name}</Typography>
                                                <Typography className={classes.addressSectionContent}>{values.countries.country_name}</Typography>
                                            </Box>

                                        </Grid>
                                        <Grid item sm={2}>
                                            <Box m={2}>
                                                <MediaQuery query='(min-width: 768px)'>
                                                    <Link href="#editForm" onClick={() => { toggleEditForm(values) }} className={classes.editButton}><CreateIcon style={{ marginRight: '20px' }} /></Link>
                                                    <Link className={classes.editButton} onClick={() => {
                                                        confirm({ description: 'Are you sure you want to remove this item' })
                                                        .then(() => { toggleReminder(values.id); })
                                                    }}>
                                                        <DeleteIcon />
                                                    </Link>
                                                </MediaQuery>
                                                <MediaQuery query='(max-width: 768px)'>
                                                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}><MoreHorizIcon /></Button>
                                                    <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorEl}
                                                        keepMounted
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleClose}
                                                    >
                                                        <MenuItem onClick={() => { toggleEditForm(values); handleClose(); }}><CreateIcon style={{ marginRight: '20px' }} /></MenuItem>
                                                        <MenuItem onClick={() => {
                                                            confirm({ description: 'Are you sure you want to remove this item' })
                                                            .then(() => { toggleReminder(values.id); }); handleClose();
                                                        }}> <DeleteIcon /></MenuItem>
 
                                                    </Menu>
                                                </MediaQuery>
                                            </Box>
                                        </Grid>
                                        <Grid item sm={12}>
                                            <Box m={3} lineHeight="30px" textAlign="center">
                                                <Button style={{ fontFamily: 'Montserrat' }} variant="outlined" color="primary" onClick={() => { handleaddresSession(values.id, values.areas.id) }}>Deliver To This Address</Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>))
                                :
                                <Paper elevation={1} style={{ marginBottom: '20px' }}>
                                    <Grid container>
                                        <Grid item sm={12}>
                                            <Box textAlign="center" p={3}>
                                                <Typography className={classes.addressSectionContent}>No Address Found</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                    }
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={alert.open}
                onClose={() => { setAlert({ open: false, message: '', type: '' }) }}
            >
                <Alert variant="filled" severity="success">
                    {alert.message}
                </Alert>
            </Snackbar>
        </Grid>
    )
}

export default MyAccount;