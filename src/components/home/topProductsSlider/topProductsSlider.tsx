import { Grid, Link, Box,Container } from "@material-ui/core"
import React, {useEffect} from "react";
import listStyle from "./topProductSliderStyles";
import Carousel from 'react-multi-carousel';
import Plumbing from "../../../../src/assets/img/top-ad-category2.png";
import "react-multi-carousel/lib/styles.css";
import AOS from 'aos';
import "aos/dist/aos.css";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


const TopProductsSlider = ({ deviceType,topProductBanner }: any) => {
    const classes = listStyle();

    useEffect(() => {
        AOS.init({ duration: 3000 })
    }, [])

    return (
        <Container maxWidth={false} className={classes.carosoulContainer}>
            <Grid container direction="row">
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
                    autoPlay={true}
                    showDots={true}
                    responsive={responsive}
                    >
                    { topProductBanner && topProductBanner.map((value) => (
                            <Link href={`#`} key={value}>
                            <div className={classes.topProductBx}>
                                <img src={'http://og.smartstorez.com/'+value.photo} className={classes.imgFluid} alt="product-slider-img" />
                                
                            </div>
                            <Box className={classes.adCateItems}>
                                    <h5 className={classes.tileHeading}>{value.title}</h5>

                                </Box>
                            </Link>))
                        }
                    </Carousel>
            </Grid>
        </Container>
    )
}
export default TopProductsSlider;