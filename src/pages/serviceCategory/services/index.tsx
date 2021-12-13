import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Link,
  ButtonGroup,
  Snackbar,
  Container,
} from "@material-ui/core";
import SubServicesStyle from "./serviceStyles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SubServiceCard from "./subServiceCard";
import SubServiceSidecard from "./subServiceSidecard";
import axios from "axios";
import configData from "../../../constants.json";
import CircularProgress from "@material-ui/core/CircularProgress";
import ServiceListNotFound from "../../../components/noDataFound/serviceListNotFound";
import VideoPlayer from "react-video-js-player";
import SubServicesDetails from "../subCategory/subServiceDetail";
import MediaQuery from "react-responsive";
import LocationPopupModal from "../../../components/main/locationPopupModal/locationPopupModal";

import {
  useParams,
  useHistory,
  useLocation,
  Link as RouterLink,
} from "react-router-dom";

interface ParamTypes {
  service: string;
}

const SubServices = () => {
  const classes = SubServicesStyle();
  const { service } = useParams<ParamTypes>();
  const location = useLocation<any>();
  const cityId = location.state?.cityId;
  const [servicesInfo, setServiceInfo] = useState<any>([]);
  const [servicesList, SetServicesList] = useState<any>([]);
  const [id, setID] = useState<any>("");
  const [loder, setLoder] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  useEffect(() => {
    fetchCategoryFromD();
    console.log();
  }, [service, cityId]);

  const handleID = (product_ID) => {
    setID(product_ID);
  };

  const handleClose = () => {
    setID("");
  };

  const fetchCategoryFromD = () => {
    setLoder(true);
    if (
      localStorage.getItem("CityID") &&
      localStorage.getItem("CityID") !== null &&
      localStorage.getItem("CityID") !== undefined
    ) {
      const formData = { area_id: localStorage.getItem("CityID") };
      axios
        .post(
          configData.allpApiUrl + "sub-services-by-area/" + service,
          formData
        )
        .then(
          (res) => {
            setLoder(false);
            if (res.data.success) {
              // const result = res.data.data.service_list;
              setServiceInfo(res.data.data.service_info);
              SetServicesList(res.data.data.service_list);
              setLoder(false);
              // result.forEach(function (row, index) {
              //   row.show_addOn_button = false;
              //   if (getItem(row.id)) {
              //     row.addOn_counter = JSON.parse(getItem(row.id).quantity);
              //     row.show_addOn_button = true;
              //   }
              //   else {
              //     row.addOn_counter = 0;
              //   }

              // });
              // setList(result);
            }
          },
          (erorrs) => {
            console.log(erorrs);
            setLoder(false);
          }
        );
    } else {
      setOpenModal(true);
      setLoder(false);
    }
  };
  return (
    <>
      {loder ? (
        <Box className="loder">
          <CircularProgress />
        </Box>
      ) : servicesList.length > 0 ? (
        <Grid container>
          <Container>
            <Grid
              item
              xs={12}
              className={classes.serviceCategoryBanner}
              style={{ marginTop: "100px" }}
            >
              <Box component="div" className={classes.container}>
                {/* <Box className={classes.headings} zIndex="modal">
                                    <Typography className={classes.title} variant='h4'> A nice section heading goes here</Typography>
                                    <Typography className={classes.description} > Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</Typography>
                                </Box> */}
                <VideoPlayer
                  width="auto"
                  hight="450"
                  autoplay={true}
                  controls={true}
                  className={classes.videoPlayer}
                  type="video/mp4"
                  // className="vjs-16-9"
                  src={
                    "http://34.201.65.163/storage/videos/service/ACRepair.mp4"
                  }
                  // src={'https://youtu.be/jTDjO1xf-yc.mp4'}
                />
              </Box>
            </Grid>
          </Container>
          <Container>
            <Box className={classes.serviceContainer}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
                className={classes.breadcrumb}
              >
                <Link
                  className={classes.breadCrumblinks}
                  component={RouterLink}
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className={classes.breadCrumblinks}
                  component={RouterLink}
                  to="/services"
                >
                  Services
                </Link>
                <Typography className={classes.breadCrumblinksActive}>
                  {servicesInfo[0] && servicesInfo[0].service_name
                    ? servicesInfo[0].service_name
                    : "NA"}
                </Typography>
              </Breadcrumbs>
            </Box>
            <MediaQuery query="(min-width: 768px)">
              <Grid className={classes.serviceMainWrap}>
                <Grid container item direction="row" spacing={3}>
                  <Grid
                    item
                    md={6}
                    sm={12}
                    xs={12}
                    className={classes.scrollSection}
                  >
                    <SubServiceCard
                      servicesInfo={servicesInfo}
                      servicesList={servicesList}
                      handleID={handleID}
                    />
                  </Grid>
                  {id == "" ? (
                    ""
                  ) : (
                    <Grid
                      item
                      md={6}
                      sm={12}
                      xs={12}
                      className={classes.scrollSection}
                    >
                      {/* <SubServiceSidecard /> */}
                      <SubServicesDetails id={id} handleClose={handleClose} />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </MediaQuery>
            <MediaQuery query="(max-width: 768px)">
              <Grid className={classes.serviceMainWrap}>
                <Grid container item direction="row" spacing={3}>
                  {id !== "" ? (
                    ""
                  ) : (
                    <Grid
                      item
                      md={6}
                      sm={12}
                      xs={12}
                      className={classes.scrollSection_mobile}
                    >
                      <SubServiceCard
                        servicesInfo={servicesInfo}
                        servicesList={servicesList}
                        handleID={handleID}
                      />
                    </Grid>
                  )}
                  {id == "" ? (
                    ""
                  ) : (
                    <Grid
                      item
                      md={6}
                      sm={12}
                      xs={12}
                      className={classes.scrollSection_mobile}
                    >
                      {/* <SubServiceSidecard /> */}
                      <SubServicesDetails id={id} handleClose={handleClose} />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </MediaQuery>
          </Container>
         
        </Grid>
        
      ) : (
        <ServiceListNotFound />
      )}
       {openModal ? <LocationPopupModal /> : null}
    </>
  );
};
export default SubServices;
