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
        serviceProviderListBox: {
            padding: '45px',
            marginTop: '60px',
        },
        cardBox: {
            border: '1px solid #C8C8C8',
            boxShadow: '0px 2px 8px #00000022',
            borderRadius: '8px',
        },
        cardHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '15px',
            borderBottom: '1px solid rgba(112,112,112,0.26)',
        },
        cardTitle: {
            fontSize: '16px',
            color: '#333333',
            fontFamily: "'Montserrat-Medium'",
        },
        cardTitleBtn: {
            background: 'transparent',
            fontSize: '14px',
            padding: '0px',
            textTransform: 'initial'
        },
        cardBodyBox: {
            padding: 0,
        },
        cardSearchBox: {
            borderBottom: '1px solid rgba(112,112,112,0.26)',
            padding: '15px',
            display: 'flex'
        },
        cardServiceList: {
            background: '#fff',
            padding: '15px',
        },
        searchButtonList: {
            color: "#fff",
            fontFamily: "'Montserrat-Bold'",
            background: "transparent linear-gradient(270deg, #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '40px',
            fontSize: '14px',
        },
        serviceTitle: {
            fontSize: '16px',
            color: '#333333',
            fontWeight: 500,
            fontFamily: "'Montserrat-Medium'",
            marginBottom: '5px',
            marginTop: '0',
        },
        servicesCheckbox: {
            margin: 0,
            marginBottom: '15px',
            paddingBottom: '5px',
            borderBottom: '1px solid #D6D6D6',
        },
        formControlService: {
            fontSize: '14px',
            color: '#333333',
            display: 'block',
        },
        Breadcrumb_link: {
            fontSize: '12px'
        },
        filter_bx: {
            display: 'flex',
            justifyContent: 'flex-end',
            [`@media only screen and (max-width: 600px)`]:{
                justifyContent: 'flex-start', 
            },
        },
        select_filter: {
            margin: '0 5px',
            fontSize: '14px',
            border: 'none',
            [`@media only screen and (max-width: 768px)`]:{
                minWidth: '90px',
            },
            [`@media only screen and (max-width: 600px)`]:{
                minWidth: '100% !important',
                margin: '0',
            },
        },
        select_view: {
            fontSize: '14px',
            padding: '0',
            background: '#fff',
        },
        product_control_bar: {
            display: 'flex',
            alignItems: 'center',
        },
        btn_filter: {
            margin: '0 5px',
            background: '#fff',
            boxShadow: 'none',
            [`@media only screen and (max-width: 600px)`]:{
                display: 'none',
            }
        },
        inputRoot: {
            color: 'inherit',
            width: '100%'
        },
        inputInput: {
            width: '100%',
            background: '#fff',
            borderRadius: '4px',
            padding: '15px 10px',
            border: '1px solid #C9C9C9',
            marginBottom: '15px',
            '&::placeholder': {
                color: '#8E8E8E',
            },
        },
        SearchBar: {
            position: 'relative',
            marginTop: '10px'
        },
        Search_Icon: {
            position: 'absolute',
            right: '10px',
            zIndex: 1,
            top: '13px'
        },
        paper: {
            maxWidth: 345,
            [`@media only screen and (max-width: 600px)`]:{
                maxWidth: '100%'
            }
        },
        content: {
            [`@media only screen and (max-width: 768px)`]:{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                paddingTop: '10px',
            },                   
            "& > *": {
                marginBottom: '1rem !important',
            }
        },
        ratingBadge: {
            display: 'flex',
            backgroundColor: '#1c7e7d',
            borderRadius: '4px',
            padding: '4px 6px',
            color: '#fff',
            fontFamily: 'Montserrat-Regular',
            alignItems: 'center',
            [`@media only screen and (max-width: 600px)`]:{
                margin: '0',
            },
            "& p": {
                fontSize: '12px',
                marginRight: '3px',
            }            
        },
        buttonAdd: {
            background: '#22A28B',
            borderRadius: '5px',
            border: 'none',
            textAlign: 'center',
            font: " normal normal 16px/21px 'Montserrat-Bold'",
            letterSpacing: '0px',
            color: ' #FFFFFF',
            textTransform: 'uppercase',
            fontSize: '11px',
            margin: '1px 0 2px',
            minWidth: '120px',
            '&:hover':{
                backgroundColor: '#000',
            },
            [`@media only screen and (max-width: 600px)`]:{
                margin: '1px 0 2px',
                minWidth: '120px',
            },
            [`@media only screen and (max-width: 360px)`]:{
                minWidth: 'auto',
            }
        },
        viewCount: {
            fontFamily: 'Montserrat-Regular',
            fontSize: '14px',
            paddingLeft: '10px',
            color: '#999999',
            [`@media only screen and (max-width: 360px)`]:{
                fontSize: '12px'
            },
        },
        viewCountBx: {
            display: 'flex',
            alignItems: 'center',
        },
        button: {
            border: '1px solid #ddd',

            width: '25px',
            backgroundColor: '#0D004C',
            padding: '0',
            height: '30px',
            color: '#fff',
            lineHeight: '30px',
        },
        up:{
            border:'none !important',
            borderRadius:'30px 0 0 30px',
            fontWeight: 700,
            color: '#22A28B',
            fontSize: '16px'
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
            fontSize: '16px'
        },
        product_desc: {
            padding: '0',
            paddingBottom: '10px !important',
            [`@media only screen and (max-width: 600px)`]:{
                padding: '0 !important',
                paddingBottom: '10px !important'
            }
        },
        img_bx: {
            height: '145px',
            width: '100%',
            position: 'relative',
            padding: '5px',
            [`@media only screen and (max-width: 600px)`]:{
                margin: '10px 10px 0',
            },
            "& img": {
                height: 'inherit',
                width: '100%',
                objectFit: 'contain'
            }
        },
        watchlist_icon: {
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: '#fff',
            padding: '10px',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            [`@media only screen and (max-width: 768px)`]:{
                top: '10px',
                right: '10px',
                width: '34px',
                height: '34px',
                padding: '6px',
            },
        },
        watchlist_checked: {
            fill: '#22A28B',
        },
        product_h: {
            color: '#2C2C2C',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            height: '60px',
            [`@media only screen and (max-width: 360px)`]:{
                fontSize: '12px',
            }
        },
        product_sub_h: {
            fontSize: '10px',
        },
        card_body_padding: {
            padding: '0 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            [`@media only screen and (max-width: 768px)`]:{
                textAlign: 'center',
                justifyContent: 'center',
            },
            [`@media only screen and (max-width: 600px)`]:{
                textAlign: 'left',
                justifyContent: 'space-around !important'
            },
            [`@media only screen and (max-width: 480px)`]:{
                marginBottom: '10px !important'
            }
        },
        price_bx: {
            color: '#2C2C2C',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            '& span': {
                fontSize: '14px',
                color: '#999999',
                margin: '0 5px'
            }
        },
        disc_bx:{
            color: '#22A28B',
            fontSize: '14px',
        },
        main_bx:{
            display:'flex',
            paddingBottom:'10px',
        },
        detailBoxCard: {
            padding: '15px',
            [`@media only screen and (max-width: 600px)`]:{
                paddingBottom: '0',
            },
        },
        ratingCardRow: {
            display: 'flex',
            alignItems: 'center',
        },
        card_view_bx:{
            marginBottom: '10px'
        },
        cardTitle_Btn:{
            fontSize: '16px',
            marginBottom: '0',
        },
        cardHeaderBtn:{
            padding: '5px'
        },
        cardBoxBtn:{
            minWidth: '100%'
        },
        rating_txt_bx:{
            display: 'flex'
        }
       
    })
))
export default useStyles