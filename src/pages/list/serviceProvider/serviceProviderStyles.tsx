import {
    Theme,
    createMuiTheme,
} from '@material-ui/core/styles';
import zIndex from '@material-ui/core/styles/zIndex';
import { makeStyles, createStyles, } from '@material-ui/styles';
import bannerBackground from '../../../assets/img/background-list-page.jpg'
export const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiContainer: {
            root: {


            }
        },
        MuiTypography: {
            h1: {

            },
            body1: {

            }
        }
    },
});

const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        banner: {
            background: `url(${bannerBackground}) no-repeat `,
            position: 'relative',
            padding: ' 70px 0 0 0',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '500px',
            width: '100%',
            alignItems: 'center',
            paddingLeft: '0px',
            paddingRight: '0px',
            [`@media (min-width: 600px)`]: {
                paddingLeft: '0',
                paddingRight: '0px'
            },
            '&:before': {
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                backgroundColor: 'rgb(0 0 0 / 55%)',
                top: 0,
                content: '""',
            },
        },
        searchButton:{
            color:"#fff",
            fontFamily:"'Montserrat-Bold'",
            background:"transparent linear-gradient(270deg, #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box",
            width: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '55px',
            [`@media (max-width: 768px)`]: {
                minHeight: '48px',
                marginBottom: '8px',
            },
        },
        searchInput:{
            color: '#ccc',
        },
        searchBox: {
            margin: '50px auto',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Montserrat',
            [`@media only screen and (max-width: 768px)`]:{
                margin: '0 auto',
                flexWrap: 'wrap',
            },
            [`@media only screen and (max-width: 480px)`]:{
                justifyContent: 'center',
            },
        },
        search: {
            position: 'relative',
            marginLeft: 0,
            marginRight: '10px',
            width: '100%',
            [`@media only screen and (max-width: 768px)`]:{
                marginRight: '0',
                marginBottom: '10px',
            },
        },
        location_mobileView:{
            [`@media only screen and (max-width: 768px)`]:{
               width: '80%',
               marginRight: '10px',
            }, 
            [`@media only screen and (max-width: 600px)`]:{
                width: '70%',
                marginRight: '10px',
             }, 
             [`@media only screen and (max-width: 480px)`]:{
                width: '100%',
                marginRight: '10px',
             }, 
        },
        searchIcon: {
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#585858',
            zIndex: 9,
            paddingLeft: '12px',
        },
        inputRoot: {
            color: 'inherit',
            width: '100%'
        },
        inputInput: {
            width: '100%',
            background: '#fff',
            borderRadius: '4px',
            padding: '17px 40px',
            '&::placeholder': {
                color: '#8E8E8E',
            },
            // [`@media only screen and (max-width: 768px)`]:{
            //     padding: '10px 3px',
            //     fontSize: '14px'
            // },
        },        
        container: {
            position: 'absolute',
            width: '100%'
        },
        headings: {
            textAlign: 'center',
            maxWidth: '50%',
            margin: '0 auto',
            [`@media only screen and (max-width: 600px)`]:{
                minWidth: '100%',
            },
        },
        title: {
            fontStyle: 'normal',
            fontVariantLigatures: 'normal',
            fontVariantCaps: 'normal',
            fontVariantNumeric: 'normal',
            fontVariantEastAsian: 'normal',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontSize: '40px',
            lineHeight: '60px',
            fontFamily: 'Montserrat-bold',
            letterSpacing: '0px',
            marginLeft: 'auto!important',
            marginRight: 'auto!important',
            marginTop:'65px',
            color: '#FFFFFF',
            marginBottom: '.5rem',
            [`@media only screen and (max-width: 1200px)`]:{
                lineHeight:'35px',
                fontSize: '32px',
            },
            [`@media only screen and (max-width: 768px)`]:{
                lineHeight:'40px',
                fontSize: '30px',
                marginTop: '40px',
            },
            [`@media only screen and (max-width: 600px)`]:{
                lineHeight:'32px',
                fontSize: '30px',
                marginTop: '30px',
            },
        },
        description: {
            font: `normal normal normal 20px/36px Montserrat-Regular`,
            letterSpacing: `0px`,
            color: '#FFFFFF',
            [`@media only screen and (max-width: 600px)`]:{
                lineHeight:'1.2',
                margin:'5px',
            },
        },
        joinButton: {
            background: `transparent linear-gradient(
                270deg
                , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box;
                    border-radius: 5px`,
            color: '#FFFFFF',
            minWidth: '150px',
            minHeight: ' 48px',
            font: `normal normal 18px/14px 'Montserrat-Bold'`,
            transition: '0.3s',
            borderRadius:' 5px',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginLeft:'30px',

        },
        joinNowWrap: {
            position: 'relative',
            padding:'80px 5%'
        },
        sectionJoin: {
            zIndex: 1,
            overflow: 'hidden',
            background: '#e0e0e0 0% 0% no-repeat padding-box !important',
        },
        joinHeading: {
            textAlign: 'left',
            fontWeight: 600,
            font: "normal normal 30px/39px 'Montserrat-bold'",
            letterSpacing: '0px',
            color: '#000000',
        },
        breadCrumbBox:{
            boxShadow: '0px 3px 6px #00000017',
            padding: '20px 0px',
        },
        breadcrumb:{
            color:"#000",
        },
        breadCrumblinks:{
            color:"#1acc8d",
            font:"normal normal normal 16px/19px Montserrat",
            '&:hover':{
                textDecoration:'none'
            }
        },
        breadCrumblinksActive:{
            color:"#000",
            font:"normal normal normal 16px/19px Montserrat",
            '&:hover':{
                textDecoration:'none'
            }
        },
        RatingSection:{
            marginTop:'3px',
            display: 'flex',
            alignItems: 'center'
        },
        RatingWrapIcon:{
            color:'#FFE600',
        },
        reviewText:{
            fontSize: '14px',
            color: '#fff'
        },
        ratingIconEmpty:{
            color: '#fff'
        }
        
    })
)
)
export default useStyles