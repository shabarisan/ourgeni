import {
    Theme,
    createStyles
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) => (
    createStyles({    
        googleButton:{
            width:'70%',
            textTransform:'none',
            lineHeight:'30px',
            marginTop:'10px',
            color:'#757575',
            background: '#fff',
            fontFamily:'Montserrat-Regular',
            '&:hover':{
                color:'#757575',
                background: '#fff',
            },
            [`@media only screen and (max-width: 768px)`]:{
                width:'100%',
             }
        },
        faceButton:{
            background:'#3B5998 0% 0% no-repeat padding-box',
        },
        gmailSvg:{
            width:'18px',
            height:'18px',
            marginRight:'10px'
        },
        button:{
            color:'#757575', 
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
        },
        overLay:{
            position: 'fixed', /* Positioning and size */
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(128,128,128,0.5)', /* color */
        }
    })
))
export default useStyles