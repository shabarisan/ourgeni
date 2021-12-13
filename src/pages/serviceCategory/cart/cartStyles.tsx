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
                fontSize: '26px',
                lineHeight: '1.2 !important'
            },
        },
        cartBannerTitleContent:{
            font:"normal normal normal 24px/36px 'Montserrat-Regular'",
            [`@media only screen and (max-width: 768px)`]:{
                fontSize: '22px'
            },
        },
        cartContainer:{
            padding:'0 2%'
        },
        cartWrapper:{
            backgroundColor:'#f9f9f9',
            padding:'30px 0px 30px 0px',
            borderRadius:'5px',
        },
        cartHeading:{
            font:"normal normal 600 24px/29px 'Montserrat-Regular'",
            letterSpacing:'0px',
            backgroundColor:'#f6f6f6',
            padding:'15px 0',
            textAlign:'center',
            '& h4':{
                [`@media only screen and (max-width: 768px)`]:{
                    fontSize: '1.5rem'
                },
            },
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
            backgroundColor:'#ffff',
            [`@media only screen and (max-width: 600px)`]:{
                width: '100%',
                textAlign: 'center',
            },
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
            letterSpacing:'0px',
            [`@media only screen and (max-width: 768px)`]:{
                fontSize: '18px !important',
            },
            [`@media only screen and (max-width: 480px)`]:{
                fontSize: '16px !important',
            },
        },
        payButtonArea:{
            textAlign:'center',
            marginBottom:'15px',
            [`@media only screen and (max-width: 600px)`]:{
                margin: '15px auto',
            },
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
            [`@media only screen and (max-width: 480px)`]:{
                minWidth: 'auto',
                padding: '8px 15px',
            },
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
            font:"normal normal 16px/21px 'Montserrat-Bold'",
            letterSpacing: '0px',
            color:' #FFFFFF',
            textTransform: 'uppercase',
            lineHeight: '42px',
        },
        ItemDescription:{
            font:"normal normal normal 14px/24px 'Montserrat-Regular'",
            textAlign:"justify",
            letterSpacing:'0px'
        },
        ItemPriceDescription:{
            textAlign:'left',
            font:"normal normal 18px/22px 'Montserrat-Bold'",
            color:"#000000",
            marginTop:'10px',
            marginBottom:'10px'
        },
        subTotalItems:{
            font:"normal normal normal 16px/22px 'Montserrat-Regular'",
            textAlign:'left',
            letterSpacing:'0px',
            color:"#000000"
        },
        cartProductContainer:{
            width:'100%',
            marginBottom:'40px',
        },
        cartTotalSection:{
            marginTop:'-150px',
            width:'100%'
        },
        imgFluid:{
            width:'100%'
        },
        breadcrumb:{
            color:"#000",
            marginBottom:'30px',
            [`@media only screen and (max-width: 768px)`]:{
                marginLeft: '20px'
            },
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
        add_cart:{
            fontSize: '1.2rem',
            fontWeight: 400,
        },
    })
)
)
export default useStyles