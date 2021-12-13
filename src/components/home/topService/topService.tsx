import { Grid, Typography, Link, Container } from "@material-ui/core"
import * as configData from '../../../constants.json';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from "./topServiceStyles";
import cate01 from '../../../assets/img/cate-01.svg';
import cate02 from '../../../assets/img/cate-02.svg';
import cate03 from '../../../assets/img/cate-03.svg';
import cate04 from '../../../assets/img/cate-04.svg';
import AOS from 'aos';
import "aos/dist/aos.css";
import Carousel from 'react-multi-carousel';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import clsx from 'clsx';




const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
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



const TopService = ({ topServices }: any) => {
    const classes = useStyles();
    AOS.init({ duration: 3000 });

    return (
        <Container className={classes.categoryContainer}>
            <Grid container direction="row" spacing={2}>
                {/* <Grid container direction="row" spacing={2}> */}
                <Grid item sm={12}>
                    <Typography className={classes.subTitleHeading}>Top Service</Typography>
                    <Typography className={classes.subTitlePragraph}>Exploree the greates our services. You won’t be disappointed</Typography>
                </Grid>
            </Grid>

            {/* </Grid> */}
            {/* <Grid container spacing={2} className={classes.categoryContainer}> */}
            <Carousel
                containerClass="carousel-container-services"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                draggable
                keyBoardControl
                partialVisbile
                renderButtonGroupOutside={false}
                // deviceType={deviceType}
                additionalTransfrom={0}
                customLeftArrow={<button className={clsx(classes.leftArrow,'react-multiple-carousel__arrow')}><ArrowBackIosOutlinedIcon /></button>}
                customRightArrow={<button className={clsx(classes.rightArrow,'react-multiple-carousel__arrow ')}><ArrowForwardIosOutlinedIcon /></button>}
                arrows={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                centerMode={false}
                focusOnSelect={false}
                infinite
                minimumTouchDrag={80}
                sliderClass=""
                slidesToSlide={1}
                swipeable
                responsive={responsive}
            >
                {topServices && topServices.map((value, index) => (

                    <Grid item sm={4} xs={6} md key={index} >
                        <Link component={RouterLink} to={`/services/sub/` + value.id}>
                            <div className={classes.categoryBox}>
                                <span className={classes.topServicesBx}>
                                    <img src={configData.backendUrl + value.service_icon} alt="top-service-img" />
                                </span>
                                <h3>
                                    {value.service_name}
                                </h3>
                            </div>
                        </Link>
                    </Grid>
                ))
                }
            </Carousel>
            {/* </Grid> */}
        </Container>
    )
}
export default TopService;