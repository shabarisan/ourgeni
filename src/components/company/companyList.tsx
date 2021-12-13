import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css';
import React from 'react';
import companyItem1 from '../../assets/img/c-item1.png'
import { useStyles } from './companyListStyles';
const CompanyList = () => {
    const classes = useStyles();
    //const [value, setValue] = React.useState<number | null>(2);

    return (
        <div>
            <Grid container>
                <Grid item xs={12} className={classes.companyListBanner}>
                    <Box className={classes.CompanyHeadingContainer}>
                        <Typography variant='h4' className={classes.CompanyHeading}> A nice section heading goes here</Typography>
                        <Typography > Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Container>
                        <Grid container>
                            <Grid item sm={2}>
                                <img src={companyItem1} alt="companyItem1" />
                            </Grid>
                            <Grid container item sm={8}>
                                <Grid item sm={12}>
                                    <Typography variant='h4'> Green Home Services</Typography>
                                </Grid>
                                <Grid item>
                                    <Rater total={5} rating={2} />
                                </Grid>
                                <Grid item>
                                    <Typography> Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </Typography>
                                </Grid>

                            </Grid>
                            <Grid item className={classes.viewDetails}>
                                <Button className={classes.viewDetailButton}>View Details</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </div>
    )
}
export default CompanyList