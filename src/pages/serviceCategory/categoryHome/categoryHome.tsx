import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Zoom,
    Fab,
    Typography,
    Link,
    Container,
} from '@material-ui/core';
import AOS from 'aos';
import "aos/dist/aos.css";
import categoryHomeStyles, { theme } from "./categoryhomeStyles";
import ListFields from '../../../components/serviceCategory/categoryHome/listField/listField';
import FetchCategory from '../../../services/api/getCategory';
import CircularProgress from '@material-ui/core/CircularProgress';
import configData from "../../../constants.json";
import { listeners } from 'process';
import ServiceListNotFound from '../../../components/noDataFound/serviceListNotFound'




const CategoryHome = (props: any) => {
    const classes = categoryHomeStyles();
    const [list, setList] = useState<any[]>([]);
    const [loder, setLoder] = useState<any>(false)

    useEffect(() => {
        AOS.init({ duration: 3000 })
    }, [])
    useEffect( () => {
        setLoder(true)
        const formData = { city_id: localStorage.getItem('userCity') };
        FetchCategory(configData.allpApiUrl + `services`, formData)
        .then((result) => {
            setList(result)
            setLoder(false)
        }
        )
    }, [])
    return (
        <>
            {loder ?
                <Box className='loder'>
                    <CircularProgress />
                </Box>
                :
                list?.length > 0 ?
                    <Grid container>
                        <Grid item sm={12} xs={12}>
                            <Grid item className={classes.banner}>
                                <Box component='div' className={classes.container}>
                                    <Box className={classes.headings} zIndex="modal">
                                        <Typography className={classes.title}>A nice section heading goes here</Typography>
                                        <Typography className={classes.description}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Container >
                                <Grid container direction="row" spacing={3}>
                                    <Grid item sm={12} xs={12}>
                                        <ListFields 
                                        categoryList={list}
                                        />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                        <Grid item className={classes.sectionJoin} sm={12} md={12}>
                            <Box className={classes.joinNowWrap}>
                                <Grid item container>
                                    <Grid item>
                                        <div data-aos="fade-left">
                                            <Typography variant='h4' className={classes.joinHeading}>Professionals Are you looking for Customers?</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <div data-aos="fade-left">
                                            <Button className={classes.joinButton}>
                                                JOIN NOW
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    :
                   <ServiceListNotFound/>
            }
        </>
    )
}
export default CategoryHome;