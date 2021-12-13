import React, { useEffect, useState } from 'react';
import storeHomeStyles from "./storeHomeStyles";
import configData from "../../../constants.json";
import Carousel from 'react-multi-carousel';
import cleaningKit from '../../../assets/img/cleaningkit.png';
import cleaningKit1 from '../../../assets/img/cleaning-kit2.png';
import cleaningKit2 from '../../../assets/img/cleaning-kit3.png';
import cleaningKit3 from '../../../assets/img/cleaning-kit4.png';
import cleaningKit4 from '../../../assets/img/cleaning-kit5.png';
import bannerImg from '../../../assets/img/product-benner.png';
import * as api from '../../../services/api/storesApi';
import { Link as RouterLink } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';


import {
    Box,
    Grid,
    Typography,
    Container,
    Paper, Card,
    Button,
    CardContent,
    CardActions,
    Link,
    CardMedia
} from '@material-ui/core';

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

const StoreHome = () => {
    const [productCategoryList, setProductCategoryList] = useState<any>()
    const [loder, setLoder] = useState(false)
    const classes = storeHomeStyles();

    useEffect(() => {
        getProductCategories()
    }, [])

    const getProductCategories = () => {
        setLoder(true)
        api.fetchStoreCategory()
            .then((response) => {
                setLoder(false)
                if (response.success) {
                    console.log("this is response",response)
                    setProductCategoryList(response.data.data)
                }
            })
    }
    const data = [{ img: cleaningKit }, { img: cleaningKit1 }, { img: cleaningKit2 }, { img: cleaningKit3 }, { img: cleaningKit4 }, { img: cleaningKit1 }, { img: cleaningKit2 }, { img: cleaningKit4 }, { img: cleaningKit4 }]
    console.log(1234, productCategoryList)
    return (
        <> 
        {loder ?
            <Box className='loder'>
                <CircularProgress />
            </Box>
            :
            productCategoryList?.length > 0 ?
            <>
            <Box component='div' className={classes.homeBanner} style={{ background: `url(${bannerImg}) no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center' }}> </Box>
            <Container>
                <div className={classes.category_sec}>
                <Typography className={classes.category_h} variant="h4">category</Typography>
                <Grid container spacing={3}>
                    {productCategoryList.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card className={classes.category_box}>
                                    <CardContent className={classes.card_content}>
                                        <Typography className={classes.category_type_h} >
                                            {item.title}
                                          
                                        </Typography>
                                        <Box component="div" className={classes.category_img_bx}>
                                            <img src={configData.backendUrl + item.photo} className={classes.category_img} />
                                        </Box>
                                        <CardActions className={classes.category_btn_bx}>
                                            <Link className={classes.all_category_btn} component={RouterLink} to={'/store/store-list'}> View All</Link>
                                        </CardActions>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                            
                    }
                </Grid>
                </div>
            </Container>
            </>
            :
            <Box className='loder'>
                <Typography  >
                    No Product Found
                </Typography>
            </Box>
        }
        </>

    )
}
export default StoreHome