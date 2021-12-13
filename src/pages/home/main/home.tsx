import {
  Grid,
  useScrollTrigger,
  Zoom,
  Fab,
  Box,
  Container,
} from "@material-ui/core";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./homestyles";
import React, { useEffect, useState } from "react";
import Banner from "../../../components/home/banner/banner";
import TopCategory from "../../../components/home/topCategory/topCategory";
import NavigatonBar from "../../../components/main/navigationBar/navigationBar";
import Footer from "../../../components/main/footer/footer";
import TopCategorySlider from "../../../components/home/topCategorySlider/topCategorySlider";
import TopProducts from "../../../components/home/topProducts/topProducts";
import TopProductsSlider from "../../../components/home/topProductsSlider/topProductsSlider";
import TopService from "../../../components/home/topService/topService";
import TopCompanies from "../../../components/home/topCompanies/topCompanies";
import PromotionSection from "../../../components/home/promotionSection/promotionSection";
import SiteCategory from "../../../components/home/siteCategories/siteCategories";
import AOS from "aos";
import "aos/dist/aos.css";
import * as configData from "../../../constants.json";
import axios from "axios";
import { useLocation } from 'react-router-dom'


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
   window?: () => Window;
  children: React.ReactElement;
}
const HomePage = (props: Props) => {
  const classes = useStyles();
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const [areaList, setAreaList] = useState<any>([]);
  const [allServices, setAllServices] = useState<any>([]);
  const [serviceList, setServiceList] = useState<any>([]);
  const [topServices, setTopService] = useState<any>([]);
  const [parentCategories,setParentCategories]=useState<any>([]);
  const [topCategories, setTopCategories] = useState<any>();
  const [ourValuableCompanies, setOurValuableCompanies] = useState<any>([]);
  const [footer_details, setDetails] = useState<any[]>([]);
  const [footer_about_us, setFooterAboutUs] = useState<any[]>([]);
  const [home_page_banners, setHomePageBanners] = useState<any[]>([]);
  const [top_category_banner, setTopCategoryBanners] = useState<any[]>([]);
  const [top_product_banner, setTopProductBanners] = useState<any[]>([]);
  const [footer_app_banner, seFooterAppBanners] = useState<any[]>([]);
  const [footer_social_media_links, setFooterSocialMediaLinks] = useState<
    any[]
  >([]);
  const [footer_download_app_links, setFooterDownloadAppLinks] = useState<
    any[]
  >([]);

  const fetchServices = () => {
    axios.get(configData.allpApiUrl + "static_content").then(
      (response) => {
        if (response.data.success) {
          setOurValuableCompanies(response.data.OurValuableCompanies);
          setServiceList(response.data.services);
          setAllServices(response.data.allservices);
          setAreaList(response.data.allCities);
          setTopService(response.data.topServices);
          setTopCategories(response.data.topCategories);
          setDetails(response.data.footerContactData);
          setParentCategories(response.data.parentCategories);
          setFooterAboutUs(response.data.footerAboutUsData);
          setFooterSocialMediaLinks(response.data.footerSocialMediaLinks);
          console.log("this is response",response)
          if (response.data.home_page_banners) {
            setHomePageBanners(response.data.home_page_banners);
          }

          if (response.data.top_category_banners) {
            setTopCategoryBanners(response.data.top_category_banners);
          }

          if (response.data.top_product_banner) {
            setTopProductBanners(response.data.top_product_banner);
          }

          if (response.data.footer_app_banner) {
            seFooterAppBanners(response.data.footer_app_banner);
          }
            setFooterDownloadAppLinks(response.data.footerDownloadAppData);
        }
        //console.log(home_page_banners);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleBack = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");
    //console.log(anchor)
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchServices();
  }, []);
  console.log("this is topCategories",topCategories)
  
  const location = useLocation();
  console.log("currenturl:",location.pathname);

  return (
    <>
        
    <Grid container className={classes.root}>
      {/* <Box id='back-to-top-anchor' >
                <NavigatonBar backGround={ '#239889 0% 0% no-repeat padding-box' }
                    shadow='none' serviceList={serviceList} />
            </Box> */}
      { topCategories ? (
        <Grid container>
          <Grid item sm={12} xs={12} data-aos="zoom-out">
            <Banner
              serviceList={serviceList}  
              allServices={allServices}
              areaList={areaList}
              home_page_banners={home_page_banners}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SiteCategory parentCategories={parentCategories}/>
          </Grid>
          <Grid item sm={12} md={12} lg={12} className={classes.SectionCategory}>
            <Container>
              <TopCategory topCategories={topCategories} />
              <TopCategorySlider topCategoryBanner={top_category_banner} />
              <TopProducts />
              <TopProductsSlider topProductBanner={top_product_banner} />
              <TopService topServices={topServices} />
              <TopCompanies ourValuableCompanies={ourValuableCompanies} />
              <PromotionSection topFooterAppLink={footer_app_banner} />
            </Container>
          </Grid>
          <Zoom in={trigger}>
            <div
              onClick={handleBack}
              role="presentation"
              className={classes.backToTop}
            >
              <Fab
                style={{ backgroundColor: "#1acc8d", color: "#ffff" }}
                size="small"
                aria-label="scroll back to top"
              >
                <KeyboardArrowUpIcon fontSize="large" />
              </Fab>
            </div>
          </Zoom>
        </Grid>
      ) : (
        <Box className={classes.loder}>
          <CircularProgress />
        </Box>
      )}
      {/* <Footer footer_details={footer_details} footer_about_us={footer_about_us} footer_social_media_links={footer_social_media_links} footer_download_app_links={footer_download_app_links} /> */}
    </Grid>
    </>
  );
};

export default HomePage;
