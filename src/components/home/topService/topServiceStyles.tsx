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
            paddingLeft:"6px",
            paddingRight:'9px',
            marginTop:'50px',
            marginBottom:'10px',
            "& a": {
                color: '#878787',
                textDecoration: 'none',
                "&:hover":{
                    textDecoration:'none'
                }
            },
        },
        categoryBox: {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            border: '1px solid #E6E6E6',
            borderRadius: '8px',
            textAlign: 'center',
            padding: '30px',
            minHeight:'180px',
            maxHeight:'180px',
            lineHeight:'5px',
            overflowWrap:'break-word',
            overflow:'hidden',
            minWidth:'210px',
            maxWidth:'210px',
            [`@media only screen and (max-width: 768px)`]:{
                padding:"25px",
                maxHeight:'150px',
                minHeight: '120px',
                minWidth:'120px',
                maxWidth:'120px',
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
                font: "normal normal 16px/40px 'Montserrat-Medium'",
                letterSpacing: '0px',
                textTransform: 'capitalize',
                color: '#878787',
                lineHeight:'25px',
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
            fontFamily : 'Montserrat-SemiBold',
            fontSize: "24px",           
        },
        subTitlePragraph: {
            fontFamily : 'Montserrat-Medium',
            fontSize: "16px",
            color: '#A8A8A8 !important',
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
        topServicesBx:{
            height: '38px',
            "& img":{
                height: 'inherit',
                maxWidth: '100%',
            }
        },
        cardColGrid: {
            maxWidth: '20%',
            [`@media only screen and (max-width: 768px)`]:{
                maxWidth: '50%',
            },
            [`@media only screen and (max-width: 480px)`]:{
                maxWidth: '100%',
            },
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
        }
    })))
export default useStyles;