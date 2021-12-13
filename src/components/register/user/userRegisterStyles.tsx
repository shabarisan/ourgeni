import {
    Theme,
    createStyles
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        imageField: {

        },
        button: {
            borderRadius: '4px',
            border: '2px solid #707070',
            letterSpacing: '0px',
            marginTop: '25px',
            marginRight: '15px',
            color: '#707070',
            padding: ' 16px 12px !important',
            minWidth: '120px',
            font: `normal normal 14px/12px 'Montserrat-bold'`,
        },
        cancel: {

        },
        register: {
            marginLeft:'0px',
            marginTop:'25px',
            color:"#ffff",
            font:"normal normal 18px/14px 'Montserrat-Bold'",
            minWidth:"200px",
            minHeight:"48px",
            fontFamily:'"Montserrat", sans-serif',
            fontWeight:600,
            background:`transparent linear-gradient(
                270deg
                , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box;
                    border-radius: 5px`
        },
        imageButton: {
            width: '100%',
            backgroundColor: ' #F1F1F1',
            border: '1px solid #95989A !important',
            borderRadius: ' 5px !important',
            textTransform: 'none',

        },
        textArea: {
            width: '100%',
            '&::placeholder': {
                padding: '10px 5px'
            },
            [theme.breakpoints.up('xs')]: {
                padding: '1px',
            },
        },
        inputField: {
            width: '100%'
        },
        imageIcon: {
            padding: '50px 0'
        },
        formContainer:{
            paddingTop:'30px'
        },
        formControllGroup:{
            marginTop:'0px',
            marginBottom:'10px',
            width:'100%',
            '&: label':{
                marginTop:'10px'
            }
        },
        formControllFields:{
            marginTop:'10px',
            width:'100%'
        },
        passwordIcons:{
            "&:hover": {
                cursor:'hand'
            }
        },
        signUpLink:{
            color:"#1acc8d",
            fontFamily:"Montserrat-regular",
            '&:hover':{
                textDecoration:'none'
            }
        },
        forgotPasswordLink:{
            color:"#1acc8d",
            fontFamily:"Montserrat-regular",
            float:'right',
            '&:hover':{
                textDecoration:'none'
            },
            '& p':{
                fontFamily:"Montserrat-regular",
            }
        },
        otpButton:{
            border: "none",
            color: "#fff",
            fontSize: "14px",
            lineHeight: "20px",
            textAlign:'center',
            paddingRight:'10px',
            paddingLeft:'10px',
            borderRadius:'5px',
            font:`normal normal bold 16px/19px 'Montserrat-Regular'`,
            background :'transparent linear-gradient(270deg , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box',
        }
        
    })
)
)
export default useStyles