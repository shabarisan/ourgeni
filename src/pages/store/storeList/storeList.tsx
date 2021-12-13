import React, { useEffect, useState } from "react";
import categoryHomeStyles from "./storeListStyles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AppsIcon from "@material-ui/icons/Apps";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import cleaningKit from "../../../assets/img/cleaningkit.png";
import GradeSharpIcon from "@material-ui/icons/GradeSharp";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StarIcon from "@material-ui/icons/Star";
import { useParams, Link as RouterLink } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as api from "../../../services/api/storesApi";
import configData from "../../../constants.json";
import StoreGrid from "./storeGrid";
import ServiceProviderNotFound from "../../../components/noDataFound/serviceProviderNotFound";
import MediaQuery from "react-responsive";
import StoreViewList from './storeViewList';
import clsx from 'clsx';

import {
  Grid,
  Typography,
  Link,
  Box,
  Button,
  TextField,
  Container,
  Card,
  CardContent,
  InputBase,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Select,
  MenuItem,
  Tooltip,
  Breadcrumbs,
  OutlinedInput,
  TooltipProps,
} from "@material-ui/core";
import { setMaxListeners } from "process";

interface ParamTypes {
  id: string;
}

const StoreList = () => {
  const { id } = useParams<ParamTypes>();
  const classes = categoryHomeStyles();
  const [productList, setProductList] = useState<any>();
  const [filter, setFilter] = useState<any>(false);
  const [category, setCategory] = useState<any>([]);
  const [categoryID, setCategoryID] = useState<any>();
  const [brandID, setBrandID] = useState<any>();
  const [brand, setBrand] = useState<any>([]);
  const [viewGrid , setViewGrid] = useState<any>(true);
  const [viewList , setViewList] = useState<any>(false)
  const list = [
    { title: "4 & above", value: 4 },
    { title: "3 & above", value: 3 },
    { title: "2 & above", value: 2 },
    { title: "1 & above", value: 1 },
  ];
  const [rating, setRating] = useState<any>(list);
  const [loder, setLoder] = useState(false);
  const [value, setValue] = useState<any>();
  const [searchBar, setSearchBar] = useState<any>();
  const productListCopy = productList;
  useEffect(() => {
    getProductCategories(id);
    
  }, [id]);

  useEffect(()=> {
    var data = productListCopy;
    if(searchBar){
        data = data?.filter((item) =>
        item?.title?.toLowerCase().includes(searchBar?.toLowerCase())
      )
    }
  console.log("this is updated productlist",data)
  setProductList(data);
  },[searchBar])
  

const handleCheckCategory = (cat_id) => {
    setCategory((prevState) => {
      prevState.forEach((item) => {
        if (item.cat_id === cat_id) {
          item.isActive = !item.isActive;
        }
      });
      return [...prevState];
    });
    let activeID = category
      .filter((value) => value.isActive == true)
      .map(({ cat_id }) => cat_id);

    var pairs = activeID.map(function (value) {
      return +encodeURIComponent(value);
    });

    var query_string = pairs.join(",");
    setCategoryID(query_string);
    var catID = {
      catID: query_string,
      brandID: brandID,
      overall_rating: value,
    };
    console.log("brandID", catID);
    fetchFilterProduct(catID, id);
  };

  const clearSearch = () => {
    setCategory("");
    setBrand("");
    setSearchBar("");
    setRating((prevState) => {
      prevState.forEach((item) => {
        item.isActive = false;
      });
      return [...prevState];
    });
    getProductCategories(id);
  };

  const handleCheckRating = (val) => {
    setRating((prevState) => {
      prevState.forEach((item) => {
        if (item.value === val) {
          item.isActive = !item.isActive;
        }
      });
      return [...prevState];
    });

    let activeID = rating
      .filter((value) => value.isActive == true)
      .map(({ value }) => value);

    var pairs = activeID.map(function (value) {
      return +encodeURIComponent(value);
    });

    var query_string = pairs.join(",");
    console.log("query_string", query_string);
    setValue(query_string);
    var overall_rating = {
      overall_rating: query_string,
      brandID: brandID,
      catID: categoryID,
    };
    fetchFilterProduct(overall_rating, id);
  };

  const handleCheckBrand = (brand_id) => {
    setBrand((prevState) => {
      prevState.forEach((item) => {
        if (item.brand_id === brand_id) {
          item.isActive = !item.isActive;
        }
      });
      return [...prevState];
    });
    let activeID = brand
      .filter((value) => value.isActive == true)
      .map(({ brand_id }) => brand_id);

    var pairs = activeID.map(function (value) {
      return +encodeURIComponent(value);
    });
    var query_string = pairs.join(",");
    setBrandID(query_string);
    var brandID = {
      brandID: query_string,
      catID: categoryID,
      overall_rating: value,
    };
    console.log("brandID", brandID);
    fetchFilterProduct(brandID, id);
  };

  const handleFilter = () => {
    setFilter(!filter);
  };

  const fetchFilterProduct = (obj, id) => {
    setLoder(true);
    api.fetchFilterProductList(obj, id).then(
      (response) => {
        setLoder(false);
        if (response && response.success) {
          setProductList(response.data.products);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getProductCategories = (id) => {
    setLoder(true);
    api.fetchProductList().then((response) => {
      setLoder(false);
      if (response.success) {
        setProductList(response.data.products);
        setCategory(response.data.filters.category);
        setBrand(response.data.filters.brand);
      } else {
        console.log(response);
      }
    });
  };

  const setListView = () => {
    setViewList(true)
    setViewGrid(false);
  }

  const setGrid = () => {
    setViewList(false);
    setViewGrid(true);
  }

  return (
    <>
      <Container className={classes.serviceProviderListBox}>
        <Grid container direction="row" spacing={3}>
        <Grid item md={3} sm={4} xs={12}>
          <Card variant="outlined" className={clsx(classes.cardBox, classes.cardBoxBtn)}>
              <div className={clsx(classes.cardHeader, classes.cardHeaderBtn)}>
                <MediaQuery query="(min-width: 768px)">
                  <Typography
                    variant="h4"
                    gutterBottom
                    className={clsx(classes.cardTitle, classes.cardTitle_Btn)}
                  >
                    Filters
                  </Typography>
                </MediaQuery>
                <MediaQuery query="(max-width: 768px)">
                  <Button
                    className={clsx(classes.cardTitle, classes.cardTitle_Btn)}
                    onClick={() => {
                      handleFilter();
                    }}
                  >
                    {" "}
                    Filter{" "}
                  </Button>
                </MediaQuery>

                <Button className={classes.cardTitleBtn} onClick={clearSearch}>
                  {" "}
                  Clear All{" "}
                </Button>
              </div>

              <MediaQuery query="(min-width: 768px)">
                <CardContent className={classes.cardBodyBox}>
                  {/* <div className={classes.cardSearchBox}>
                                <InputBase
                                    placeholder="search provider"
                                    // onChange={(e) => { setSearchValue(e.target.value) }}
                                    // value={searchValue}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                                <Button fullWidth className={classes.searchButtonList} onClick={() => handleFilterVal()}>
                                    Search
                                </Button>
                            </div> */}
                  <div className={classes.cardServiceList}>
                    <h4 className={classes.serviceTitle}>Category</h4>
                    <div className={classes.servicesCheckbox}>
                      {category?.length > 0 &&
                        category?.map((item, index) => (
                          <>
                            <FormControl
                              component="fieldset"
                              className={classes.formControlService}
                            >
                              <FormControlLabel
                                key={index}
                                control={
                                  <Checkbox name={item} color="primary" />
                                }
                                label={item.cat_name}
                                value={item.cat_id}
                                onClick={() => handleCheckCategory(item.cat_id)}
                                checked={item.isActive}
                              />
                            </FormControl>
                          </>
                        ))}
                    </div>
                    <h4 className={classes.serviceTitle}>Brand</h4>
                    <div className={classes.servicesCheckbox}>
                      {
                       brand?.length > 0 &&
                        brand.map((item,index) =>(
                          <FormControl
                            component="fieldset"
                            className={classes.formControlService}
                          >
                            <FormControlLabel
                              key={index}
                              control={<Checkbox name={item} color="primary" />}
                              label={item.brand_name}
                              value={item.brand_id}
                              onClick={() => handleCheckBrand(item.brand_id)}
                              checked={item.isActive}
                            />
                          </FormControl>
                        ))}
                    </div>
                    <h4 className={classes.serviceTitle}> Rating </h4>
                    <div
                      className={classes.servicesCheckbox}
                      style={{ borderBottom: "none" }}
                    >
                      {rating?.length > 0 &&
                        rating.map((item, index) => (
                          <FormControl
                            component="fieldset"
                            className={classes.formControlService}
                          >
                            <FormControlLabel
                              key={index}
                              control={
                                <Checkbox name={item.title} color="primary" />
                              }
                              label={
                                <div className={classes.rating_txt_bx}>
                                    <StarIcon style={{ color: "#FFA84C" }} />
                                      {item.title}
                                  </div>
                              }
                              value={item.value}
                              onClick={() => handleCheckRating(item.value)}
                              checked={item.isActive ? true : false}
                            />
                            {console.log("item Active", item?.isActive)}
                            {/* <GradeSharpIcon fontSize='small' style={{ color: '#fff', fontSize: '12px' }} /> */}
                          </FormControl>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </MediaQuery>
              <MediaQuery query="(max-width: 768px)">
                {filter == true && (
                  <CardContent className={classes.cardBodyBox}>
                    <div className={classes.cardServiceList}>
                      <h4 className={classes.serviceTitle}>Category</h4>
                      <div className={classes.servicesCheckbox}>
                        {category?.length > 0 &&
                          category?.map((item, index) => (
                            <>
                              <FormControl
                                component="fieldset"
                                className={classes.formControlService}
                              >
                                <FormControlLabel
                                  key={index}
                                  control={
                                    <Checkbox name={item} color="primary" />
                                  }
                                  label={item.cat_name}
                                  value={item.cat_id}
                                  onClick={() =>
                                    handleCheckCategory(item.cat_id)
                                  }
                                  checked={item.isActive}
                                />
                              </FormControl>
                            </>
                          ))}
                      </div>
                      <h4 className={classes.serviceTitle}>Brand</h4>
                      <div className={classes.servicesCheckbox}>
                        {brand?.length > 0 &&
                          brand.map((item, index) => (
                            <FormControl
                              component="fieldset"
                              className={classes.formControlService}
                            >
                              <FormControlLabel
                                key={index}
                                control={
                                  <Checkbox name={item} color="primary" />
                                }
                                label={item.brand_name}
                                value={item.brand_id}
                                onClick={() => handleCheckBrand(item.brand_id)}
                                checked={item.isActive}
                              />
                            </FormControl>
                          ))}
                      </div>
                      <h4 className={classes.serviceTitle}> Rating </h4>
                      <div
                        className={classes.servicesCheckbox}
                        style={{ borderBottom: "none" }}
                      >
                        {rating?.length > 0 &&
                          rating.map((item, index) => (
                            <FormControl
                              component="fieldset"
                              className={classes.formControlService}
                            >
                              <FormControlLabel
                                key={index}
                                control={
                                  <Checkbox name={item.title} color="primary" />
                                }
                                label={
                                  <div className={classes.rating_txt_bx}>
                                  <StarIcon style={{ color: "#FFA84C" }} />
                                    {item.title}
                                </div>
                                }
                                value={item.value}
                                onClick={() => handleCheckRating(item.value)}
                                checked={item.isActive ? true : false}
                              />
                              {console.log("item Active", item?.isActive)}
                              {/* <GradeSharpIcon fontSize='small' style={{ color: '#fff', fontSize: '12px' }} /> */}
                            </FormControl>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </MediaQuery>
            </Card>
          </Grid>

          <Grid item md={9} sm={8} xs={12}>
            <Grid container spacing={3} className={classes.product_control_bar}>
              <Grid item md={6} sm={6} xs={12}>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  <Link
                    color="inherit"
                    href="/"
                    className={classes.Breadcrumb_link}
                  >
                    Home
                  </Link>
                  <Typography
                    color="textPrimary"
                    className={classes.Breadcrumb_link}
                  >
                    {" "}
                    Cleaning&Household{" "}
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Box component="div" className={classes.filter_bx}>
                  <Button variant="contained" className={classes.btn_filter} onClick={()=>{setGrid()}}>
                    <AppsIcon />
                  </Button>
                  <Button variant="contained" className={classes.btn_filter} onClick={()=>{setListView()}}>
                    <MenuIcon />
                  </Button>
                  <FormControl className={classes.select_filter}>
                    <Select
                      className={classes.select_view}
                      label="Service"
                      displayEmpty
                      //   value={orderType}
                      //label="Default"
                      //   onChange={(e)=>{setOrderType(e.target.value)}}
                      input={<OutlinedInput />}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                    >
                      <MenuItem value="">
                        {" "}
                        <em>Popular</em>
                      </MenuItem>
                      <MenuItem value="service">Price Low to High</MenuItem>
                      <MenuItem value="product">Price High to Low</MenuItem>
                    </Select>
                  </FormControl>
                  {/* <Link href="#">
                                                <AppsIcon/>
                                                    </Link> */}
                </Box>
              </Grid>
            </Grid>

            <Box component="div">
              <div className={classes.SearchBar}>
                <div className={classes.Search_Icon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => setSearchBar(e.target.value)}
                />
              </div>
              {loder ? (
                <Box style={{ display: "flex", margin: "0 auto", justifyContent: "center", alignItems: "center" }}>
                  <CircularProgress />
                </Box>
              ) : productList?.length > 0 ? (
                <Grid container spacing={3}>
                  <Grid item sm={12} xs={12}>
                    { viewGrid == true  && <StoreGrid productList={productList} />}
                    { viewList == true  && <StoreViewList productList={productList} />}
                  </Grid>
                </Grid>
              ) : (
                <ServiceProviderNotFound/>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default StoreList;
