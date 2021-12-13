import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import {  useHistory,  } from 'react-router-dom';
import {
    Grid,
    Button,

} from '@material-ui/core';
import noProviderFound from '../../assets/img/noProviderFound.svg';
import './serviceProviderNotFound.css'


const ServiceProviderNotFound = () => {
    let history = useHistory();
    return (
        <Grid  item sm={9} xs={12} justify="center" alignItems="center">
            <Grid container direction="row"  spacing={3}>
                <Grid item sm={12} xs={12}>
                    <div className="graphic-box">
                        <img src={noProviderFound} />
                        <p className="graphic-content">
                         Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero.
                        </p>
                        <Button className="graphic-button" onClick={()=>{history.goBack()}}>Go Back</Button>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default ServiceProviderNotFound;