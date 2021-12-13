import {
    Theme,
    createMuiTheme,
} from '@material-ui/core/styles';
import { makeStyles, createStyles, } from '@material-ui/styles';
import bannerBackground from '../../assets/img/category-banner-bg.png'
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
        banner: {
            background: `url(${bannerBackground}) no-repeat `,
            position: 'relative',
            padding: ' 130px 0 0 0',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '400px',
            width: '100%',
            alignItems: 'center',
            paddingLeft: '0px',
            paddingRight: '0px',
            [`@media (min-width: 600px)`]: {
                paddingLeft: '0',
                paddingRight: '0px'
            },
            '&:before': {
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                backgroundColor: 'rgb(0 0 0 / 55%)',
                top: 0,
                content: '""',
            },
        },
        container: {
            position: 'absolute',
            width: '100%'
        },
        headings: {
            textAlign: 'center'
        },
        title: {
            fontStyle: 'normal',
            fontVariantLigatures: 'normal',
            fontVariantCaps: 'normal',
            fontVariantNumeric: 'normal',
            fontVariantEastAsian: 'normal',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontSize: '63px',
            lineHeight: '77px',
            fontFamily: 'Montserrat-bold',
            letterSpacing: '0px',
            marginLeft: 'auto!important',
            marginRight: 'auto!important',
            color: '#FFFFFF',
            marginBottom: '.5rem',
            [`@media only screen and (max-width: 768px)`]:{
                lineHeight:'40px',
                fontSize: '30px',
            },
        },
        description: {
            font: `normal normal normal 24px/36px Montserrat-Regular`,
            letterSpacing: `0px`,
            color: '#FFFFFF',
        },
        joinButton: {
            background: `transparent linear-gradient(
                270deg
                , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box;
                    border-radius: 5px`,
            color: '#FFFFFF',
            minWidth: '150px',
            minHeight: ' 48px',
            font: `normal normal 18px/14px 'Montserrat-Bold'`,
            transition: '0.3s',
            borderRadius:' 5px',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginLeft:'30px',

        },
        joinNowWrap: {
            position: 'relative',
            padding:'80px 5%'
        },
        sectionJoin: {
            zIndex: 1,
            overflow: 'hidden',
            background: '#e0e0e0 0% 0% no-repeat padding-box !important',
        },
        joinHeading: {
            textAlign: 'left',
            fontWeight: 600,
            font: "normal normal 30px/39px 'Montserrat-bold'",
            letterSpacing: '0px',
            color: '#000000',
        }
        
    })
)
)
export default useStyles