import {
  Grid,
  Container,
  Typography,
  Button,
  TableCell,
  Table,
  TableBody,
  TableRow,
  Paper,
  Box,
  Link,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./paymentStyles";
import payu_icon from "../../../assets/img/payu_icon.svg";
import { useCart } from "react-use-cart";
import configData from "../../../constants.json";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory, useLocation, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import LoginPopUpModal from "../../../components/main/loginPopupModal/loginPopupModal";
import * as currencyCode from "../../../currencyCode";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const PaymentScreen = () => {
  const history = useHistory();
  const [handlePopModal, setPopModal] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [companyTax, setCompanyTax] = React.useState(0);
  const [paymentTotal, setPaymentTotal] = React.useState(0);
  // setItems,
  

  const {
    items,
    emptyCart,
    addItem,
    getItem,
    isEmpty,
    totalUniqueItems,
    totalItems,
    updateItemQuantity,
    removeItem,
  cartTotal,
  } = useCart();
  // const { setItems } = useCart();
  const totalCItems = items;
  const location = useLocation<any>();
  const paymentFor = location.state?.paymentFor;
  console.log("type", paymentFor);
  const getTaxDatafromDb = () => {
    axios.post(configData.allpApiUrl + "get-tax-details").then(
      (res) => {
        if (res.data.success) {
          var cGst = res.data.data[0].cgst;
          var cSst = res.data.data[0].sgst;
          var tGst = cGst + cSst;
          setCompanyTax(tGst);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    const fetchTasks = async () => {
      var priceTotal = 0;
      items
        .filter((item) => item.type == paymentFor)
        .forEach(function (ItemDetails, ItemIndes) {
          if (ItemDetails.quantity) {
            priceTotal += ItemDetails.price_with_tax * ItemDetails.quantity;
          } else {
            priceTotal += ItemDetails.price_with_tax;
          }
        });

      getTaxDatafromDb();
      setPaymentTotal(priceTotal);
      const res = await axios.post(configData.paymentMetodsApiUrl);
      res.data.data.forEach(function (row, index) {
        setPaymenSalt(row.payment_salt);
        setPaymentKey(row.payment_key);
      });
      setPaymentMethods(res.data.data);
      const payuPostData = {
        amount: (paymentTotal * companyTax) / 100 + paymentTotal,
        firstname: localStorage.getItem("user_name"),
        email: localStorage.getItem("UserEmail"),
        phone: localStorage.getItem("mobile_no"),
        udf5: "BOLT_KIT_PHP7",
        productinfo: localStorage.getItem("ServiceOrderID"),
        surl: configData.backendUrl + "/web/payments/payu",
        furl: configData.backendUrl + "/web/payments/payu",
        txnid: localStorage.getItem("ServiceOrderID"),
      };
      const res1 = await axios.post(configData.payHashApiUrl, payuPostData);
      console.log(payuPostData);
      setpaymentHash(res1.data.data);
    };
    fetchTasks();
  }, []);

  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [formPaymentMetod, setFormPaymentMethods] = useState("");
  const [paymentHash, setpaymentHash] = useState("");
  const [butttondisabled, setbuttondisabled] = React.useState(true);
  const cartServices = JSON.parse(localStorage.getItem('cartServices') || '{}')
  const cartProduct=JSON.parse(localStorage.getItem('cartProduct') || '{}')



  const [salt, setPaymenSalt] = useState("");
  const [key, setPaymentKey] = useState("");

  const [paymentInfo, updatePayment] = useState({
    key: key,
    salt: salt,
    amount: (paymentTotal * companyTax) / 100 + paymentTotal,
    firstname: localStorage.getItem("user_name"),
    email: localStorage.getItem("UserEmail"),
    phone: localStorage.getItem("mobile_no"),
    udf5: "BOLT_KIT_PHP7",
    productinfo: localStorage.getItem("ServiceOrderID"),
    surl:
      configData.siteUrl +
      `services/thank-you/${localStorage.getItem("ServiceOrderID")}`,
    furl: configData.backendUrl + "/web/payments/payu",
    txnid: localStorage.getItem("ServiceOrderID"),
  });

  const classes = useStyles();

  const handlePayment = async () => {
    if (
      localStorage.getItem("UserId") == "" ||
      localStorage.getItem("UserId") == null
    ) {
      history.push(`/login`);
    } else {
      if (formPaymentMetod == "1") {
        localStorage.setItem("ServiceOrderID", "");
        localStorage.setItem("user_delivery_address", "");
        document.forms["payu_form"].submit();
        if(paymentFor == "service"){
          localStorage.removeItem("cartProduct");
          items.filter((item)=>(
            <>
            {item.type == "service" ? removeItem(item.id) : ""}
            </>
          ))

        }else if(paymentFor == "product"){
          localStorage.removeItem("cartService");
          items.filter((item)=>(
            <>
            {item.type == "product" ? removeItem(item.id) : ""}
            </>
          ))
        }
       
        
      } else {
        localStorage.setItem("ServiceOrderID", "");
        localStorage.setItem("user_delivery_address", "");
        document.forms["payu_form"].submit();
        if(paymentFor == "service"){
          localStorage.removeItem("cartService");
          items.filter((item)=>(
            <>
            {item.type == "service" ? removeItem(item.id) : ""}
            </>
          ))

        }else if(paymentFor == "product"){
          localStorage.removeItem("cartProduct");
          items.filter((item)=>(
            <>
            {item.type == "product" ? removeItem(item.id) : ""}
            </>
          ))
        }
        // emptyCart();
        // setTimeout(() => {
        //     emptyCart()
        // }, 3000);
      }
      // (document.forms['payu_form'].submit());
      // emptyCart();
      // localStorage.setItem('ServiceOrderID', '');
      // localStorage.setItem('user_delivery_address', '');
      // document.forms[0].submit();
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value.trim());
    setFormPaymentMethods(event.target.value.trim());
    setbuttondisabled(false);
  };

  if (items.length === 0 || !items) {
    history.goBack();
    return null;
  }

  return (
    <>
      <Container>
        <Box>
          {paymentFor && paymentFor == "service" ? (
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
              <Link
                className={classes.breadCrumblinks}
                component={RouterLink}
                to="/services/cart"
              >
                Cart
              </Link>
              <Link
                className={classes.breadCrumblinks}
                component={RouterLink}
                to={{
                  pathname: "/services/service-booking",
                  state: {
                    paymentFor: paymentFor,
                  },
                }}
              >
                Service Booking
              </Link>
              <Link
                className={classes.breadCrumblinks}
                component={RouterLink}
                to={{
                  pathname: "/services/service-schedule-booking",
                  state: {
                    paymentFor: paymentFor,
                  },
                }}
              >
                Schedule Booking
              </Link>
              <Typography className={classes.breadCrumblinksActive}>
                Payment
              </Typography>
            </Breadcrumbs>
          ) : (
            <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className={classes.breadcrumb}>
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
              <Link
                className={classes.breadCrumblinks}
                component={RouterLink}
                to="/services/cart"
              >
                Cart
              </Link>
              <Link
                className={classes.breadCrumblinks}
                component={RouterLink}
                to={{
                  pathname: "/services/service-booking",
                  state: {
                    paymentFor: paymentFor,
                  },
                }}
              >
                Service Booking
              </Link>
              <Typography className={classes.breadCrumblinksActive}>
                Payment
              </Typography>
            </Breadcrumbs>
          )}
        </Box>
      </Container>
      <Container maxWidth="md" className={classes.paymentContainer}>
        <Grid container spacing={5}>
          <Grid item className={classes.paymentTitleContainer}>
            <Typography className={classes.paymentContainerHeader}>
              Payment Information
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.paymentDetails}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et
            </Typography>
          </Grid>
          <>
            <Grid item container className={classes.paymentotal}>
              <Grid item>
                <Typography className={classes.paymentHeading}>
                  Your total payment will be
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  className={classes.paymentHeading}
                  style={{ textAlign: "right" }}
                >
                  {currencyCode.INR}{" "}
                  {(paymentTotal * companyTax) / 100 + paymentTotal}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid container item sm={6}>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                >
                  {paymentMethods.map((paymentsList) => (
                    <Grid
                      item
                      sm={12}
                      className={classes.paymentButtonGrid}
                      key={paymentsList.id}
                    >
                      <Paper className={classes.paymentGrid}>
                        {/* <Button className={classes.paymentButtons} onClick={() => { handlePaymentButtion(paymentsList.id) }}>Pay with {paymentsList.payment_method_name} <img src={payu_icon} className={classes.paymentIcon} /></Button> */}
                        {/* <RadioGroup  name="payment" value={value} aria-label="payment" onChange={handleRadioChange}>
                                        <FormControlLabel value={paymentsList.id} control={<Radio />} label={<div ><span className={classes.paymentButtons} >Pay with <img src={payu_icon} className={classes.paymentIcon} /> </span> </div>} />
                                    </RadioGroup> */}

                        <FormControlLabel
                          value="Home"
                          name="delivery_place"
                          onChange={handleChange}
                          control={<Radio color="primary" required />}
                          label={
                            <div>
                              <span className={classes.paymentButtons}>
                                Pay with{" "}
                                <img
                                  src={payu_icon}
                                  className={classes.paymentIcon}
                                />{" "}
                              </span>{" "}
                            </div>
                          }
                          labelPlacement="end"
                        />
                      </Paper>
                    </Grid>
                  ))}
                </RadioGroup>
              </Grid>
              <Grid
                item
                container
                sm={6}
                className={classes.paymentSectionContainer}
              >
                <Grid item>
                  <Typography className={classes.paymentSectionTitle}>
                    Total pay
                  </Typography>
                </Grid>

                <Grid item className={classes.paymentSectionTable}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.paymentSectionTableTd}>
                          {" "}
                          Item Total{" "}
                        </TableCell>
                        <TableCell className={classes.paymentSectionTableTd}>
                          {currencyCode.INR} {paymentTotal.toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.paymentSectionTableTd}>
                          Tax
                        </TableCell>
                        <TableCell className={classes.paymentSectionTableTd}>
                          {currencyCode.INR}{" "}
                          {((paymentTotal * companyTax) / 100).toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className={classes.paymentSectionTableTdTotal}
                        >
                          Total
                        </TableCell>
                        <TableCell
                          className={classes.paymentSectionTableTdTotal}
                        >
                          {currencyCode.INR}{" "}
                          {(paymentTotal * companyTax) / 100 + paymentTotal}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ width: "100%", textAlign: "center" }}>
              <form
                action="https://sandboxsecure.payu.in/_payment"
                method="post"
                name="payu_form"
              >
                <input type="hidden" name="key" value={key} />
                <input type="hidden" name="salt" value={salt} />
                <input type="hidden" name="hash" value={paymentHash} />
                <input
                  type="hidden"
                  name="txnid"
                  value={paymentInfo.txnid ? paymentInfo.txnid : ""}
                />
                <input
                  type="hidden"
                  name="amount"
                  value={(paymentTotal * companyTax) / 100 + paymentTotal}
                />
                <input
                  type="hidden"
                  name="productinfo"
                  value={paymentInfo.productinfo ? paymentInfo.productinfo : ""}
                />
                <input
                  type="hidden"
                  name="firstname"
                  value={paymentInfo.firstname ? paymentInfo.firstname : ""}
                />
                <input
                  type="hidden"
                  name="email"
                  value={paymentInfo.email ? paymentInfo.email : ""}
                />
                <input
                  type="hidden"
                  name="phone"
                  value={paymentInfo.phone ? paymentInfo.phone : ""}
                />
                <input
                  type="hidden"
                  name="service_provider"
                  value="payu_paisa"
                />
                <input
                  type="hidden"
                  id="udf5"
                  name="udf5"
                  value="BOLT_KIT_PHP7"
                />
                <input
                  type="hidden"
                  name="surl"
                  value={paymentInfo.surl ? paymentInfo.surl : ""}
                />
                <input
                  type="hidden"
                  name="furl"
                  value={paymentInfo.furl ? paymentInfo.furl : ""}
                />
              </form>
              <Button
                onClick={handlePayment}
                className={classes.payButton}
                disabled={butttondisabled}
              >
                pay {currencyCode.INR}{" "}
                {(paymentTotal * companyTax) / 100 + paymentTotal}
              </Button>
            </Grid>
          </>
        </Grid>
        <LoginPopUpModal openModal={handlePopModal} />
      </Container>
    </>
  );
};
export default PaymentScreen;
