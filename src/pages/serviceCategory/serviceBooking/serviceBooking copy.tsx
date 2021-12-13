import {
    Grid,
    Typography,
    Button,
    Container,
    Box,
    Table,
    TableContainer,
    TableBody,
    TableRow,
    ButtonGroup,
    InputLabel, Snackbar, TextField, FormControl, FormHelperText, Input
} from '@material-ui/core';
import { GroupedButtons } from "../productList/productList"
import cleanKit from '../../../assets/img/cleaning-kit3.png';
import useStyles, { TableCell, theme } from './serviceBookingStyles';
import Percentage from '../../../assets/img/offer.svg';
import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import { useCart } from "react-use-cart";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import configData from "../../../constants.json";
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle'
import GoogleLocationInput from '../../../components/serviceCategory/serviceBookingLocationAutoComplete/serviceBookingLocationAutoComplete';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

const Products = [{
    id: "1001",
    name: "Avaon Mop Cleaning Bruch..",
    image: cleanKit,
    description: "this the product description",
    rating: '4.3',
    orginalPrice: "250",
    discountPrice: "100 ",
    viewsCount: '200',
}]

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const locationValue = { place_id: '', description: '' };

const autocompleteService = { current: null };

const ServiceBookingForm = () => {

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const classes = useStyles();
    const { totalItems, cartTotal } = useCart();
    const [userAlerts, sertuserAlerts] = React.useState(false);
    const [userAlertMesasage, setuserAlertMesasage] = React.useState('');
    const [statesList, setstatesList] = useState<any[]>([]);
    const [citiesList, setcitiesList] = useState<any[]>([]);
    const [countryList, setCountryList] = useState<any[]>([]);
    const [locationObject, setLocationobject] = useState({
        place_id: '',
        description: ''
    });

    const [addressList, setAddressList] = useState<any[]>([]);

    const [areaList, setAreaList] = useState<any[]>([]);
    

    const [value, setValue] = React.useState(countryList);
    const [inputValue, setInputValue] = React.useState('');

    const [statevalue, setStateValue] = React.useState(citiesList);
    const [stateInputValue, setStateInputValue] = React.useState('');

    const [cityvalue, setCityValue] = React.useState(statesList);
    const [cityInputValue, setCityInputValue] = React.useState('');

    const [areavalue, setAreaValue] = React.useState(areaList);
    const [areaInputValue, setAreaInputValue] = React.useState('');

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch(configData.coutriesApiUrl)
            const data = await res.json()
            setCountryList(data.data)
        }
        fetchAdresssList();
        fetchTasks();
        
    }, [])

    var adddressCountryInputValues = {};

    const fetchAdresssList = async () => {
        const res = await fetch(configData.getDeliveryAddessApiUrl + '' + localStorage.getItem('UserId'));
        const data = await res.json();
        data.data.forEach(function(row, index) {
            row.show_edit_option = false;
        });
        setAddressList(data.data);
    }
    
    //console.log(addressList);
    const initialFormData = Object.freeze({
        name: "",
        mobile_number: "",
        address_line_one: "",
        address_line_two: "",
        address_line_three: "",
        country: "",
        state: "",
        city: "",
        area_id: "",
        delivery_place: "",
        location: {},
    });

    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (event) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
    }

    const removeAlert = () => {
        sertuserAlerts(false);
    }

    const handleCountry = async (CountryNameString) => {

        if (CountryNameString != null) {
            updateFormData({
                ...formData,
                ['country']: CountryNameString.id
            });

            const res = await fetch(configData.statesApiUrl + '' + CountryNameString.id)
            const data = await res.json()
            setstatesList(data.data);
        }
    }

    const handleState = async (StateNameString) => {

        if (StateNameString != null) {
            updateFormData({
                ...formData,
                ['state']: StateNameString.id
            });

            const res = await fetch(configData.citiesApiUrl + '' + StateNameString.country_id + '/' + StateNameString.id)
            const data = await res.json()
            setcitiesList(data.data);
        }
    }

    const handleCity = async (CityNameString) => {

        if (CityNameString != null) {
            updateFormData({
                ...formData,
                ['city']: CityNameString.id
            });

            const res = await fetch(configData.areasApiUrl + '' + CityNameString.country_id + '/' + CityNameString.state_id + '/' + CityNameString.id);
            const data = await res.json()
            setAreaList(data.data);
        }
    }

    const handleAreas = async (AreaNameString) => {

        if (AreaNameString != null) {
            updateFormData({
                ...formData,
                ['area_id']: AreaNameString.id
            });

        }
    }

    const handleLocation = (LocationString) => {
        if (LocationString != null) {
            setLocationobject({
                ...locationObject,
                ['place_id']: LocationString.place_id ? LocationString.place_id : '',
                ['description']: LocationString.description ? LocationString.description : '',

            });

            updateFormData({
                ...formData,
                ['location']: locationObject
            });
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function toggleReminder(id) {
        setAddressList(
            addressList.map((task) =>
                task.id === id ? { ...task, show_edit_option: !task.show_edit_option } : task
            )
        )
    }


    const handleSubmit = async (event) => {

        const postData = {
            name: formData.name,
            user_id: localStorage.getItem('UserId'),
            address: formData.address_line_one + ' ' + formData.address_line_three + ' ' + formData.address_line_three,
            total_amount: cartTotal,
            paid_amount: 0,
            area_id: formData.area_id,
            country_id: formData.country,
            city_id: formData.city,
            state_id: formData.state,
            location: locationObject,
            phone: formData.mobile_number,
        };

        const res = await axios.post(configData.deliveryAddressApiUrl, postData);
        //console.log(res);
        if (res.data.success == true) {
            localStorage.setItem("user_delivery_address", res.data.data.address_id);
            sertuserAlerts(true);
            setuserAlertMesasage(res.data.message);
            handleClose();
            fetchAdresssList();
            window.location.reload();
        }
        else {
            sertuserAlerts(true);
            setuserAlertMesasage(res.data.message);
            handleClose();
            fetchAdresssList();
            window.location.reload();
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

            <Container maxWidth='lg' className={classes.cartWrapper}>
                <Grid item sm={12} className={classes.cartHeading}>
                    <Typography variant='h6' style={{ textAlign: 'left' }}>PAY YOUR SERVICE</Typography>
                </Grid>
                <Paper elevation={3} style={{ background: "#f6f6f6" }}>
                    <Grid container item xs={12} >
                        <Grid container item className={classes.cartContainer}>
                            <Grid item sm={12} className={classes.cartHeading}>
                                {addressList.map((address) => (
                                    <Accordion style={{ marginTop: '10px' }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-label="Expand"
                                            aria-controls={`address_section-${address.id}`}
                                            id={`address_section-${address.id}`}
                                        >
                                            <FormControlLabel
                                                aria-label="Acknowledge"
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                                control={<Checkbox />}
                                                label={<Typography>{address.name + ',' + address.phone}</Typography>}
                                            />
                                            
                                        </AccordionSummary>
                                        <AccordionDetails>
                                             
                                            <div style={{width:'100%'}}>
                                                <Grid container md={12}>
                                                    <Grid item md={12} style={{marginBottom:'20px'}}>
                                                        {address.show_edit_option ? 
                                                            <GoogleLocationInput textValidator={false} onChange={handleLocation} />  
                                                        :
                                                            <Typography style={{fontWeight:'bold'}}>Location : {JSON.parse(address.location)['description']}</Typography>
                                                        }
                                                    </Grid>
                                                    <Grid item md={6} style={{textAlign:'left',padding:'10px'}}>
                                                        {address.show_edit_option ? 
                                                            <FormControl className={classes.formControllGroup}>
                                                                <TextField
                                                                    value={address.name}
                                                                    variant="outlined"
                                                                    name="addres_name"
                                                                    className={classes.formControllFields}
                                                                />
                                                            </FormControl>
                                                        :
                                                            <Typography><span style={{fontWeight:'bold'}}>Name : </span>{address.name}</Typography>
                                                        }
                                                        {address.show_edit_option ? 
                                                            <FormControl className={classes.formControllGroup}>
                                                                <TextField
                                                                    value={address.address}
                                                                    variant="outlined"
                                                                    name="addres_name"
                                                                    className={classes.formControllFields}
                                                                />
                                                            </FormControl>
                                                        :
                                                            <Typography><span style={{fontWeight:'bold'}}>Address 1 : </span>{address.address}</Typography>
                                                         }
                                                        {address.show_edit_option ? 
                                                            <FormControl className={classes.formControllGroup}>
                                                                <TextField
                                                                value={address.address}
                                                                variant="outlined"
                                                                name="addres_name"
                                                                className={classes.formControllFields}
                                                                />
                                                            </FormControl>
                                                        :
                                                            <Typography><span style={{fontWeight:'bold'}}>Address 3 : </span>{address.address}</Typography>
                                                        }
                                                        {address.show_edit_option ? 
                                                            <FormControl className={classes.formControllGroup}>
                                                                <Autocomplete
                                                                    value={statevalue}
                                                                    onChange={(event, newValue) => {
                                                                        setStateValue(newValue);
                                                                        handleState(newValue);
                                                                    }}
                                                                    inputValue={stateInputValue}
                                                                    onInputChange={(event, newInputValue) => {
                                                                        setStateInputValue(newInputValue);
                                                                    }}
                                                                    id="city-states-demo"
                                                                    options={statesList}
                                                                    getOptionLabel={(option) => option.state_name}
                                                                    renderInput={(params) =>
                                                                        <TextField
                                                                            {...params}
                                                                            label="State"
                                                                            variant="outlined"
                                                                            value={address.states.state_name}
                                                                        />}
                                                                />
                                                            </FormControl>
                                                        :
                                                            <Typography><span style={{fontWeight:'bold'}}>State : </span>{address.states.state_name}</Typography>
                                                        }
                                                        {address.show_edit_option ? 
                                                            <FormControl className={classes.formControllGroup}>
                                                                <TextField
                                                                    value={address.areas.area_name}
                                                                    variant="outlined"
                                                                    name="addres_name"
                                                                    className={classes.formControllFields}
                                                                />
                                                            </FormControl>
                                                        :
                                                            <Typography><span style={{fontWeight:'bold'}}>Area : </span>{address.areas.area_name}</Typography>
                                                        }
                                                    </Grid>
                                                    <Grid item md={6} style={{textAlign:'left',padding:'10px'}}>
                                                        {address.show_edit_option ? 
                                                            <FormControl className={classes.formControllGroup}>
                                                                <TextField
                                                                    value={address.phone}
                                                                    variant="outlined"
                                                                    name="addres_name"
                                                                    className={classes.formControllFields}
                                                                />
                                                            </FormControl>
                                                        :
                                                            <Typography><span style={{fontWeight:'bold'}}>Phone : </span>{address.phone}</Typography>
                                                        }

                                                        {address.show_edit_option ? 
                                                            <FormControl className={classes.formControllGroup}>
                                                                <TextField
                                                                    value={address.address}
                                                                    variant="outlined"
                                                                    name="addres_name"
                                                                    className={classes.formControllFields}
                                                                />
                                                            </FormControl>
                                                        :
                                                            <Typography><span style={{fontWeight:'bold'}}>Address 2 : </span>{address.address}</Typography>
                                                        }

                                                        {address.show_edit_option ? 
                                                            <FormControl className={classes.formControllGroup}>
                                                              <Autocomplete
                                                                    value={value}
                                                                    onChange={(event, newValue) => {
                                                                        setValue(newValue);
                                                                        handleCountry(newValue);
                                                                    }}
                                                                    inputValue={inputValue}
                                                                    onInputChange={(event, newInputValue) => {
                                                                        setInputValue(newInputValue);
                                                                    }}
                                                                    options={countryList}
                                                                    getOptionLabel={(option) => option.country_name}
                                                                    renderInput={(params) =>
                                                                        <TextField
                                                                            {...params}
                                                                            label="Country"
                                                                            variant="outlined"
                                                                            value={address.country}
                                                                        />}
                                                                />
                                                            </FormControl>
                                                            
                                                        :
                                                            <Typography><span style={{fontWeight:'bold'}}>Country : </span>{address.countries.country_name}</Typography>
                                                        }

                                                        {address.show_edit_option ? 
                                                            <FormControl className={classes.formControllGroup}>
                                                                <TextField
                                                                    value={address.cities.city_name}
                                                                    variant="outlined"
                                                                    name="addres_name"
                                                                    className={classes.formControllFields}
                                                                />
                                                            </FormControl>
                                                        :
                                                            <Typography><span style={{fontWeight:'bold'}}>City : </span>{address.cities.city_name}</Typography>
                                                        }

                                                        {address.show_edit_option ? 
                                                            <FormControl className={classes.formControllGroup}>
                                                                <TextField
                                                                    value={address.type}
                                                                    variant="outlined"
                                                                    name="addres_name"
                                                                    className={classes.formControllFields}
                                                                />
                                                            </FormControl>
                                                        :
                                                            <Typography><span style={{fontWeight:'bold'}}>Type : </span>{address.type}</Typography>
                                                        }
                                                     </Grid>
                                                </Grid>
                                                <div  style={{width:'100%',marginBottom:'20px'}}>
                                                        <Button variant="outlined"  color="primary" style={{float:'right',marginLeft:'10px'}} onClick={()=>{toggleReminder(address.id)}}><DeleteIcon/></Button>
                                                        <Button variant="outlined"  color="primary" style={{float:'right'}} onClick={()=>{toggleReminder(address.id)}}><CreateIcon/></Button>
                                                </div>
                                            </div>
                                            
                                        </AccordionDetails>
                                    </Accordion>))
                                }
                                <Button variant="outlined" style={{marginTop:'10px'}} color="primary" onClick={handleClickOpen}>
                                    Add New Location
                                </Button>

                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <div>

                <Dialog open={open} onClose={handleClose} maxWidth="md" aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Location <a href="javscript:void(0);" onClick={handleClose}><CloseIcon style={{textAlign:'right',float:'right'}} /> </a></DialogTitle>

                    <DialogContent style={{textAlign:'center'}}>

                        <ValidatorForm onSubmit={handleSubmit} >
                            <Grid container item sm={12} spacing={2} >
                                <Grid item sm={12}>
                                    <FormControl className={classes.formControllGroup}>
                                        <GoogleLocationInput textValidator={true} onChange={handleLocation} />
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl className={classes.formControllGroup}>
                                        <TextValidator
                                            variant="outlined"
                                            onChange={handleChange}
                                            name="name"
                                            label="Name"
                                            className={classes.formControllFields}
                                            value={formData.name}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControllGroup}>
                                        <TextValidator
                                            variant="outlined"
                                            onChange={handleChange}
                                            name="address_line_one"
                                            label="Address line 1"
                                            className={classes.formControllFields}
                                            value={formData.address_line_one}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControllGroup}>
                                        <TextValidator
                                            variant="outlined"
                                            onChange={handleChange}
                                            name="address_line_three"
                                            label="Address line 3"
                                            className={classes.formControllFields}
                                            value={formData.address_line_three}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControllGroup}>
                                        <Autocomplete
                                            value={statevalue}
                                            onChange={(event, newValue) => {
                                                setStateValue(newValue);
                                                handleState(newValue);
                                            }}
                                            inputValue={stateInputValue}
                                            onInputChange={(event, newInputValue) => {
                                                setStateInputValue(newInputValue);
                                            }}
                                            id="city-states-demo"
                                            options={statesList}
                                            getOptionLabel={(option) => option.state_name}
                                            renderInput={(params) =>
                                                <TextValidator
                                                    {...params}
                                                    label="State"
                                                    variant="outlined"
                                                    name="state"
                                                    id="state"
                                                    value={formData.state}
                                                    validators={['required']}
                                                    errorMessages={['this field is required']}
                                                />}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControllGroup}>
                                        <Autocomplete
                                            value={areavalue}
                                            onChange={(event, newValue) => {
                                                setAreaValue(newValue);
                                                handleAreas(newValue);
                                            }}
                                            inputValue={areaInputValue}
                                            onInputChange={(event, newInputValue) => {
                                                setAreaInputValue(newInputValue);
                                            }}
                                            id="area-states-demo"
                                            options={areaList}
                                            getOptionLabel={(option) => option.area_name}
                                            renderInput={(params) =>
                                                <TextValidator
                                                    {...params}
                                                    label="Area"
                                                    variant="outlined"
                                                    name="area_id"
                                                    id="area_id"
                                                    value={formData.area_id}
                                                    validators={['required']}
                                                    errorMessages={['this field is required']}
                                                />}
                                        />
                                    </FormControl>

                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl className={classes.formControllGroup}>
                                        <TextValidator
                                            variant="outlined"
                                            onChange={handleChange}
                                            name="mobile_number"
                                            label="Mobile number"
                                            type="number"
                                            className={classes.formControllFields}
                                            value={formData.mobile_number}
                                            validators={['required', 'minNumber:7']}
                                            errorMessages={['this field is required', 'Please enter a valid phone number', 'Please enter a valid phone number']}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControllGroup}>
                                        <TextValidator
                                            variant="outlined"
                                            onChange={handleChange}
                                            name="address_line_two"
                                            label="Address line 2"
                                            className={classes.formControllFields}
                                            value={formData.address_line_two}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControllGroup}>
                                        <Autocomplete
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                                handleCountry(newValue);
                                            }}
                                            inputValue={inputValue}
                                            onInputChange={(event, newInputValue) => {
                                                setInputValue(newInputValue);
                                            }}
                                            id="controllable-states-demo"
                                            options={countryList}
                                            getOptionLabel={(option) => option.country_name}
                                            renderInput={(params) =>
                                                <TextValidator
                                                    {...params}
                                                    label="Country"
                                                    variant="outlined"
                                                    name="country"
                                                    id="country"
                                                    value={formData.country}
                                                    validators={['required']}
                                                    errorMessages={['this field is required']}
                                                />}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControllGroup}>
                                        <Autocomplete
                                            value={cityvalue}
                                            onChange={(event, newValue) => {
                                                setCityValue(newValue);
                                                handleCity(newValue);
                                            }}
                                            inputValue={cityInputValue}
                                            onInputChange={(event, newInputValue) => {
                                                setCityInputValue(newInputValue);
                                            }}
                                            id="city-city-demo"
                                            options={citiesList}
                                            getOptionLabel={(option) => option.city_name}
                                            renderInput={(params) =>
                                                <TextValidator
                                                    {...params}
                                                    label="City"
                                                    variant="outlined"
                                                    name="city"
                                                    id="city"
                                                    value={formData.city}
                                                    validators={['required']}
                                                    errorMessages={['this field is required']}
                                                />}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControllGroup}>
                                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                            <FormControlLabel
                                                value="Home"
                                                name="delivery_place"
                                                onChange={handleChange}
                                                control={<Radio color="primary" required />}
                                                label="Home"
                                                labelPlacement="start"
                                            />
                                            <FormControlLabel
                                                value="Office"
                                                name="delivery_place"
                                                onChange={handleChange}
                                                control={<Radio color="primary" required />}
                                                label="Office"
                                                labelPlacement="start"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button className={classes.payButton} type="submit">Save Address</Button>
                            <Snackbar open={userAlerts} onClose={removeAlert}>
                                <Alert onClose={removeAlert} severity="warning">
                                    {userAlertMesasage}
                                </Alert>
                            </Snackbar>
                        </ValidatorForm>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default ServiceBookingForm;