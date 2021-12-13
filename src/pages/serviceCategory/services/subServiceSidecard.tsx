import React, { useEffect, useState } from 'react';
import Plumbing from "../../../assets/img/login-bg.jpg";
import SubServicesStyle from './serviceStyles';
import { useCart } from "react-use-cart";
import { Grid, Card,CardActionArea, Typography,CardContent,Button} from '@material-ui/core';



const SubServiceSidecard = () => {
    const classes = SubServicesStyle();
    const { addItem, getItem, isEmpty, totalItems, items, updateItemQuantity, cartTotal } = useCart();
    const index = items.length-1

    return (
        <Grid>
            <Card>
                {/* <CardActionArea className={classes.subCategorySelected}>
                    {/* <CardMedia
                        image={Plumbing}
                        title="Contemplative Reptile"
                    /> */}
                    {/* <div>
                        <img src={Plumbing} className={classes.selectedCardImage} />
                    </div>
                    <CardContent className={classes.subCategoryCardBody}>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.selectedTitle}>
                           {items[index] && items[index].name}
                        </Typography> */}
                        {/* <ul className={classes.serviceBilling}>
                            <li>
                                Actual Amount
                                <span>₹ {items[index] && items[index].price}</span>
                            </li>
                            <li>
                                Service Qty
                                <span>{ items[index] && items[index].quantity}</span>
                            </li>
                            <li>
                                Total Amt
                                <span>₹ {items[index] && items[index].itemTotal}</span>
                            </li>
                        </ul> */} 
                        {/* <Button className={classes.submitCardButton} type="submit">
                            Submit
                        </Button> */}
                    {/* </CardContent>
                </CardActionArea> */}
            </Card>
        </Grid>
    )
}
export default SubServiceSidecard;