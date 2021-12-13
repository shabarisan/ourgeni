import {
    Theme,
    createMuiTheme,
} from '@material-ui/core/styles';
import { makeStyles, createStyles, } from '@material-ui/styles';
import bannerBackground from '../../../assets/img/category-banner-bg.png'
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
            padding: ' 250px 0 0 0',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '695px',
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
            textAlign: 'center'
        },
        title: {
            fontStyle: 'normal',
            fontVariantLigatures: 'normal',
            fontVariantCaps: 'normal',
            fontVariantNumeric: 'normal',
            fontVariantEastAsian: 'normal',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontSize: '63px',
            lineHeight: '77px',
            fontFamily: 'Montserrat-bold',
            letterSpacing: '0px',
            marginLeft: 'auto!important',
            marginRight: 'auto!important',
            color: '#FFFFFF',
            marginBottom: '.5rem'
        },
        description: {
            font: `normal normal normal 24px/36px Montserrat-Regular`,
            letterSpacing: `0px`,
            color: '#FFFFFF',
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
        categoryList: {
            display: 'flex',
            marginTop:'50px'
        },
        tiles: {
            width: ' 282.813px',
            marginRight: ' 30px',
            marginBottom: ' 30px',
            padding: '33px 0',
            borderRadius: '8px',

        },
        tileContent:{
            height:'100%',
            width:'100%',
        },
        imgFluid: {
            Width: 'auto',
            margin: '0',
            padding: '0 100PX'
        },
        tileHeading: {
            textAlign: "center",
            font: "normal normal 16px/40px 'Montserrat-Medium'",
            letterSpacing: ' 0px',
            color: '#fff',
            textTransform: 'capitalize',
            margin: 0,
            marginTop: '5px',
            lineHeight:'170px'
        },
        subTitleHeading: {
            font: 'normal normal 600 24px/29px "Montserrat-Regular"'
        },
        subTitlePragraph: {
            font: "normal normal 16px/19px 'Montserrat-medium'",
            letterSpacing: '0px',
            color: '#A8A8A7 !important',
        },
        categoryContainer: {
            marginTop:'50px',
            marginBottom: '24px',
            padding: '0 10px'
        },
        hoerSec:{
            position:'relative',
            top:'-170px',
            width:'175px',
            backgroundColor:'#18506c',
            textDecoration:'none',
            left:'150px',
            borderRadius:'509px',
            display:'none'
        },
        subCatLink:{
            textDecoration:'none',
            '&:hover':{
                textDecoration:'none'
            }
        },
        subCategoryBox:{
            textAlign:'center',
            '&:hover':{
                '& $hoerSec':{
                    display:'block'
                }
            },
            width: '282.813px',
            height:'200px',
            marginBottom:'30px'
        },
        sectionParagraph:{
            textAlign:'left',
            font:"normal normal 16px/19px 'Montserrat-medium' !important;",
            color:"#A8A8A7 !important",
            marginTop:"10px"
        },
        serviceContainer:{
            margin:'0 15%',
            marginTop:'-50px',
            zIndex:1,
            backgroundColor:"#fff",
            boxShadow:'0px 3px 6px #00000038',
            marginBottom:'50px'
        },
        ReviewRationSection:{
            padding:'45px 0 30px',
            textAlign:'center',
            width:'100%'
        },
        ReviewRationSectionTitle:{
            textAlign:'center',
            marignBotton:'1.5rem'
        },
        marginBottomFour:{
            marignBotton:'1.5rem'
        },
        marginTopThree:{
            marginTop:'1rem'
        },
        RatingWrapIcon:{
            paddingLeft:'5px',
            color:'#FFE600',
        },
        RationgCount:{
            color:'#878787',
            paddingLeft:'3rem'
        },
        RatingCommandCount:{
            marginTop:'20px'
        },
        commentsSection:{
            display:'flex',
            position:'relative',
            paddingBottom:'12px',
            paddingLeft:'65px',
            marginBottom:'2rem',
            borderBottom:'0.5px solid #ddd',
            paddingRight:'65px',
            paddingTop:'20px',
        },
        CommandAvatar:{
            width:'64px'
        },
        CommandAvatarImg:{
            width:'64px',
            borderRadius:'64px',
            height:'auto',
        },
        CommandText:{
            paddingLeft:'14px'
        },
        CommandHeading:{
            marginTop:'0px',
            marginBottom:'0px',
            textAlign:'left',
            font:"normal normal 16px/24px 'Montserrat-Medium'",
            letterSpacing:'0px',
            color:'#000000'
        },
        CommandPosted:{
            position:'relative',
            top:'-30px',
            right:'-160px'
        },
        CommandPostedSmall:{
            textAlign:'left',
            font:"normal normal normal 14px/24px 'Montserrat-Regular'",
            letterSpacing:'0px',
            color:"#878787"
        },
        CommandParagraph:{
            marginBottom:".5rem",
            width:'70%',
            textAlign:'justify',
            font:"normal normal normal 14px/24px 'Montserrat-Regular'",
            letterSpacing:'0px',
            color:'#878787'
        },
        ViewMoreSection:{
            textAlign:'center',
            marginBottom:'1.5rem',
            width:'100%'
        },
        
    })
)
)
export default useStyles