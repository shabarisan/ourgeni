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
            // padding:'190px 0 0',
            color:'white',
            [`@media only screen and (max-width: 768px)`]:{
                padding:'0px 0 0',
            },
            [`@media only screen and (max-width: 600px)`]:{
                height: '275px',
             },
        },
        serviceMainWrap:{
            padding:'100px 0px 60px',
            textAlign:'center',
        },
        serviceSubCardBox:{
            background: '#fff',
            marginBottom: '40px'
        },
        serviceContainer:{
            boxShadow:'none !important',
            [`@media only screen and (max-width: 768px)`]:{
                margin:'0 6%',
            }
        },
        serviceProductWrap:{
            boxShadow:'none !important',
            [`@media only screen and (max-width: 600px)`]:{
                padding:'5px',
            }
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
        loder:{
            display:"flex",
            margin:'auto',
            alignItems:'center',
            justifyContent:'center'
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
            display: 'flex'
        },
        container: {
            position: 'relative',
            width: '100%'
        },
        videoPlayer:{
            margin: '0 auto',
            height:'450px',
            width:"100%",
            [`@media only screen and (max-width: 600px)`]:{
                height: '275px',
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
            font: "normal normal 36px/77px 'Montserrat-bold'",
            letterSpacing: '0px',
            marginLeft: 'auto!important',
            marginRight: 'auto!important',
            color: '#FFFFFF',
            marginBottom: '.5rem',
            lineHeight:'45px',
            [`@media only screen and (max-width: 768px)`]:{
               // marginTop:'30px',
            }
        },
        description: {
            font: `normal normal normal 24px/36px Montserrat-Regular`,
            letterSpacing: `0px`,
            color: '#FFFFFF',
        },
        serviceItem:{
            backgroundColor:'#fff',            
            paddingLeft:'30px !important',
            paddingTop:'30px !important',
            display: 'flex',
            [`@media only screen and (max-width: 1024px)`]:{
                paddingLeft:'0px !important',
             },
            [`@media only screen and (max-width: 600px)`]:{
                justifyContent: 'center',
                paddingTop:'0px !important', 
                paddingBottom: '10px !important',
            }
        },
        serviceTopItem:{
            marginBottom:'1.5rem',
            [`@media only screen and (max-width: 480px)`]:{
                marginBottom:'.5rem',
            }
        },
        serviceTopTittle:{
            float:'left'
        },
        serviceTittle:{
            textAlign:'left',
            font:"normal normal 600 20px/24px 'Montserrat-Regular'",
            letterSpacing:'0px',
            color:'#000000',
            // marginBottom: '9px',
        },
        serviceRatingBox:{
            textAlign: 'left',
            fontSize: '12px',
            color: '#878787',
            display: 'flex',
            alignItems: 'center',
            font:"normal normal 400 20px/24px 'Montserrat'",
            [`@media only screen and (max-width: 480px)`]:{
                display: 'block'
            }
        },
        ratingLabel:{
            fontWeight: 600,
            marginLeft: '5px',
        },
        RatingWrapIcon:{
            color: '#F6AB29',
            width: '18px',
            height: 'auto',
            marginRight: '5px'
        },
        serviceAmountCard:{
            listStyle: 'none',
            padding: 0,
            textAlign: 'left',
            margin: '15px 0px 0px',
            font:"normal normal normal 16px/24px 'Montserrat'",
            '& li':{
                color: '#878787',
                fontSize: '14px',
                borderRight: '1px solid #707070',
                display: 'inline-block',
                padding: '0px 15px',
                '& b':{
                    fontSize: '18px',
                    color: '#000000',
                    fontWeight: 'bold',
                    // display: 'block',
                    // marginRight: '5px',
                    marginLeft:'20px',
                    '& span':{
                        fontWeight: 'normal',
                        color: '#878787',
                    },
                },
                '&:first-child':{
                    paddingLeft: 0,
                },
                '&:last-child':{
                    border: 'none',
                },
            },
        },
        serviceMoreText: {
            font: "normal normal normal 16px/24px 'Montserrat'",
            color: '#878787',
            textAlign: 'left',
            marginBottom: '1rem',
            letterSpacing: '0px',
            '& a': {
                textDecoration: 'none',
            },
        },
        viewMoreLinkTag: {
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Montserrat',
            marginTop:'40px',
            '&:hover' :{
                textDecoration: 'none'
            }
        },
        viewMoreBreak: {
            color: '#0D004C',
            fontSize: '14px',
            marginTop: '30px',
            display: 'flex',
            alignItems: 'center'
        },
        arrowRight:{
            background: '#0D004C',
            width: '16px',
            height: '16px',
            borderRadius: '50px',
            color: '#fff',
            marginLeft: '5px',
        },
        serviceAddon:{
            float:'right',
            '& $down': {
                '&:hover': {
                    backgroundColor: "#220a94",
                },
            },
        },
        viewMore:{
            justifyContent:'flex-end'
            
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
            width:'112px',
            height: '112px',
            objectFit: 'cover',
            marginRight: '15px'
        },
        serviceRightContent: {
            font:"normal normal normal 16px/24px 'Montserrat'"
        },
        serviceText:{
            paddingLeft:'20px',
            textAlign: 'left'
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
            padding:'5px',
            textTransform: 'uppercase',
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
            minHeight: '35px',
            font: `normal normal 18px/14px 'Montserrat-Bold'`,
            transition: '0.3s',
            borderRadius:' 5px',
            textTransform: 'uppercase',
            marginLeft:'30px',
            textAlign:'center'

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
            [`@media only screen and (max-width: 480px)`]:{
                paddingTop:'7px',
                height:'80px',
            },
        },
        breadcrumb:{
            float:'left',
            marginTop:'30px',
            marginRight:'20px',
            color:"#000",
            borderRadius:'10px'
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
        },
        taxSpan:{
            marginTop:'10px'
        },
        taxText:{
            fontFamily:'Montserrat-Regular',
            fontWeight:'bold'
        },
        locationButton:{
            marginTop:'10px',
            marginBottom:"30px",
            [`@media only screen and (max-width: 768px)`]:{
                marginTop:'30px',
            }
        },

        // Sub category selected box design
        subCategorySelected:{
            padding: '30px 60px',
        },
        selectedCardImage:{
            maxWidth: '100%',
            minHeight: '200px',
            maxHeight: '200px',
            objectFit: 'cover',
            borderRadius: '5px'
        },
        selectedTitle: {
            fontSize: '26px',
            color: '#000000',
            margin: '0px 30px 18px',
            fontWeight: 600
        },
        serviceBilling: {
            listStyle: 'none',
            padding: '0px',
            margin: '0px',
            '& li': {
                color: '#878787',
                fontSize: '16px',
                padding: '15px 0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '& span':{
                    fontSize: '24px',
                    color: '#000000',
                    fontWeight: 'bold',
                },
                '&:last-child':{
                    fontWeight: 'bold',
                    color: '#000000',
                    border: '1px solid #707070',
                    borderLeft: 'none',
                    borderRight: 'none',
                },
            },
        },
        subCategoryCardBody: {
            paddingLeft: '0px',
            paddingRight: '0px'
        },
        submitCardButton: {
            marginLeft:'0px',
            marginTop:'20px',
            width:'100%',
            color:"#fff",
            font:"normal normal 18px/14px 'Montserrat-Bold'",
            minHeight:"48px",
            fontFamily:'"Montserrat", sans-serif',
            fontWeight:600,
            background:`transparent linear-gradient(
                270deg
                , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box;
                    border-radius: 5px`
        },
        scrollSection:{
            height: '80vh',
            overflowY: 'scroll',
            overflowX: 'hidden',
            position: 'relative'
        },
        scrollSection_mobile:{
            position: 'relative'
        },
        mobile_rated_hide:{
            [`@media only screen and (max-width: 768px)`]:{
                display:'none',
            }
        }
    })
    )
)
export default useStyles