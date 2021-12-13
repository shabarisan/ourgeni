import { Container, Grid, TextField, Typography, Button } from '@material-ui/core'
import React, { useState } from 'react';
import clsx from 'clsx';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import { Calendar,DayValue } from "react-modern-calendar-datepicker";
import useStyles,{theme} from "./scheduleBookingStyles";
import './scheduleCalanderStyles.css';
import { ThemeProvider } from '@material-ui/core/styles';
function ScheduleBooking() {
    const classes = useStyles();
    const currentDate = new Date();
    const [date, setDate] = React.useState<Date | null>(new Date());
    return (
        <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <Container>
                <Grid container spacing={5} className={classes.scheduleContent}>
                    <Grid item xs={12}>
                        <Typography className={classes.scheduleHeading}>When you need your service</Typography>
                    </Grid>
                    <Grid item container spacing={10}>
                        <Grid item container sm={6} xs={12}>
                            <Grid item className={classes.scheduleCalander} sm={12}>
                               <CustomDatePicker setDate={setDate}/>
                            </Grid>
                        </Grid>
                        <Grid item container sm={6}>
                            <Grid container spacing={2} item className={classes.scheduleClock}>
                                <Grid item xs={12}>
                                    <Typography className={classes.scheduleHeading}>Select time</Typography>
                                </Grid>
                                <Grid item sm={8} xs={8}>
                                    <TextField
                                        id="time"
                                        type="time"
                                        fullWidth
                                        defaultValue="07:30"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography>Lorem ipsum dolor sit amet,
                                    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                            sed diam voluptua.</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid container item justify='center'>
                        <Grid item>
                            <Button className={clsx(classes.button, classes.schedule)}
                            >Schedule</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div >
        </ThemeProvider>
    )
}
const CustomDatePicker =(props)=>{
    const classes = useStyles();
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
        return (
            <Calendar
            colorPrimary="linear-gradient(180deg, #0D004C 0%, #24AE90 100%) 0% 0% no-repeat padding-box" 
            calendarClassName={classes.datePicker}
            value={selectedDay}
            onChange={setSelectedDay}
            
          />
    )
}
export default ScheduleBooking;