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
            margin:'20px'
        },
        profileIcon:{
            height:'30px',
            width:'30px',
            marginBottom:'20px',
            marginRight:'20px'
        },
        sectionHeading:{
            font:"normal normal normal 16px/19px Montserrat",
            fontWeight:600
        },
        addNewButton:{
            fontFamily:"Montserrat",
        },
        addressSectionContent:{
            fontFamily:"Montserrat",
        },
        sectionLabel:{
            font:"normal normal normal 16px/19px Montserrat",
            marginBottom:'20px'
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
            border: '2px solid #707070',
            letterSpacing: '0px',
            marginTop: '25px',
            marginBottom:'25px',
            marginRight: '15px',
            padding: ' 16px 12px !important',
            minWidth: '120px',
            color: '#FFFFFF',
            font: `normal normal 14px/12px 'Montserrat-bold'`,
            background: `transparent linear-gradient(
                90deg
                , #0D004C 0%, #24AE90 100%) 0% 0% no-repeat padding-box`
        },
        cancelButtton:{
            borderRadius: '4px',
            border: '2px solid #707070',
            letterSpacing: '0px',
            marginTop: '25px',
            marginBottom:'25px',
            marginRight: '15px',
            color: '#707070',
            padding: ' 16px 12px !important',
            minWidth: '120px',
            font: `normal normal 14px/12px 'Montserrat-bold'`,
        },
        rootf: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
        },
        tabs: {
            padding:"20px",
            borderRight: `1px solid ${theme.palette.divider}`,
        },
        editButton:{
            color:'#000',
            '&:hover':{
                textDecoration:'none',
                cursor:'pointer'
            }
        },
        Cancelbutton: {
            borderRadius: '4px',
            border: '2px solid #707070',
            letterSpacing: '0px',
            marginRight: '15px',
            color: '#707070',
            padding: ' 16px 12px !important',
            minWidth: '120px',
            font: `normal normal 14px/12px 'Montserrat-bold'`,
        }
})
))
export default useStyles;