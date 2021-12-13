import React, { useEffect, useState } from 'react';
import { Grid, Typography, Link, Box, Button, TextField, Container } from '@material-ui/core'
import listStyle from "./listFieldStyles";
import configData from "../../../constants.json";
import { Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as api from '../../../services/api/serviceListing';
import Rating from '@material-ui/lab/Rating';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Icon } from '@iconify/react';
import bxsFilterAlt from '@iconify-icons/bx/bxs-filter-alt';
import './listfleldStyles.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowDown from '../../../assets/img/arrow_down.png';
import ArrowUp from '../../../assets/img/arrow_up.png';
import Phone from '@material-ui/icons/Phone';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';


const ListFields = () => {
    const classes = listStyle();
    const [visible, setVisible] = useState(3);
    const [tasks, setTasks] = useState<any>([]);
    const [areaList, setAreaList] = useState<any[]>([]);
    const [serviceLists, setSeviceLists] = useState<any[]>([]);
    const [value, setValue] = React.useState(areaList);
    const [inputValue, setInputValue] = React.useState('');

    const fetchProviders = async () => {

        api.fetchServiceListing()
            .then((response) => {
                if (response && response.success) {
                    setTasks(response.data);
                }
            }, (error) => {
                console.log(error);
            })
    }

    const fetchServiceLists = async () => {
        api.fetchServiceListingServiceList()
            .then((response) => {

                if (response && response.success) {
                    const dataList = response.data;
                    dataList.forEach(function (row, index) {
                        row.isActive = false;
                    });
                    setSeviceLists(response.data);
                }
            }, (error) => {
                console.log(error);
            })
    }

    function toggleActice(id) {
        let newdataList = serviceLists;
        newdataList.forEach(function (row, index) {
            if (row.id == id) {
                row.isActive = true;
            }
            else {
                row.isActive = false;
            }

        });
    }

    const fetchAreasList = async () => {
        api.fetchAreasList()
            .then((response) => {

                if (response && response.success) {

                    setAreaList(response.data);
                }
            }, (error) => {
                console.log(error);
            })
    }

    const showMore = () => {
        setVisible(prevValue => prevValue + 3)
    }
    const handleFilterVal = (val) => {
        if (val) {
            const updatedList = tasks.filter(item => {
                return (
                    item.service_provider_name.toLowerCase().search(val.toLowerCase()) !== -1
                );
            });
            setTasks(updatedList);
        }
        else {
            fetchProviders();
        }
    }

    const ServiceFilter = async (ServiceId) => {
        api.fetchServiceListingByService(ServiceId)
            .then((response) => {
                if (response && response.success) {
                    setTasks(response.data);
                }
            }, (error) => {
                console.log(error);
            })
    }

    const PopulartiySort = () => {
        const newList = [...tasks].sort((a, b) => {
            return b.count - a.count;
        });
        setTasks(newList);
    }

    const RatingSort = () => {
        const newList = [...tasks].sort((a, b) => {
            return b.overall_rating - a.overall_rating;
        });
        setTasks(newList);
    }

    const toggleReviewClass = (reviewCount) =>{
        var rclass = '';
        if(reviewCount >= 4)
        {
            rclass = 'green-box';
        }
        else if(reviewCount >= 3)
        {
            rclass = 'yellow-box';
        }
        else if(reviewCount >= 2)
        {
            rclass = 'red-box';
        }
        else if(reviewCount >= 1)
        {
            rclass = 'red-box';
        }

        return rclass;
    }

    const categoryFilter = (subCat) => {
        if (subCat != null) {
            const updatedList = tasks.filter((item, index) => {
                return (
                    //console.log(item.avilable_services)
                    item.area_id == subCat.id
                );
            });
            setTasks(updatedList);
        }
        else {
            fetchProviders();
        }
    }
    const isPrime = num => {
        for (let i = 2; i < num; i++)
            if (num % i === 0) return false;
        return num > 1;
    }
    const isOdd = (num) => { return num % 2; }
    const getBackGroundColor = (num) => {
        let color = '#f8f8f8';
        if (isOdd(num)) color = '#f8f8f8' //even
        else color = '#ffff' //odd
        // if(isPrime(num)) color = 'orange' //prime 
        return color;
    }

    const objectToStribng = (ObjectString) => {
        return Array.prototype.map.call(ObjectString, function(item) { return item.title; }).join(",");
    }


    useEffect(() => {
        api.createAccessLog();
        fetchProviders();
        fetchAreasList();
        fetchServiceLists();
    }, []);

    return (
        <Container maxWidth={false}>
            <Grid container direction="row" spacing={3}>
                <Grid item sm={12} xs={12}>
                    <Breadcrumbs separator="/" aria-label="breadcrumb" className={classes.breadcrumb}>
                        <Link className={classes.breadCrumblinks} component={RouterLink} to="/">
                            Home
                        </Link>
                        <Typography className={classes.breadCrumblinksActive}>Service Provider Listing</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid md={3} xs={12}>
                    <Grid container className={classes.sorybySection} spacing={0}>
                        <Grid item md={12} xs={12}>
                            <div className={classes.brdULSection}>
                                <div className={classes.sortbyresult}>
                                    <Link>SORT RESULTS BY</Link>
                                </div>
                                <div className={classes.brdUL}>
                                    POPULARITY
                                </div>
                                {/* <Icon width="100px" height="100px" icon={bxsRightArrow} /> */}
                            </div>
                        </Grid>
                        <Grid item md={12} xs={12} className="combo-box-demo">
                            <label className={classes.filterLabel}><Icon icon={bxsFilterAlt} className={classes.filterLabelIcon} />Filter By Area </label>
                            <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                    categoryFilter(newValue);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                style={{ marginTop: '10px' }}
                                id="combo-box-demo"
                                options={areaList}
                                disableCloseOnSelect={true}
                                disableClearable={true}
                                getOptionLabel={(option) => option.area_name ? option.area_name + ', ' + option.city_info.city_name + ', ' + option.state_info.state_name + ', ' + option.country_info.country_name : ''}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        InputProps={{ ...params.InputProps, startAdornment: <InputAdornment position="end"><LocationOnIcon fontSize="small" /></InputAdornment> }}
                                        variant="outlined"
                                        placeholder="Filter By Area"
                                    />}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <label className={classes.filterLabel}><Icon icon={bxsFilterAlt} className={classes.filterLabelIcon} />Filter By Services</label>
                            <ButtonGroup
                                orientation="vertical"
                                color="primary"
                                fullWidth
                                className={classes.buttonGroup}
                                aria-label="vertical outlined primary button group"
                            >
                                {serviceLists.map((value, index) => (
                                    <Button className="buttonGroupList" style={{ backgroundColor: value.isActive ? '#219e89' : getBackGroundColor(index), color: value.isActive ? '#ffff' : 'inherit' }} fullWidth variant="outlined" color="primary" onClick={() => { ServiceFilter(value.id); toggleActice(value.id); }}>
                                        <Box display="inline-flex"  >

                                            {value.photo ?
                                                <div className={classes.serviceIcon}>
                                                    <img src={configData.backendUrl + value.photo} alt="service icons" />
                                                </div>
                                                : ''
                                            }
                                            <div
                                                className={value.photo ? 'service-title' : ''}
                                            >
                                                {value.title}
                                            </div>
                                        </Box>
                                    </Button>
                                ))
                                }
                            </ButtonGroup>
                        </Grid>
                        <Grid item md={12}>
                            <Box textAlign="center">
                                <Button size="small" className={classes.popularitybutton} onClick={fetchProviders}>Clear Filter</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid md={9} xs={12}>
                    <Grid container spacing={2} justify="center">
                        <Grid item md={8} xs={12}>
                            <TextField
                                placeholder="Service Provider Search"
                                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon style={{color:"#219887"}} /></InputAdornment> }}
                                fullWidth onChange={(e) => { handleFilterVal(e.target.value) }}
                            />
                        </Grid>
                        <Grid item md={2}>
                            <Button fullWidth className={classes.popularitybutton} onClick={PopulartiySort}>Popularity&nbsp;<img src={ArrowDown} alt="arrow-down" /><img src={ArrowUp} alt="arrow-up" /></Button>
                        </Grid>
                        <Grid item md={2}>
                            <Button fullWidth className={classes.popularitybutton} onClick={RatingSort}>Top Rated&nbsp;<img src={ArrowDown} alt="arrow-down" /><img src={ArrowUp} alt="arrow-up" /></Button>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            {tasks && tasks.length > 0 ? tasks.slice(0, visible).map((value,index) => (
                                <Grid container spacing={3} className={index > 0 ? classes.margintop5 : ''}>

                                    <Grid item md={4} xs={12} className={classes.providerLogo}>
                                        <img src={'http://og.smartstorez.com/' + value.photos} className={classes.imgFluid} alt="Provider Icons" />
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <Box style={{ font: "normal normal bold 16px/24px 'Montserrat-Regular'" }}>
                                            <Link className={classes.viewProfileButton} component={RouterLink} to={`/list/service-provider/${value.id}`}>{value.service_provider_name}</Link>
                                        </Box>
                                        <Box className={classes.RatingSection}>
                                            <span className={`rating-box `+toggleReviewClass(value.overall_rating)}>{value.overall_rating}</span>
                                            <Rating
                                                name="simple-controlled"
                                                value={value.overall_rating}
                                            />
                                            <span className="review-counts">{value.review_count} Reviews | {value.count} Views</span>
                                        </Box>
                                        <Box className={classes.providerDescriptionSection}>
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                alignItems: 'center',
                                                marginBottom: '10px'
                                            }}>
                                                <Phone fontSize="small" className="business-location" />
                                                <Typography className="business-location-icon" style={{ fontWeight: 'bold' }}>{value.primary_contact_no}</Typography>
                                            </div>
                                        </Box>
                                        <Box className={classes.providerDescriptionSection}>
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                marginBottom: '10px'
                                            }}>
                                                <LocationOnIcon fontSize="small" style={{color:"#878787"}} />
                                                <Tooltip title={value.address}placement="bottom" arrow>
                                                    <Typography className="business-location">{value.address.substring(0,50)+'....'}</Typography>
                                                </Tooltip>
                                            </div>
                                        </Box>
                                        <Box className={classes.providerDescriptionSection}>
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                marginBottom: '10px'
                                            }}>
                                                <LocationOnIcon fontSize="small" style={{color:"#878787"}} />
                                                <Tooltip title={objectToStribng(value.available_services)}placement="bottom" arrow>
                                                    <Typography className="business-location">{
                                                        objectToStribng(value.available_services).substring(0,40)+'....'
                                                    }
                                                    </Typography>
                                                </Tooltip>
                                            </div>
                                        </Box>
                                        <Button variant="outlined" className={classes.viewDetailsButton} component={RouterLink} to={`/list/service-provider/${value.id}`}> View Details </Button>
                                    </Grid>
                                    <Divider style={{ border: "0.1px solid rgb(241 241 241)", width: '100%', marginTop: '20px' }} variant="fullWidth" />

                                </Grid>))
                                :
                                <Grid item sm={12}>
                                    <Typography style={{ fontFamily: "Montserrat-Regular", textAlign: 'center' }}>No Service Providers Found</Typography>
                                </Grid>
                            }
                            <Grid item md={12} style={{ textAlign: 'center' }}>
                            {tasks &&  visible <= tasks.length ?
                                <>
                                    <Button variant="outlined" color="default" style={{ font: "normal normal normal 16px/24px 'Montserrat-Regular'" }} onClick={showMore}>View More</Button>
                                </>
                                :
                                null
                            }
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
export default ListFields;