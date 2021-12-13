import {
    createStyles,
    makeStyles,
} from '@material-ui/core'
const useStyles = makeStyles(()=>
createStyles({
    root:{
        padding: '60px 100px',
        overflow: 'hidden',
    },
    paymentContainer:{
        padding:'50px',
        marginTop:'50px',
        marginBottom:'50px'
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
    }
}))
export default useStyles;