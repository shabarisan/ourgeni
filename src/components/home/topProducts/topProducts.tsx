import { Grid, Typography, Link,  Container } from "@material-ui/core"
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect } from "react";
import useStyles from "./topProductsStyle";
import producticon1 from '../../../assets/img/product-icon1.svg';
import producticon3 from '../../../assets/img/product-icon3.svg';
import producticon4 from '../../../assets/img/product-icon4.svg';
import producticon6 from '../../../assets/img/product-icon6.svg';
import producticon2 from '../../../assets/img/product-icon2.svg';
import AOS from 'aos';
import "aos/dist/aos.css";

const TopProducts = () => {
    const classes = useStyles();

    const products = [
        {
            id: 1,
            name: 'Cleaning',
            image: producticon1
        },
        {
            id: 2,
            name: 'Beauty',
            image: producticon2
        },
        {
            id: 3,
            name: 'Bathroom Kit',
            image: producticon3
        },
        {
            id: 4,
            name: 'Kitchen',
            image: producticon4
        },
        {
            id: 5,
            name: 'Laundry',
            image: producticon6
        }
    ];

    useEffect(() => {
        // const fetchTasks = async () => {
        //     const res = await fetch('http://localhost:8000/api/v1/desktop/services')
        //     const data = await res.json()
        //     setTasks(data.services)
        // }

        // fetchTasks()
        // AOS.init({ duration: 3000 })
    }, [])

    return (
        <Container className={classes.categoryContainer}>
            <Grid container direction="row" spacing={2}>
                <Grid container direction="row" spacing={2}>
                    <Grid item sm={12}>
                        <Typography className={classes.subTitleHeading}>Products</Typography>
                        <Typography className={classes.subTitlePragraph}>Exploree the greates our services. You won’t be disappointed</Typography>
                    </Grid>                   
                </Grid>
                <Grid container direction="row" spacing={1} className={classes.categoryContainer}>
                    {products.map((value, index) => (
                        <Grid item sm={4} xs={6} md key={index} >
                            <Link component={RouterLink} to={'/products'}>
                                <div className={classes.categoryBox}>
                                    <span className={classes.productImgBx}>
                                    <img src={value.image} alt="top-product-img" />
                                    </span>
                                    <h3>
                                        {value.name}
                                    </h3>
                                </div>
                            </Link>
                        </Grid>))
                    }
                </Grid>
            </Grid>
        </Container>
    )
}
export default TopProducts;