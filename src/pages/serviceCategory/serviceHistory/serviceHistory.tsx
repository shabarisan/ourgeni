import {
    Container,
} from '@material-ui/core';
import useStyles from './serviceHistoryStyles';
import ServiceBookingHistoryTabs from '../../../components/serviceCategory/serviceBookingHistory/serviceBookingHistory';

const ServiceBookingHistory = () => {


    const classes = useStyles()
    return (
        <Container className={classes.paymentContainer}>

            <ServiceBookingHistoryTabs/>
        </Container>
    )
}
export default ServiceBookingHistory;