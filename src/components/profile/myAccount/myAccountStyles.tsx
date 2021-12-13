import {
    makeStyles,
    createStyles,
    createMuiTheme,
    Theme
} from '@material-ui/core/styles'
export const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            root: {

            }
        }
    }
})
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        ProfileCard:{
            margin:'20px 0',
            padding:"20px 50px"
        },
        profileIcon:{
            height:'30px',
            width:'30px',
            marginBottom:'20px',
            marginRight:'20px'
        },
        sectionHeading:{
            font:"normal normal normal 16px/19px Montserrat",
            fontWeight:600,
            borderBottom:"1px solid #C8C8C8",
            padding:"20px 50px",
            
        },
        sectionLabel:{
            font: "normal normal normal 12px/24px Montserrat",
            color:"#A7A7A7",
            marginBottom:"0px",
            float:"left",
            width:"100%"
        },
        breadcrumb:{
            color:"#000",
            marginBottom:'30px',
        },
        breadCrumblinks:{
            color:"#000",
            font:"normal normal normal 16px/19px Montserrat",
            '&:hover':{
                textDecoration:'none'
            }
        },
        breadCrumblinksActive:{
            color:"#000",
            fontWeight:'bold',
            font:"normal normal normal 16px/19px Montserrat",
            '&:hover':{
                textDecoration:'none'
            }
        },
        updateButton:{
            borderRadius: '4px',
            border: 'none',
            letterSpacing: '0px',
            marginTop: '25px',
            marginBottom:'25px',
            marginRight: '15px',
            padding: '0 !important',
            height:"39px",
            minWidth: '120px',
            color: '#FFFFFF',
            font: `normal normal 14px/12px 'Montserrat-bold'`,
            background: `transparent linear-gradient(
                90deg
                , #0D004C 0%, #24AE90 100%) 0% 0% no-repeat padding-box`
        },
        cancelButtton:{
            borderRadius: '4px',
            border: 'none',
            letterSpacing: '0px',
            marginTop: '25px',
            marginBottom:'25px',
            marginRight: '15px',
            color: '#707070',
            padding: '0 !important',
            height:"39px",
            minWidth: '120px',
            font: `normal normal 14px/12px 'Montserrat-bold'`,
        },
        rootf: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            fontFamily:"Montserrat"
        },
        tabs: {
            padding:"20px",
            borderRight: `1px solid ${theme.palette.divider}`,
        },
        profilePages:{
            border:"1px solid #C8C8C8",
            borderRadius:"2px",
            background:"#fff"
        },
        sectionInput:{
            width:"100%",
            "& input":{
                height:"40px",
                padding:"0 10px !important",
                width:"100%"
            },
            "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']":{
                padding:"0"
            }          
        },
})
))
export default useStyles;