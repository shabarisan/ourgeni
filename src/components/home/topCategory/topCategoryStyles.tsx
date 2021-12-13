import {
    makeStyles,
    createStyles,
    createMuiTheme,
    Theme
} from '@material-ui/core/styles'
export const theme = createMuiTheme({
    overrides: {
        MuiCardContent: {
            root: {
               
            }
        }
    }
})
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        categoryContainer:{
            marginTop:'10px',
            marginBottom:'10px',
            "& a": {
                color: '#878787',
                textDecoration: 'none',
                "&:hover":{
                    textDecoration:'none'
                }
            },
        },
        mainContainer:{
            paddingLeft:'0px',
            paddingRight:'9px'
        },
        leftArrow:{
            left:"3px",
            minHeight:"35px !important",
            minWidth:"35px !important",
            borderRadius: '50% !important',
            textAlign: 'center',
            border: '1px solid #ccc !important',
            padding:"0px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            background: '#fff !important',
            "& svg": {
                fontSize: "16px",
            },
        },
        rightArrow:{
            minHeight:"35px !important",
            minWidth:"35px !important",
            borderRadius: '50% !important',
            textAlign: 'center',
            border: '1px solid #ccc !important',
            padding:"0px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            right:"35px",
            background: '#fff !important',
            "& svg": {
                fontSize: "16px",
            },
        },
        categoryBox: {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            border: '1px solid #E6E6E6',
            borderRadius: '8px',
            textAlign: 'center',
            padding: '20px 30px',
            minHeight:'150px',
            maxHeight:'150px',
            lineHeight:'20px',
            minWidth:'150px',
            maxWidth:'150px',
            overflowWrap:'break-word',
            overflow:'hidden',
            [`@media only screen and (max-width: 768px)`]:{
                padding:"25px",
                maxHeight:'140px',
                minHeight:'130px',                
            },
            "& a": {
                color: '#878787',
                textDecoration: 'none',
                "&:hover":{
                    textDecoration:'none'
                }
            },
            "& img": {
                maxWidth:'100%',
                height:'auto'
            },
            "& h3":{
                font: "normal normal 14px/40px 'Montserrat-Medium'",
                letterSpacing: '0px',
                textTransform: 'capitalize',
                color: '#878787',
                lineHeight:'22px',
                [`@media only screen and (max-width: 768px)`]:{
                   fontSize:'15px',
                },
                [`@media only screen and (max-width: 480px)`]:{
                    fontSize:'13px',
                 }
            },
            "&:hover":{
                boxShadow:"0px 3px 16px #cccccc"
            }
        },
        cardTitle:{

        },
        subTitleHeading: {
            marginTop:'30px',
            fontFamily : 'Montserrat-SemiBold',
            fontSize: "24px",
        },
        subTitlePragraph: {
            fontFamily : 'Montserrat-Medium',
            fontSize: "16px",
            letterSpacing: '0px',
            color: '#A8A8A7 !important',
        },
        imgFluid:{
            maxWidth:'100%',
                height:'auto'
        },
        root: {
            flexGrow: 1,
        },
            paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        categoryImg:{
            height: '38px',
        
            "& img":{
                height: 'inherit',
                maxWidth: '100%',
            }
        }
    })))
export default useStyles;