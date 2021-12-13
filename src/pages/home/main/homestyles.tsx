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
        root: {
            backgroundColor: '#f9f9f9',
            '& .MuiFab-root': {
                backgroundColor: '#1acc8d',
                color: '#ffff',
                borderRadius: '5px',
            }
        },
        backToTop: {
            position: 'fixed',
            zIndex: 99999,
            bottom: theme.spacing(2),
            right: theme.spacing(2),

        },
        loder:{
            display:"flex",
            margin:'auto',
            alignItems:'center',
            justifyContent:'center',
            width: '100%',
            height: 'calc(100vh - 280px)',
        },
        SectionCategory: {
            paddingTop:'30px',
            background: '#F9F9F9 0% 0% no-repeat padding-box',
            width:'100%',
            marginTop:'-100px',
            [`@media only screen and (max-width: 768px)`]:{
                marginTop:'-40px',
            },
        },
    })))
export default useStyles;