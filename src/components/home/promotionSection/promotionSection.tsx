import { Grid, Typography, Link,Container } from "@material-ui/core"
import useStyles  from "./promotionSectionStyles";
import downappimg from '../../../assets/img/downapp-img.png';
import downapp1 from '../../../assets/img/downapp-1.svg';
import downapp2 from '../../../assets/img/downapp-2.svg';
import configData from "../../../constants.json";
import AOS from 'aos';
import "aos/dist/aos.css";

const PromotionSection = (props) => {
    const classes = useStyles();
    // AOS.init({ duration: 3000 })
    //const [tasks, setTasks] = useState<any[]>([])

    // useEffect(() => {
    //     const fetchTasks = async () => {
    //         const res = await fetch('http://localhost:8000/api/v1/desktop/services')
    //         const data = await res.json()
    //         setTasks(data.services)
    //     }

    //     fetchTasks()
    // }, [])
    return (
        <Container className={classes.categoryContainer}>
            <Grid container>
                <Grid item md={6} sm={6} lg={6} className={classes.cardContainer}>
                    <h3 className={classes.subTitleHeading}>
                    Lorem ipsum dolor sit amet, consetetur
                    </h3>
                    <Typography className={classes.subTitlePragraph}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos etLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                    </Typography>
                    <div style={{display:'flex'}}>
                        <Link >
                            <img src={downapp1}  style={{width:'100%'}} alt="app-img"  />
                        </Link>
                        <Link style={{paddingLeft:'15px'}}>
                            <img src={downapp2} style={{width:'100%'}}  alt="app-img"  />
                        </Link>
                    </div>
                </Grid>
                <Grid item md={6} sm={6} lg={6} className={classes.cardContainer}>
                    <div className={classes.downappAppImage}>
                    {props.topFooterAppLink && props.topFooterAppLink.map((value) => (
                        <img src={configData.backendUrl + value.photo} alt="app-img" />
                        ))
                    }
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}
export default PromotionSection;