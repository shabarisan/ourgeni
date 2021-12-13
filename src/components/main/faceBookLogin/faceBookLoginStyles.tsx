import {
    Theme,
    createStyles
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) => (
    createStyles({    
        googleButton:{
            width:'100%',
            background: '#DD4B39 0% 0% no-repeat padding-box',
        },
        faceButton:{
            width:'70%',
            textTransform:'none',
            lineHeight:'30px',
            marginTop:'10px',
            fontFamily:'Montserrat-Regular',
            background:'#3B5998 0% 0% no-repeat padding-box',
            '&:hover':{
               background: '#3B5998 0% 0% no-repeat padding-box',
            },
            [`@media only screen and (max-width: 768px)`]:{
               width:'100%',
            }
        },
        facebookSvg:{
            width:'18px',
            height:'18px',
            marginLeft:'13px',
            marginRight:'10px',
            background:"#fff",
            borderRadius:'1px',
            padding:"2px",
        },
        button:{
            color:'#ffff',   
        },
        terms:{
            display:'grid',
            justifyContent:'center',
            textAlign:'center',
            marginTop:'20px'
        },
        footerText:{
            width:'400px',
            font:` normal normal normal 16px/19px 'Montserrat-Regular'`
        }
    })
))

export default useStyles