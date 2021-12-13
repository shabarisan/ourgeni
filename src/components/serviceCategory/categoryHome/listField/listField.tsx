import React,{ useEffect,useState } from 'react';
import Carousel from 'react-multi-carousel';
import UAParser from "ua-parser-js";
import 'react-multi-carousel/lib/styles.css';
import { Paper,Grid, Typography, Link,Box } from '@material-ui/core'
import listStyle from "./listFieldStyles";
import FetchCategory  from '../../../../services/api/getCategory';
import CircularProgress from '@material-ui/core/CircularProgress';
import configData from "../../../../constants.json";
import { Link as RouterLink,useRouteMatch } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AOS from 'aos';
import '../../../home/topCategorySlider/carouselStyles.css';
import "aos/dist/aos.css";
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};


const ListFields = (props: any) => {
    let { path, url } = useRouteMatch();
    const classes = listStyle();
    const [list,setList] = useState<any []>(props.categoryList);
    AOS.init({ duration:3000 });
    // useEffect(()=>{
    //         const formData = {city_id:localStorage.getItem('userCity')};
    //         FetchCategory(configData.allpApiUrl+`services`,formData).then((result) =>
    //         {
    //             setList(result)
    //         }
    //     )
    // },[])
    return (
        <Grid className={classes.listContainer}>
             
            {list && list.length > 0 && 
            <>
                <Grid item >
                    <Carousel
                        className={classes.listCarousel}
                        draggable
                        keyBoardControl
                        partialVisbile
                        renderButtonGroupOutside={false}
                        deviceType={props.deviceType}
                        itemClass="image-item"
                        responsive={responsive}
                        >
                        {list.map((value)=>(
                            <Link component={RouterLink} className={classes.carouselCardItem} to={`${path}/sub/service/${value.id}`} key={list.indexOf(value)}>
                                <Paper elevation={3} className={classes.tiles}>
                                    
                                    <Typography className={classes.tileHeading}>
                                    <img src={configData.backendUrl + value.service_icon}  className={classes.imgFluid} alt={value.service_name} />
                                    </Typography>
                                    <Typography className={classes.tileHeading}>
                                    {value.service_name}
                                    </Typography>
                                </Paper>
                            </Link>))
                        }
                    </Carousel>
                <Box className={classes.breadcrumb_bx}> 
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.breadcrumb}>
                        <Link className={classes.breadCrumblinks} component={RouterLink} to="/">
                            Home
                        </Link>
                        
                        <Typography className={classes.breadCrumblinksActive}>Services</Typography>
                    </Breadcrumbs>
                </Box>
                </Grid>
                
                <Grid  container className={classes.categoryContainer} spacing={3}>
                    {list.map((service)=>(
                    <Grid item xs={6} md={3} sm={4}  key={service.id}  data-aos="zoom-in">
                        <div className={classes.categoryBox}>
                            <div className={classes.serviceIconBx}>
                             <img src={ configData.backendUrl +  service.service_icon }  alt={service.service_name} />
                             </div>
                             <Link  component={RouterLink} to={`${path}/sub/service/${service.id}`} key={list.indexOf(service)}>
                                <Typography component="h3">{service.service_name}</Typography>
                            </Link>
                        </div>
                    </Grid>))
                    }
                </Grid>
            </>
            // :
            // <Grid container alignItems="center" alignContent="center" justify="center">
                
            //     <Grid item container style={{marginBottom:'30px',marginTop:'30px'}} alignItems="center" alignContent="center" justify="center">
            //         <Grid item sm={8} style={{textAlign:'center'}}>
            //             <Box >
            //                 <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.breadcrumb}>
            //                     <Link className={classes.breadCrumblinks} component={RouterLink} to="/">
            //                         Home
            //                     </Link>
                                
            //                     <Typography className={classes.breadCrumblinksActive}>Services</Typography>
            //                 </Breadcrumbs>
            //             </Box>
            //             <Paper elevation={3} style={{padding:'100px'}}>
                    
            //                 <CircularProgress  thickness={1} size={50} />
            //                 <Typography className={classes.tileHeading}>Loading Services</Typography>
            //             </Paper>
            //         </Grid>
            //     </Grid>
            // </Grid>
        }
        </Grid>
    )
}

ListFields.getInitialProps = ({ req }: any) => {
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
export default ListFields;