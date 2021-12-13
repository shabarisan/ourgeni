import React, { useState, useEffect } from "react";
import storeListStyles from "./storeListStyles";
import configData from "../../../constants.json";
import GradeSharpIcon from "@material-ui/icons/GradeSharp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useCart } from "react-use-cart";
import clsx from "clsx";
import {
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  ButtonGroup,
  Link,
} from "@material-ui/core";

const StoreGrid = (props) => {
  console.log("props", props);

  const splitAndMerge = (string) => {
    return string.split(",")[0];
  };

  const classes = storeListStyles();
  const {
    addItem,
    getItem,
    isEmpty,
    totalItems,
    items,
    updateItemQuantity,
    cartTotal,
  } = useCart();
  const [productsList, setProductsList] = useState(props.productList);

  useEffect(() => {
    // var List = servicesList
    productsList.forEach(function (item, index) {
      item.addOn = false;
      if (getItem(item.id)) {
        item.counter = JSON.parse(getItem(item.id).quantity);
        item.addOn = true;
      } else {
        item.counter = 0;
      }
      setProductsList(productsList);
    });
  }, [items, props.servicesList]);
  console.log("product list and id", productsList);
  

  return (
    <>
      <Grid container direction="row" spacing={3}>
        {productsList?.length > 0 &&
          productsList.map((item, index) => (
            <Grid item md={4}>
              <Card className={classes.paper}>
                <CardContent className={classes.product_desc}>
                  <Grid className={classes.content}>
                    <Grid md={12} sm={4} xs={4} item className={classes.img_bx}>
                      <img
                        src={configData.backendUrl + splitAndMerge(item.photo)}
                        alt="product_img"
                      />
                      <div className={classes.watchlist_icon}>
                        {/* <FavoriteBorderIcon /> */}
                        <FavoriteIcon className={classes.watchlist_checked} />
                      </div>
                    </Grid>

                    <Grid
                      md={12}
                      sm={8}
                      xs={8}
                      container
                      item
                      className={classes.card_body_padding}
                    >
                      <Grid>
                        <Link
                          component={RouterLink}
                          to={{
                            pathname: `/store/storeDetail/${item.id}`,
                            state: {
                              productName: item.slug,
                            },
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.product_h}
                          >
                            {item.title}
                          </Typography>
                        </Link>
                        <p className={classes.product_sub_h}>
                          Redesigned from scratch and completely revised.
                        </p>
                      </Grid>
                      <Grid item>
                        <Box component="span" className={classes.ratingBadge}>
                          <Typography>3.4</Typography>
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
                          150 views
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    className={classes.card_body_padding}
                  >
                    <Grid item xs={6} className={classes.price_bx}>
                      <b> &#8377;{item.price}</b>
                      <span>
                        <s> </s>
                      </span>
                      <div className={classes.disc_bx}>{item.discount}%</div>
                    </Grid>
                    <Grid item>
                      {item.addOn ? (
                        <ButtonGroup
                          size="small"
                          variant="text"
                          aria-label="small outlined button group"
                        >
                          <Button
                            className={clsx(classes.up)}
                            onClick={() =>
                              addItem(
                                {
                                    id: item.id,
                                    price_with_tax: item.price,
                                    image: configData.backendUrl + item.photo,
                                    cgst: item.cgst,
                                    sgst: item.sgst,
                                    tax: item.cgst + item.sgst,
                                    name: item.title,
                                    price: item.price,
                                    type: "product",
                                },
                                1
                              )
                            }
                          >
                            +
                          </Button>
                          <Button disabled className={classes.quantity_show}>
                            {item.counter}
                          </Button>
                          <Button
                            className={clsx(classes.down)}
                            onClick={() => {
                              updateItemQuantity(
                                item.id,
                                item.counter ? item.counter - 1 : 1
                              );
                            }}
                          >
                            -
                          </Button>
                        </ButtonGroup>
                      ) : (
                        <Button
                          className={classes.buttonAdd}
                          onClick={() =>
                            addItem(
                              {
                                id: item.id,
                                price_with_tax: item.price,
                                image:
                                  configData.backendUrl + item.service_icon,
                                cgst: item.cgst,
                                sgst: item.sgst,
                                tax: item.cgst + item.sgst,
                                name: item.title,
                                price: item.price,
                                type: "product",
                              },
                              1
                            )
                          }
                        >
                          ADD to cart
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};
export default StoreGrid;
