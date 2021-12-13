import {
    Theme,
    createStyles
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        breadcrumb:{
            color:"#000",
            marginBottom:'30px',
        },
        filterSection:{
            marginTop:'20px',
            marginBottom:'20px'
        },
        providerSection:{
            padding:'30px',
            minHeight:'350px',
            marginBottom:'20px'
        },
        providerReviewSection:{
            padding:'30px',
            marginBottom:'20px'
        },
        providerServiceSection:{
            paddingLeft:'30px',
            paddingRight:'30px',
            paddingBottom:'30px',
            marginBottom:'20px',
            marginTop:'30px',
            textAlign:'center'
        },
        providerSeciceHeading:{
            textAlign:'center',
            fontSize:"26px",
            color:"#383838",
            fontFamily:"Montserrat-Medium",
            lineHeight:'32px'
            
        },
        providerDetailsSection:{
            padding:'10px !important'
        },
        providerDescriptionSection:{
            marginTop:'30px'
        },
        providerDescription:{
            font:"normal normal normal 16px/24px 'Montserrat-Regular'",
            color:"#878787",
            textAlign:"left",
            letterSpacing:"0px",
            lineHeight:"30px",
            marginTop:'30px'
        },
        providerHeading:{
            color:"#fff",
            font:'normal normal 600 24px/29px "Montserrat-Regular"'
        },
        providerBusinessInfoHeading:{
            textAlign:'center',
            fontFamily:"Montserrat-Medium",
            color:"#383838",
            fontSize:'26px',
        },
        providerAddress:{
            color:"#fff",
            margingTop:'20px',
            margingBottom:'20px',
            font:'normal normal 16px/29px "Montserrat-Regular"'
        },
        providerContactDetails:{
            color:"#fff",
            marginLeft:'30px',
            font:'normal normal 600 14px/29px "Montserrat-Regular"'
        },
        providerImage:{
            float:'right'
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
            fontWeight:'bold',
            font:"normal normal normal 16px/19px Montserrat",
            '&:hover':{
                textDecoration:'none'
            }
        },
        RatingSection:{
            marginTop:'20px'
        },
        RatingWrapIcon:{
            color:'#FFE600',
            fontSize:'32px',
          
        },
        RatingWrapIconNotFille:{
            color:'#FFE600',
            fontSize:'32px'
        },
        ReviewHeading:{
            font: 'normal normal 600 32px/29px "Montserrat-Regular"',
            textAlign: 'center',
            marginBottom: '10px',
            color: '#878787',
        },
        TotalReviews:{
            font: "normal normal normal 16px/24px 'Montserrat-Regular'",
            color: '#878787',
        },
        viewProfileButton:{
            font:"normal normal 16px/14px 'Montserrat-Bold'",
            color:"#FFFFFF",
            width:'100%',
            height:"40px",
            background:"transparent linear-gradient(270deg, #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box",
            borderRadius:"7px",
            letterSpacing:"0px",
        },
        formControl: {
            minWidth: 120,
        },
        ReviewDescription:{
            font:"normal normal normal 16px/24px 'Montserrat-Regular'",
            color:"#878787",
            textAlign:"left",
            letterSpacing:"0px",
            lineHeight:"30px",
            marginTop:'10px'
        },
        ReviewUserName:{
            font:'normal normal 600 18px/29px "Montserrat-Regular"',
        },
        WorkingHoursListItems:{
           textAlign:'center',
        },
        WorkingHoursList:{
            font:"normal normal normal 16px/24px 'Montserrat-Regular'",
            color:"#878787",
            letterSpacing:"0px",
            lineHeight:"30px",
            margin:"5px",
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        },
        WorkingHoursHeading:{
            textAlign:'center',
            fontSize:"16px",
            color:"#219887",
            fontFamily:"Montserrat-Regular",
            fontWeight:600,
            marginBottom:'20px'
        },
        ContactUsHeading:{
            textAlign:'center',
            fontSize:"16px",
            color:"#219887",
            fontFamily:"Montserrat-Regular",
            fontWeight:600
        },
        ContaUsList:{
            font:"normal normal 600 18px/24px 'Montserrat-Regular'",
            color:"#ffff",
            letterSpacing:"0px",
            lineHeight:"30px",
        },
        ContactUsListContainer:{
            marginTop:"30px",
        },
        ContactIons:{
            padding:'5px',
            background:'green',
            borderRadius:'50px',
            
        },
        WhtaspptIons:{
            padding:'6px',
            background:'#1acc8d',
            color:"#ffff",
            fontSize:"30px",
            borderRadius:'50px',
            marginRight:"5px",
        },
        CallIons:{
            padding:'6px',
            background:'#1f6474',
            color:"#ffff",
            fontSize:"30px",
            borderRadius:'50px',
            marginRight:"5px",
        },
        ContactUsIconContainer:{
            display: 'flex',
            alignItems: 'center',
         
            color:"#ffff",
            marginTop:'10px',
            marginBottom:'20px'
        },
        ContatctUsMainDiv:{
            padding:'30px',textAlign:'center'
        },
        WorkingHoursMainDiv:{
            marginTop:'30px',
            marginBottom:'30px',
            paddingLeft:'30px',
            paddingRight:'30px',
            borderRight:'2px solid#219887'
        },
        
        OurServiceList:{
            font:"normal normal normal 16px/24px 'Montserrat-medium'",
            color:"#666666",
            letterSpacing:"0px",
            lineHeight:"30px",
        },
        filterbyText:{
            position:'relative',
            top:'15px'
        },
        providerLogo:{
            width:'150px',
            height:'150px',
            borderRadius:'10px',
            float:'right'
        },
        Backutton:{
            color:"#878787",
            '&:hover':{
                textDecoration:'none',
                cursor:'pointer'
            }
        },
        BackuttonIcon:{
            position:'relative',
            top:'5px'
        }
    })
)
)
export default useStyles