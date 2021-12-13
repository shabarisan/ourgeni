import { Box, ButtonGroup, Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import ProductListStyle from './productListStyles';
import cleanKit from '../../../assets/img/cleaning-kit3.png';
import GradeSharpIcon from '@material-ui/icons/GradeSharp';
import React, { useState } from 'react';
import clsx from 'clsx';
interface IProduct{
    id:string,
    name:string,
    image:any,
    description:string,
    rating:string,
    orginalPrice:string,
    discountPrice:string,
    viewsCount:string,
}

const Products = [{
    id:"1001",
    name:"Salon For Men....",
    image:cleanKit,
    description:"this the product description",
    rating:'4.3',
    orginalPrice:"250",
    discountPrice:"100 ",
    viewsCount:'200',
}]
export default function ProductList() {
    const classes = ProductListStyle();

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h4'>Products</Typography>
                    <Typography>Lorem ipsum dolor sit amet,</Typography>
                </Grid>
                <Grid container item spacing={3}>
                   {
                       Products.map((product:IProduct)=>{return ProductCard(product)})
                   }
                </Grid>
            </Grid>

        </Box >
    )
}
export const GroupedButtons = () => {
    const classes = ProductListStyle();

    const [state, setState] = useState({ counter: 0 });

    const handleIncrement = () => {
        setState(state => ({ counter: state.counter + 1 }));
    };

    const handleDecrement = () => {
        setState(state => ({ counter: state.counter - 1 }));
    };

    //const displayCounter = state.counter > 0;
    return (
        <ButtonGroup size="small" variant="text" aria-label="small outlined button group">
            <Button onClick={handleIncrement} className={clsx(classes.button, classes.up)}>+</Button>
            <Button disabled style={{color:'black'}}>{state.counter}</Button>
            <Button onClick={handleDecrement} className={clsx(classes.button, classes.down)}>-</Button>
        </ButtonGroup>
    );
}
const ProductCard = (props:IProduct) =>{
    const classes = ProductListStyle();
    console.log(props)
    return(
    <Grid item>
        <Card className={classes.paper}>
            <CardContent >
                <Grid container className={classes.content}>
                    <Grid item>
                        <img src={cleanKit}  alt="cleanKit" />
                    </Grid>
                    <Grid>
                        <Typography variant="body2" color="textSecondary" component="p"
                            className={classes.productTitle}>
                            {props.name}
                    </Typography>
                    </Grid>
                    <Grid container item>
                        <Grid item>
                            <Box component='span' className={classes.ratingBadge}>
                                <Typography>{props.rating}</Typography>
                                <GradeSharpIcon fontSize='small' style={{ color: '#f3b931' }} />
                            </Box>
                        </Grid>
                        <Grid item>
                        <Typography variant='caption' className={classes.viewCount}>{props.viewsCount} views</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={6}>
                            <b>${props.discountPrice} </b>&nbsp;&nbsp;<s> ${props.orginalPrice}</s>
                        </Grid>
                        <Grid item >
                        <GroupedButtons />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                    <Button className={classes.buttonAdd}>ADD</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Grid>
    )
}
