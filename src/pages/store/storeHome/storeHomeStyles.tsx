import {
    Theme,
    createMuiTheme,
} from '@material-ui/core/styles';
import zIndex from '@material-ui/core/styles/zIndex';
import { makeStyles, createStyles, } from '@material-ui/styles';
export const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiContainer: {
            root: {


            }
        },
        MuiTypography: {
            h1: {

            },
            body1: {

            }
        }
    },
});

const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        homeBanner: {
            width: '100%',
            // background: `url('../') no-repeat`,
            // backgroundSize: 'cover',
            // backgroundPosition: 'center',
            height:'521px',
            justifyContent:'center',
            [`@media only screen and (max-width: 600px)`]:{
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                marginTop: '60px',
                height: '130px',
            },
            [`@media only screen and (max-width: 480px)`]:{
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                marginTop: '60px',
                height: '110px',
            },
            [`@media only screen and (max-width: 360px)`]:{
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                marginTop: '60px',
                height: '100px',
            },
            '&:before':{
                // height:'100%',
                width:'100%',
                left: 0,
                top: 0,
                position: 'absolute',
                content: '""',
            }
        },
        category_sec: {
            padding: '20px 0',
        },
        card_content: {
            padding: '0',
            '&:last-child' : {
                padding: '0',
            },
        },
      
        category_h: {
            textTransform: 'uppercase',
            fontSize: '24px',
            fontWeight: 500,
            paddingBottom: '15px',
        },
        category_box: {
            background: '#FFFFFF',
            boxShadow: '0px 3px 6px rgb(0 0 0 / 6%)',
            border: '1px solid #707070',
            borderRadius: '5px',
            padding: '27px 30px 20px',
        },
        category_type_h: {
            fontWeight: 500,
            marginBottom: '26px',
            textAlign: 'center',
            fontSize: '14px',
        },
        category_img_bx: {
            height: '240px',
            [`@media only screen and (max-width: 600px)`]:{
                textAlign: 'center',
            },
        },
        category_img: {
            height: '100%',
            maxWidth: '100%'
        },
        category_btn_bx: {
            padding: '16px 0 0',
        },
        all_category_btn: {
            justifyContent: 'center',
            margin: '0 auto',
            textTransform: 'capitalize',
            color: '#459CF3',
            fontSize: '14px'
        }
    })))
    export default useStyles