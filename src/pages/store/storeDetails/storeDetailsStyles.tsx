import {
    Theme,
    createMuiTheme,
} from '@material-ui/core/styles';
import zIndex from '@material-ui/core/styles/zIndex';
import { makeStyles, createStyles, } from '@material-ui/styles';
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
        productDetailSec:{
            marginTop: '100px',
        },
        productCard: {
            padding: '40px 25px',
        },
        ProductImgBx:{
            height: '375px',
            position: 'absolute',
            '& img':{
                height: 'inherit',
                maxWidth: '100%'
            },
            [`@media only screen and (max-width: 768px)`]:{
                height: 'auto',
                position: 'relative'
            },
        },
        watchListIcon: {
            top: '15px',
            right: '15px',
            width: '42px',
            height: '42px',
            padding: '10px',
            position: 'absolute',
            background: '#fff',
            borderRadius: '50%',
        },
        product_h: {
            color: '#707070',
            '& h3':{
                fontSize: '22px',
                margin: '0 0 15px',
                [`@media only screen and (max-width: 768px)`]:{
                    fontSize: '18px',
                    fontWeight: 500,
                }
            }
        },
        ratingBadge: {
            display: 'flex',
            backgroundColor: '#22A28B',
            borderRadius: '4px',
            padding: '4px 6px',
            color: '#fff',
            fontFamily: 'Montserrat-Regular',
            alignItems: 'center',
            "& p": {
                fontSize: '12px',
                marginRight: '3px',
            }            
        },
        product_sub_h: {
            fontSize: '10px',
        },
        viewCountBx: {
            display: 'flex',
            alignItems: 'center',
        },
        viewCount: {
            fontFamily: 'Montserrat-Regular',
            fontSize: '14px',
            paddingLeft: '10px',
            color: '#999999',
        },
        price_bx: {
            color: '#2C2C2C',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 0 0',
            marginTop:'15px',
            borderTop: '1px solid #F2F2F2', 
            '& span': {
                fontSize: '18px',
                color: '#999999',
                margin: '0 5px'
            }
        },
        disc_bx:{
            color: '#22A28B',
            fontSize: '18px',
        },
        quantity_control: {
            display: 'flex',
            borderBottom: '1px solid #F2F2F2',
        },
        up:{
            border:'none !important',
            borderRadius:'30px 0 0 30px',
            fontWeight: 700,
            color: '#22A28B',
            fontSize: '16px',
            marginLeft: '5px',
          },
        down:{
            border:'none',
            borderRadius:'0 30px 30px 0',
            fontWeight: 700,
            color: '#22A28B',
            fontSize: '16px'
        },
        quantity_show:{
            border: 'none !important',
            fontWeight: 700,
            color: '#22A28B',
            fontSize: '16px',
        },
        ProductDesc: {
            borderBottom: '1px solid #F2F2F2',
        },
        socialIcons: {
            '& ul':{
            display: 'flex',
            listStyle: 'none',
            '& li':{
                padding: '0 5px',
            }
            }
        },
        product_title_h:{
            color: '#231F20',
        },
        product_title_border:{
            fontSize: '16px',
            '& span': {
                position: 'relative',
                borderBottom: '1px solid #000',
                display: 'block',
                marginTop: '10px',
                '&:after':{
                    position: 'absolute',
                    content: '""',
                    width: '175px',
                    height: '2px',
                    background: '#22A28B',
                    top: '0px',
                },
            },
        },
        product_rating:{
            '& h3':{
                margin:'0',
            }, [`@media only screen and (max-width: 768px)`]:{
                    textAlign: 'center',
            },

        },
        ProductDetailImgBx:{
            height: '375px',
            textAlign: 'center',
            '& img':{
                height: 'inherit',
                maxWidth: '100%'
            },
        },
        ratingBx:{
            padding: '30px 0',
            display: 'block',
            textAlign: 'center',
            border: '1px solid #C2BFBF',
            borderRadius: '8px',
            [`@media only screen and (max-width: 768px)`]:{
                marginBottom: '15px',
            }
        },
        rating:{
            color: '#979797',
            '& span': {
                fontSize: '32px',
                color: '#231F20',
            }
        },
        add_tocartbtn:{
            color:'white',
            padding:'8px',
            background: 'transparent linear-gradient(270deg , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box',

        },
        reviewBx:{
            padding: '30px 0',
            display: 'block',
            textAlign: 'center',
            border: '1px solid #C2BFBF',
            borderRadius: '8px',
            height: '100%',
        },
        reviewBtn:{
            borderRadius: '5px',
            background: '#209686',
            color: '#fff',
            padding: '5px 10px',
            textTransform: 'capitalize'
        },
        
    })
))
export default useStyles