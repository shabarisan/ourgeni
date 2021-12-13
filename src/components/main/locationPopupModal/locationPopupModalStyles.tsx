import {
    Theme,
    createStyles
  } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        serviceCategoryBanner:{
            height:'450px',
            background: 'rgb(0 0 0 / 82%)',
            padding:'190px 0 0',
            color:'white',
        },
        serviceMainWrap:{
            padding:'60px 0',
            textAlign:'center',
        },
        serviceContainer:{
            margin:'0 15%',
            boxShadow:'none !important'
        },
        serviceProductWrap:{
            boxShadow:'none !important'
        },
        headings: {
            textAlign: 'center'
        },
        tiles: {
            width: ' 282.813px',
            marginRight: ' 30px',
            marginBottom: ' 30px',
            padding: '33px 0',
            border: '1px solid #E6E6E6',
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
            color: ' #878787',
            textTransform: 'capitalize',
            margin: 0,
            marginTop: '5px'
        },
        categoryList: {
            display: 'flex',
            background:'#F9F9F9 0% 0% no-repeat padding-box'
        },
        container: {
            position: 'absolute',
            width: '100%'
        },
        title: {
            fontStyle: 'normal',
            fontVariantLigatures: 'normal',
            fontVariantCaps: 'normal',
            fontVariantNumeric: 'normal',
            fontVariantEastAsian: 'normal',
            fontWeight: 'bold',
            fontStretch: 'normal',
            font: "normal normal 36px/77px 'Montserrat-bold'",
            letterSpacing: '0px',
            marginLeft: 'auto!important',
            marginRight: 'auto!important',
            color: '#FFFFFF',
            marginBottom: '.5rem',
        },
        description: {
            font: `normal normal normal 24px/36px Montserrat-Regular`,
            letterSpacing: `0px`,
            color: '#FFFFFF',
        },
        serviceItem:{
            backgroundColor:'#fff',
            marginBottom:'20px !important',
            paddingLeft:'30px !important',
            paddingTop:'30px !important'
        },
        serviceTopItem:{
            marginBottom:'1.5rem'
        },
        serviceTopTittle:{
            float:'left'
        },
        serviceTittle:{
            textAlign:'left',
            font:"normal normal 600 20px/24px 'Montserrat-Regular'",
            letterSpacing:'0px',
            color:'#000000'
        },
        serviceAddon:{
            float:'right'
        },
        serviceClear:{
            clear:'both'
        },
        serviceProduct:{
            display:'flex',
            position:'relative',
            paddingBottom:'12px',
            marginBottom:'1rem'
        },
        serviceImage:{
            width:'112px'
        },
        serviceText:{
            paddingLeft:'20px'
        },
        serviceDescription:{
            textAlign:'left',
            font:"normal normal normal 16px/24px 'Montserrat-Regular'",
            letterSpacing:'0px',
            color:'#878787',
            marginBottom:'1rem'
        },
        servicePricing:{
            textAlign:'left'
        },
        servicePrice:{
            textAlign:'left',
            font:"normal normal 18px/22px 'Montserrat-Bold'",
            letterSpacing:'0px',
            color:'#000000'
        },
        serviceViewMoreLink:{
            textAlign:'left',
            textDecoration:"underline",
            font:"normal normal normal 14px/41px 'Montserrat-Regular'",
            letterSpacing:'0px',
            color:"#878787",
            padding:'0',
            paddingLeft:'30px'
        },
        button:{
            border:'1px solid #ddd',

            width:'25px',
            backgroundColor:'#0D004C',
            padding:'0',
            height:'30px',
            color:'#fff',
            lineHeight:'30px',
        },
        up:{
        borderLeft:0,
        borderRadius:'30px 0 0 30px',
        },
        down:{
            borderRight:0,
            borderRadius:'0 30px 30px 0',
        },
        buttonAdd:{
            background:'transparent linear-gradient(270deg, #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box',
            borderRadius: '5px',
            border: 'none',
            minWidth: '100%',
            minHeight: '42px',
            textAlign: 'center',
            font:" normal normal 16px/21px 'Montserrat-Bold'",
            letterSpacing: '0px',
            color:' #FFFFFF',
            textTransform: 'uppercase',
            lineHeight: '42px',
        },
        addOnButton:{
            "&:hover": {
                textDecoration:'none',
                cursor:'pointer'
            }, 
            textAlign:'left',
            font:"normal normal 600 16px/20px 'Montserrat-Regular'",
            letterSpacing:'0px',
            color:'#000000',
            background:'#FFFFFF 0% 0% no-repeat padding-box',
            border:'1px solid #0D004C',
            borderRadius:'5px',
            padding:'5px 12px',
        },
        addOnButtonIcon:{
            position:'relative',
            top:'5px'
        },
        Boxactive:{
            display:'block',
        },
        Boxinactive:{
            display:'none',
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
            textAlign:'center'

        },
        fixedCartFooter:{
            position:'fixed',
            bottom:0,
            width:'100%',
            height:'40px',
            paddingTop:'15px',
            textAlign:'center',
            backgroundColor:'#1acc8d',
            color:'#000'
        }
    })
    )
)
export default useStyles