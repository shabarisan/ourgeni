import React, { useEffect, useState } from "react";
import categoryHomeStyles from "./productdetailStyles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import GradeSharpIcon from "@material-ui/icons/GradeSharp";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import Rating from "@material-ui/lab/Rating";
import CreateIcon from "@material-ui/icons/Create";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  useParams,
  useLocation,
  useHistory,
  Link as RouterLink,
} from "react-router-dom";
import Carousel from 'react-multi-carousel';
import StarIcon from "@material-ui/icons/Star";
import * as api from "../../../services/api/productsApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import configData from "../../../constants.json";
import clsx from "clsx";
import { useCart } from "react-use-cart";
import ReviewForm from "../../../components/list/serviceProvider/reviewForm/reviewForm";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import {
  WhatsappShareButton,
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from "next-share";

import {
  Grid,
  Container,
  Breadcrumbs,
  Link,
  Typography,
  Card,
  Box,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { Helmet } from 'react-helmet';
interface ParamTypes {
  id: string;
}
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 
  }
};

const ProductDetails = (props) => {
  let history = useHistory();
  const [item, setItem] = useState<any>();
  const { id } = useParams<ParamTypes>();
  const location = useLocation<any>();
  const { productName } = location?.state;
  const [loder, setLoder] = useState(false);
  const classes = categoryHomeStyles();
  const [details, setDetails] = useState<any>();
  const [open, setOpen] = useState<any>();
  const [reviewlist , setReviewList] = useState<any>();
  const url: string = window.location.href;
  const [userName , setUserName] = useState<any>({
    name:''
  });


  const {
    addItem,
    getItem,
    isEmpty,
    totalItems,
    items,
    updateItemQuantity,
    cartTotal,
  } = useCart();

  useEffect(()=>{
    console.log(props);
    const userName= localStorage.getItem('user_name')
    if(userName){
        setUserName({
            name:userName
        })
    }
},[])

  useEffect(() => {
    getProductDetails(id, productName);
  }, [id]);

  useEffect(() => {
    setItem(items.find((x) => x.id == id));
  }, [items]);

  function UnsafeComponent({ html, className }) {
    return (
      <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
    );
  }

  const handleWriteReview = (): any => {
    if (localStorage.getItem("UserId")) {
      
      setOpen(!open);
    } else {
      history.push("/login");
    }
  };

  const handleUpdateReview = (data) => {
    setReviewList(data.data.data.original.data.review_lists)
  }

  const getProductDetails = (id, productName) => {
    setLoder(true);
    api.fetchProductsDetails(id, productName).then((response) => {
      setLoder(false);
      if (response.success) {
        setDetails(response.data[0]);
        setReviewList(response.data[0].review_list);
      } else {
        console.log(response);
      }
    });
  };
  console.log("currenturl:",location.pathname);


  return (
    <>
      <Helmet>
        <title> our Geni app Login</title>
        <meta name="description" content="Some tags are vital for SEO. Others have little or no impact on rankings. Here's every type of meta tag you need to know about.The purpose of a meta description is to reflect the essence of a page, but with more details and context."/>        <meta name="theme-color" content="#008f68" />
       <meta name="keyword" content="our geni app"/>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="http://example.com/" />



      </Helmet>
      {loder ? (
        <Box className="loder">
          <CircularProgress />
        </Box>
      ) : details ? (
        <Container className={classes.productDetailSec}>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link color="inherit" href="/">
                  Home
                </Link>
                <Link color="inherit" style={{cursor:"pointer"}} onClick={() => history.goBack()}>
                  Cleaning&Household
                </Link>
                <Typography color="textPrimary">{details.title}</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.productCard}>
                <Grid container direction="row" spacing={3}>
                  
                  <Grid item md={6} xs={12}>
                    <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    keyBoardControl={true}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    itemClass="carousel-item-padding-40-px"
                    >
                      { details.photo.map((item,index) => (
                    <div className={classes.ProductDetailImgBx}>
                      <img src={configData.backendUrl + item} />
                      <div className={classes.watchListIcon}>
                        <FavoriteBorderIcon />
                      </div>
                    </div>
                    ))}      
                    </Carousel>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <div className={classes.product_h}>
                      <h3> {details.title}</h3>
                    </div>
                    <Grid container direction="row">
                      <Grid item>
                        <Box component="span" className={classes.ratingBadge}>
                          <Typography>{details.overall_rating}</Typography>
                          <GradeSharpIcon
                            fontSize="small"
                            style={{ color: "#fff", fontSize: "12px" }}
                          />
                        </Box>
                      </Grid>
                      <Grid item className={classes.viewCountBx}>
                        <Typography
                          variant="caption"
                          className={classes.viewCount}
                        >
                          {details.total_review} reviews &{" "}
                          {details.total_rating} rating
                        </Typography>
                      </Grid>
                    </Grid>

                    <div className={classes.price_bx}>
                      <b>&#8377;{details.price} </b>
                      <span>
                        <s> </s>
                      </span>
                      <div className={classes.disc_bx}>
                        {" "}
                        {details.discount}%
                      </div>
                    </div>
                    <div className={classes.quantity_control}>
                      <ButtonGroup
                        size="small"
                        variant="text"
                        aria-label="small outlined button group"
                      >
                        {details && item?.quantity !== undefined ? (
                          <>
                            <p> Quantity </p>
                            <Button
                              className={clsx(classes.up)}
                              onClick={() => {
                                addItem(
                                  {
                                    id: details.id,
                                    image:
                                      configData.backendUrl + details.photo,
                                    price_with_tax: item.price,
                                    // cgst: item.cgst, sgst: item.sgst,
                                    // tax: (item.cgst + item.sgst),
                                    // description: details.description,
                                    name: details.title,
                                    price: details.price,
                                    type: "product",
                                  },
                                  1
                                );
                              }}
                            >
                              +
                            </Button>
                            <Button disabled className={classes.quantity_show}>
                              {item?.quantity}
                            </Button>
                            <Button
                              className={clsx(classes.down)}
                              onClick={() => {
                                updateItemQuantity(
                                  details.id,
                                  item.quantity ? item.quantity - 1 : 1
                                );
                              }}
                            >
                              -
                            </Button>
                          </>
                        ) : (
                          <Button
                            className={classes.add_tocartbtn}
                            onClick={() =>
                              addItem(
                                {
                                  id: details.id,
                                  image: configData.backendUrl + details.photo,
                                  name: details.title,
                                  price: details.price,
                                  price_with_tax: details.price,
                                  type: "product",
                                },
                                1
                              )
                            }
                          >
                            Add To Cart{" "}
                          </Button>
                        )}
                      </ButtonGroup>
                    </div>
                    <div className={classes.ProductDesc}>
                      {/* <ul>
                                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                                </ul> */}
                      <UnsafeComponent
                        className=""
                        html={details.summary}
                      />
                    </div>
                    <div className={classes.socialIcons}>
                      <ul style={{padding:"0px"}} >
                        <li style={{marginTop:"2px"}}>Share on:</li>
                        <li>
                          <FacebookShareButton
                            url={url}
                            quote={
                              "next-share is a social share buttons for your next React apps."
                            }
                          >
                            <FacebookIcon className="icons" />
                          </FacebookShareButton>
                        </li>
                        <li>
                          <TwitterShareButton
                            url={url}
                            title={
                              "next-share is a social share buttons for your next React apps."
                            }
                          >
                            <TwitterIcon className="icons" />
                          </TwitterShareButton>
                        </li>
                        <li>
                          <WhatsappShareButton
                            url={url}
                            title={
                              "next-share is a social share buttons for your next React apps."
                            }
                            separator=":: "
                          >
                            <WhatsAppIcon className="icons" />
                          </WhatsappShareButton>
                        </li>
                      </ul>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.productCard}>
                <div className={classes.product_title_h}>
                  <h4 className={classes.product_title_border}>
                    Product Description
                    <span></span>
                  </h4>
                  <UnsafeComponent className="" html={details.description} />
                </div>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.productCard}>
                <div className={classes.product_rating}>
                  <h3>Rate & Review</h3>
                </div>
                <Grid container direction="row" spacing={0}>
                  <Grid item xs={12}>
                    <div className={classes.ratingBx}>
                      <div className={classes.rating}>
                        <span>{details.overall_rating}</span> /5
                      </div>
                      <Rating name="disabled" value={4} disabled />
                      <p>
                        {details.total_review} Review and {details.total_rating}{" "}
                        Rating
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.reviewBx}>
                      <p>Have you used this product?</p>
                      <Button
                        className={classes.reviewBtn}
                        onClick={() => {
                          handleWriteReview();
                        }}
                      >
                        <CreateIcon /> write a Review
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12}>
              {open ? (
                <ReviewForm ServiceType="product_id" ProductID={id} 
                handleUpdateReview={handleUpdateReview}/>
              ) : null}
            </Grid>
            <Grid item xs={12}>

            { reviewlist?.length> 0 ?  reviewlist?.map((item) => (
            <div className="comment-lists" style={{ border: "none" }}>
              <div className="comment-media">
                <AccountCircleIcon />
              </div>
              <div className="comment-content">
                <div className="comment-title">
                  <h3 style={{ marginRight: "5px" }}>{userName.name}</h3>
                  <div className="comment-date">
                    <DateRangeIcon /> <span>{item.created_at}</span>
                  </div>
                </div>
                <div>
                  <Rating name="disabled" value={item.rating} disabled />
                  <span className="rating-box green-box">{item.rating}</span>
                </div>
                <p>
                 {item.comments}
                </p>
              </div>
            </div>
             )) :  <Typography style={{padding:"0 0 30px 20px"}}>Please Add First Review </Typography>
            }
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Box className="loder">
          <Typography>No Product Found</Typography>
        </Box>
      )}
    </>
  );
};
export default ProductDetails;
