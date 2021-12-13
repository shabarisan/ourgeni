import { AppBar, Box, Button, Toolbar, Container } from "@material-ui/core";
import Link, { LinkProps } from "@material-ui/core/Link";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Link as RouterLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import Logo from "../../../assets/img/our_genie_logo.svg";
import navStyles from "./navigationStyle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CartDrawer from "../cartDrawer/cartDrawer";
import firebaseConfig from "../../../firebaseConfig";
import firebase from "firebase";
import MobileMenu from "./mobileMenu/mobileMenu";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import RoomIcon from "@material-ui/icons/Room";
import * as api from "../../../services/api/serviceListing";
import axios from "axios";
import { Filter } from "@material-ui/icons";
import { Helmet } from 'react-helmet';

const NavigatonBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElService, setAnchorElService] = React.useState(null);
  const [areaList, setAreaList] = useState<any>();
  const history = useHistory();
  const { pathname } = useLocation<any>();
  const [location, setLocation] = React.useState("");
  const [cityID, setCityID] = React.useState("");
  const [currentCity, setCurrentCity] = React.useState("");
  let match = useRouteMatch();
  const [newData, setNewData] = React.useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    if(res){
      setCurrentCity(res.data.city);
    }
    
    // setCurrentCity('bangalore');
  };

  useEffect(() => {
    var data =
      areaList &&
      areaList.filter(
        (item) =>
          item.city_info.city_name.toLowerCase() == currentCity
      );
    if (localStorage.getItem("CityID") == undefined) {
      // if (item.city_info.city_name == currentCity) {
      //     return currentCity;
      //   } else {
      //     return null;
      //   }
      // });

      if (data && data.length > 0) {
        setLocation(data[0]);
        localStorage.setItem("CityID", data[0].id);
        // localStorage.setItem("CityName",data[0].city_info.city_name);
        setNewData(data);
      } else {
        // setAreaList(data);
        setLocation(currentCity);
      }
    }
  }, [areaList, currentCity]);

  console.log(878787, newData);

  const handleClick = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickService = (event) => {
    if (anchorElService !== event.currentTarget) {
      setAnchorElService(event.currentTarget);
    }
  };

  const handleCloseService = () => {
    setAnchorElService(null);
  };

  const Logout = () => {
    localStorage.setItem("user_name", "");
    localStorage.setItem("UserId", "");
    localStorage.setItem("UserEmail", "");
    localStorage.setItem("mobile_no", "");
    localStorage.setItem("user_delivery_address", "");
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
    firebase.auth().signOut();

    window.location.href = "/";
  };

  const classes = navStyles();
  const [user_details, setDetails] = useState({
    name: "",
  });
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  useEffect(() => {
    console.log(props);
    const userName = localStorage.getItem("user_name");
    if (userName) {
      setDetails({
        name: userName,
      });
    }
  }, []);

  const handleChange = (event) => {
    setLocation(event.target.value);
    if (event.target.value !== null) {
      if (pathname.includes("services/sub/service")) {
        history.push({
          pathname: pathname,
          state: {
            cityId: event.target.value.id,
          },
        });
      }
      setCityID(event.target.value.id);
      localStorage.setItem("CityID", event.target.value.id);
      localStorage.setItem("CityName", event.target.value.city_info.city_name);
      setLocation(event.target.value);
    }
  };

  // const handleChange = (event) => {
  //     var value=event.target.value
  //     setLocation(value)
  //     if (event.target.value !== null) {
  //         if(pathname.includes('services/sub/service')){
  //         // history.push({
  //         //     pathname: pathname,
  //         //     state: {
  //         //         cityId: areaList[value].id
  //         //     }
  //         // })
  //         localStorage.setItem('CityID', event.target.value.id);
  //         localStorage.setItem('CityName', event.target.value.city_info.city_name);
  //         setLocation(event.target.value)
  //     }
  //         // setCityID(areaList[value].id)
  //         // localStorage.setItem('CityID', areaList[value].id);
  //         // localStorage.setItem('CityName', areaList[value].city_info.city_name);
  //         setLocation(value)
  //     }

  // };

  const fetchLocationList = async () => {
    api.fetchAreasList().then(
      (response) => {
        if (response && response.success) {
          var Id = localStorage.getItem("CityID");
          setLocation(response.data.find((x) => x.id == Id));
          setAreaList(response.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    fetchLocationList();
  }, []);

  console.log("this is userDetails name", user_details.name);
  console.log("currenturl:",{pathname});
  return (
    <>
  <Helmet>
        <title>Home Page our Geni app</title>
        <meta name="description" content="Some tags are vital for SEO. Others have little or no impact on rankings. Here's every type of meta tag you need to know about.The purpose of a meta description is to reflect the essence of a page, but with more details and context."/>        <meta name="theme-color" content="#008f68" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="http://example.com/" />



      </Helmet>


    <AppBar
      className={classes.root}
      position="fixed"
      style={{ background: props.backGround, boxShadow: props.shadow }}
    >
      <Container>
        <Toolbar disableGutters={true}>
          <Link component={RouterLink} to="/">
            <img src={Logo} alt="Company name" className={classes.img} />
          </Link>
          <Box className={classes.locationBox}>
            <RoomIcon />
            <FormControl variant="standard">
              <Select
                className={classes.locationNavSelect}
                id="demo-simple-select-standard"
                value={location}
                onChange={handleChange}
                label=""
              >
                {!localStorage.getItem("CityID") &&
                  newData &&
                  newData.length == 0 && (
                    <MenuItem
                      className={classes.menu_option}
                      value={currentCity}
                    >
                      {currentCity}
                    </MenuItem>
                  )}
                {areaList?.length > 0 &&
                  areaList.map((item, index) => (
                    <MenuItem
                      className={classes.menu_option}
                      value={item}
                      key={item.id}
                    >
                      {item.area_name
                        ? item.area_name
                        : //  ', ' +
                          //     item.city_info.city_name + ', ' +
                          //     item.state_info.state_name + ', ' +
                          //     item.country_info.country_name
                          ""}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
             {/* <Button className={classes.button} component={RouterLink} to="/">
              {" "}
              Home
            </Button>
            <Button
              className={classes.button}
              component={RouterLink}
              to="/about-us"
            >
              About us
            </Button>
            <Button
              aria-owns={anchorElService ? "service-menu" : undefined}
              aria-haspopup="true"
              onClick={handleClickService}
              onMouseOver={handleClickService}
              className={classes.button}
            >
              Services <ExpandMoreIcon />
            </Button> 
            <Menu
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              id="service-menu"
              anchorEl={anchorElService}
              open={Boolean(anchorElService)}
              onClose={handleCloseService}
              MenuListProps={{ onMouseLeave: handleCloseService }}
              getContentAnchorEl={null}
              className={classes.menuDrawer}
            >
              {props.serviceList && props.serviceList.length > 0 ? (
                props.serviceList.map((task) => (
                  <MenuItem key={task.id} onClick={handleClose}>
                    <Link
                      component={RouterLink}
                      // to={`/services/sub/service/${task.id}`}
                      // state={{ from: 'occupation' }}
                      to={{
                        pathname: `/services/sub/service/${task.id}`,
                        state: {
                          cityId: cityID,
                        },
                      }}
                      className={classes.menuLinks}
                    >
                      {task.service_name}
                    </Link>
                  </MenuItem>
                ))
              ) : (
                <MenuItem>No service found</MenuItem>
              )}
            </Menu>
            <Button
              className={classes.button}
              component={RouterLink}
              to="/blog"
            >
              Blog
            </Button> */}
            <Button
              className={classes.button}
              component={RouterLink}
              to="/become-a-partner"
            >
              {"Become A Partner"}
            </Button>
            { localStorage.getItem("UserId") ? (
              <>
                <Button
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  onMouseOver={handleClick}
                  className={classes.button}
                >
                  {localStorage.getItem("user_name")}
                </Button>
                <Menu
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  MenuListProps={{ onMouseLeave: handleClose }}
                  getContentAnchorEl={null}
                  className={classes.menuDrawer}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      component={RouterLink}
                      to="/user-profile"
                      className={classes.menuLinks}
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      component={RouterLink}
                      to={`${match.url}services/service-booking-history`}
                      className={classes.menuLinks}
                    >
                      My account
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      onClick={() => {
                        Logout();
                      }}
                      className={classes.menuLinks}
                    >
                      Logout
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  className={classes.signUpButton}
                  component={RouterLink}
                  to="/login"
                >
                  {"Sign in"}
                </Button>
                <Button
                  className={classes.signInButton}
                  component={RouterLink}
                  to="/register"
                >
                  /&nbsp;{"Sign up"}
                </Button>
              </>
            )}
            <CartDrawer />
          </div>
          <Box className={classes.bottomNav}>
            <MobileMenu
              serviceList={props.serviceList}
              userDetails={user_details}
              LogoutClick={Logout}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
};
export default NavigatonBar;
