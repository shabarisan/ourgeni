import { Link as RouterLink } from 'react-router-dom';
import { Grid, Container, Box, Typography, Link } from "@material-ui/core";
import './siteCategory.css';
import B2BGreen from '../../../assets/img/b2b-green.svg';
import HouseHoldGreen from '../../../assets/img/households-green.svg';
import EducationGreen from '../../../assets/img/education-green.svg';
import ListingWhite from '../../../assets/img/listing-green.svg';
import StoreGreen from '../../../assets/img/store-green.svg';
import * as configData from '../../../constants.json';


const siteCategory = (props) => {
    return (
        <Container maxWidth={false} className='siteCategoryContainer'>
            <Container>
                {/* <Grid item sm={12} md={12} lg={12} direction="row" >
                    <Typography className="siteCategoryHeading">Categories</Typography>
                </Grid> */}
                <Grid container direction="row" className="categories_bx_row">
                    <Grid item sm={12} md={9}>
                        <Grid container direction="row" spacing={2} alignItems="center" className='categories_bx'>


                            {/* <Grid item xs={4} sm={2} lg={2} className="textCenter">
                                <Link component={RouterLink} to="/list/service-provider">
                                    <Box textAlign="center" className="listingContainerActive">

                                        <img src={ListingWhite} alt="Listing" />
                                    </Box>

                                    <Typography className="listingHeading">Listing</Typography>

                                </Link>
                            </Grid> */}
                            {props.parentCategories.map((item,index)=>(
                            <Grid item xs={4} sm={2} lg={2} key={index} className="textCenter">
                                <Box textAlign="center" className="listingContainer">
                                    <Link component={RouterLink} to={item.link}>
                                        <img
                                            src={configData.imgUrl+item.iconUrl}
                                            alt="B2B"
                                        />
                                    </Link>
                                </Box>
                                <Typography className="listingHeading">{item.name}</Typography>

                            </Grid>
                            ))}
                            {/* <Grid item xs={4} sm={2} lg={2} className="textCenter">
                                <Box textAlign="center" className="listingContainer">
                                    <Link component={RouterLink} to="/products">
                                        <img src={HouseHoldGreen} alt="HouseHolds" />
                                    </Link>
                                </Box>
                                <Typography className="listingHeading">HouseHolds</Typography>

                            </Grid>
                            <Grid item xs={4} sm={2} lg={2} className="textCenter">
                                <Box textAlign="center" className="listingContainer">
                                    <Link component={RouterLink} to="/list/education-provider">
                                        <img src={EducationGreen} alt="Education" />
                                    </Link>
                                </Box>
                                <Typography className="listingHeading">Education</Typography>

                            </Grid>
                            <Grid item xs={4} sm={2} lg={2} className="textCenter">
                                <Box textAlign="center" className="listingContainer">
                                    <Link component={RouterLink} to="/store">
                                        <img src={StoreGreen} alt="Store" />
                                    </Link>
                                </Box>
                                <Typography className="listingHeading">Store</Typography>
                            </Grid> */}

                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}
export default siteCategory;