import { Grid, Typography, Link, Card, CardContent, Container, Box } from "@material-ui/core"
import { Link as RouterLink } from 'react-router-dom';
import useStyles from "./topCompaniesStyles";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import company2 from '../../../assets/img/company-2.png';
import company3 from '../../../assets/img/company-3.png';
import company4 from '../../../assets/img/company-4.png';
import company5 from '../../../assets/img/company-5.png';
import company6 from '../../../assets/img/company-6.png';
import * as configData from '../../../constants.json';
import AOS from 'aos';
import "aos/dist/aos.css";
import './topCompanies.css';
import clsx from 'clsx';

const TopCompanies = ({ ourValuableCompanies }: any) => {
    const classes = useStyles();
    // AOS.init({ duration: 3000 })
    function UnsafeComponent({ html,className }) {
        return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
    }
    return (
        <Container className={classes.categoryContainer}>
            <Grid container direction="row" spacing={1}>
                <Grid direction="row" spacing={2} container item sm={12} className={classes.categoryContainer}>
                    <Grid item sm={12} xs={12} md={12}>
                        <Typography className={classes.subTitleHeading}>Our valuable Companies</Typography>
                        <Typography className={classes.subTitlePragraph}>
                            Exploree the greates our services. You won’t be disappointed
                            <Link to={'/list/service-provider'}  component={RouterLink} className={classes.subTitlePragraph} style={{ float: 'right' }}> View All </Link>
                        </Typography>
                    </Grid>
                </Grid>
                
                <Grid container direction="row" spacing={4} className={classes.cardContainerMain}>
                    {ourValuableCompanies && ourValuableCompanies.map((value, index) => (
                        (index < 6) &&
                        <Grid className={classes.cardContainer} sm={4} md={4} xs={12} lg={4} item key={value.id}>
                            <Link component={RouterLink} to={`/list/service-provider/` + value.id} >
                                <Card >
                                    <CardContent className={clsx(classes.companyCategoryBox, 'company-logoitem')}>
                                        <div className={classes.CompanyImage}>
                                            <img src={configData.backendUrl + value.photos} className={classes.CompanyImageitem} alt="plumbing" />
                                        </div>
                                        <h3>
                                            {value.service_provider_name}
                                        </h3>
                                        <UnsafeComponent className={classes.cText}  html={value.business_information} />
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

        </Container>
    )
}
export default TopCompanies;