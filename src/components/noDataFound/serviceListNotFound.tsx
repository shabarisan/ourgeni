import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import {  useHistory,  } from 'react-router-dom';

import {
    Grid,
    Button,
    Container
} from '@material-ui/core';
import NoProviderFound from '../../assets/img/service-not-found.svg';
import './serviceProviderNotFound.css'


const ServiceListNotFound = () => {
    let history = useHistory();
    return (
        <Container>
            <Grid direction="row" justify="center" d-flex alignItems="center" spacing={3} className="graphic-flex-row">
                <Grid item sm={8} xs={8}>
                    <div className="graphic-box">
                        <img src={NoProviderFound} alt="no-service" />
                        <p className="graphic-content">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero.
                        </p>
                        <Button className="graphic-button" onClick={()=>{history.goBack()}}>Go Back</Button>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}
export default ServiceListNotFound;