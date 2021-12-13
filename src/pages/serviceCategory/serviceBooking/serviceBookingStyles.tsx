import {
    Theme,
    createStyles,
    withStyles,
    createMuiTheme
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiTableCell from "@material-ui/core/TableCell";
export const TableCell = withStyles({
    root: {
      borderBottom: "none"
    }
  })(MuiTableCell);
export const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiButton:{
            label:{
                font:"normal normal 600 22px/26px 'Montserrat-Regular'",
            }
        }
    },
});
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        serviceCategoryBanner: {
            height: '450px',
            overflow: 'gidden',
            background: 'rgb(0 0 0 / 82%)',
            color: 'white',
            textAlign: 'center',
            font: "normal normal normal 24px/36px 'Montserrat-Regular'",
        },
        cartBAnnerHeading:{
            padding: '190px 0',
        },
        cartBannerTitle:{
            font:"normal normal 36px/77px 'Montserrat-bold' !important",
            [`@media only screen and (max-width: 768px)`]:{
                fontSize: '26px !important',
                lineHeight: '1.2 !important'
            },
        },
        cartBannerTitleContent:{
            font:"normal normal normal 24px/36px 'Montserrat-Regular'",
            [`@media only screen and (max-width: 768px)`]:{
                fontSize: '22px !important',
                lineHeight: '1.2',
                marginTop: '5px'
            },

        },
        cartContainer:{
            padding:'0 2%'
        },
        cartWrapper:{
            padding:'30px 0px 30px 0px',
            borderRadius:'5px',
        },
        cartHeading:{
            font:"normal normal 600 24px/29px 'Montserrat-Regular'",
            letterSpacing:'0px',
            paddingTop:'25px',
            marginBottom:'25px',
            textAlign:'center'
        },
        cartItems:{
            border: '1px solid rgb(112 112 112 / 33%)',
            paddingTop: '20px',
            marginBottom: '35px',
        },
        subHeading:{
            font: "normal normal 600 20px/24px 'Montserrat-Regular'", 
        },
        tabel:{
            width:'100%'
        },
        tabelRow:{
            border:'none',
        },
        totalText:{
            fontWeight:600,
            font: "normal normal 18px/22px 'Montserrat-Bold'"
        },
        total:{
            borderTopStyle:'dotted',
            borderBottomStyle:'dotted',
            color:'#cccccc',
        },
        promoArea:{
            textAlign:'center',
            backgroundColor:'#ffff'
        },
        promoHeading:{
            padding:'1.5rem 0',
        },
        promoIcon:{
            paddingRight:'1rem'
        },
        promoCodeContent:{
            font:"normal normal 600 22px/26px 'Montserrat-Regular'",
            color:"#000000",
            letterSpacing:'0px'
        },
        payButtonArea:{
            textAlign:'center',
            padding:'1.5rem 0'
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
        formContainer:{
            paddingTop:'30px'
        },
        formControllGroup:{
            marginTop:'20px',
            marginBottom:'20px',
            width:'100%'
        },
        formControllFields:{
            width:'100%'
        },
        icon: {
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(2),
        },
        breadcrumb:{
            color:"#000",
            marginBottom:'20px',
            [`@media only screen and (max-width: 768px)`]:{
                marginLeft: '20px',
            },
            [`@media only screen and (max-width: 480px)`]:{
                marginLeft: '10px',
            },
        },
        breadCrumblinks:{
            color:"#000",
            font:"normal normal normal 16px/19px Montserrat",
            [`@media only screen and (max-width: 480px)`]:{
                fontSize: '14px',
            },
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