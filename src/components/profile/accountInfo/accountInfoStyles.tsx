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
            padding:"20px 50px",
            [`@media only screen and (max-width: 768px)`]:{
                padding: '10px'
            },
            '& label' : {
                color: "#A7A7A7 !important",
                fontSize: "14px",
                lineHeight: "24px",
            },
            '& input': {
                fontWeight: "normal",
                fontSize: "18px",
                color: "#000",
            },
        },
        upload_inp: {
            display: "none",
        },
        uploadContainer: {
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#ddd",
            position: "relative",

            '& label': {
                position: "absolute",
                right: "-2px",
                bottom: "0px",
                
            },
            '& svg' : {
                color: "#0D004C",
                width: "14px",
            },
            [`@media only screen and (max-width: 480px)`]:{
                margin:"0 auto"
            },
        },
        uploadShow: {
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#ddd",
            position: "relative",
            display: "block",
            '& img' : {
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
            },

        },
        iconSpan: {
            backgroundColor: "#fff",
            width: "29px",
            height: "29px",
            borderRadius: "50%",
            border: "1px solid #E5E5E5",
            '&:hover': {
                backgroundColor: "#fff",
            },
        },
        customInput: {
            position: "relative",
        },
        verifiedBtn: {
            position: "absolute",
            top:"0",
            right:"0",
            color: "#2DCC4E",
            fontSize: "11px",

            '& .MuiButton-startIcon': {
                marginRight: "5px",
            },
        },
        verifyBtnGroup: {
            position: "absolute",
            top:"0",
            right:"0",
            width: "120px",
            display: "flex",
            alignItems: "center",
            [`@media only screen and (max-width: 480px)`]:{
                top: '-12px'
            },
            '& img': {
                marginRight: "15px",
            },
        },
        verifyBtn: {
            color:"#F26666",
            borderColor:"#F26666",
            fontSize: "11px",
            borderRadius: "40px",
        },
        verifiedBtnEdit: {
            position: 'absolute',
            fontSize: '11px',
            top: '101px',
            right: '50px',
            [`@media only screen and (max-width: 480px)`]:{
                top: '-12px'
            },            
        },
        Edit_btn:{
            [`@media only screen and (max-width: 480px)`]:{
                top: '170px',
                right: '0',
            },  
        },
        verifyBtnSave : {
            position: "absolute",
            top:"0",
            right:"0",
            fontSize: "11px",
            borderRadius: "40px",
            [`@media only screen and (max-width: 480px)`]:{
                top: '-132px'
            }, 
        },
        sectionHeading:{
            font:"normal normal normal 16px/19px Montserrat",
            fontWeight:600,
            borderBottom:"1px solid #C8C8C8",
            padding:"20px 50px"
        },
        sectionLabel:{
            font:"normal normal normal 16px/19px Montserrat",
        },
        profileIcon:{
            height:'30px',
            width:'30px',
            marginBottom:'20px',
            marginRight:'20px'
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
        profilePages:{
            border:"1px solid #C8C8C8",
            borderRadius:"2px",
            position:'relative',
        },
        w_md_full:{
            width: '100%'
        }
})
))
export default useStyles;