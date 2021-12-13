import React, { useEffect, useState, useRef } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    Box,
    Grid,
    Typography,
    Container,
    Button,
    InputBase,
    Link,
    TextField
} from '@material-ui/core';
import AOS from 'aos';
import "aos/dist/aos.css";
import categoryHomeStyles from "./serviceProviderStyles";
import ListFields from '../../../components/list/serviceProvider/listFields';
import ServiceProviderList from '../../../components/list/serviceProvider/serviceProviderList';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import * as api from '../../../services/api/serviceListing';
import clsx from 'clsx';

const CategoryHome = (props: any) => {
    const childRef = useRef<any>();
    const classes = categoryHomeStyles();
    const [areaList, setAreaList] = useState<any>();
    const [searchName, setSearchName] = useState<string>()
    const [cityName, setCityName] = useState<any>()
    const [serviceInputValue, setServiceInputValue] = useState<any>('');
    const [loder, setLoder] = useState(false)



    useEffect(() => {
        AOS.init({ duration: 3000 })
        fetchAreasList();
    }, [])

    const fetchAreasList = async () => {
        setLoder(true)
        api.fetchAreasList()
            .then((response) => {
                setLoder(false)
                if (response && response.success) {
                    console.log("Area list : ", response.data);
                    setAreaList(response.data);
                    setLoder(false)
                }
            }, (error) => {
                console.log(error);
            })
    }

    return (
        <>
            {loder ?
                <Box className='loder'>
                    <CircularProgress />
                </Box>
                :
                areaList ?
                    <Grid container justify="center">
                        <Grid item container>
                            <Grid item sm={12} xs={12}>
                                <Grid item className={classes.banner}>
                                    <Box component='div' className={classes.container}>
                                        <Box className={classes.headings} zIndex="modal">
                                            <Typography className={classes.title}>
                                                The Best Local Business Directory and Listing site in India
                                            </Typography>
                                            <Typography className={classes.description}>
                                                Find any product or service You are looking for
                                            </Typography>
                                        </Box>
                                        <Grid item container justify="center">
                                            <Grid item sm={8} md={6} xs={9}>
                                                <Box className={classes.searchBox}>
                                                    <div className={classes.search}>
                                                        <InputBase
                                                            placeholder="What are you looking for?"
                                                            onChange={(e) => setSearchName(e.target.value)}
                                                            classes={{
                                                                root: classes.inputRoot,
                                                                input: classes.inputInput,
                                                            }}
                                                            inputProps={{ 'aria-label': 'search' }}
                                                        />
                                                    </div>
                                                    <div className={clsx(classes.search, classes.location_mobileView)}>
                                                        <div className={classes.searchIcon}>
                                                            <RoomIcon />
                                                        </div>
                                                        <Autocomplete
                                                            id="combo-box-demo"
                                                            value={areaList}
                                                            options={areaList}
                                                            className="banner-dropdown-search"
                                                            onChange={(event, newValue) => setCityName(newValue)}
                                                            getOptionLabel={(option: any) =>
                                                                option.area_name ? option.area_name + ', ' +
                                                                    option.city_info.city_name + ', ' +
                                                                    option.state_info.state_name + ', ' +
                                                                    option.country_info.country_name : ''
                                                            }
                                                            inputValue={serviceInputValue}
                                                            onInputChange={(event, newInputValue) => {
                                                                setServiceInputValue(newInputValue);

                                                            }}
                                                            renderInput={(params) =>
                                                                <TextField
                                                                    {...params}
                                                                    label="Combo box"
                                                                    variant="outlined"
                                                                    id="service"
                                                                />}
                                                        />
                                                        {/* <InputBase
                                                placeholder="Search your City"
                                                classes={{
                                                    root: classes.inputRoot,
                                                    input: classes.inputInput,
                                                }}
                                                inputProps={{ 'aria-label': 'search' }}
                                            /> */}
                                                    </div>
                                                    <Button fullWidth className={classes.searchButton}>
                                                        <SearchIcon style={{ color: "#fff" }} onClick={() => childRef.current.fetchFilterProviders()} />
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item sm={12} className={classes.breadCrumbBox}>
                                <Container>
                                    <Grid container direction="row">
                                        <Grid item sm={12} xs={12}>
                                            <Breadcrumbs separator="/" aria-label="breadcrumb" className={classes.breadcrumb}>
                                                <Link className={classes.breadCrumblinks} component={RouterLink} to="/">
                                                    Home
                                                </Link>
                                                <Typography className={classes.breadCrumblinksActive}>Service Provider Listing</Typography>
                                            </Breadcrumbs>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Grid>
                            <Grid item sm={12}>
                                <Container>
                                    {/* <ListFields /> */}
                                    <ServiceProviderList
                                        searchName={searchName}
                                        cityName={cityName}
                                        ref={childRef}
                                    />
                                </Container>
                            </Grid>
                        </Grid>
                    </Grid>
                    :
                    <Box className='loder'>
                        <Typography variant='h4'>No services found</Typography>
                    </Box>
                }
        </>
    )
}
export default CategoryHome;