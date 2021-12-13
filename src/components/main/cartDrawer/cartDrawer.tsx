import React,{useEffect} from "react";
import clsx from "clsx";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from "react-use-cart";
import Plumbing from "../../../assets/img/cate-01.svg";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: "inline",
    },
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    list: {
      width: "100%",
      [`@media only screen and (min-width: 768px)`]: {
        minWidth: "300px",
      },
      [`@media only screen and (max-width: 600px)`]: {
        maxWidth: "300px",
      },
    },
    fullList: {
      width: "auto",
    },
    button: {
      padding: " 10px 0 10px 25px",
      font: "normal normal normal 16px/19px Montserrat",
      textTransform: "none",
      color: "#ffff",
      textAlign: "left",
      letterSpacing: "0px",
    },
    ItemTitle: {
      font: "normal normal 600 20px/24px 'Montserrat-Regular'",
      color: "#000000",
      textAlign: "left",
      letterSpacing: "0px",
      [`@media only screen and (max-width: 768px)`]: {
        fontSize: '16px'
      }
    },
    ItemPrice: {
      font: "normal normal 18px/22px 'Montserrat-Bold'",
      color: "#000000",
      textAlign: "left",
      display: "inline",
      [`@media only screen and (max-width: 768px)`]: {
        fontSize: '14px'
      }
    },
    ItemDrawerCloseIcon: {
      float: "right",
      "&:hover": {
        cursor: "pointer",
      },
    },
    serviceType: {
      font: "normal normal 600 20px/24px 'Montserrat-Regular'",
      color: "#000000",
      letterSpacing: "0px",
      marginBottom: "20px",
    },
    CartNavButton: {
      background:
        "transparent linear-gradient(270deg, #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box",
      borderRadius: "5px",
      border: "none",
      minWidth: "100%",
      minHeight: "42px",
      textAlign: "center",
      font: " normal normal 16px/21px 'Montserrat-Bold'",
      letterSpacing: "0px",
      color: " #FFFFFF",
      textTransform: "uppercase",
      lineHeight: "10px",
    },
    cart_detail_h:{
      width: '100%',
      [`@media only screen and (max-width: 600px)`]: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between'
      }
    },
    button_cart_bx:{
      [`@media only screen and (max-width: 480px)`]: {
        paddingLeft: '0',
      }
    }
  })
);

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer() {
  const history = useHistory();
  const { emptyCart, isEmpty, totalItems, items } = useCart();
  const CartCount = totalItems;
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
    
  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          {!isEmpty ? (
            <Box className={classes.cart_detail_h}>
              <CloseIcon
                onClick={toggleDrawer(anchor, false)}
                className={classes.ItemDrawerCloseIcon}
              />
              <Typography className={classes.serviceType}>
                {" "}
                On Demand Services
              </Typography>
              <Divider />
              {(items
                .filter((item) => item.type == "service").length > 0) ?
                items
                .filter((item) => item.type == "service").map((item) => (
                  <List className={classes.root} key={item.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <img
                          src={Plumbing}
                          style={{ width: "50px", paddingRight: "20px" }}
                          alt="Plumbing"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography className={classes.ItemTitle}>
                              {item.name}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              style={{
                                marginBottom: "10px",
                                marginTop: "10px",
                              }}
                            >
                              {item.description}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.ItemPrice}
                              color="textPrimary"
                              style={{ fontWeight: "bold" }}
                            >
                              Quantity : {item.quantity} Price : ₹ {item.price}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </List>
                )) :
                <Box>
             
             
              <Typography style={{ marginTop: "10px" }}>
                No services In The Bucket
              </Typography>
            </Box>
                }
            </Box>
          ) : (
            <Box className={classes.cart_detail_h}>
              <CloseIcon
                onClick={toggleDrawer(anchor, false)}
                className={classes.ItemDrawerCloseIcon}
              />
              <Typography className={classes.ItemTitle}>
                {" "}
                On Demand Services
              </Typography>
              <Typography style={{ marginTop: "10px" }}>
                No services In The Bucket
              </Typography>
            </Box>
          )}
        </ListItem>
        <ListItem>
          {!isEmpty ? (
            <Box>
              <Typography className={classes.serviceType}> Product</Typography>
              {items.filter((item) => item.type == "product").length > 0 ? (
                items
                  .filter((item) => item.type == "product")
                  .map((item) => (
                    <List className={classes.root} key={item.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <img
                            src={Plumbing}
                            style={{ width: "50px", paddingRight: "20px" }}
                            alt="Plumbing"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography className={classes.ItemTitle}>
                                {item.name}
                              </Typography>
                            </React.Fragment>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                style={{
                                  marginBottom: "10px",
                                  marginTop: "10px",
                                }}
                              >
                                {item.description}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.ItemPrice}
                                color="textPrimary"
                                style={{ fontWeight: "bold" }}
                              >
                                Quantity : {item.quantity} Price : ₹{" "}
                                {item.price}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </List>
                  ))
              ) : (
                <Box>
                  
                  <Typography style={{ marginTop: "10px" }}>
                    No Product In The Bucket
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Box>
              <Typography className={classes.ItemTitle}> Product</Typography>
              <Typography style={{ marginTop: "10px" }}>
                No Product In The Bucket
              </Typography>
            </Box>
          )}
        </ListItem>
        <ListItem>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Button
                className={classes.CartNavButton}
                onClick={() => {
                  history.push(`/services/cart`);
                }}
              >
                Go To Cart
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button
                className={classes.CartNavButton}
                onClick={() => {
                  emptyCart();
                  window.location.href.includes("services/payment") &&
                    history.push("/");
                }}
              >
                Clear Cart
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {(["right"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            className={clsx(classes.button, classes.button_cart_bx)}
          >
            <Badge badgeContent={CartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
