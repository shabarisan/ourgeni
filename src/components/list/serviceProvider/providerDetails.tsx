import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import listStyle from "./listFieldStylesDetails";
import CreateIcon from '@material-ui/icons/Create';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StarIcon from '@material-ui/icons/Star';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import RoomIcon from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';
import cardImg from '../../../assets/img/top-ad-category1.png';
import calendarIcon from '../../../assets/img/company-info-calendar-icon.svg';
import Carousel from "react-multi-carousel";
import configData from "../../../constants.json";
import "react-multi-carousel/lib/styles.css";
import './listdetailstyle.css';
import { DAYS } from '../../../const.js';
import BorderLinearProgress from '@material-ui/core/LinearProgress';
import VideoPlayer from 'react-video-js-player';
import ReviewForm from './reviewForm/reviewForm';
import Modal from '@material-ui/core/Modal';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import {
    WhatsappShareButton,
    TwitterShareButton,
    FacebookShareButton,
    LinkedinShareButton
} from 'next-share';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {
    Grid,
    Container,
    Breadcrumbs,
    Card,
    CardContent,
    Typography,
    Link,
    Button,
    Box
} from '@material-ui/core';
import { PinDropSharp } from '@material-ui/icons';

interface ParamTypes {
    service_id: string
}

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 3
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


