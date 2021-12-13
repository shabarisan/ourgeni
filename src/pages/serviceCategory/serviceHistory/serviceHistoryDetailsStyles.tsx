import {
    createStyles,
    makeStyles,
} from '@material-ui/core'
const useStyles = makeStyles(()=>
createStyles({
  OrderDetailpage:{
    margin:'100px auto 30px auto',
    fontFamily:"Montserrat",
    maxWidth:'1280px',
    padding:'0 24px'
  },
  OrderDetailLeft:{
    background:'#fff',
    width:'95%',
    border:'1px solid #ddd',
    float:'left'
  },
  OrderDetailRight:{
    background:'#fff',
    width:'100%',
    border:'1px solid #ddd',
    float:'right'
  },
  sectionHeading:{
    font:"normal normal normal 16px/19px Montserrat",
    fontWeight:600,
    borderBottom:"1px solid #C8C8C8",
    padding:"20px 30px",    
},
sectionRightHeading:{
  font:"normal normal normal 16px/19px Montserrat",
  fontWeight:600,
  borderBottom:"1px solid #C8C8C8",
  padding:"20px",
},
OrderDetailRightPaymentAmount:{
font:'normal normal 600 12px/24px Montserrat',
color:'#000000',
padding:'0px',
borderBottom:'1px dotted #ACACAC',
width:'100%',
float:'left',
'&:last-child' : {
  borderBottom: "none",
},
},
PaymentAmountText:{
 '& span':{
  width:'50%',
  float:'left',
  font:'normal normal bold 14px/60px Montserrat',
  color:'#000000'
 },
 '& strong':{
  width:'50%',
  float:'left',
  textAlign:'right',
  font:'normal normal bold 14px/60px Montserrat',
  color:'#6E7176'
}
},
OrderDeatilItem:{
  borderBottom:"1px solid #C8C8C8",
  padding:"20px 30px",
  width:'100%',
  float:'left'
},
OrderDetailRightSummary:{
  width:'100%',
  float:'left',
  padding:'20px 20px'
},
PaymentSummaryText:{
  '& h2':{
    font:'normal normal 600 14px/18px Montserrat',
    color:'#000',
    margin:'0px'
  },
  '& p':{
    font:'normal normal 600 12px/24px Montserrat',
    color:'#000',
    margin:'0px'
  },
},
  root:{
        padding: '60px 100px',
        overflow: 'hidden',
    },
    paymentContainer:{
        padding:'50px',
        marginTop:'130px',
        marginBottom:'50px',
        background:"rgb(0 0 0 / 4%) 0% 0% no-repeat padding-box"
    },
    paymentTitleContainer:{
        width:'100%',
        borderBottom:'1px solid #fff'
    },
    paymentContainerHeader:{
        font:"normal normal 600 24px/29px 'Montserrat-Regular'",
        color:"#000000",
        padding:"15px 0",
        textAlign:'center',
        letterSpacing:'0px'
    },
    paymentotal:{
        backgroundColor:"#219787"
    },
    paymentDetails:{
        font:"normal normal normal 16px/24px 'Montserrat-Regular'",
        textAlign:'left',
        color:"#878787"
    },
    paymentHeading:{
        font:"normal normal 24px/29px 'Montserrat-medium'",
        textAlign:"center",
        color:"#FFFFFF",
        paddingRight:"10px",
        paddingLeft:'30px',
        letterSpacing:"0px"
    },
    paymentButtonGrid:{
        marginBottom:'10px',
        marginTop:'10px'
    },
    payButton:{
        background:'transparent linear-gradient(270deg, #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box',
        borderRadius: '4px',
        border: 'none',
        letterSpacing: '0px',
        marginTop: '25px',
        marginRight: '15px',
        color: '#ffff',
        minWidth: '300px',
        minHeight: '48px',
        font:"normal normal 18px/26px 'Montserrat-Regular'",
        fontWeight:600,
    },
    paymentIcon:{
        paddingLeft:'10px'
    },
    paymentGrid:{
        padding:"10px"
    },
    paymentButtons:{
        alignItems:'center',
        justifyContent:'space-between',
        textAlign:'left',
        font:"normal normal 16px/17px 'Montserrat-Medium'",
        letterSpacing:'0px',
        color:"#000000",
        textTransform:"capitalize",
        "&:hover": {
            background:'inherit'
        }
    },
    paymentSectionContainer:{
        width:'100%'
    },
    paymentSectionTitle:{
        font:"normal normal 24px/29px 'Montserrat-medium'",
        paddingLeft:'30px',
        textAlign:'left',
        margintop:'10px',
        marginBottom:'0px'
    },
    paymentSectionTable:{
        width:'100%',
        paddingLeft:'14px',
        paddingTop:'10px',
    },
    paymentSectionTableTd:{
        font:"normal normal normal 16px/22px 'Montserrat-Regular'",
        color:"#000000",
        letterSpacing:'0px',
        textAlign:"left"
    },
    paymentSectionTableTdTotal:{
        font:"normal normal 18px/22px 'Montserrat-Bold'",
        color:"#000000",
        letterSpacing:'0px',
        textAlign:"left"
    },
    BookingHeading:{
        font:"normal normal 24px/24px 'Montserrat-Medium'",
        letterSpacing:"0px",
        color:"#000000",
        paddingBottom:"30px",
        textAlign:'center'
    },
    Commands:{
        display:"flex",
        position:'relative',
        paddingBottom:"12px",
        paddingLeft:"10px",
        marginBottom:"2rem",
        paddingRight:"40px",
        
        paddingTop:"20px"
      },
      CommentAvatar:{
        width:'64px'
      },
      CommentAvatarImage:{
        width:'30px',
        height:"auto",
      },
      OrderDetailInfoBlock:{
        border:'1px solid #ddd',
        margin:'20px 30px',
        width:'calc(100% - 60px)',
        padding:'20px 0',
        float:'left',
      },
      CommentTextHeading:{
        marginBottom:"0.5rem",
        textAlign:"left",
        font:"normal normal 16px/24px 'Montserrat-Medium'",
        letterSpacing:"0px",
        color:"#000000"
      },
      CommentTextContents:{
        marginBottom:"0.5rem",
        textAlign:"justify",
        font:"normal normal normal 14px/24px 'Montserrat-Regular'",
        letterSpacing:"0px",
        color:"#878787"
      },
      CommandServicePrice:{
        textAlign:"left",
        font:"normal normal 18px/22px 'Montserrat-Bold'",
        letterSpacing:"0px",
        color:'#000000'
      },
      ApprovedButton:{
        backgroundColor:'#CBF6D4',
        borderRadius:'15px',
        padding:'0px 20px',
        color:"#028F28",     
        textAlign:'center',
        verticalAlign:'middle',
        margin:'10px 20px 0 20px',
        font:'normal normal 600 10px/60px Montserrat',
        height:'24px',
        '&:hover':{
          color:'#fff',
          backgroundColor:'#218838',
          borderColor:'#1e7e34',
        }
      },
      CancelledButton:{
        backgroundColor:'red',
        borderRadius:'15px',
        padding:'0px 20px',
        color:"#fff",     
        textAlign:'center',
        verticalAlign:'middle',
        margin:'10px 20px 0 20px',
        font:'normal normal 600 10px/60px Montserrat',
        height:'24px',
        '&:hover':{
          color:'#fff',
          backgroundColor:'#218838',
          borderColor:'#1e7e34',
        }
      },
      RescheduleButton:{
        backgroundColor:'#CBF6D4',
        borderRadius:'15px',
        padding:'0px 20px',
        color:"#028F28",     
        textAlign:'center',
        verticalAlign:'middle',
        margin:'10px 20px 0 20px',
        font:'normal normal 600 10px/60px Montserrat',
        height:'24px',
        '&:hover':{
          color:'#fff',
          backgroundColor:'#218838',
          borderColor:'#1e7e34',
        }
      },
      ChatButton:{
        borderRadius:'15px',
        padding:'0px 10px',
        color:"#0D004C",
        borderColor:'#0D004C',
        textAlign:'center',
        verticalAlign:'middle',
        lineHeight:'1.5',
        marginTop:'10px',
        height:'24px',
        font:'normal normal 600 10px/60px Montserrat',
      },
      BookingSections:{
        marginTop:"30px"
      },
      BooingAddressSections:{
        padding:"30px"
      },
      BookingAddressSectionHeading:{
          font:"normal normal 16px/24px 'Montserrat-medium'",
          color:"#000000",
          letterSpacing:"0px",
          textAlign:'center'
      },
      BookingAddressSectionParagraph:{
        font:"normal normal normal 14px/24px 'Montserrat-Regular'",
        color:"#878787",
        width:"70%",
        letterSpacing:"0px",
        margin:"0 auto",
        textAlign:'center'
    },
    OrderDetailInfoBlockHeading:{
      borderBottom:'1px solid #ddd',
      padding:'0 20px 20px 20px',
      width:'100%',
      float:'left'
    },
    CommentText:{
      
    },
    CommentTextinfo:{
      marginBottom:"5px",
      textAlign:"left",
      font:"normal normal normal 12px/20px Montserrat",
      letterSpacing:"0px",
      color:"6E7176"
    },
    OrderDetaiDesc:{
      padding:'20px 20px'
    },
    OrderDetailCustomerBlock:{
      float:'left',
      padding:'10px 30px 50px 30px',
      width:'100%'
    },
    OrderDetailCustomerInfoBlockHeading:{
      font:'normal normal 600 13px/60px Montserrat',
      color:'#333',
      textTransform:'uppercase'
    },
    OrderDetailCustomerAddress:{
      font: 'normal normal normal 13px/24px Montserrat',
      color:'#000',
      '& strong':{
        font:'normal normal 600 16px/19px Montserrat',
        color:'#000',
        margin:'0 0 20px 0',
        width:'100%',
        float:'left'
      }
    },
    BookingCancelButton:{
      padding:'20px 20px 0 20px',

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
    datePicker:{
      fontSize:'11px',
      width:'100%'
    },
    scheduleHeading: {
      textAlign: 'center',
      font: 'normal normal 600 24px/29px "Montserrat-Regular"',
      letterSpacing: '0px',
      color: '#000000',
      marginTop:'10px',
      marginBottom:'30px'
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
        , #0D004C 0%, #24AE90 100%) 0% 0% no-repeat padding-box`
},

avatarBox: {
  display:'flex',
  alignItems: 'center',
},
headtitle: {
  color: "#0D004C",
  fontWeight: 600,
  fontSize: '16px',
  lingHeight: '19px',
  marginBottom: '5px',
},
subtitle: {
  color:'#6E7176',
  fontWeight: 500,
  fontSize: '12px',
},
customerDetails: {
  padding: '20px 30px',
},
customerTitle:{
  textAlign: 'left',
  font: 'normal normal 600 13px/60px Montserrat',
  letterSpacing: '0px',
  color: '#333333',
  textTransform: 'uppercase',
  opacity: 1,
},
customerName:{
  textAlign: 'left',
  font: 'normal normal 600 16px/19px Montserrat',
  letterSpacing: '0px',
  color: '#101010',
  opacity: 1,
  marginBottom: '10px',
},
customerAddress: {
  textAlign: 'left',
  font: 'normal normal normal 13px/24px Montserrat',
  letterSpacing: '0px',
  color: '#000000',
  opacity: 1,
},
paymentDetailsTitle : {
  font:"normal normal normal 16px/19px Montserrat",
  padding:"20px",
}

}))
export default useStyles;