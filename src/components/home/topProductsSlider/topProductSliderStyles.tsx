import {
    Theme,
    createStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
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
        carosoulContainer:{
            marginTop:"50px",
            paddingLeft:'0px !important',
            paddingRight:'9px !important',
        },
        tiles: {
            width: ' 282.813px',
            marginRight: ' 30px',
            marginBottom: ' 30px',
            padding: '33px 0',
            border: '1px solid #E6E6E6',
            borderRadius: '8px',

        },
        tileContent:{
            height:'100%',
            width:'100%',
        },
        listCarousel: {
            marginTop: '30px',
            width: '100%',
            marginRight: 'auto',
            marginLeft: ' auto',
            paddingBottom: '30px',
            '& a:hover':{
                textDecoration: 'none', 
            }
        },
        listContainer: {

        },
        imgFluid: {
            width: '100%',
        },
        tileHeading: {
            textAlign: "center",
            font: "normal normal 16px/40px 'Montserrat-Medium'",
            letterSpacing: '0px',
            color: '#000',
            textTransform: 'capitalize',
            margin: 0,
            fontSize:'1.25rem',
            [`@media only screen and (max-width: 480px)`]:{
                fontSize: '14px',
                lineHeight: "1.2",
                paddingTop: '5px',
            },
            
        },
        categoryList: {
            display: 'flex',
            padding: '0 15%'
        },
        adCateItems:{
            margin: '5px auto',
        },
        adPragh:{
            textAlign:'center',
            font:"normal normal normal 14px/18px 'Montserrat-Regular'",
            letterSpacing :'0px',
            color:'#FFFFFF'
        },
        adCatPrice:{
            textAlign:'center',
            font:"normal normal normal 21px/25px 'Montserrat-bold'",
            letterSpacing :'0px',
            color:'#FFFFFF'
        },
        adpPrice1:{
            textAlign: 'left',
            font:"normal normal 16px/19px 'Montserrat-bold'",
            letterSpacing:'0px',
            color:'#FFE600',
            position:'absolute',
            paddingTop:'36px',
            marginLeft:'-62px'
        },
        topProductBx:{
            margin: '5px',
            "& img":{
                height: 'inherit',
                maxWidth: '100%',
                minHeight: '150px',
                maxHeight: '150px',
                objectFit: 'cover',
            },
            [`@media only screen and (max-width: 480px)`]:{
                height: '150px',
            },
        },
    })
)
)
export default useStyles;