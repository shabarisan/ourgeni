import {
    Grid,
    Container,
    Typography,
    Button,
    TableCell,
    Table,
    TableBody,
    TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './paymentStyles';
import { PaymentRequest }from '../../services/api/payment'
const PaymentScreen = () => {
    // const key = 'weBeKABD';
    const salt = 'c7yxBCuOnj'
    const [paymentInfo, updatePayment] = useState({
        key : 'weBeKABD',
        amount: "10",
        firstname: "Nandha",
        email: "nandhakumar270@gmail.com",
        phone: '9659654334',
        productinfo: 'product1',
        surl: 'https://www.payu.in/',
        furl: "https://www.payumoney.com/dev-guide/apireference.html",
        hash:"758ba759e5efc1e8f3d61af7fbeca87ef78e692d8515ed0a2de022210e56dc7ccf1f41be982b2a6bb10ba4cd4fe681e13456c51937cc959234bbb98ffea88a74",
        txnid:'product1'
    })
    const classes = useStyles()
    const handlePayment = () =>{
        PaymentRequest("http//:localhost:5000/payment",paymentInfo)
    }
    return (
        <Container maxWidth='sm' className={classes.paymentContainer}>
            <Grid container spacing={5}>
                <Grid item >
                    <Typography>Payment Inforamtion</Typography>
                </Grid>
                <Grid item >
                    <Typography>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et</Typography>
                </Grid>

                <Grid item container >
                    <Grid item>
                        <Typography>Your total payment will be</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>900</Typography>
                    </Grid>
                </Grid>
                <Grid container item >
                    <Grid container item sm={6}>
                        <Grid item sm={12}>
                            <Button>Pay with strip</Button>
                        </Grid>
                        <Grid item sm={12}>
                            <Button>Pay with strip</Button>
                        </Grid>
                        <Grid item sm={12}>
                            <Button>Pay with strip</Button>
                        </Grid>
                    </Grid>
                    <Grid item container sm={6}>
                        <Grid item>
                            <Typography>Total pay</Typography>
                        </Grid>

                        <Grid item>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Item Total</TableCell>
                                        <TableCell>800</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Tax</TableCell>
                                        <TableCell>100</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total</TableCell>
                                        <TableCell>900</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item >
                    <Button onClick={handlePayment}>pay 900</Button>
                </Grid>
            </Grid>
        </Container>
    )
}
export default PaymentScreen;