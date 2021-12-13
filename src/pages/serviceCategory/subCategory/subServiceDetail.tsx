import React, { useEffect, useState } from 'react';
import { useCart } from "react-use-cart";
import * as currencyCode from '../../../currencyCode';
import {
    Grid,
    Box,
    Typography,
    Container,
    Link,
    Tabs,
    Tab,
    Button,
    ButtonGroup,
    Paper
} from '@material-ui/core';
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import subCategoryImg from '../../../assets/img/sub-categoryimg2.png';
import clsx from 'clsx';
import categoryHomeStyles from "./subServiceDetailStyle";
import StarIcon from '@material-ui/icons/Star';
import configData from '../../../constants.json';
import CircularProgress from '@material-ui/core/CircularProgress';
import BorderLinearProgress from '@material-ui/core/LinearProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ServiceListNotFound from '../../../components/noDataFound/serviceListNotFound'
import CloseIcon from '@material-ui/icons/Close';
interface ParamTypes {
    sub: string,
}


const SubServicesDetails = (props) => {
    const classes = categoryHomeStyles();
    const history = useHistory();
    // const { sub } = useParams<ParamTypes>();
    // const sub = 14
    const [subService, setSubService] = useState<any>()
    const [loder, setLoder] = useState(false)
    const [item,setItem]=useState<any>()
    const { addItem, getItem, isEmpty, totalItems, items, updateItemQuantity, cartTotal } = useCart();
    const handleClose = props.handleClose
    const sub = props.id



    useEffect(() => {
        fetchServiceDetails()

    }, [props.id])

    const fetchServiceDetails = () => {
        setLoder(true)
        axios.post(configData.allpApiUrl + 'b2b-service/' + sub)
            .then((res) => {
                if (res.data.success) {
                    setSubService(res.data.data)
                    setLoder(false)
                    
                }
            },

                (erorrs) => {
                    setLoder(false)
                    console.log(erorrs);
                })

    }

    function handleSubmit() {
        history.push(`/services/cart`);
    }

    function UnsafeComponent({ html, className }) {
        return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
    }

    
    useEffect(()=>{
        setItem(items.find(x => x.id == sub))
    },[items])
    
    console.log("this is card",subService)
    return (
        <>
            {loder ?
                <Box className='loder'>
                    <CircularProgress />
                </Box>
                :
            
            subService ?
                <>  
                    <Box className={classes.close_btn} onClick={()=>handleClose()}>
                    <CloseIcon />
                    </Box>
                    <Grid container>
                        <Grid item sm={12} xs={12}>
                            <Grid item className={classes.banner} style={{ background: `url(${configData.backendUrl + subService.service_banner}) no-repeat ` }}>
                                {/* <Box component='div' className={classes.container}>
                                    <Container>
                                        <Grid container direction="row" spacing={2}>
                                            <Grid item sm={12}>
                                                
                                                <Box className={classes.headingsLeft} zIndex="modal">
                                                    <Typography className={classes.title}>A nice section heading goes here</Typography>
                                                    <Typography className={classes.description}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </Box> */}
                            </Grid>
                        </Grid>
                    </Grid>
                    <section className={classes.serviceTabPanes}>
                    <Container className={classes.border_bottom}>
                            <Grid container direction="row" spacing={2}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item sm={12}>
                                        <Typography className={classes.subCatMainTitleHeading}>{subService.service_name}</Typography>
                                    </Grid>
                                    <Grid item md={4}>
                                        <Typography className={classes.subCatSmTitle}>Rated <strong> {subService.overall_rating} </strong> <StarIcon style={{ marginRight: "10px" }} /></Typography>
                                        <p className={classes.sub_txt}>Based on {subService.total_review} reviews</p>
                                    </Grid>
                                    <Grid item md={8}>
                                        <div className={classes.price_sec}>
                                            <div className={classes.actual_price}>
                                                <Typography className={classes.subCatSmTitle}>Actual Amount </Typography>
                                                <p className={classes.sub_txt}><strong> ₹ {subService.base_price} </strong></p>
                                            </div>
                                            {/* <div className={classes.turnaround_sec}>
                                                <Typography className={classes.subCatSmTitle}>Turnaround Time </Typography>
                                                <p className={classes.sub_txt}><strong> ₹ 70 /</strong> per Hour</p>
                                            </div> */}
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                        <Container>
                            <Grid container direction="row">
                                <Grid item sm={12}>
                                    <Tabs className={classes.serviceTabsLinks}>
                                        <Tab label="Service Details" ></Tab>
                                    </Tabs>
                                </Grid>
                                <Grid item sm={12}>
                                    <div className={classes.addOnService}>
                                        <Typography variant="h5">
                                            Frequently Added Together
                                        </Typography>
                                        {
                                        item && item.id==subService.id ?
                                        <ButtonGroup size="small" variant="text" aria-label="small outlined button group">
                                            <Button
                                                className={clsx(classes.button, classes.down)}
                                                onClick={() => {
                                                    updateItemQuantity(item.id, item.quantity ? item.quantity - 1 : 1)
                                                }}
                                            >-
                                            </Button >
                                            <Button disabled style={{ color: 'black' }}>{item.quantity}</Button>
                                            <Button
                                                data-service={1}
                                                className={clsx(classes.button, classes.down)}
                                                onClick={() => {
                                                    addItem({
                                                        id: item.id,
                                                        price_with_tax: item.price_with_tax,
                                                        image: configData.backendUrl + item.service_icon,
                                                        cgst: item.cgst, sgst: item.sgst,
                                                        tax: (item.cgst + item.sgst),
                                                        name: item.service_name,
                                                        price: item.price,
                                                        type:"service",
                                                    }, 1)
                                                }}
                                            >+
                                            </Button>
                                        </ButtonGroup>
                                        :
                                        <Button className={classes.addOnServiceBtn}
                                            onClick={() => addItem({
                                                id: subService.id,
                                                price_with_tax: subService.price_with_tax,
                                                image: configData.backendUrl + subService.service_icon,
                                                cgst: subService.cgst,
                                                sgst: subService.sgst,
                                                tax: (subService.cgst + subService.sgst),
                                                name: subService.service_name,
                                                price: subService.base_price,
                                                type:"service",

                                            }, 1)}>Add on services</Button>
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                        </Container>
                    </section>
                    <section className={classes.installationWrapper}>
                        
                        <Container className={classes.categoryContainer}>
                            <Grid container direction="row" spacing={2}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item sm={12}>
                                        <div className={classes.serviceGridContainer}>
                                            <div className={classes.serviceGridItems}>
                                                <div className={classes.serviceGridItemsLeft}>
                                                    <div className={classes.serviceMediaBox}>
                                                        {/* <div className={classes.serviceMediaImg}>
                                                            <img src={configData.backendUrl + subService.service_imgs} />
                                                        </div> */}
                                                        {/* <div className={classes.serviceMediaContent}>
                                                            <h4>{subService.service_name}</h4>
                                                            <p>{subService.summary}</p>

                                                        </div> */}
                                                        <UnsafeComponent className={classes.serviceMediaContent} html={subService.description} />
                                                    </div>
                                                </div>
                                                {/* <div className={classes.serviceGridItemsLeft}>
                                                    <div className={classes.serviceMediaBox}>
                                                        <div className={classes.serviceMediaImg}>
                                                            <img src={configData.backendUrl + subService.service_imgs} />
                                                        </div>
                                                        <div className={classes.serviceMediaContent}>
                                                            <h4>{subService.service_name}</h4>
                                                            <p>{subService.summary}</p>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>

                                            {/* <div className={classes.serviceGridItems}>
                                                <div className={classes.serviceGridItemsMiddle}>
                                                    <div className={classes.serviceMediaBox}>
                                                        <img src="https://image.freepik.com/free-photo/plumber-with-his-arms-crossed_1368-515.jpg" />
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* <div className={classes.serviceGridItems}>
                                                <div className={classes.serviceGridItemsRight}>
                                                    <div className={classes.serviceMediaBox}>
                                                        <div className={classes.serviceMediaImg}>
                                                            <img src={configData.backendUrl + subService.service_imgs} />
                                                        </div>
                                                        <div className={classes.serviceMediaContent}>
                                                            <h4>{subService.service_name}</h4>
                                                            <p>{subService.summary}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.serviceGridItemsRight}>
                                                    <div className={classes.serviceMediaBox}>
                                                        <div className={classes.serviceMediaImg}>
                                                            <img src={configData.backendUrl + subService.service_imgs} />
                                                        </div>
                                                        <div className={classes.serviceMediaContent}>
                                                            <h4>{subService.service_name}</h4>
                                                            <p>{subService.summary}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Container>
                    </section>


                    <section style={{background:'#fff'}}>
                        <Container>
                            <div className={classes.customerRateBox}>
                                <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <Typography className={classes.subCatTitleHeading}>
                                            Customer Rate & Review
                                        </Typography>
                                        <div className="rating-progress">
                                            <div className="review-total">
                                                <h2>
                                                    {subService.overall_rating}
                                                    <StarIcon className="star-icon" />
                                                </h2>
                                                <p>{subService.total_review} Reviews</p>
                                                <Typography className={classes.ratingType}>
                                                    Excellent
                                                </Typography>
                                                <p>5 Reviews</p>
                                            </div>
                                            <div className="all-progress">
                                                <div className="rating-progress-card">
                                                    <h4>
                                                        5
                                                        <StarIcon className="star-icon" />
                                                    </h4>
                                                    <BorderLinearProgress
                                                        variant="determinate"
                                                        value={subService.review_summary.fiveStar[1]}
                                                        className="rating-progress-bar"
                                                    />
                                                    <p className="user-total">
                                                        {subService.review_summary.fiveStar[1]} % </p>
                                                </div>
                                                <div className="rating-progress-card">
                                                    <h4>
                                                        4
                                                        <StarIcon className="star-icon" />
                                                    </h4>
                                                    <BorderLinearProgress
                                                        variant="determinate"
                                                        value={subService.review_summary.fourStar[1]}
                                                        className="rating-progress-bar"
                                                    />
                                                    <p className="user-total">{subService.review_summary.fourStar[1]} % </p>
                                                </div>
                                                <div className="rating-progress-card">
                                                    <h4>
                                                        3
                                                        <StarIcon className="star-icon" />
                                                    </h4>
                                                    <BorderLinearProgress
                                                        variant="determinate"
                                                        value={subService.review_summary.threeStar[1]}
                                                        className="rating-progress-bar yellow"
                                                    />
                                                    <p className="user-total">{subService.review_summary.threeStar[1]} % </p>
                                                </div>
                                                <div className="rating-progress-card">
                                                    <h4>
                                                        2
                                                        <StarIcon className="star-icon" />
                                                    </h4>
                                                    <BorderLinearProgress
                                                        variant="determinate"
                                                        value={subService.review_summary.twoStar[1]}
                                                        className="rating-progress-bar orange"
                                                    />
                                                    <p className="user-total">{subService.review_summary.twoStar[1]} % </p>
                                                </div>
                                                <div className="rating-progress-card">
                                                    <h4>
                                                        1
                                                        <StarIcon className="star-icon" />
                                                    </h4>
                                                    <BorderLinearProgress
                                                        variant="determinate"
                                                        value={subService.review_summary.oneStar[1]}
                                                        className="rating-progress-bar red"
                                                    />
                                                    <p className="user-total">{subService.review_summary.oneStar[1]} %</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>

                                {/* All reviews */}
                                <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                                    <Grid item md={12} sm={12} xs={12}>
                                        {subService.review_list.map((item, index) => (
                                            <div className={classes.commentListBorder}>
                                                <div
                                                    className="comment-lists"
                                                    key={index}
                                                >
                                                    <div className="comment-media">
                                                        <AccountCircleIcon />
                                                    </div>
                                                    <div className="comment-content">
                                                        <div className="comment-title">
                                                            {/* <h3>{item.reviewed_by}</h3> */}
                                                            <h3>Test Name </h3>
                                                            <span className="rating-box green-box">
                                                                {item.rating}
                                                            </span>
                                                            <span><StarIcon /></span>
                                                        </div>
                                                        <p className={classes.commentsLight}>
                                                            {item.comments}.
                                                        </p>
                                                        <div className="comment-date">
                                                            <DateRangeIcon /> <span>{item.created_at}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>

                    </section>

                    <section className={classes.weCanDo}>
                        <Container className={classes.categoryContainer}>
                            <Grid container direction="row" spacing={2}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item sm={12}>
                                        <Typography className={classes.subCatTitleHeading}>We can do much more</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" spacing={1} className={classes.categoryContainer}>
                                    {subService.related_services.original.data.service_info
                                        .map((value, index) => (
                                            <Grid className={classes.card_bxs} item xs={6} md key={index} >
                                                <Link component={RouterLink} to={`/services/sub/` + value.id}>
                                                    <div className={classes.categoryBox}>
                                                        <img src={configData.backendUrl + value.service_imgs} alt="top-product-img" />

                                                        <h3>
                                                            {value.service_name}
                                                        </h3>
                                                    </div>
                                                </Link>
                                            </Grid>))
                                    }
                                </Grid>
                            </Grid>
                        </Container>

                    </section>
                    {/* {!isEmpty ?
                        <Paper className={classes.fixedCartFooter}>
                            <Typography style={{ fontWeight: 'bold', textAlign: 'center' }}>Total Addons : {totalItems} Total Price : {currencyCode.INR} {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(cartTotal)}
                                <Button className={classes.joinButton} onClick={() => { handleSubmit() }}>Continue</Button>
                            </Typography>
                        </Paper>
                        : null
                    } */}
                </>
                :
                <ServiceListNotFound/>
            }
        </>

    );
}
export default SubServicesDetails;