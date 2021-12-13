import {
    Box,
    Grid,
    Typography,
} from '@material-ui/core';
import React,{useEffect,useState} from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import UAParser from "ua-parser-js";
import useStyles from './bannerStyles';
import SearchForm from './locationInput';
import axios from 'axios';
import * as configData from '../../../constants.json';

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 1
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 464
        },
        items: 1
    }
};
const Banner = ({ deviceType,areaList,serviceList,allServices,home_page_banners }: any) => {
    
    const setLocation = (LocObj) =>{
        if (LocObj !== null) {
            localStorage.setItem('CityID',LocObj.id);
            localStorage.setItem('CityName',LocObj.city_name);
        }
    }
    console.log(123,home_page_banners)

//    const home_page_banners = [{title:"1",description:'descrtiption',photo:1}];

    const classes = useStyles();
    return (
        
        // <Carousel
        //     additionalTransfrom={0}
        //     arrows
        //     centerMode={false}
        //     containerClass="container"
        //     draggable
        //     focusOnSelect={false}
        //     infinite
        //     keyBoardControl
        //     deviceType={deviceType}
        //     minimumTouchDrag={80}
        //     sliderClass=""
        //     slidesToSlide={1}
        //     swipeable
        //     responsive={responsive}
        // >
            <>
            {home_page_banners.length>0 &&
           
                <Box component='div' className={classes.homeBanner} style={{background: `url(${configData.backendUrl+ home_page_banners[0].photo}) no-repeat`,backgroundSize:'cover',backgroundPosition:'center'}}>
                    <Box className={classes.bannerContent}>
                        <Box className={classes.bannerHeading}>
                            <Box>
                                <Grid container spacing={1} justify="center">
                                    <Grid item sm={12} xs={12} md={12}>
                                        {/* <Typography  className={classes.banneTitle}>{value.title}</Typography> */}
                                        {/* <Typography className={classes.banneTitleContent}>{value.description.replace(/<(.|\n)*?>/g, '')}</Typography> */}
                                    </Grid>
                                </Grid>
                            </Box>
                            <Grid container spacing={1} justify="center">
                                <Grid item sm={12} md={12}>
                                    <Box className={classes.bannerForm}>
                                        <Grid container>
                                            <SearchForm onChange={setLocation} areaList={areaList} serviceList={serviceList} allServices={allServices}/>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
           
            }
            </>
        // {/* </Carousel> */}
    )
};
Banner.getInitialProps = ({ req }: any) => {
    let userAgent;
    if (req) {
        userAgent = req.headers["user-agent"];
    } else {
        userAgent = navigator.userAgent;
    }
    const parser = new UAParser();
    parser.setUA(userAgent);
    const result = parser.getResult();
    const deviceType = (result.device && result.device.type) || "desktop";
    return { deviceType };
};
export default Banner;