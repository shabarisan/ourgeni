import {
    Theme,
    createStyles
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        leftPannel: {
            paddingTop:'90px',
            paddingBottom:'90px',
            background:"#0d004c",
            color:"#fff",
            [`@media only screen and (max-width: 768px)`]:{
                paddingTop:'60px',
            }
        },
        logoIcon:{
            width:'80px'
        },
        formContainer:{
            marginTop: '130px',
            marginBottom: '60px',
            [`@media only screen and (max-width: 768px)`]:{
                marginTop: '130px',
                marginBottom: '60px',
            }
        },
        formHeader:{
            textAlign:'center'
        },
        heading:{
            margin:"20px 0 ",
            textAlign:'justify',
            font:"normal normal bold 24px/29px 'Montserrat-medium'",
            letterSpacing:' 0px',
            color: '#0d004c',
            [`@media only screen and (max-width: 768px)`]:{
                textAlign:'center',
            },
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
            marginTop: '50px', marginBottom: '50px',
            [`@media only screen and (max-width: 768px)`]:{
                marginTop: '30px',
                marginBottom: '30px',
            },
            '& #userid':{
                width:'220px',
            }
        },
        formArea:{
            paddingLeft:'40px',
            '& *':{
                fontFamily:"Montserrat-medium"
            }
        },
        submitSection:{
            textAlign: 'center',
            [`@media only screen and (max-width: 768px)`]:{
               marginTop:'10px',
               padding:'0px',
               textAlign: 'inherit',
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
        signUpLink:{
            color:"#1acc8d",
            fontFamily:"Montserrat-regular",
            '&:hover':{
                textDecoration:'none'
            }
        },
        headingBox:{
            width:'100%',
            paddingLeft:'50px',
            paddingRight:'50px',
            letterSpacing:'0px',
            [`@media only screen and (max-width: 768px)`]:{
                paddingLeft:'20px',
                paddingRight:'20px',
            }
        },
        forgotPasswordLink:{
            color:"#1acc8d",
            fontFamily:"Montserrat-regular",
            float:'right',
            marginTop:'10px',
            '&:hover':{
                textDecoration:'none'
            },
            '& p':{
                fontFamily:"Montserrat-regular",
            }
        },
        continueButton:{
            marginLeft:'0px',
            font:"normal normal 16px/14px 'Montserrat-Bold'",
            minWidth:"200px",
            minHeight:"48px",
            fontFamily:'"Montserrat", sans-serif',
            fontWeight:600,
            padding:'15px',
            background:`transparent linear-gradient(
                270deg
                , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box;
                    border-radius: 5px`
            ,
            [`@media only screen and (max-width: 768px)`]:{
                font:"normal normal 13px/14px 'Montserrat-Bold'",
                minHeight:"40px",
            },
        },
        otpButton:{
            marginLeft:'50px',
            font:"normal normal 18px/14px 'Montserrat-Bold'",
            minWidth:"200px",
            minHeight:"48px",
            fontWeight:600,
            fontFamily:'"Montserrat", sans-serif',
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
        passwordIcons:{
            color:"rgb(13 0 76)",
            "&:hover": {
                cursor:'hand'
            }
        }
    })
)
)

export default useStyles