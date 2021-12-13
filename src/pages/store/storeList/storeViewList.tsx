import React, { useState, useEffect } from "react";
import categoryHomeStyles from "./storeListStyles";
import configData from "../../../constants.json";
import GradeSharpIcon from "@material-ui/icons/GradeSharp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useCart } from "react-use-cart";
import Divider from "@material-ui/core/Divider";
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

const StoreViewList = (props) => {
  const classes = categoryHomeStyles();
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

  const splitAndMerge = (string) => {
    return string.split(",")[0];
  };

  useEffect(() => {
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

  return (
    <>
      {productsList?.length > 0 &&
        productsList.map((item, index) => (
          <Card className={classes.card_view_bx}>
            <Grid
              container
              direction="row"
              spacing={3}
              className={classes.main_bx}
            >
              <Grid item md={4} xs={4}>
                <Grid item className={classes.img_bx}>
                  <img
                    src={configData.backendUrl + splitAndMerge(item.photo)}
                    alt="product_img"
                  />
                  <div className={classes.watchlist_icon}>
                    {/* <FavoriteBorderIcon /> */}
                    <FavoriteIcon className={classes.watchlist_checked} />
                  </div>
                </Grid>
              </Grid>
              <Grid item md={8} xs={8}>
                <CardContent className={classes.product_desc}>
                  <div className={classes.detailBoxCard}>
                    <div>
                      <div>
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
                      </div>
                      <div className={classes.ratingCardRow}>
                        <Box component="h4" className={classes.ratingBadge}>
                          <Typography>3.4</Typography>
                          <GradeSharpIcon
                            fontSize="small"
                            style={{ color: "#fff", fontSize: "12px" }}
                          />
                        </Box>
                        <div className={classes.viewCountBx}>
                          <Typography
                            variant="caption"
                            className={classes.viewCount}
                          >
                            150 views
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
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
                            image: configData.backendUrl + item.service_icon,
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
            </Grid>
            <Divider />
          </Card>
        ))}
    </>
  );
};
export default StoreViewList;
