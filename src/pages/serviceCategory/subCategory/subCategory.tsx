import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Grid,
    Typography,
    Container,
    Link,
} from '@material-ui/core';
import AOS from 'aos';
import "aos/dist/aos.css";
import categoryHomeStyles from "./subCategoryStyles";
import CategoryIcon1 from '../../../assets/img/member-2.png';
import CategoryIcon2 from '../../../assets/img/member-3.png';
import CategoryIcon3 from '../../../assets/img/member-4.png';
import CategoryIcon4 from '../../../assets/img/member-5.png';
import CategoryIcon5 from '../../../assets/img/member-6.png';
import CategoryIcon6 from '../../../assets/img/member-6.png';
import commandIcon from '../../../assets/img/command.svg';
import userprofile from '../../../assets/img/userprofile-1.png';
import configData from "../../../constants.json";
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
const SubCategory = (props: any) => {
    const classes = categoryHomeStyles();
    
    let catIcon = [];

    catIcon['0'] = CategoryIcon1;
    catIcon['1'] = CategoryIcon2;
    catIcon['2'] = CategoryIcon3;
    catIcon['3'] = CategoryIcon4;
    catIcon['4'] = CategoryIcon5;
    catIcon['5'] = CategoryIcon6;


    useEffect(() => {
        AOS.init({ duration: 3000 })
    }, [])
    return (
        <Grid container>
            <Grid item sm={12} xs={12}>
                <Grid item className={classes.banner}>
                    <Box component='div' className={classes.container}>
                        <Box className={classes.headings} zIndex="modal">
                            <Typography className={classes.title}>A  nice section heading goes here</Typography>
                            <Typography className={classes.description}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid item sm={12} >
                <Container >
                    <Grid container item sm={12} className={classes.categoryContainer}>
                        <Grid item sm={12} xs={12} md={12}>
                            <Typography className={classes.subTitleHeading}>Sub Category</Typography>
                        </Grid>
                        <Grid item sm={12} xs={12} md={12}>
                            <Typography className={classes.subTitlePragraph}>Exploree the greates our services. You won’t be disappointed</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container className={classes.categoryList}>
                    {[0,1,2,3,4,5].map((service)=>(<Grid item>
                        <Link key={service} className={classes.subCatLink}>
                        <div className={classes.subCategoryBox}>
                            <img src={catIcon[service]} className={classes.imgFluid} alt="Plumbing" />
                            <div className={classes.hoerSec}>
                            <Link key={service} href={configData.siteUrl+"/services/sub/service/1"} className={classes.subCatLink}><Typography className={classes.tileHeading}>Plumbing</Typography></Link>
                            </div>
                        </div>
                        </Link>
                    </Grid>))
                    }
                </Grid>
                </Container>
            </Grid>
            <Grid item className={classes.sectionJoin} sm={12} md={12}>
                <Box className={classes.joinNowWrap}>
                      <Typography variant='h4' className={classes.joinHeading}>Service description</Typography>
                       <Typography className={classes.sectionParagraph}>Lorem ipsum dolor sit amet,</Typography>
                    <Typography className={classes.sectionParagraph}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et</Typography>
                    <Typography className={classes.sectionParagraph}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et</Typography>
                    </Box>
            </Grid>
            <Grid item container className={classes.serviceContainer}>
                <div className={classes.ReviewRationSection}>
                    <h3  className={classes.ReviewRationSectionTitle}>Ratings & Reviews</h3>
                    <span>
                        <StarIcon className={classes.RatingWrapIcon}></StarIcon>
                        <StarIcon className={classes.RatingWrapIcon}></StarIcon>
                        <StarIcon className={classes.RatingWrapIcon}></StarIcon>
                        <StarIcon className={classes.RatingWrapIcon}></StarIcon>
                        <StarHalfIcon className={classes.RatingWrapIcon}></StarHalfIcon>
                    </span>
                    <span className={classes.RationgCount}>
                    4.8 out of 5 star
                    </span>
                    <div className={classes.RatingCommandCount}>
                        <img src={commandIcon} alt="commandIcon" />
                        <span className={classes.RationgCount}>
                            4000 reviews
                        </span>
                    </div>
                    <div className={classes.commentsSection}>
                        <div className={classes.CommandAvatar}>
                                <img src={userprofile} className={classes.CommandAvatarImg} alt="CommandAvatarImg" />
                        </div>
                        <div className={classes.CommandText}>
                            <h6 className={classes.CommandHeading}>Mike Junior</h6>
                            <div className={classes.CommandPosted}>
                                    <small className={classes.CommandPostedSmall}>1h ago</small>
                            </div>
                            <Typography className={classes.CommandParagraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                        </div>
                    </div>
                    <div className={classes.commentsSection}>
                        <div className={classes.CommandAvatar}>
                                <img src={userprofile} className={classes.CommandAvatarImg} alt="CommandAvatarImg" />
                        </div>
                        <div className={classes.CommandText}>
                            <h6 className={classes.CommandHeading}>Mike Junior</h6>
                            <div className={classes.CommandPosted}>
                                    <small className={classes.CommandPostedSmall}>1h ago</small>
                            </div>
                            <Typography className={classes.CommandParagraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                        </div>
                    </div>
                    <div className={classes.commentsSection}>
                        <div className={classes.CommandAvatar}>
                                <img src={userprofile} className={classes.CommandAvatarImg} alt="CommandAvatarImg" />
                        </div>
                        <div className={classes.CommandText}>
                            <h6 className={classes.CommandHeading}>Mike Junior</h6>
                            <div className={classes.CommandPosted}>
                                    <small className={classes.CommandPostedSmall}>1h ago</small>
                            </div>
                            <Typography className={classes.CommandParagraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                        </div>
                    </div>
                    <div className={classes.commentsSection}>
                        <div className={classes.CommandAvatar}>
                                <img src={userprofile} className={classes.CommandAvatarImg} alt="CommandAvatarImg" />
                        </div>
                        <div className={classes.CommandText}>
                            <h6 className={classes.CommandHeading}>Mike Junior</h6>
                            <div className={classes.CommandPosted}>
                                    <small className={classes.CommandPostedSmall}>1h ago</small>
                            </div>
                            <Typography className={classes.CommandParagraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                        </div>
                    </div>
                    <div className={classes.ViewMoreSection}>
                        <Button variant="outlined">View More</Button>

                    </div>
                </div>
                
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
    )
}
export default SubCategory;