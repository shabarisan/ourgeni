import { Grid, Box, Link, Container } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import logo from "../../../assets/img/logo.png";
import locationIcon from "../../../assets/img/contacticon1.svg";
import mailIcon from "../../../assets/img/contacticon3.svg";
import mmobileIcon from "../../../assets/img/contacticon2.svg";
import appleStore from "../../../assets/img/downapp-1.svg";
import googleStror from "../../../assets/img/downapp-2.svg";
import useStyles from "./footerStyles";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";
import bxlInstagram from "@iconify-icons/bx/bxl-instagram";
import bxlFacebook from "@iconify-icons/bx/bxl-facebook";
import bxlLinkedin from "@iconify-icons/bx/bxl-linkedin";
import configData from "../../../constants.json";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const removeAlert = () => ({ type: "REMOVE_ALERT", message: "" });
const Footer = (props) => {
  let icons = [];
  icons["mailIcon"] = mailIcon;
  icons["locationIcon"] = locationIcon;
  icons["mmobileIcon"] = mmobileIcon;

  let socialIcons = [];

  socialIcons["Instagram"] = bxlInstagram;
  socialIcons["Facebook"] = bxlFacebook;
  socialIcons["Linkedin"] = bxlLinkedin;
  socialIcons["googleStror"] = googleStror;
  socialIcons["appleStore"] = appleStore;

  function htmlEntities(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const classes = useStyles();
  const [country ,setCountry] = useState<any>();
  const [showAlert, setAlert] = React.useState(false);
  const [butttondisabled, setbuttondisabled] = React.useState(false);
  const [showWarningAlert, setWarningAlert] = React.useState(false);
  const [Alertmessage, setAlertMessage] = useState<any>([]);
  const initialFormData = Object.freeze({
    email: "",
    browser: navigator.userAgent,
  });

  useEffect(()=> {
    if(props.footerContent !== undefined) {
      setCountry(props?.footerContent[0]?.locations)
    }
  },[props])
  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    var filter = /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+).([a-zA-Z]{2,5})$/;
    if (
      !filter.test(e.target.value) ||
      e.target.value.length < 7 ||
      e.target.value.length > 100
    ) {
      setWarningAlert(true);
      setAlertMessage("Please provide a valid email address");
    } else {
      setWarningAlert(false);
      setAlertMessage("");
    }
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var emailId = formData.email;
    var filter = /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+).([a-zA-Z]{2,5})$/;

    if (!filter.test(emailId) || emailId.length < 7 || emailId.length > 100) {
      setWarningAlert(true);
      setAlertMessage("Please provide a valid email address");
      return false;
    } else {
      setWarningAlert(false);
      setAlertMessage("");
    }
    addNewsletter();
  };

  const addNewsletter = async () => {
    setbuttondisabled(true);
    const res = await axios.post(
      configData.desktopApiUrl + "newsletter/subscribe",
      formData
    );
    if (res.data.success === true) {
      setAlert(true);
      console.log("response",res)
      setAlertMessage(res.data.message);
    } else {
      setWarningAlert(true);
      setAlertMessage(res.data.message);
    }
  };

  console.log(
    123456,
    props.footerContent[0] && props.footerContent[0].applinks
  );
  console.log("this is countrry ",country)

  return (
    <div className={classes.footer}>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <ul className={classes.footerMenuLinks}>
              {props.footerContent[0] &&
                props.footerContent[0].links.map((item) => (
                  <Link
                    component={RouterLink}
                    to={`/${item.link}`}
                    style={{ marginLeft: "16px" }}
                  >
                    {item.title}
                  </Link>
                ))}
            </ul>
            <Box className={classes.footer_basic_bx}>
              
              <p style={{ fontWeight: 700 }}>Serving in</p>
              { country!== undefined && country.map((item,index) => (
              <ul>
                <li className={classes.countryName}>
                  <span>{item.name}</span>
                  {item.city.map((city) => (
                  <ul className={classes.serving}>
                    <li>
                      <a href="#" target="_blank">
                        {city.name}
                      </a>
                    </li>
                    
                  </ul>
                  ))}
                </li>
                {/* <li className={classes.countryName}><span>India</span>
                                <ul className={classes.serving}>
                                    <li><a href="#" target="_blank">Sydney</a></li>
                                    <li><a href="#" target="_blank">Melbourne</a></li>
                                    <li><a href="#" target="_blank">Sydney</a></li>
                                    <li><a href="#" target="_blank">Melbourne</a></li>
                                    <li><a href="#" target="_blank">Sydney</a></li>
                                    <li><a href="#" target="_blank">Melbourne</a></li>
                                    <li><a href="#" target="_blank">Sydney</a></li>
                                    <li><a href="#" target="_blank">Melbourne</a></li>
                                    <li><a href="#" target="_blank">Sydney</a></li>
                                    <li><a href="#" target="_blank">Melbourne</a></li>
                                    <li><a href="#" target="_blank">Sydney</a></li>
                                    <li><a href="#" target="_blank">Melbourne</a></li>
                                    <li><a href="#" target="_blank">Sydney</a></li>
                                    <li><a href="#" target="_blank">Melbourne</a></li>
                                    <li><a href="#" target="_blank">Sydney</a></li>
                                    <li><a href="#" target="_blank">Melbourne</a></li>
                                </ul>
                            </li>
                            <li className={classes.countryName}><span>India</span>
                                <ul>
                                    <li><a href="#" target="_blank">Riyadh</a></li>
                                    <li><a href="#" target="_blank">Jeddah</a></li>
                                </ul>
                            </li>
                            <li className={classes.countryName}>
                                <span>SGP</span>
                                <ul>
                                    <li><a href="#" target="_blank">Singapore</a></li>
                                </ul>
                            </li>
                            <li className={classes.countryName}>
                                <span>UAE</span>
                                <ul>
                                    <li><a href="#" target="_blank">Dubai</a></li>
                                    <li><a href="#" target="_blank">Abu Dhabi</a></li>
                                    <li><a href="#" target="_blank">Sharjah</a></li>
                                </ul>
                            </li> */}
             </ul>
))}
            </Box>
            <Box className={classes.footer_bottom_bx}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  className={classes.footer_bottom_bx1}
                >
                  <Link component={RouterLink} to="/">
                    <img className={classes.logo} src={logo} alt="logo" />
                  </Link>
                  @2020 Our Genie company
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  className={classes.iconContainer}
                >
                  {props.footerContent[0] &&
                    props.footerContent[0].sociallinks.map((value2) => (
                      <Link
                        underline="none"
                        href={value2.link}
                        className={classes.mediaIcons}
                        key={value2.name}
                      >
                        <Icon
                          icon={socialIcons[value2.name]}
                          className={classes.iconSvg}
                        />
                      </Link>
                    ))}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  className={classes.storeContainer}
                >
                  {props.footerContent[0] &&
                    props.footerContent[0].applinks.map((value3) => (
                      <Link underline="none" href={value3.link} key={value3.id}>
                        <img
                          src={value3.iconUrl}
                          className={classes.storeIcons}
                          alt="app-icons"
                        />
                      </Link>
                    ))}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        {/* <Grid container>
                    <Grid item xs={12} sm={3} className={classes.logoContainer}>
                        <Box className="footer-logo">
                            <Link component={RouterLink} to="/">
                                <img className={classes.logo} src={logo} alt="logo" />
                            </Link>
                            
                        </Box>
                        {props.footer_about_us.map((value1) => (
                            <Typography key={value1.id} className={classes.footerAboutUs}>{htmlEntities(value1.content)}</Typography>
                            ))
                        }
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box className={classes.quickLinks}>
                            <Typography variant='h6' className={classes.footerHeading}>Quick Links</Typography>
                            <List className={classes.footerList}>
                                <ListItem className={classes.list}><Link underline='none' href="#">About us</Link></ListItem>
                                <ListItem className={classes.list}><Link underline='none' href="#">Service</Link></ListItem>
                                <ListItem className={classes.list}><Link underline='none' href="#">Blog</Link></ListItem>
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box className={classes.contactInfo}>
                            <Typography variant='h6' className={classes.footerHeading}>Contact info</Typography>
                            {props.footer_details.map((value) => (
                            <List  className="contactList"  key={value.id}>
                                <ListItem className={classes.list}>
                                    <img src={icons[value.icon]} className={classes.icons} alt={"contact-iocn" + value.value}/> 
                                    <Link underline='none'>
                                        <Box>{value.value}</Box>
                                    </Link>
                                </ListItem>
                            </List>))
                          }
                        </Box>
                    </Grid>
                    <Grid container item xs={12} sm={4} className={classes.newsLetter}>
                        <Grid item xs={12} >
                            <Typography variant='h6' className={classes.footerHeading}>Subscribe to our newsletter</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                                    id="email"
                                    name="email"
                                    variant='outlined'
                                    className={classes.formInput}
                                    placeholder='Email Address'
                                    onChange={handleChange}
                                    InputProps={{
                                    endAdornment:<InputAdornment position="end">
                                        
                                        <Button onClick={handleSubmit} disabled={butttondisabled}  variant="contained" type="submit" className={classes.formButton} >
                                            Send
                                        </Button>
                                    </InputAdornment>
                                }}
                                />
                            { showAlert ? 
                                <Alert severity="success" className={classes.alertClass}>
                                        {Alertmessage}
                                </Alert> 
                            : null 
                            }
                            { showWarningAlert ? 
                                <Alert severity="warning" className={classes.alertClass}>
                                        {Alertmessage}
                                </Alert>
                            :null
                            }
                        </Grid>
                        
                        <Grid item xs={12} className={classes.iconContainer}>
                        {props.footer_social_media_links.map((value2) => (
                            <Link underline='none' href={value2.link} className={classes.mediaIcons} key={value2.id} >
                                <Icon icon={socialIcons[value2.icon]} className={classes.iconSvg} />
                            </Link>))
                        }
                        </Grid>
                        <Grid item xs={12} className={classes.storeContainer}>
                        {props.footer_download_app_links.map((value3) => (
                                <Link underline='none' href={value3.link} key={value3.id}><img src={socialIcons[value3.icon]}className={classes.storeIcons} alt="app-icons" /></Link>
                            ))
                        }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider className={classes.divider} />
                    <Grid container className={classes.termsList}>
                        <Grid item xs={12} md={4} className={classes.termsItems}> <Link underline='none' href="#">Terms & Conditions</Link></Grid>
                        <Grid item xs={12} md={4} className={classes.termsItems}> <Link underline='none' href="#">Privacy policy</Link></Grid>
                        <Grid item xs={12} md={4}className={classes.termsItems}> <Link underline='none' href="#">@2020 Our Gine company</Link></Grid>
                    </Grid>
                </Grid> */}
      </Container>
    </div>
  );
};
export default Footer;
