import {
    makeStyles,
    createStyles,
    createMuiTheme,
    Theme
} from '@material-ui/core/styles'
import bannerimg from '../../../assets/img/home-bg.png';
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
            margin:'80px 30px 30px 30px',
            fontFamily:"Montserrat",
        },
        profileIcon:{
            height:'30px',
            width:'30px',
            marginBottom:'20px',
            [`@media only screen and (max-width: 768px)`]:{
                height:'16px',
                width:'24px',
                marginBottom:'6px',
                marginRight: '5px',
            },
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
        profileName:{
            font:"normal normal normal 16px/19px Montserrat",
            fontWeight:600
        },
        profileTabs:{
            fontFamily:"Montserrat",
            textAlign:"left",
            padding:"0 15px",
            minHeight:"50px",
            borderBottom:"1px solid #ddd",
            "& .MuiTab-wrapper":{
                alignItems:"left !important",
                justifyContent:"left",
                textTransform:"capitalize",
                display:"block",
                "& svg":{
                    float:"left",
                    marginRight:"10px"
                }
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
            // backgroundColor: theme.palette.background.paper,
            display: 'flex',
            fontFamily:"Montserrat",
            [`@media only screen and (max-width: 768px)`]:{
                display: 'block',
            },
        },
        tabs: {
            padding:"0px",
            width:300,
            font:"normal normal 24px/24px 'Montserrat-Medium'",           
            border:"none",
            background:"none",
            marginTop:"20px",
            [`@media only screen and (max-width: 768px)`]:{
                width: '100%',
                display: 'flex',
                position: 'relative',
                flexWrap: 'wrap',
            },
            "& .MuiTabs-flexContainerVertical":{
              background:"#fff",
              border:"1px solid #ddd", 
                [`@media only screen and (max-width: 768px)`]:{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                },
                [`@media only screen and (max-width: 480px)`]:{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'column',
                },
            }
        },
        profile_bx:{
            [`@media only screen and (max-width: 768px)`]:{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
            }
        },
        tab_bx:{
            [`@media only screen and (max-width: 768px)`]:{
                margin: '0 -24px',
            },
        }
})
))
export default useStyles;