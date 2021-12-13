import {
    Theme,
    createStyles
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        breadcrumb:{
            color:"#000",
            marginBottom:'30px',
        },
        filterSection:{
            marginBottom:'20px'
        },
        providerSection:{
            marginBottom:'30px'
        },
        providerDetailsSection:{
           
        },
        providerDescriptionSection:{
            marginTop:'10px',
            '& *':{
                fontFamily:"Montserrat-Regular"
            }
        },
        filterLabel:{
            font:"normal normal bold 16px/24px 'Montserrat-Regular'",
            color:"#219887"
        },
        filterLabelIcon:{
            color:"#ffc72e",
            marginRight:'5px',
            marginTop:"20px"
        },
        breadCrumblinks:{
            color:"#1acc8d",
            font:"normal normal normal 16px/19px Montserrat",
            '&:hover':{
                textDecoration:'none'
            }
        },
        sorybySection:{
            marginBottom:'30px',
            paddingRight:'20px'
        },
        sortbyresult:{
            background: '#0d004c',
            height:"40px",
            lineHeight:"40px",
            position:"relative",
            display:"table-cell",
            paddingRight:'3px',
            paddingLeft:'3px',
            '& a':{
                background: '#0d004c',
                display:"block",
                fontWeight:400,
                textAlign:"left",
                color:"#ffffff",
                fontFamily:'Montserrat',
                '&:hover':{
                    textDecoration:'none',
                    cursor:'pointer',
                    fontFamily:'Montserrat'
                }
            }
        },
        brdULSection:{
            display:'flex',
        },
        brdUL:{
            color:"#fff",
            width:"48%",
            backgroundColor:"#219887",
            height:"40px",
            lineHeight:"40px",
            textAlign:'center',
            
        },
        margintop5:{
            marginTop:'3%'
        },
        buttonGroup:{
            marginTop:'20px',
            marginBottom:"20px",
            boxShadow:'4px 2px 5px 0 rgb(0 0 0 / 8%)',
            border:'1px solid #dbdbdb',
            '&:hover':{
                border:'none'
            }
        },
        serviceIcon:{
            '& img':{
                paddingTop:'10px',
                paddingBottom:'5px',
                minheight:"50px",
                minwidth:"50px",
                maxheight:"50px",
                maxwidth:"50px",
            }
        },
        breadCrumblinksActive:{
            color:"#000",
            font:"normal normal normal 16px/19px Montserrat",
            '&:hover':{
                textDecoration:'none'
            }
        },
        RatingSection:{
            marginTop:'3px',
            display: 'flex',
            alignItems: 'center',
            [`@media only screen and (max-width: 480px)`]:{
                display: 'block',
            },
        },
        RatingWrapIcon:{
            color:'#FFE600',
        },
        viewProfileButton:{
            fontFamily:"'Montserrat-Bold'",
            color:"#333333",
            fontSize: '16px',
            marginBottom: '12px',
            textTransform: 'capitalize',
            '&:hover':{
                textDecoration:'none'
            }
        },
        providerLogo:{
            '& img':{
                width:'100%',
                minHeight:'220px',
                maxHeight:'220px',
                borderRadius:'7px',
                objectFit:"cover",
                transform:"translateZ(0)",
                objectPosition:"top",
                border: '#e4e4e4 solid 3px',
            }
        },
        imgFluid:{
            maxWidth:'100%',
            height:"auto",
        },
        popularitybutton:{
            color:"#fff",
            lineHeight:'30px',
            fontFamily:"'Montserrat-Bold'",
            background:"transparent linear-gradient(270deg, #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box"
        },
        viewDetailsButton:{
            fontSize:"12px",
            minWidth:"90px",
            fontFamily:"'Montserrat-Bold'",
            fontWeight:'bold',
            background:"#fff",
            border:'1px solid #9f9f9f',
            color:"#404040",
            minHeight:"30px",
            lineHeight:"30px",
            marginTop:'5px'

        },

        // Service Provider List CSS
        serviceProviderListBox: {
            padding: '45px',
            [`@media only screen and (max-width: 600px)`]:{
                padding: '0',
            },
        },
        cardBox: {
            border: '1px solid #C8C8C8',
        },
        cardHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '15px',
            borderBottom: '1px solid rgba(112,112,112,0.26)',
        },
        cardTitle:{
            fontSize: '14px',
            color: '#333333',
            fontFamily:"'Montserrat-Medium'",
        },
        cardTitleBtn:{
            background: 'transparent',
            fontSize: '12px',
            padding: '0px',
            textTransform: 'initial'
        },
        cardBodyBox: {
            padding: 0,
        },
        cardSearchBox: {
            borderBottom: '1px solid rgba(112,112,112,0.26)',
            padding: '15px',
        },
        cardServiceList: {
            background: '#fff',
            padding: '15px',
        },
        searchButtonList:{
            color:"#fff",
            fontFamily:"'Montserrat-Bold'",
            background:"transparent linear-gradient(270deg, #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '40px',
            fontSize: '14px',
        },
        searchInput:{
            color: '#ccc',
        },
        searchBox: {
            margin: '50px auto',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Montserrat',
            [`@media only screen and (max-width: 768px)`]:{
                margin: '0 auto',
                flexWrap: 'wrap',
            },
            [`@media only screen and (max-width: 480px)`]:{
                justifyContent: 'center',
            },
        },
        search: {
            position: 'relative',
            marginLeft: 0,
            marginRight: '10px',
            width: '100%',
            [`@media only screen and (max-width: 768px)`]:{
                marginRight: '0',
                marginBottom: '10px',
            },
        },
        location_mobileView:{
            [`@media only screen and (max-width: 768px)`]:{
               width: '80%',
               marginRight: '10px',
            }, 
            [`@media only screen and (max-width: 600px)`]:{
                width: '70%',
                marginRight: '10px',
             }, 
             [`@media only screen and (max-width: 480px)`]:{
                width: '100%',
                marginRight: '10px',
             }, 
        },
        searchIcon: {
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#585858',
            zIndex: 9,
            paddingLeft: '12px',
        },
        inputRoot: {
            color: 'inherit',
            width: '100%'
        },
        inputInput: {
            width: '100%',
            background: '#fff',
            borderRadius: '4px',
            padding: '15px 10px',
            border: '1px solid #C9C9C9',
            marginBottom: '15px',
            '&::placeholder': {
                color: '#8E8E8E',
            },
        },
        serviceTitle: {
            fontSize: '14px',
            color: '#333333',
            fontFamily:"'Montserrat-Medium'",
            marginBottom: '16px',
            marginTop: '0',
        },
        servicesCheckbox: {
            margin: 0,
        },
        formControlService: {
            fontSize: '14px',
            color: '#333333',
            '& label':{
                [`@media only screen and (max-width: 768px)`]:{
                    marginRight: '0',
                    marginBottom: '10px',
                },
                [`@media only screen and (max-width: 600px)`]:{
                    marginRight: '10px',
                },
            },
            '& span':{
                [`@media only screen and (max-width: 768px)`]:{
                    fontSize: '14px'
                },
            },
        },
        checked:{
            color: '#219a88',
        },
        serviceListHeading:{
            fontSize: '14px',
            color: '#333333',
            fontFamily:"'Montserrat-Medium'",
            [`@media only screen and (max-width: 768px)`]:{
                margin: '0',
            },  
        },
        sortByBox: {
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        sortByTitle: {
            fontWeight: 'bold',
            color: '#333333',
            fontSize: '14px',
            margin: '0px 15px 0px 0px',
        }
    })
)
)
export default useStyles