import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as api from '../../../services/api/serviceListing';
import ServiceProviderNotFound from '../../noDataFound/serviceProviderNotFound'
import configData from '../../../constants.json';
import MediaQuery from 'react-responsive'
import {
    Grid,
    Typography,
    Link,
    Box,
    Button,
    TextField,
    Container,
    Card,
    CardContent,
    InputBase,
    FormControl,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Select,
    MenuItem,
    Tooltip,
    TooltipProps
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Divider from '@material-ui/core/Divider';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import listStyle from "./listFieldStyles";
import './listfleldStyles.css';
import Phone from '@material-ui/icons/Phone';
import CheckIcon from '@material-ui/icons/Check';
import LocationImg from '../../../assets/img/location-img.png'
import PhoneImg from '../../../assets/img/phone-img.png'


const ServiceProviderList = forwardRef((props: any, ref) => {
    const classes = listStyle();
    const [serviceProvideList, setServiceProvideList] = useState<any>([]);
    const [filter, setFilter] = useState<any>(false)
    const [serviceCategories, setServiceCategories] = useState<any>([]);
    const [visibleList, setVisibleList] = useState<any>(5);
    const [searchValue, setSearchValue] = useState<any>();
    const [loder, setLoder] = useState<any>(false)
    // const [orderBy, setOrderBy] = useState<any>();
    // const [serviceId, setServiceId] = useState<any>();


    useEffect(() => {
        fetchServiceCategories();
        fetchProviders();

    }, [])
    useImperativeHandle(ref, () => ({
        fetchFilterProviders
    }));

    const fetchProviders = async () => {
        setLoder(true)
        api.fetchServiceListing()
            .then((response) => {
                setLoder(false)
                if (response && response.success) {
                    setServiceProvideList(response.data);
                }
            }, (error) => {
                console.log(error);
            })
    }

    const fetchServiceCategories = async () => {
        api.fetchServiceListingServiceList()
            .then((response) => {
                if (response && response.success) {
                    const dataList = response.data;
                    dataList.forEach(function (row, index) {
                        row.isActive = false;
                    });
                    setServiceCategories(dataList)
                }
            }, (error) => {
                console.log(error);
            })
    }

    const handleFilterVal = () => {
        if (searchValue) {
            const updatedList = serviceProvideList.filter(item => {
                return (
                    item.service_provider_name.toLowerCase().search(searchValue.toLowerCase()) !== -1
                );
            });
            setServiceProvideList(updatedList);
        }
        else {
            fetchProviders();
            setSearchValue(null)
        }
    }

    const handleFilter = () => {
        setFilter(!filter)
    }

    
    const handleCheck = (id) => {
        setServiceCategories((prevState) => {
            prevState.forEach((item) => {
                if (item.id === id) {
                    item.isActive = !item.isActive;
                }
            });
            return (
                [...prevState]
            )
        })
        let activeID = serviceCategories.filter((value) => value.isActive == true).map(({ id }) => id);
        var pairs = activeID.map(function (value) { return + encodeURIComponent(value) });
        var query_string = pairs.join(",");
        var serviceId = { serviceId: query_string, orderBy: "" }
        fetchFilterProviders(serviceId)

    }
    
    const fetchFilterProviders = (obj) => {
  
        setLoder(true)
        api.fetchFilterProvidersList(props.searchName, props.cityName, obj)
            .then((response) => {
                setLoder(false)
                if (response && response.success) {
                    setServiceProvideList(response.data);
                }
            }, (error) => {
                console.log(error);
            })
    }


    const clearSearch = () => {
        setSearchValue('')
        fetchProviders();
        fetchServiceCategories();
    }

    const handleSort = (orderBy): any => {
        var serviceId = { serviceId: '', orderBy: orderBy } 
        fetchFilterProviders(serviceId)

    }

    const toggleReviewClass = (reviewCount) => {
        var rclass = '';
        if (reviewCount >= 4) {
            rclass = 'green-box';
        }
        else if (reviewCount >= 3) {
            rclass = 'yellow-box';
        }
        else if (reviewCount >= 2) {
            rclass = 'red-box';
        }
        else if (reviewCount >= 1) {
            rclass = 'red-box';
        }

        return rclass;
    }
    function UnsafeComponent({ html, className }) {
        return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
    }

    return (
        <Container className={classes.serviceProviderListBox}>
            <Grid container direction="row" spacing={3}>
                <Grid item md={3} sm={4} xs={12}>
                    <Card variant="outlined" className={classes.cardBox}>
                        <div className={classes.cardHeader}>
                        <MediaQuery query='(min-width: 768px)'>
                             <Typography variant="h4" gutterBottom className={classes.cardTitle}>
                                Filters
                            </Typography>
                        </MediaQuery>
                        <MediaQuery query='(max-width: 768px)'>
                            <Button className={classes.cardTitle} onClick={handleFilter}> Filter </Button>
                        </MediaQuery>
                           
                            
                            <Button className={classes.cardTitleBtn} onClick={clearSearch}>Clear All</Button>
                        </div>
                        <MediaQuery query='(min-width: 768px)'>
                          <CardContent className={classes.cardBodyBox}>
                            <div className={classes.cardSearchBox}>
                                <InputBase
                                    placeholder="search provider"
                                    onChange={(e) => { setSearchValue(e.target.value) }}
                                    value={searchValue}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                                <Button fullWidth className={classes.searchButtonList} onClick={() => {handleFilterVal()}}>
                                    Search
                                </Button>
                            </div>
                            <div className={classes.cardServiceList}>
                                <h4 className={classes.serviceTitle}>Service Categories</h4>
                                <div className={classes.servicesCheckbox}>
                                    {serviceCategories?.length > 0 && serviceCategories.map((item, index) => (
                                        <FormControl component="fieldset" className={classes.formControlService}>
                                            <FormControlLabel
                                                key={index}
                                                control={<Checkbox name={item.title} color="primary" onClick={() => handleCheck(item.id)} checked={item.isActive} />}
                                                label={item.title}
                                            />
                                        </FormControl>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </MediaQuery>
                    <MediaQuery query='(max-width: 768px)'>
                        { (filter == true)
                            && <CardContent className={classes.cardBodyBox}>
                             <div className={classes.cardSearchBox}>
                                 <InputBase
                                     placeholder="search provider"
                                     onChange={(e) => { setSearchValue(e.target.value) }}
                                     value={searchValue}
                                     classes={{
                                         root: classes.inputRoot,
                                         input: classes.inputInput,
                                     }}
                                     inputProps={{ 'aria-label': 'search' }}
                                 />
                                 <Button fullWidth className={classes.searchButtonList} onClick={() => {handleFilterVal(); handleFilter();}}>
                                     Search
                                 </Button>
                             </div>
                             <div className={classes.cardServiceList}>
                                 <h4 className={classes.serviceTitle}>Service Categories</h4>
                                 <div className={classes.servicesCheckbox}>
                                     {serviceCategories?.length > 0 && serviceCategories.map((item, index) => (
                                         <FormControl component="fieldset" className={classes.formControlService}>
                                             <FormControlLabel
                                                 key={index}
                                                 control={<Checkbox name={item.title} color="primary" onClick={() => handleCheck(item.id)} checked={item.isActive} />}
                                                 label={item.title}
                                             />
                                         </FormControl>
                                     ))}
                                 </div>
                             </div>
                         </CardContent>
                        }
                    </MediaQuery>
                        
                    </Card>
                </Grid>
                {loder ?
                    <Box style={{ display: 'flex', margin: 'auto' }}>
                        <CircularProgress />
                    </Box>
                    :
                serviceProvideList.length>0?
                <Grid item md={9} sm={8} xs={12}>
                    <Grid container direction="row" spacing={3}>
                        <Grid item sm={6} xs={12}>
                            <h4 className={classes.serviceListHeading}>
                                The Following list are best service provider near you
                            </h4>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <div className={classes.sortByBox}>
                                <h4 className={classes.sortByTitle}>Sort</h4>
                                <FormControl required className={classes.formControlService}>
                                    <Select
                                        native
                                        // value={state.age}
                                        onChange={(e) => handleSort(e.target.value)}
                                        name="age"
                                        inputProps={{
                                            id: 'age-native-required',
                                        }}
                                        className="sort-by-select"
                                    >
                                        <option  >Popular</option>
                                        <option value={"recommended"}>Recommended</option>
                                        <option value={"rated"}>Highest Rated</option>
                                        <option value={"reviewed"}>Most Reviewed</option>
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>
                    </Grid>


                    {/* Services List Cards */}
                    <Grid container direction="row" spacing={3}>
                        {serviceProvideList?.length > 0 && serviceProvideList.slice(0, visibleList).map((value, index) => (
                            <Grid item sm={12} xs={12}>
                                <Grid container className="service-listing-card" spacing={3}>
                                    <Grid item md={4} xs={12}>
                                        <div className="service-provider-image">
                                            <img src={configData.backendUrl + value.photos} className={classes.imgFluid} alt="Provider Icons" />
                                        </div>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <Grid container className="service-listing-heads">
                                            <Grid item md={9} sm={12} xs={9}>
                                                <Box style={{ font: "normal normal bold 16px/24px 'Montserrat-Regular'" }}>
                                                    <Link className={classes.viewProfileButton}
                                                        component={RouterLink}
                                                        to={`/list/service-provider/${value.id}`}
                                                    >
                                                        {value.service_provider_name}
                                                    </Link>
                                                </Box>
                                                <Box className={classes.RatingSection}>
                                                    <Tooltip
                                                        title={
                                                            <React.Fragment>
                                                                <h4>Test</h4>
                                                                <h4>Test</h4>
                                                            </React.Fragment>
                                                        }
                                                        arrow
                                                    >
                                                        <Rating
                                                            name="simple-controlled"
                                                            value={value.overall_rating}
                                                            readOnly
                                                        />
                                                    </Tooltip>
                                                    <span className={`rating-box ` + toggleReviewClass(value.overall_rating)}>{value.overall_rating}</span>
                                                    {/* <span className={`rating-box ` + toggleReviewClass('4')}>{4}</span> */}
                                                    <span className="review-counts">
                                                        {value.review_count} 
                                                        {/* <MediaQuery query='(min-width: 768px)'> Ratings </MediaQuery>  */}

                                                      {value.total_rating} Ratings & {value.total_review} Reviews
                                                        {/* {value.count}  */}
                                                    </span>
                                                </Box>
                                            </Grid>
                                            <Grid item md={3} sm={12} xs={3}>
                                                <Button
                                                    variant="outlined"
                                                    className="view-details-btn green-btn"
                                                    component={RouterLink} to={`/list/service-provider/${value.id}`}
                                                >
                                                    View Details
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Box className="services-contact-info">
                                            <ul>
                                                <li>
                                                    <img src={PhoneImg} className="business-location" />
                                                    <Typography>
                                                        {value.primary_contact_no}
                                                    </Typography>
                                                </li>
                                                <li>
                                                    <img src={LocationImg} className="business-location" />
                                                    <Typography>
                                                        {value.address}
                                                    </Typography>
                                                </li>
                                            </ul>
                                        </Box>
                                        <Box className="desc">

                                            <UnsafeComponent className={"desc"} html={value.business_information} />
                                        </Box>
                                        <Box className="service-offered">
                                            <div className="left-title">
                                                <h4>
                                                    <Phone className="business-location" style={{marginRight: '5px'}} />
                                                    Services Offered :
                                                </h4>
                                            </div>
                                            <div className="right-title">
                                                <ul>
                                                    {value.available_services.map((item) => (
                                                        <li>
                                                            <CheckIcon className="business-location" />
                                                            <span>{item.title}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </Box>
                                        <Box className={classes.providerDescriptionSection}>
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                marginBottom: '10px'
                                            }}>
                                                {/* <Tooltip title={objectToStribng(value.available_services)}placement="bottom" arrow>
                                                <Typography className="business-location">{
                                                    objectToStribng(value.available_services).substring(0,40)+'....'
                                                }
                                                </Typography>
                                            </Tooltip> */}
                                            </div>
                                        </Box>
                                    </Grid>
                                    <Divider style={{ border: "0.1px solid rgb(241 241 241)", width: '100%', marginTop: '20px' }} variant="fullWidth" />
                                </Grid>
                            </Grid>
                        ))
                            // :
                            // <Box style={{ display: 'flex',margin:'auto' }}>
                            //     <CircularProgress />
                            // </Box>
                            // <Grid item sm={12}>
                            //     <Typography style={{ fontFamily: "Montserrat-Regular", textAlign: 'center' }}>No Service Providers Found</Typography>
                            // </Grid>
                        }
                        {serviceProvideList && visibleList <= serviceProvideList.length ?
                            <>
                                <Button
                                    variant="outlined"
                                    color="default"
                                    style={{ font: "normal normal normal 16px/24px 'Montserrat-Regular'", margin: "0 auto" }}
                                    onClick={() => setVisibleList(visibleList + 5)}
                                >
                                    View More
                                </Button>
                            </>
                            :
                            null
                        }
                    </Grid>
                </Grid>
                :
                <ServiceProviderNotFound />
                }
            </Grid>
        </Container >
    )
})
export default ServiceProviderList