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
        categoryContainer: {
            paddingLeft:'0px',
            paddingRight:'20px',
        },
        cardContainer:{
            marginTop: '10px',
            padding:'0 5px',
        },
        cardContent:{
        },
        categoryBox: {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            border: '1px solid #E6E6E6',
            borderRadius: '8px',
            textAlign: 'center',
            padding: '33px 0px',
            width:"180px",
            [`@media (max-width: 464px)`]: {
                width:"143px",
            },
            [`@media (min-width: 464px)`]: {
                width:"270px",
            },
            [`@media (min-width: 981px)`]: {
                width:"180px",
            },
            "& a": {
                color: '#878787',
                textDecoration: 'none',
            },
            "& img": {
                width:'25%',
                font: "normal normal 16px/40px 'Montserrat-Medium'",
                letterSpacing: '0px',
                textTransform: 'capitalize',
                margin:'5px 0 0 0 ',
                color: '#878787',
            },
            "& h3":{
                font: "normal normal 16px/40px 'Montserrat-Medium'",
                letterSpacing: '0px',
                textTransform: 'capitalize',
                margin:'5px 0 0 0 ',
                color: '#878787',
            }
        },
        cardTitle:{

        },
        subTitleHeading: {
            textAlign:'left',
            font: 'normal normal 42px/64px "Montserrat-bold"',
            color:'#000000',
            marginBottom:'45px',
            paddingTop:"60px",
            [`@media only screen and (max-width: 768px)`]:{
                paddingTop:"0px",
                lineHeight:"40px",
                font: 'normal normal 30px/64px "Montserrat-bold"',
            }
        },
        subTitlePragraph: {
            font: "normal normal 16px/24px 'Montserrat-Regular'",
            letterSpacing: '0px',
            color: '#666666',
            marginBottom:'30px',
            
        },
        downappAppImage:{
            textAlign:'right',
            [`@media only screen and (max-width: 768px)`]: {
                "& img": {
                    width:'100%',
                }
            },
            '& img':{
                position: 'relative',
                top:'80px',
                zIndex : 9,
            }
        }

    })))
export default useStyles;