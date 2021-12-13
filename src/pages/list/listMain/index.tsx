import {
    Grid,
    useScrollTrigger,
    Zoom,
    Fab
} from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons'
import ServiceProvider from '../serviceProvider/serviceProvider'
import ServiceProviderDetails from '../serviceProvider/serviceProviderDetails'
import EducationProviderDetails from '../educationProvider/educationProviderDetails'

import EducationProvider from '../educationProvider/educationProvider'

import React from 'react';
import {
    Switch,
    Redirect,
    Route,
    useRouteMatch
} from "react-router-dom";
import useStyles from './mainStyles'

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
  }
function ScrollTop(props:Props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleBack = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );
    console.log(anchor)
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleBack} role="presentation" className={classes.backToTop}>
        {children}
      </div>
    </Zoom>
  );
}

const ServiceCategory = (props) => {
    const classes = useStyles();
    let {path, url } = useRouteMatch();
    
    let match = useRouteMatch();
    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item xs={12} sm={12} >
                    <Switch>
                        {/* <Route exact path={path} component={ServiceProvider} /> */}
                         <Route path="/home/list/service-provider">
                            <Redirect to="/list/service-provider" />
                        </Route>
                      
                        <Route path={`${path}/service-provider/:service_id`} component={ServiceProviderDetails} />
                        <Route path={`${path}/education-provider/:service_id`} component={EducationProviderDetails} />
                        <Route path={`${path}/service-provider`} component={ServiceProvider} />
                        <Route path={`${path}/education-provider`} component={EducationProvider} />
                        
                    </Switch>
                    <ScrollTop {...props}>
                        <Fab size="small" aria-label="scroll back to top">
                            <KeyboardArrowUpIcon fontSize="large" />
                        </Fab>
                    </ScrollTop>
                </Grid>
            </Grid>
        </div >
    )
}
export default ServiceCategory;