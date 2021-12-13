import { Container, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import useStyles from './bookingHistoryStyles';
export interface IBookingHistoryProps {
}

export default function BookingHistory(props: IBookingHistoryProps) {
    const classes = useStyles();
    return (
        <Container maxWidth='md' style={{ height: '500px' }}>
            <Grid container>
                <Grid item lg={12}>
                    <Typography>Booking Details</Typography>
                </Grid>
                <Grid item lg={12}>
                    <Typography>user Details</Typography>
                </Grid>
                <Grid item>

                </Grid>
            </Grid>
        </Container>
    );
}
