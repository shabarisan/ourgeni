import { Grid, Typography, Link, Box, Container } from "@material-ui/core"
import React, { useEffect,useState } from "react";
import listStyle from "./topCategorySliderStyles";
import Carousel from 'react-multi-carousel';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Plumbing from "../../../../src/assets/img/top-ad-category2.png";
import "react-multi-carousel/lib/styles.css";
import AOS from 'aos';
import "aos/dist/aos.css";
import './carouselStyles.css';
import axios from 'axios';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 3
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const TopCategorySlider = ({ deviceType ,topCategoryBanner}: any) => {
    const classes = listStyle();

    return (
        <Container className={classes.carosoulContainer}>
            <Grid container>
                <Grid container item sm={12}>
                    <Carousel
                        className={classes.listCarousel}
                        containerClass="carousel-container-services"
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        draggable
                        keyBoardControl
                        partialVisbile 
                        renderButtonGroupOutside={false}
                        deviceType={deviceType}
                        additionalTransfrom={0}
                        arrows={false}
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        centerMode={false}
                        focusOnSelect={false}
                        infinite
                        minimumTouchDrag={80}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                        showDots={true}
                        autoPlay={true}
                        responsive={responsive}
                    >
                        { topCategoryBanner && topCategoryBanner.map((value,index) => (
                            <Link href={`#`} key={value}>
                                <div className={classes.categoryBannerWrapper}>
                                    <div className={classes.categoryBannerBx}>
                                    <img src={'http://og.smartstorez.com/'+value.photo} className={classes.imgFluid} alt="top-category-slider-img" />
                                    </div>
                                    <Box className={classes.adCateItems}>
                                        <h5 className={classes.tileHeading}>{value.title}</h5>
                                        {/* <Typography className={classes.adPragh}>{value.title}</Typography> */}
                                    </Box>
                                </div>
                            </Link>))
                        }
                    </Carousel>
                </Grid>
            </Grid>
        </Container>
    )
}
export default TopCategorySlider;