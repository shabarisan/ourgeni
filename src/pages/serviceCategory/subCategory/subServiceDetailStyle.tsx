import {
    makeStyles,
    createStyles,
    createMuiTheme,
    Theme
} from '@material-ui/core/styles';
import { Repeat } from '@material-ui/icons';
import bannerBackground from '../../../assets/img/category-banner-bg.png'

export const theme = createMuiTheme({
    overrides: {
        MuiCardContent: {
            root: {
               
            }
        }
    }
})
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        banner: {
            // background: `url(${bannerBackground}) no-repeat `,
            position: 'relative',
            padding: ' 130px 0 0 0',
            backgroundSize: 'cover !important',
            backgroundPosition: 'center',
            height: '400px',
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
        container: {
            position: 'absolute',
            width: '100%'
        },
        headings: {
            textAlign: 'center',
        },
        headingsLeft: {
            textAlign: 'left',
        },
        title: {
            fontStyle: 'normal',
            fontVariantLigatures: 'normal',
            fontVariantCaps: 'normal',
            fontVariantNumeric: 'normal',
            fontVariantEastAsian: 'normal',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontSize: '50px',
            lineHeight: '60px',
            fontFamily: 'Montserrat-bold',
            letterSpacing: '0px',
            marginLeft: 'auto!important',
            marginRight: 'auto!important',
            color: '#FFFFFF',
            marginBottom: '.5rem'
        },
        description: {
            font: `normal normal normal 20px/36px Montserrat-Regular`,
            letterSpacing: `0px`,
            color: '#FFFFFF',
        },
        categoryContainer:{
            paddingLeft:'5px',
            paddingRight:'0px',
            marginTop:'50px',
            marginBottom:'10px',
            [`@media only screen and (max-width: 768px)`]:{
                display: 'flex',
                overflowX: 'scroll',
                flexWrap: 'nowrap',
            },
            "& a": {
                color: '#878787',
                textDecoration: 'none',
                "&:hover":{
                    textDecoration:'none'
                }
            },
        },
        categoryBox: {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            margin: '0 auto',
            border: '1px solid #E6E6E6',
            borderRadius: '8px',
            textAlign: 'center',
            padding: '30px',
            minHeight:'200px',
            maxHeight:'200px',
            lineHeight:'20px',
            minWidth:'210px',
            maxWidth:'210px',
            overflowWrap:'break-word',
            overflow:'hidden',
            [`@media only screen and (max-width: 768px)`]:{
                padding:"25px",
                maxHeight:'150px',
                maxWidth:'unset',
                minWidth:'unset',
            },
            "& a": {
                color: '#878787',
                textDecoration: 'none',
                "&:hover":{
                    textDecoration:'none'
                }
            },
            "& img": {
                maxWidth:'100%',
                height:'auto'
            },
            "& h3":{
                font: "normal normal 16px/40px 'Montserrat-Medium'",
                letterSpacing: '0px',
                textTransform: 'capitalize',
                color: '#878787',
                lineHeight:'25px',
                [`@media only screen and (max-width: 768px)`]:{
                   fontSize:'15px',
                }
            },
            "&:hover":{
                boxShadow:"0px 3px 16px #cccccc"
            }
        },
        cardTitle:{

        },
        subCatTitleHeading: {
            fontFamily : 'Montserrat-SemiBold',
            fontSize: "24px",
            textAlign: "center",
            fontWeight: 600,
            [`@media only screen and (max-width: 768px)`]:{
                margin: '5px',
            },
        },
        card_bxs:{
            [`@media only screen and (max-width: 768px)`]:{
                flexShrink: '0',
            },
        },
        subCatMainTitleHeading: {
            fontFamily : 'Montserrat-SemiBold',
            fontSize: "32px",
            textAlign: "center",
            fontWeight: 600,
        },
        subCatSmTitle: {
            fontFamily : 'Montserrat-SemiBold',
            fontSize: "14px",
            textAlign: "center",
            color:"#878787",
            fontWeight: 400,
            display: "flex",
            justifyContent: "center",
            // marginBottom: "30px",
        
            '& strong':{
                color: "#000000",
                margin: "0 10px",
            },
        },
        imgFluid:{
            maxWidth:'100%',
                height:'auto'
        },
        root: {
            flexGrow: 1,
        },
            paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        installationWrapper: {
            backgroundColor: "#fff",
            paddingTop: "50px",
        },
        weCanDo: {
            backgroundColor: "#fff",
            paddingTop: "30px",
            paddingBottom: "30px",
        },
        serviceGridContainer: {
            // display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(25rem, 1fr))",
            // gap: "10px",
            alignItems: "center",
        },
        serviceGridItems: {

        },
        serviceGridItemsMiddle: {
            '& $serviceMediaBox' : {
                marginBottom: "0",
            }
        },
        serviceGridItemsLeft: {
            display:"flex",
            alignItems: "flex-start",
        },
        serviceGridItemsRight: {
            display:"flex",
            alignItems: "flex-start",
            '& $serviceMediaBox': {
                flexDirection: "row-reverse",
            },
            '& $serviceMediaContent': {
                textAlign:"right",
            },
            '& $serviceMediaImg': {
                marginRight: "0px",
                marginLeft: "15px",
            },
        }, 
        serviceMediaBox: {
            display:"flex",
            marginBottom:"120px",
            '& img' :{
                width: "100%",
            }
        },
        serviceMediaImg: {
            width: "150px",
            height: "150px",
            borderRadius:"5px",
            marginRight:"15px",
            backgroundColor: "#ddd",
            '& img' : {
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }
        },
        serviceMediaContent: {
            width: "100%",
            padding: '0 10px',
            '& h4': {
                color:"#000000",
                fontSize: "18px",
                margin:"0px",
                padding: "0px",
            },
        },
        customerRateBox: {
            padding: "50px 0px",
            '& $subCatTitleHeading ':{
                marginBottom: "50px",
            },
        },
        ratingType:{
            margin: "15px 0px 8px",
            color: "#3BB432 !important",
            fontSize: "20px !important",
        },
        commentsLight:{
            color: "#878787",
        },
        commentListBorder: {
            '&:first-child': {
                borderTop: "1px solid #ddd",
            },
        },
        serviceTabPanes: {
            background: '#fff',
            padding: '35px 0px',
            borderBottom: "2px solid #ddd",
        },
        button:{
            border:'1px solid #ddd',
            width:'25px',
            backgroundColor:'#0D004C',
            padding:'10px 30px',
            height:'48px',
            color:'#fff',
            lineHeight:'30px',
        },
        down: {
            '&:hover': {
                backgroundColor: "#220a94",
            },
        },
        serviceTabsLinks: {
            '& button':{
                background: '#fff',
                fontSize: '16px',
                fontWeight: 600,
                color: '#1D1D1D',
                textTransform: 'none',
                '&:first-child':{
                    paddingRight: '50px'
                },
                '& span': {
                    '&:first-child':{
                        borderBottom: '3px solid #0D004C',
                    },
                },
            },
        },
        fixedCartFooter:{
            position:'fixed',
            bottom:0,
            zIndex:1,
            width:'100%',
            height:'60px',
            paddingTop:'15px',
            textAlign:'center',
            backgroundColor:'#1acc8d',
            color:'#000',
            left:0,
        },
        joinButton: {
            background: `transparent linear-gradient(
                270deg
                , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box;
                    border-radius: 5px`,
            color: '#FFFFFF',
            minWidth: '150px',
            minHeight: '35px',
            font: `normal normal 18px/14px 'Montserrat-Bold'`,
            transition: '0.3s',
            borderRadius:' 5px',
            textTransform: 'uppercase',
            marginLeft:'30px',
            textAlign:'center'

        },
        addOnService: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            [`@media only screen and (max-width: 600px)`]:{
                display:'block',
            },
            '& h5': {
                fontSize: '18px',
                fontWeight: 600,
                marginRight: '10px',
            },
        },
        addOnServiceBtn: {
            marginLeft:'10px',
            color:"#fff",
            font:"normal normal 16px/14px 'Montserrat-Bold'",
            minHeight:"48px",
            fontWeight:600,
            padding: '10px 30px',
            background:`transparent linear-gradient(
                270deg
                , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box;
                    border-radius: 5px`,
            whiteSpace: "nowrap",
            [`@media only screen and (max-width: 600px)`]:{
                padding: '10px 20px',
                minHeight:"auto",
                fontSize: '16px',
                fontWeight: 400,
                marginTop: '10px',
            },
        },
        close_btn:{
            position: 'absolute',
            left: '20px',
            top: '20px',
            background: 'rgba(0,0,0,.5)',
            zIndex: 9,
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            lineHeight: '1',
        },
        price_sec:{
            display: 'flex',
            justifyContent: 'space-evenly',
        },
        actual_price:{
            display: 'block',
        },
        turnaround_sec:{
            display: 'block',
        },
        sub_txt:{
            margin: '0 0 5px',
        },
        border_bottom:{
            borderBottom: '1px solid #ddd',
            paddingBottom: '20px'
        }
    })))
export default useStyles;