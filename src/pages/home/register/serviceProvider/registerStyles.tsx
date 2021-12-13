import {
    Theme,
    createStyles
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        leftPannel: {
            paddingTop:"220px",
            minHeight:"640px",
            maxHeight:"640px",
            background:"#0d004c",
            color:"#fff",
            [`@media only screen and (max-width: 768px)`]:{
                paddingTop:'60px',
                paddingBottom:'80px',
                width:'326px'
            }
        },
        leftPannelInner:{
            [`@media only screen and (max-width: 768px)`]:{
                padding: '30px',
            },
        },
        logoIcon:{
            width:'80px'
        },
        formContainer:{
            marginTop: '40px',
            marginBottom: '90px',
            [`@media only screen and (max-width: 768px)`]:{
                marginTop: '130px',
                marginBottom: '60px',
            },
            '& *':{
                fontFamily:"Montserrat-medium"
            }
        },
        registerHeading: {
            color: '#0d004c',
            marginBottom: '65px',
            paddingTop: '15px',
            font:"normal normal bold 24px/29px 'Montserrat-medium'"
        },
        registerHeader: {
            zIndex: -1,
            height: ' 252px',
            width: '100vW',
            background: `transparent linear-gradient(
                180deg
                , #0D004C 0%, #24AE90 100%) 0% 0% no-repeat padding-box`,
            padding:'30px 0',
        },
        headerContainer:{
            padding:'0 10%',
            [theme.breakpoints.down('xs')]: {
                padding: '0 8%',
            },
        },
        breadCum:{
            color:'white',
            float:'right',
            
        },
        headerImg:{
            
        },
        registerContainer: {
            background: ' #FFFFFF 0% 0% no-repeat padding-box !important',
            boxShadow: ' 0px 5px 15px #00000078 !important',
            border: '1px solid #FFFFFF !important',
            borderRadius: ' 5px !important',
            padding: '25px 25px',
            marginTop:'70px',

        },
        containerWrapper: {
            [theme.breakpoints.up('sm')]:{
                padding:'0 10%',
            },
            [`@media only screen and (max-width: 768px)`]:{
                padding:'0 8%',
            },
            marginTop: '40px !important',
            marginBottom: '40px !important',
            alignItems:'center',
        },
        dialogContainer:{
            textAlign:'center',
            height: '60vh'
        },
        dialogContent:{
            position:'relative',
            top:'30%',
        },
        dialogHeading:{
            color:'#239c9e',
        },
        button: {
            color: '#FFFFFF',
            background: `transparent linear-gradient(
                90deg
                , #0D004C 0%, #24AE90 100%) 0% 0% no-repeat padding-box`,
            borderRadius: '4px',
            border: '2px solid #707070',
            letterSpacing: '0px',
            marginTop: '25px',
            marginRight: '15px',
            padding: ' 16px 12px !important',
            minWidth: '120px',
            font: `normal normal 14px/12px 'Montserrat-bold'`,
        },
        imageButton: {
            width: '100%',
            backgroundColor: ' #F1F1F1',
            border: '1px solid #95989A !important',
            borderRadius: ' 5px !important',
            textTransform: 'none',

        },
        imageIcon: {
            padding: '50px 0'
        },
        registerFooter: {
            background: '#222223 0% 0% no-repeat padding-box',
            color: '#fff',
            padding:' 15px 0',
            textAlign: 'center',
        },
        OrDivider: {
            position: 'relative',
            textAlign: 'center',
            fontSize: '16px',
            '&:before': {
                position: 'absolute',
                content: '""',
                width: '45%',
                left: 0,
                top: '10px',
                backgroundColor: '#2d2d2d',
                height: '1px',
            },
            '&:after':{
                position: 'absolute',
                content: '""',
                width: '45%',
                right: 0,
                top: '10px',
                backgroundColor: '#2d2d2d',
                height: '1px',
            }
           
        },
        player:{
                marginTop:"77px"
        }
    })
)
)
export default useStyles