import {
    Theme,
    createStyles,
    createMuiTheme
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
export const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiButton:{
            label:{
                font: "normal normal 14px/12px 'Montserrat-bold'",
            }
        }
    },
});
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        root:{
            padding: '60px 100px',
            overflow: 'hidden',
        },
        scheduleContent:{
            marginBottom:'10px',
            marginTop:"50px",
            [theme.breakpoints.up('sm')]:{
                padding:'40px 95px 40px 112px',
            },
            [theme.breakpoints.up('xs')]:{
                padding:'10px',
            },
        },
        scheduleHeading: {
            textAlign: 'center',
            font: 'normal normal 600 24px/29px "Montserrat-Regular"',
            letterSpacing: '0px',
            color: '#000000',
            marginTop:'10px',
            marginBottom:'30px'
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        datePicker:{
            fontSize:'11px',
            width:'100%'
        },
        button: {
            borderRadius: '4px',
            border: '2px solid #707070',
            letterSpacing: '0px',
            marginTop: '25px',
            marginRight: '15px',
            color: '#707070',
            padding: ' 16px 12px !important',
            minWidth: '300px',
            minHeight: '48px',
            fontFamily:'"Montserrat", sans-serif',
            font:"normal normal 600 18px/14px 'Montserrat-Bold'",
            
        },
        schedule:
        {
            textTransform:'uppercase',
            color: '#FFFFFF',
            background: `transparent linear-gradient(
                90deg
                , #0D004C 0%, #24AE90 100%) 0% 0% no-repeat padding-box`,
            [`@media only screen and (max-width: 600px)`]:{
                width: '100%',
                minWidth: '100%',
            },
        },
        scheduleCalander: {
            backgroundColor: "white",
        },
        scheduleClock: {
            backgroundColor: "white",
            paddingTop:"20px",
            paddingBottom:"20px",
            paddingLeft:'10px',
            paddingRight:'10px',
           
        },
        paragraph:{
            textAlign:"justify",
            font:"normal normal normal 14px/18px 'Montserrat-Regular'",
            color:"#878787",
            letterSpacing:"0px"
        },
        breadcrumb:{
            color:"#000",
            marginTop:'30px',
            marginBottom:'20px',
        },
        breadCrumblinks:{
            color:"#000",
            font:"normal normal normal 16px/19px Montserrat",
            '&:hover':{
                textDecoration:'none'
            }
        },
        breadCrumblinksActive:{
            color:"#000",
            fontWeight:'bold',
            font:"normal normal normal 16px/19px Montserrat",
            '&:hover':{
                textDecoration:'none'
            }
        }
    })
)
)
export default useStyles