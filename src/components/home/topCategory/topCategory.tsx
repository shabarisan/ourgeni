import { Grid, Typography, Link,Container } from "@material-ui/core"
import useStyles from "./topCategoryStyles";
import { Link as RouterLink } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css";
import * as configData from '../../../constants.json';
import CircularProgress from '@material-ui/core/CircularProgress';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import clsx from 'clsx';



const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 7
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 7
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
};


const TopCategory = ({topCategories}:any) => {
    const classes = useStyles();
    // AOS.init({ duration: 3000 });

    return (
        <Container className={classes.mainContainer}>
            <Grid container direction="row" spacing={2}>
                <Grid item sm={12}>
                    <Typography className={classes.subTitleHeading}>Top Categories</Typography>
                    <Typography className={classes.subTitlePragraph}>Exploree the greates our services. You won’t be disappointed
                        {/* <Link component={RouterLink} className={classes.subTitlePragraph} style={{ float: 'right' }} to="/services"> View All </Link> */}
                    </Typography>
                </Grid>               
            </Grid>
            {/* <Grid container spacing={2} className={classes.categoryContainer}> */}
                    <Carousel
                        // className={classes.listCarousel}
                        containerClass="carousel-container-services"
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        draggable
                        keyBoardControl
                        partialVisbile 
                        renderButtonGroupOutside={false}
                        // deviceType={deviceType}
                        additionalTransfrom={0}
                         customLeftArrow	={<button className={clsx(classes.leftArrow,'react-multiple-carousel__arrow')}><ArrowBackIosOutlinedIcon/></button>}
                         customRightArrow={<button className={clsx(classes.rightArrow,'react-multiple-carousel__arrow ')}><ArrowForwardIosOutlinedIcon/></button>}
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

                { topCategories && topCategories.length >0 &&
                 topCategories.map((value,index) => {
                    return (
                    <Grid item sm={4} xs={6} md key={value.id} >
                        <Link component={RouterLink} to={`/services/sub/service/` + value.id}  key={index}>
                        <div className={classes.categoryBox}>
                            <span className={classes.categoryImg}>
                                <img src={configData.backendUrl + value.service_icon} alt={value.service_name} />                            
                            </span>
                                <h3>
                                    {value.service_name}
                                </h3>
                        </div>
                        </Link>
                    </Grid> 
                    )})

                   
                    // :
                    // <Grid alignItems="center" alignContent="center" justify="center">
                    //     <CircularProgress  thickness={4} size={50} />
                    // </Grid>
                }
                 </Carousel>
            {/* </Grid> */}
        </Container>
    )
}
export default TopCategory;