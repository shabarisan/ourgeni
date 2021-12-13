import React, { useEffect, useState } from 'react';
import configData from "../../../constants.json";
import {
    Box,
    Grid,
    Typography,
    Container,
    Button,
    Link,
    Card,
    CardContent
} from '@material-ui/core';
import AOS from 'aos';
import "aos/dist/aos.css";
import categoryHomeStyles from "./serviceProviderStyles";
import CircularProgress from '@material-ui/core/CircularProgress';
import ListDeatailsFields from '../../../components/list/serviceProvider/listDetailsFields';
import ProviderDetails from '../../../components/list/serviceProvider/providerDetails';
import * as api from '../../../services/api/serviceListing';
import './serviceProviderDetailsStyle.css';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link as RouterLink, useParams } from 'react-router-dom';

interface ParamTypes {
    service_id: string
}

const CategoryHome = (props: any) => {
    const classes = categoryHomeStyles();
    const { service_id } = useParams<ParamTypes>();
    const [providerData, setProviderData] = useState<any>()
    const [loder, setLoder] = useState(false)


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

    useEffect(() => {
        AOS.init({ duration: 3000 })
        fetchProvidersDetails()
    }, [service_id])


    const fetchProvidersDetails = async () => {
        setLoder(true)
        api.fetchServiceListingDetails(service_id)
            .then((response) => {
                setLoder(false)               
                if (response && response.success) {
                    setProviderData(response.data[0])
                    setLoder(false)
                }
            }, (err) => {
              
                console.log(err);
                
            })
    }

    return (
        <Grid container>
            {loder ?
                <Box className='loder'>
                    <CircularProgress />
                </Box>
            :
            providerData ?
                <>
                    <Grid item sm={12} xs={12}>
                        <Grid item className="provider-detail-banner"
                            style={{
                                backgroundImage: `url(${configData.backendUrl + providerData.photos})`,
                            }}
                        >
                            <Container>
                                <Grid container direction="row">
                                    <Grid item md={9} sm={12} xs={12} className="z-index-9">
                                        <div className="provider-detail-box">
                                            <h4 className="provider-title-1">
                                                {providerData.service_provider_name}
                                            </h4>
                                            <div className="rating-banner">
                                                <Box className={classes.RatingSection}>
                                                    <Rating
                                                        name="customized-empty"
                                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                                        value={providerData.overall_rating}
                                                        precision={0.5}
                                                        readOnly
                                                    />
                                                    {/* <span className={`rating-box `+toggleReviewClass(value.overall_rating)}>{value.overall_rating}</span> */}
                                                    <span className={`rating-box ` + toggleReviewClass('4')}>{providerData.overall_rating}</span>
                                                    <span className={classes.reviewText}>
                                                        {/* {value.review_count}  */}
                                                        {providerData.total_rating} Ratings & {providerData.total_review} Reviews
                                                        {/* {value.count}  */}
                                                    </span>
                                                </Box>
                                            </div>

                                            <ul className="contact-list">
                                                <li>
                                                    <span className="icon">
                                                        <LocationOnIcon style={{ color: "#fff" }} />
                                                    </span>
                                                    <span className="text">
                                                        {providerData.address}
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="icon">
                                                        <PhoneIcon style={{ color: "#fff" }} />
                                                    </span>
                                                    <span className="text">
                                                        (+91) {providerData.primary_contact_no}
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="icon">
                                                        <MailOutlineIcon style={{ color: "#fff" }} />
                                                    </span>
                                                    <span className="text">
                                                        {providerData.email_id}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </Grid>
                                    <Grid item md={3} sm={12} xs={12} className="z-index-9">
                                        <div className="provider-detail-box right-button">
                                            <Button className="btn btn-write-review" 
                                            href="#review"
                                            >
                                                <CreateIcon className="icon" />
                                                Write a review
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </Grid>
                    <ProviderDetails
                        providerData={providerData}
                    />
                    {/* <ListDeatailsFields/> */}
                </>
                :
                <Box className="loder">
                    <Typography variant='h4'>No service providers found</Typography>
                </Box>
            }
        </Grid>
    )
}
export default CategoryHome;