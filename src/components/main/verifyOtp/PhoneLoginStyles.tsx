import {
    Theme,
    createStyles
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        input:{
            height:"52px",
            "&&&:before": {
                borderBottom: "none"
              },
              "&&:after": {
                borderBottom: "none"
              }
        },
        locationSelect:{
            borderRadius:'30px 0px 0px 30px',
            backgroundColor:'white',
            width:'101.3px',
            float:"left",
            
        },
        locationInput:{
            borderRadius:'0px 30px 30px 0px',
            background:'white',
            float:"left",
            width:'650px',
            "&:before": {
                position: 'absolute',
                backgroundColor:'#999999',
                top:'12px',
                zIndex:1,
                left:'16.4%',
                content:'',
                width:'1px',
                height:'25px',
              },
        },
        formContainer:{
            padding:'.71428571rem 2.85714286rem',
        },
        formHeader:{
            textAlign:'center'
        },
        heading:{
            margin:"20px 0 ",
            textAlign:'center',
            font:"normal normal 24px/29px 'Montserrat-medium'",
            letterSpacing:' 0px',
            color: '#000000',
            textTransform:'uppercase',
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
        inputContainer:{
            marginBottom:'5%',
            paddingLeft:'35%',
            [theme.breakpoints.down('sm')]: {
            paddingLeft:'0%'
            }
        },
        googleButton:{
            float:'left',
            background: '#DD4B39 0% 0% no-repeat padding-box',
        },
        faceButton:{
            float:'right',
            background:'#3B5998 0% 0% no-repeat padding-box',
        },
        formField:{
            width:'50%',
            marginBottom:'5%',
            [theme.breakpoints.down('sm')]: {
                width:'100%',
            }
        },
        formLabel:{
            marginBottom:'10px'
        },
        continueButton:{
            marginLeft:'0px',   
            color:'#fff',
            marginTop:'10px',
            textAlign:'center',
            paddingRight:'80px',
            paddingLeft:'80px',
            paddingTop:'10px',
            paddingBottom:'10px',
            font:`normal normal bold 16px/19px 'Montserrat-Regular'`,
            background:`transparent linear-gradient(
                270deg
                , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box;
                    border-radius: 5px`
        },
        otpButton:{
            color:'#fff',
            marginTop:'10px',
            textAlign:'center',
            paddingRight:'80px',
            paddingLeft:'80px',
            paddingTop:'10px',
            paddingBottom:'10px',
            background:`transparent linear-gradient(
                270deg
                , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box;
                    border-radius: 5px`
        },
        button:{
            color:'#ffff',   
        },
        terms:{
            display:'grid',
            justifyContent:'center',
            textAlign:'center',
            marginTop:'20px'
        },
        footerText:{
            width:'400px',
            font:` normal normal normal 16px/19px 'Montserrat-Regular'`
        },
        dropdownClass:{
            padding:'10px'
        }
    })
)
)
export default useStyles