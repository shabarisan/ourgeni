import {
    Theme,
    createStyles
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        tiles: {
            // width: ' 282.813px',
            // marginRight: ' 30px',
            marginBottom: ' 30px',
            padding: '33px 0',
            border: '1px solid #E6E6E6',
            borderRadius: '8px',
            [`@media only screen and (max-width: 768px)`]:{
                marginBottom: ' 3px',
            },

        },
        tileContent:{
            height:'100%',
            width:'100%',
        },
        listCarousel: {
            position: 'relative',
            top: '-80px',
        },
        listContainer: {

        },
        imgFluid: {
            height:'80px',
            width:'80px'
            
        },
        tileHeading: {
            textAlign: "center",
            font: "normal normal 16px/40px 'Montserrat-Medium'",
            letterSpacing: ' 0px',
            color: ' #878787',
            textTransform: 'capitalize',
            margin: 0,
            marginTop: '5px',
        },
        carouselCardItem: {
            '&:hover': {
                textDecoration: 'none',
            },
        },
        categoryList: {
            display: 'flex',
            width:'100%',
            [`@media only screen and (max-width: 768px)`]:{
                marginLeft:'50px'
            }
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
        categoryContainer:{
            marginBottom:'10px'
        },
        categoryBox: {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            border: '1px solid #E6E6E6',
            borderRadius: '8px',
            textAlign: 'center',
            padding: '30px',
            minHeight:'150px',
            maxHeight:'180px',
            lineHeight:'5px',
            overflowWrap:'break-word',
            overflow:'hidden',
            [`@media only screen and (max-width: 768px)`]:{
                padding:"20px",
                maxHeight:'150px',
                minHeight: '100px',
                // minWidth:'120px',
                // maxWidth:'120px',
            },
            [`@media only screen and (max-width: 600px)`]:{
                minHeight:"130px",
                maxHeight:'180px',
                // minWidth:'120px',
                // maxWidth:'120px',
            },
             [`@media only screen and (max-width: 374px)`]:{
                minHeight:"130px",
                maxHeight:'200px',
                // minWidth:'120px',
                // maxWidth:'120px',
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
                [`@media only screen and (max-width: 320px)`]:{
                   fontSize:'13px',
                }
            },
            "&:hover":{
                boxShadow:"0px 3px 16px #cccccc"
            }
        },
        serviceIconBx:{
            height: '65px',
            '& img':{
                height: 'inherit',
                maxWidth: '100%',
            }
        },
        breadcrumb_bx:{
            [`@media only screen and (max-width: 768px)`]:{
                marginTop: '-40px',
            }
        },
    })
)
)
export default useStyles