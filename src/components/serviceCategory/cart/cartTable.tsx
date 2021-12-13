import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Link from '@material-ui/core/Link';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useCart } from "react-use-cart";
import * as currencyCode from '../../../currencyCode';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import { useConfirm } from 'material-ui-confirm';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import clsx from 'clsx';
import configData from "../../../constants.json";
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MediaQuery from 'react-responsive'
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
            fontFamily: "Montserrat-regular"
        },

    },
    button: {
        border: '1px solid #ddd',
        width: '25px',
        backgroundColor: '#0D004C',
        padding: '0',
        height: '30px',
        color: '#fff',
        lineHeight: '30px',
    },
    up: {
        borderLeft: 0,
        borderRadius: '30px 0 0 30px',
    },
    down: {
        borderRight: 0,
        borderRadius: '0 30px 30px 0',
    },
    buttonAdd: {
        background: 'transparent linear-gradient(270deg, #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box',
        fontFamily: "'Montserrat-Bold'",
        letterSpacing: '0px',
        color: ' #FFFFFF',
        textTransform: 'uppercase',
    },
    

});

const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
            fontFamily: "Montserrat-regular"
        },

    },
    paperC: {
        width: '100%',
        '& > *': {
            fontFamily: "Montserrat-regular"
        },
    },
    container: {
        maxHeight: 440,
    },
    button: {
        border: '1px solid #ddd',
        width: '25px',
        backgroundColor: '#0D004C',
        padding: '0',
        height: '30px',
        color: '#fff',
        lineHeight: '30px',
    },
    down: {
        borderRight: 0,
        borderRadius: '0 30px 30px 0',
    },
    up: {
        borderLeft: 0,
        borderRadius: '30px 0 0 30px',
    },
    card_bx: {
        display: 'none',
        [`@media only screen and (max-width: 600px)`]: {
            display: 'block',
        },
    },
    product_title: {
        textAlign: 'center',
        fontSize: '26px',
        '& span': {
            color: '#000',
        }
    },
    product_control: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly',
    },
    proice_detail: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: 500,
        '& span': {
            color: '#000',
        }
    },
    payButtonArea:{
        textAlign:'center',
        marginBottom:'15px',
        [`@media only screen and (max-width: 600px)`]:{
            margin: '15px auto',
        },
    },
    payButton:{
        background:'transparent linear-gradient(270deg, #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box',
        borderRadius: '4px',
        border: 'none',
        letterSpacing: '0px',
        marginTop: '25px',
        marginRight: '15px',
        color: '#ffff',
        minWidth: '300px',
        minHeight: '48px',
        marginBottom:"15px",
        font:"normal normal 18px/26px 'Montserrat-Regular'",
        fontWeight:600,
        [`@media only screen and (max-width: 480px)`]:{
            minWidth: 'auto',
            padding: '8px 15px',
        },
    },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Row({ row, sNo }) {
    const [userAlerts, sertuserAlerts] = React.useState({
        showAlert: false,
        alertMessage: ''
    });
    const nos = sNo;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const { addItem, items, updateItemQuantity, removeItem } = useCart();
    const confirm = useConfirm();

    return (
        <React.Fragment>
            <TableRow className={classes.root} >

                <TableCell align="center" >
                    {nos}

                </TableCell>
                <TableCell align="center" component="th" scope="row" style={{ fontFamily: "Montserrat-regular" }}>
                    {row.addon_parent_nmae ?
                        <Button size="small" variant="outlined" style={{ fontFamily: "Montserrat-regular" }}>
                            Add on  - {row.name}
                        </Button>
                        :
                        row.name
                    }

                    <div style={{ textAlign: 'center', padding: '10px' }}>

                        {row.addOnservices && row.addOnservices.length > 0 ?
                            <>
                                <Link
                                    component="button"
                                    style={{ color: "#1acc8d", fontFamily: "Montserrat-regular", fontWeight: 600 }}
                                    variant="body2"
                                    onClick={() => setOpen(!open)}>
                                    {
                                        open ?
                                            'Hide Add Ons'
                                            :
                                            'Show Add Ons'
                                    }
                                </Link>
                                &nbsp;|&nbsp;
                            </>
                            :
                            null
                        }

                        <Link
                            component="button"
                            style={{ color: "#1acc8d", fontFamily: "Montserrat-regular", fontWeight: 600 }}
                            variant="body2"
                            onClick={() => {
                                confirm({ description: 'Are you sure you want to remove this item' })
                                    .then(() => { removeItem(row.id); })
                            }}>
                            Remove
                        </Link>
                    </div>
                </TableCell>

                <TableCell align="center">
                    <ButtonGroup size="small" variant="text" aria-label="small outlined button group">
                        <Button onClick={() => updateItemQuantity(row.id, row.quantity ? row.quantity + 1 : 1)} className={clsx(classes.button, classes.up)}>+</Button>
                        <Button disabled style={{ color: 'black' }}>{row.quantity}</Button>
                        <Button onClick={() => {
                            confirm({ description: 'Are you sure you want to change this quantity' })
                                .then(() => { updateItemQuantity(row.id, row.quantity ? row.quantity - 1 : 1) })
                        }}
                            className={clsx(classes.button, classes.down)}>-</Button>
                    </ButtonGroup>
                </TableCell>
                <TableCell align="center">{currencyCode.INR} {row.price_with_tax - row.price}</TableCell>
                <TableCell align="center">{currencyCode.INR} {row.price}</TableCell>
                <TableCell align="center">{currencyCode.INR} {(row.price_with_tax * row.quantity)}</TableCell>
                {/* <TableCell align="center">
                    <IconButton 
                        aria-label="delete"
                        onClick={() => {
                            confirm({ description: 'Are you sure you want to remove this item' })
                                .then(() => { removeItem(row.id); })
                        }}
                        >
                        <DeleteIcon />
                    </IconButton>
                      
                </TableCell> */}
            </TableRow>

            {row.addOnservices && row.addOnservices.length > 0 ?
                <>
                    <TableRow style={{ background: '#f6f6f6' }}>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box margin={1} color="text.primary">
                                    <Typography variant="h6" style={{ textAlign: 'center' }} gutterBottom component="div">
                                        {row.name} Addon Services's
                                    </Typography>
                                    <Table size="small" aria-label="purchases" style={{ marginTop: '30px', marginBottom: '30px' }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Service Name</TableCell>
                                                <TableCell align="center">Image</TableCell>
                                                <TableCell align="center">Amount</TableCell>
                                                <TableCell align="center">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.addOnservices.map((historyRow) => (
                                                <>
                                                    {
                                                        (typeof items.find(p => p.id == historyRow.addon_service_id) == 'undefined') ?
                                                            <TableRow key={historyRow.id}>
                                                                <TableCell component="th" scope="row" align="center">
                                                                    {historyRow.service_info.service_name}
                                                                </TableCell>
                                                                <TableCell align="center"><img src={configData.allpApiUrl + historyRow.service_info.service_icon} alt={historyRow.service_info.service_name} /></TableCell>
                                                                <TableCell align="center">{currencyCode.INR} {historyRow.service_info.base_price}</TableCell>
                                                                <TableCell align="center">

                                                                    {
                                                                        (typeof items.find(p => p.id == historyRow.addon_service_id) == 'undefined') ?
                                                                            <Button
                                                                                variant="contained"
                                                                                color="secondary"
                                                                                size="small"
                                                                                className={classes.buttonAdd}
                                                                                onClick={() => {
                                                                                    addItem(
                                                                                        {
                                                                                            id: historyRow.service_info.id,
                                                                                            name: historyRow.service_info.service_name,
                                                                                            price: historyRow.service_info.base_price,
                                                                                            description: historyRow.service_info.summary,
                                                                                            price_with_tax: historyRow.service_info.price_with_tax,
                                                                                            cgst: historyRow.service_info.cgst,
                                                                                            sgst: historyRow.service_info.sgst,
                                                                                            tax: (historyRow.service_info.cgst + historyRow.service_info.sgst),
                                                                                            addOnservices: historyRow.service_info.get_addon_services,
                                                                                            add_on_flag: true,
                                                                                            addon_parent: historyRow.service_id,
                                                                                            addon_parent_nmae: row.name
                                                                                        }, 1
                                                                                    );
                                                                                    sertuserAlerts({
                                                                                        showAlert: true,
                                                                                        alertMessage: 'Service Added to cart',
                                                                                    });
                                                                                }}
                                                                            >
                                                                                Add +
                                                                            </Button>
                                                                            :
                                                                            null
                                                                    }

                                                                </TableCell>
                                                            </TableRow>
                                                            :
                                                            null
                                                    }
                                                </>))
                                            }
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>

                </>
                :
                <TableRow style={{ background: '#f6f6f6' }}>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    </TableCell>
                </TableRow>
            }
            <Snackbar open={userAlerts.showAlert} onClose={() => {
                sertuserAlerts({
                    showAlert: false,
                    alertMessage: '',
                })
            }}>
                <Alert
                    onClose={() => {
                        sertuserAlerts({
                            showAlert: false,
                            alertMessage: '',
                        })
                    }}
                    severity="success">
                    {userAlerts.alertMessage}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default function CollapsibleTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = useStyles();
    const confirm = useConfirm();
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const { items, updateItemQuantity, removeItem } = useCart();
    console.log("this is type",items);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const cartProduct=JSON.parse(localStorage.getItem('cartProduct') || '[]')
    const cartServices= JSON.parse(localStorage.getItem('cartServices') || '[]')

    useEffect(() => {
        getTaxDatafromDb();

    }, [])

    const getTaxDatafromDb = () => {
        axios.post(configData.allpApiUrl + 'get-tax-details').
            then((res) => {
                if (res.data.success) {
                    var cGst = res.data.data[0].cgst;
                    var cSst = res.data.data[0].sgst;
                    var tGst = (cGst + cSst);
                    setCompanyTax(tGst);
                }
            }, (error) => {
                console.log(error);
            })
    }

    const [companyTax, setCompanyTax] = React.useState(0);

    var taxTotal = 0;
    var priceTotal = 0;
    var productPriceTotal= 0;
    var servicePriceTotal=0;

    // items.forEach(function (ItemDetails, ItemIndes) {
    //     taxTotal += ItemDetails.price_with_tax - ItemDetails.price;
    //     if (ItemDetails.quantity) {
    //         priceTotal += (ItemDetails.price_with_tax * ItemDetails.quantity);
    //     }
    //     else {
    //         priceTotal += (ItemDetails.price_with_tax);
    //     }

    // });
    cartProduct.forEach(function (ItemDetails, ItemIndes) {
        taxTotal += ItemDetails.price_with_tax - ItemDetails.price;
        if (ItemDetails.quantity) {
            productPriceTotal += (ItemDetails.price_with_tax * ItemDetails.quantity);
        }
        else {
            productPriceTotal += (ItemDetails.price_with_tax);
        }

    });

    cartServices.forEach(function (ItemDetails, ItemIndes) {
        taxTotal += ItemDetails.price_with_tax - ItemDetails.price;
        if (ItemDetails.quantity) {
            servicePriceTotal += (ItemDetails.price_with_tax * ItemDetails.quantity);
        }
        else {
            servicePriceTotal += (ItemDetails.price_with_tax);
        }

    });
    


    return (
        <>
            <MediaQuery query='(min-width: 768px)'>
                <Paper className={classes.paperC}>
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-bold" }}>S.No</TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-bold" }}>Service Name</TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-bold" }}>Quantity</TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-bold" }}>Tax</TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-bold" }}>Price</TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-bold" }}>Total</TableCell>
                                    {/* <TableCell align="center" style={{fontFamily:"Montserrat-bold"}}>Remove</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {console.log("thisis items", items)}
                                {cartServices.map((row, index) => (
                                    <>
                                        <Row key={row.id} row={row} sNo={index + 1} />
                                    </>
                                ))}
                                {/* <TableRow>
                            <TableCell colSpan={2} rowSpan={3} style={{fontFamily:"Montserrat-bold"}}></TableCell>
                            <TableCell style={{fontFamily:"Montserrat-bold"}}>Subtotal</TableCell>
                            <TableCell align="center" style={{fontFamily:"Montserrat-bold"}}></TableCell>
                            <TableCell align="center" style={{fontFamily:"Montserrat-regular"}}></TableCell>
                            <TableCell align="center" style={{fontFamily:"Montserrat-regular"}}>{currencyCode.INR} {priceTotal}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontFamily:"Montserrat-bold"}}>Tax   {companyTax} (%)</TableCell>
                            <TableCell align="center" style={{fontFamily:"Montserrat-regular"}}></TableCell>
                            <TableCell align="center" style={{fontFamily:"Montserrat-regular"}}> </TableCell>
                            <TableCell align="center" style={{fontFamily:"Montserrat-regular"}}>{currencyCode.INR} {((priceTotal * companyTax / 100 )) }</TableCell>
                        </TableRow> */}
                                <TableRow>
                                    <TableCell colSpan={2} rowSpan={3} style={{ fontFamily: "Montserrat-bold" }}></TableCell>
                                    <TableCell style={{ fontFamily: "Montserrat-bold" }}>Total</TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-regular" }}></TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-regular" }}></TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-regular" }}>{currencyCode.INR} {(servicePriceTotal)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        style={{ fontFamily: "Montserrat-regular" }}
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={items.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  {cartServices.length> 0 &&   <Grid item sm={12} className={classes.payButtonArea}>
                            <Button className={classes.payButton} onClick={()=>props.handleSubmit("service")}>PAY {currencyCode.INR} {( servicePriceTotal).toFixed(2)} </Button>
                        </Grid>}

                </Paper>
                <Paper className={classes.paperC}>
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-bold" }}>S.No</TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-bold" }}>Product Name</TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-bold" }}>Quantity</TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-bold" }}>Tax</TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-bold" }}>Price</TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-bold" }}>Total</TableCell>
                                    {/* <TableCell align="center" style={{fontFamily:"Montserrat-bold"}}>Remove</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                      
                                {cartProduct.map((row, index) => (
                                    <>
                                        <Row key={row.id} row={row} sNo={index + 1} />
                                    </>
                                ))}
                                {/* <TableRow>
                            <TableCell colSpan={2} rowSpan={3} style={{fontFamily:"Montserrat-bold"}}></TableCell>
                            <TableCell style={{fontFamily:"Montserrat-bold"}}>Subtotal</TableCell>
                            <TableCell align="center" style={{fontFamily:"Montserrat-bold"}}></TableCell>
                            <TableCell align="center" style={{fontFamily:"Montserrat-regular"}}></TableCell>
                            <TableCell align="center" style={{fontFamily:"Montserrat-regular"}}>{currencyCode.INR} {priceTotal}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontFamily:"Montserrat-bold"}}>Tax   {companyTax} (%)</TableCell>
                            <TableCell align="center" style={{fontFamily:"Montserrat-regular"}}></TableCell>
                            <TableCell align="center" style={{fontFamily:"Montserrat-regular"}}> </TableCell>
                            <TableCell align="center" style={{fontFamily:"Montserrat-regular"}}>{currencyCode.INR} {((priceTotal * companyTax / 100 )) }</TableCell>
                        </TableRow> */}
                                <TableRow>
                                    <TableCell colSpan={2} rowSpan={3} style={{ fontFamily: "Montserrat-bold" }}></TableCell>
                                    <TableCell style={{ fontFamily: "Montserrat-bold" }}>Total</TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-regular" }}></TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-regular" }}></TableCell>
                                    <TableCell align="center" style={{ fontFamily: "Montserrat-regular" }}>{currencyCode.INR} {(productPriceTotal)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        style={{ fontFamily: "Montserrat-regular" }}
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={items.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    {cartProduct.length > 0 &&  <Grid item sm={12} className={classes.payButtonArea}>
                            <Button className={classes.payButton} onClick={()=>props.handleSubmit("product")}>PAY {currencyCode.INR} {( productPriceTotal).toFixed(2)} </Button>
                        </Grid>}

                </Paper>
            </MediaQuery>

            <MediaQuery query='(max-width: 768px)'>
                <Card className={classes.card_bx}>
                    {cartServices.map((item) => (
                        <>
                            <CardContent>
                                <Typography color="textSecondary" className={classes.product_title} gutterBottom>
                                    Service  <span> {item.name} </span>

                                </Typography>
                                <div className={classes.product_control}>
                                    <img src={item.image} />
                                    <ButtonGroup size="small" variant="text" aria-label="small outlined button group">
                                        <Button onClick={() => updateItemQuantity(item.id, item.quantity ? item.quantity + 1 : 1)} className={clsx(classes.button, classes.up)}>+</Button>
                                        <Button disabled style={{ color: 'black' }}>{item.quantity}</Button>
                                        <Button onClick={() => {
                                            confirm({ description: 'Are you sure you want to change this quantity' })
                                                .then(() => { updateItemQuantity(item.id, item.quantity ? item.quantity - 1 : 1) })
                                        }}
                                            className={clsx(classes.button, classes.down)}>-</Button>
                                    </ButtonGroup>
                                </div>
                                <div className={classes.proice_detail}>
                                    <Typography color="textSecondary">
                                        Item Price <span> {item.price} </span>
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Tax:  (SGST: <span>{item.sgst}</span> + CGST: <span>{item.tax} </span>)

                                    </Typography>
                                    <Typography color="textSecondary">

                                        Total  <span> {item.price_with_tax} </span>
                                    </Typography>
                                    <Link
                                        component="button"
                                        style={{ color: "#1acc8d", fontFamily: "Montserrat-regular", fontWeight: 600 }}
                                        variant="body2"
                                        onClick={() => {
                                            confirm({ description: 'Are you sure you want to remove this item' })
                                                .then(() => { removeItem(item.id); })
                                        }}>
                                        Remove
                                    </Link>
                                </div>
                            </CardContent>
                        </>
                    ))}
                    
                       {cartServices.length> 0 &&  <Grid item sm={12} className={classes.payButtonArea}>
                            <Button className={classes.payButton} onClick={()=>props.handleSubmit("service")}>PAY {currencyCode.INR} {( servicePriceTotal).toFixed(2)} </Button>
                        </Grid>}
                    
                </Card>
                <Card className={classes.card_bx}>
                    {cartProduct.map((item) => (
                        <>
                            <CardContent>
                                <Typography color="textSecondary" className={classes.product_title} gutterBottom>
                                    Product  <span> {item.name} </span>

                                </Typography>
                                <div className={classes.product_control}>
                                    <img src={item.image} />
                                    <ButtonGroup size="small" variant="text" aria-label="small outlined button group">
                                        <Button onClick={() => updateItemQuantity(item.id, item.quantity ? item.quantity + 1 : 1)} className={clsx(classes.button, classes.up)}>+</Button>
                                        <Button disabled style={{ color: 'black' }}>{item.quantity}</Button>
                                        <Button onClick={() => {
                                            confirm({ description: 'Are you sure you want to change this quantity' })
                                                .then(() => { updateItemQuantity(item.id, item.quantity ? item.quantity - 1 : 1) })
                                        }}
                                            className={clsx(classes.button, classes.down)}>-</Button>
                                    </ButtonGroup>
                                </div>
                                <div className={classes.proice_detail}>
                                    <Typography color="textSecondary">
                                        Item Price <span> {item.price} </span>
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Tax:  (SGST: <span>{item.sgst}</span> + CGST: <span>{item.tax} </span>)

                                    </Typography>
                                    <Typography color="textSecondary">

                                        Total  <span> {item.price_with_tax} </span>
                                    </Typography>
                                    <Link
                                        component="button"
                                        style={{ color: "#1acc8d", fontFamily: "Montserrat-regular", fontWeight: 600 }}
                                        variant="body2"
                                        onClick={() => {
                                            confirm({ description: 'Are you sure you want to remove this item' })
                                                .then(() => { removeItem(item.id); })
                                        }}>
                                        Remove
                                    </Link>
                                </div>
                            </CardContent>
                        </>
                    ))}
                    {cartProduct.length> 0 &&  <Grid item sm={12} className={classes.payButtonArea}>
                            <Button className={classes.payButton} onClick={()=>props.handleSubmit("product")}>PAY {currencyCode.INR} {( productPriceTotal).toFixed(2)} </Button>
                        </Grid>}

                </Card>
            </MediaQuery>
        </>
    );
}