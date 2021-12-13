import {
    makeStyles,
    createStyles,
    createMuiTheme,
    Theme
} from '@material-ui/core/styles';
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
            paddingLeft:'5px',
            paddingRight:'0px',
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
            minHeight:'150px',
            maxHeight:'150px',
            lineHeight:'20px',
            minWidth:'210px',
            maxWidth:'210px',
            overflowWrap:'break-word',
            overflow:'hidden',
            [`@media only screen and (max-width: 768px)`]:{
                padding:"25px",
                maxHeight:'150px',
                maxWidth:'unset',
                minWidth:'unset',
                minHeight: '120px'
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
                   marginBottom: '0',
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
        productImgBx: {
            height: '38px',
            "& img":{
                height: 'inherit',
                maxWidth: '100%',
            }
        }
    })))
export default useStyles;