const ProviderDetails = (props): any => {
    let history = useHistory();
    const classes = listStyle();
    const { service_id } = useParams<ParamTypes>();
    const [open, setOpen] = useState<any>(false);
    const [viewMoreServices, setViewMoreServices] = useState<any>(9);
    const [viewMoreRewiew, setViewMoreRewiew] = useState<any>(3);
    const [isOpen, setIsOpen] = useState('')
    const cardCarousel = [1, 2, 3, 4, 5];
    const { providerData } = props;
    const title: string = "hello"
    const url: string = window.location.href


    const handleWriteReview = (): any => {
        if (localStorage.getItem('UserId')) {
            setOpen(true)

        }
        else {
            history.push("/login")
        }
    }
    // useEffect(()=>{
    //     handleWriteReview();
    // },[props.writeReview])

    function UnsafeComponent({ html, className }) {
        return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
    }
    return (
        <Grid item sm={12} style={{ paddingTop: '0px', paddingBottom: '60px', background: "#f9f9f9", width: '100%' }}>
            <Container>
                <div className="provider-breadcrumbs">
                    <Breadcrumbs separator={"/"} aria-label="breadcrumb" className={classes.breadcrumb}>
                        <Link className={classes.breadCrumblinks} component={RouterLink} to="/">
                            Home
                        </Link>
                        {history.location.pathname == `/list/service-provider/${service_id}` ?
                            <Link className={classes.breadCrumblinks} component={RouterLink} to="/list/service-provider/">
                                Service Providers Listing
                            </Link>
                            :
                            <Link className={classes.breadCrumblinks} component={RouterLink} to="/list/education-provider/">
                                Education Providers Listing
                            </Link>
                        }
                        <Typography className={classes.breadCrumblinksActive}>{providerData.service_provider_name}</Typography>
                    </Breadcrumbs>
                </div>
                <Grid container direction="row" spacing={3} className="provider-details-main">
                    <Grid item md={8} sm={12} xs={12}>
                        <Card variant="outlined" className="provider-detail-card">
                            <CardContent className="card-body">
                                {/* Business Information */}
                                <div className="provider-info card-padding">
                                    <h4 className="card-title">
                                        Business Information
                                    </h4>
                                    {/* <p className="card-desc">
                                        {providerData.business_information}
                                    </p> */}
                                    <UnsafeComponent className={"card-desc"} html={providerData.business_information} />
                                </div>

                                {/* Company Info */}
                                <div className="company-info card-padding">
                                    <h4 className="card-title">
                                        Company Info
                                    </h4>
                                    <ul className="company-info-cards">
                                        {providerData.year_established &&
                                            <li>
                                                <img src={calendarIcon} alt="calendar-icon" className="icon calendar-icon" />

                                                <h4 className="text">
                                                    Year Of Established
                                                    <span>{providerData.year_established}</span>
                                                </h4>

                                            </li>
                                        }
                                        {providerData.modes_of_payment &&
                                            <li>

                                                <CreditCardIcon className="icon" />
                                                <h4 className="text">
                                                    Mode Of Payment
                                                    <span>{providerData.modes_of_payment}</span>
                                                </h4>

                                            </li>
                                        }
                                    </ul>
                                </div>

                                {/* Photos & Videos */}
                                {providerData.media &&
                                <div className="card-padding">
                                    <h4 className="card-title">
                                        Photos & Videos
                                    </h4>
                                    <div className="photo-slider">
                                   
                                        <Carousel
                                            responsive={responsive}
                                            itemClass="photo-slider-item"
                                            removeArrowOnDeviceType={["tablet", "mobile"]}
                                        >
                                            {
                                                providerData.media && providerData.media.map((item, index) => {
                                                    return (
                                                        <Card className="similar-cards-box" key={index}>
                                                            <CardActionArea>
                                                                <CardMedia
                                                                    component="img"
                                                                    alt="Contemplative Reptile"
                                                                    className="video-img"
                                                                    height="140"
                                                                    image={configData.backendUrl + item.thumnail}
                                                                    title="Contemplative Reptile"
                                                                />
                                                                {item.filetype == "video" &&
                                                                    <button className="btn-play" onClick={() => setIsOpen(index)}><PlayCircleFilledIcon/></button>
                                                                }
                                                            </CardActionArea>
                                                            {item.filetype == "video" &&
                                                            <Modal
                                                                open={isOpen===index}
                                                                onClose={() => setIsOpen('')}
                                                                aria-labelledby="simple-modal-title"
                                                                aria-describedby="simple-modal-description"
                                                                className="video-modal-small"
                                                            >
                                                                <div className="video-inner-box">
                                                                    <VideoPlayer
                                                                        width="1000"
                                                                        autoplay={isOpen===index}
                                                                        controls={true}
                                                                        src={configData.backendUrl+item.url}
                                                                    />
                                                                </div>
                                                            </Modal>
                                                            }
                                                        </Card>
                                                    )
                                                })
                                            }
                                        </Carousel>
                                       
                                    </div>
                                </div>
                                }

                                {/* Services Offered */}
                                <div className="card-padding">
                                    <h4 className="card-title">
                                        Services Offered
                                    </h4>
                                    <ul className="services-list">
                                        {providerData.available_services && providerData.available_services.slice(0, viewMoreServices).map((item, index) => (
                                            <li>
                                                <CheckCircleIcon className="icon" />
                                                <span className="text">{item.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {providerData.available_services && viewMoreServices <= providerData.available_services.length &&
                                        <Button className="view_more_btn" onClick={() => setViewMoreServices(viewMoreServices + 9)} endIcon={<ExpandMoreIcon />}>View more</Button>
                                    }
                                </div>
                                {/*Rate & Review*/}
                                <div className="card-padding" id="review">
                                    <h4 className="card-title">
                                        Rate & Review
                                    </h4>
                                    <div className="rate-review-card" >
                                        <Grid container direction="row" alignItems="center" spacing={3}>
                                            <Grid item md={8} sm={12} xs={12}>
                                                <div className="rating-progress">
                                                    <div className="review-total">
                                                        <h2>
                                                            {providerData.total_rating}
                                                            <StarIcon className="star-icon" />
                                                        </h2>
                                                        <p>{providerData.total_review} Reviews</p>
                                                    </div>
                                                    <div className="all-progress">
                                                        <div className="rating-progress-card">
                                                            <h4>
                                                                5
                                                                <StarIcon className="star-icon" />
                                                            </h4>
                                                            <BorderLinearProgress
                                                                variant="determinate"
                                                                value={providerData.review_summary.fiveStar[1]}
                                                                className="rating-progress-bar"
                                                            />
                                                            <p className="user-total">
                                                                {providerData.review_summary.fiveStar[1]} %</p>
                                                        </div>
                                                        <div className="rating-progress-card">
                                                            <h4>
                                                                4
                                                                <StarIcon className="star-icon" />
                                                            </h4>
                                                            <BorderLinearProgress
                                                                variant="determinate"
                                                                value={providerData.review_summary.fourStar[1]}
                                                                className="rating-progress-bar"
                                                            />
                                                            <p className="user-total">{providerData.review_summary.fourStar[1]} %</p>
                                                        </div>
                                                        <div className="rating-progress-card">
                                                            <h4>
                                                                3
                                                                <StarIcon className="star-icon" />
                                                            </h4>
                                                            <BorderLinearProgress
                                                                variant="determinate"
                                                                value={providerData.review_summary.threeStar[1]}
                                                                className="rating-progress-bar yellow"
                                                            />
                                                            <p className="user-total">{providerData.review_summary.threeStar[1]} %</p>
                                                        </div>
                                                        <div className="rating-progress-card">
                                                            <h4>
                                                                2
                                                                <StarIcon className="star-icon" />
                                                            </h4>
                                                            <BorderLinearProgress
                                                                variant="determinate"
                                                                value={providerData.review_summary.twoStar[1]}
                                                                className="rating-progress-bar orange"
                                                            />
                                                            <p className="user-total">{providerData.review_summary.twoStar[1]} %</p>
                                                        </div>
                                                        <div className="rating-progress-card">
                                                            <h4>
                                                                1
                                                                <StarIcon className="star-icon" />
                                                            </h4>
                                                            <BorderLinearProgress
                                                                variant="determinate"
                                                                value={providerData.review_summary.oneStar[1]}
                                                                className="rating-progress-bar red"
                                                            />
                                                            <p className="user-total">{providerData.review_summary.oneStar[1]} %</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item md={4} sm={12} xs={12} className="right-btn" >
                                                <Button className="btn btn-write-review"
                                                    onClick={() => handleWriteReview()}>
                                                    <CreateIcon className="icon-create" />
                                                    Write a review
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                                {open ?

                                    <ReviewForm ServiceType="listing_service_provider_id" ServiceID={service_id} />
                                    : null
                                }
                                <div className="comment-list-container">
                                    {
                                        providerData.review_list && providerData.review_list.slice(0, viewMoreRewiew).map((item, index) => {
                                            return (
                                                <div className="comment-lists" key={index} >
                                                    <div className="comment-media">
                                                        <AccountCircleIcon />
                                                    </div>
                                                    <div className="comment-content">
                                                        <div className="comment-title">
                                                            <h3>{item.reviewed_by}</h3>
                                                            <span className="rating-box green-box">{item.rating}</span>
                                                            <span><StarIcon /></span>
                                                        </div>
                                                        <p>{item.comments}.</p>
                                                        <div className="comment-date">
                                                            <DateRangeIcon /> <span>{item.created_at}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {providerData.review_list && viewMoreRewiew <= providerData.review_list.length &&
                                    <div className="comment-footer">
                                        <Button className="view_more_btn" onClick={() => setViewMoreRewiew(viewMoreRewiew + 3)} endIcon={<ExpandMoreIcon />}>View more</Button>
                                    </div>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <Card variant="outlined" className="provider-detail-card mb-20">
                            <CardContent className="card-body">
                                <div className="provider-info card-padding">
                                    <h4 className="card-title mb-0">
                                        Business Information
                                    </h4>
                                </div>
                                <div className="company-info card-padding">
                                    <ul className="dates">
                                        {providerData.available_timings && providerData.available_timings.map((item, index) => (
                                            <li key={index}>
                                                <span>{DAYS[index].day}</span>
                                                {item.display_time}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                        <Card variant="outlined" className="provider-detail-card mb-20">
                            <CardContent className="card-body">
                                <div className="provider-info card-padding">
                                    <h4 className="card-title mb-0">
                                        <PhoneInTalkIcon /> Contact us
                                    </h4>
                                </div>
                                <div className="company-info card-padding">
                                    <ul className="dates">
                                        <li>
                                            Phone : (+91) {providerData.primary_contact_no}
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card variant="outlined" className="provider-detail-card mb-20">
                            <CardContent className="card-body">
                                <div className="provider-info card-padding">
                                    <h4 className="card-title mb-0">
                                        Share & Send Details
                                    </h4>
                                </div>
                                <div className="company-info card-padding">
                                    <ul className="social-buttons">
                                        <li>
                                            <Button variant="contained" className="social-btn whatsapp">
                                                <WhatsappShareButton
                                                    url={url}
                                                    title={'next-share is a social share buttons for your next React apps.'}
                                                    separator=":: "

                                                >
                                                    <WhatsAppIcon className="icons" /> Whatsapp
                                                </WhatsappShareButton>

                                            </Button>
                                            <Button variant="contained" className="social-btn facebook">
                                                <FacebookShareButton
                                                    url={url}
                                                    quote={'next-share is a social share buttons for your next React apps.'}
                                                >
                                                    <FacebookIcon className="icons" /> Facebook
                                                </FacebookShareButton>
                                            </Button>
                                            <Button variant="contained" className="social-btn twitter">
                                                <TwitterShareButton
                                                    url={url}
                                                    title={'next-share is a social share buttons for your next React apps.'}
                                                >
                                                    <TwitterIcon className="icons" /> Twitter
                                                </TwitterShareButton>
                                            </Button>
                                            <Button variant="contained" className="social-btn linkedin">
                                                <LinkedinShareButton
                                                    url={url}>
                                                    <LinkedInIcon className="icons" /> LinkedIn
                                                </LinkedinShareButton>

                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>
                <Grid container direction="row" spacing={3} className="provider-details-main">
                    <Grid item sm={12} xs={12}>
                        <div className="provider-info card-padding">
                            <h4 className="card-title mb-0">
                                Similar business
                            </h4>
                        </div>
                        <div className="similar-cards">
                            <ul>
                                {
                                    providerData.similar_services && providerData.similar_services.map((item, index) => {
                                        return (
                                            <li>
                                                <Link component={RouterLink} to={item.url}>
                                                    <Card className="similar-cards-box">
                                                        <CardActionArea className="card-content-bx">
                                                            <CardMedia
                                                                component="img"
                                                                alt="Contemplative Reptile"
                                                                height="140"
                                                                image={configData.backendUrl + item.service_provider_img}
                                                                title="Contemplative Reptile"
                                                            />
                                                            <CardContent className="similar-card-body">
                                                                <Typography gutterBottom variant="h6">
                                                                    {item.service_provider_name}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    <RoomIcon /> {item.location}
                                                                </Typography>
                                                                <Box className="card-ratings" component="div" borderColor="transparent">
                                                                    <Rating name="read-only" value={item.avg_rating} readOnly />
                                                                    <span className="review">{item.total_review} Review</span>
                                                                </Box>

                                                            </CardContent>
                                                        </CardActionArea>

                                                    </Card>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    )
}
export default ProviderDetails;