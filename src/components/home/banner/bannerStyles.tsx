import {
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core/styles'
import bannerimg from '../../../assets/img/home-bg.png';
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        homeBanner: {
            width: '100%',
            // background: `url(${bannerimg}) no-repeat`,
            // backgroundSize: 'cover',
            // backgroundPosition: 'center',
            height:'420px',
            justifyContent:'center',
            '&:before':{
                height:'100%',
                width:'100%',
                left: 0,
                top: 0,
                position: 'absolute',
                content: '""',
                background:'rgb(0 0 0 / 25%)',
            },
            [`@media only screen and (max-width: 768px)`]:{
                height:'250px',
                backgroundSize: 'contain',
                marginTop: '84px',
            },
            [`@media only screen and (max-width: 480px)`]:{
                height:'160px',
            },
        },
        bannerHeading: {
            top:'150px',
            position:'absolute',
            textAlign: 'center',
            color:'#ffff',
           
        },
        bannerContent:{
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh',
            margin: 'auto',
        },
        bannercontainer:{
            height:'250px',
        },
        bannerInput:{
            backgroundColor:'white',
        },
        locationSelect:{
            borderRadius:'30px 0px 0px 30px',
            backgroundColor:'white',
            width:'101.3px',
            float:"left",
             },
             
        bannerForm:{
            marginTop:'85px',  
            background:'#fff',
            padding:"10px",
            borderRadius:'30px',
            minWidth:"600px",
            [`@media only screen and (max-width: 768px)`]:{
                display:'none',
                minWidth:"100%",
             }
        },
        BannerSelect:{
            paddingLeft:'20px',           
        },
        BannerAutocomplete:{
                fontSize:"14px",
                color:"#333",
            input:{
                fontSize:"14px",
                color:"#333"
            },
           
        },
        BannerAutoSearch:{
            borderLeft: "1px solid #707070",
            marginLeft:"10px",
            fontSize:"14px",
            color:"#333",
            maxWidth:"97%" 
        },
        locationInput:{
           background:'white',
           
        },
        input:{
            height:"52px",
            "&&&:before": {
                borderBottom: "none"
              },
              "&&:after": {
                borderBottom: "none"
              }
        },
        banneTitle:{
            fontStyle: 'normal',
            fontVariantLigatures: 'normal',
            fontVariantCaps: 'normal',
            fontVariantNumeric: 'normal',
            fontVariantEastAsian: 'normal',
            fontWeight: 'bold',
            fontStretch: 'normal',
            font: "normal normal 58px/77px 'Montserrat-bold'",
            letterSpacing: '0px',
            marginLeft: 'auto!important',
            marginRight: 'auto!important',
            color: '#FFFFFF',
            marginBottom: '.5rem',
            [`@media only screen and (max-width: 768px)`]:{
                font: "normal normal 36px/77px 'Montserrat-bold'",
             }

        },
        banneTitleContent:{
            font: `normal normal normal 24px/36px Montserrat-Regular`,
            letterSpacing: `0px`,
            color: '#FFFFFF',
        }
    })))
export default useStyles;