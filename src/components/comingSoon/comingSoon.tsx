import React from 'react';
import {
    Container,
    Grid,
    Typography,
    Button,
} from '@material-ui/core';
import useStyles from './comingSoonStyles';
import comingSoonImage from '../../assets/img/comingsoon-graphics-image.svg';
import comingSoonText from '../../assets/img/coming-soon-text.svg';


const ComingSoon = () => {
    const classes = useStyles();
    return (
        <Container>
            <Grid 
                container 
                className={classes.comingSoonPage}
            >
                <Grid item sm={5} xs={5} md={5}>
                    <div className={classes.comingSoonTitleBox}>
                        <img src={comingSoonText} alt="title" />
                    </div>
                    <Typography className={classes.comingSoonContent}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor #incididunt ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                    </Typography>
                    <Button className={classes.contactButton}>
                        Contact Us
                    </Button>
                </Grid>
                <Grid item sm={6} xs={6} md={6}>
                    <img src={comingSoonImage} alt="coming-soon" className={classes.comingSoonImage} />
                </Grid>
            </Grid>
        </Container>
    )
}
export default ComingSoon