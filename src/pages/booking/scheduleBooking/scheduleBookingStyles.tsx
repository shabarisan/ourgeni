import {
    Theme,
    createStyles,
    createMuiTheme
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
export const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiButton:{
            label:{
                font: "normal normal 14px/12px 'Montserrat-bold'",
            }
        }
    },
});
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        root:{
            padding: '60px 100px',
            overflow: 'hidden',
        },
        scheduleContent:{
            [theme.breakpoints.up('sm')]:{
                padding:'40px 95px 40px 112px',
            },
            backgroundColor:'#f9f9f9',
        },
        scheduleHeading: {
            textAlign: 'center',
            font: 'normal normal 600 24px/29px "Montserrat-Regular"',
            letterSpacing: '0px',
            color: '#000000',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        datePicker:{
            fontSize:'11px',
            width:'100%'
        },
        button: {
            borderRadius: '4px',
            border: '2px solid #707070',
            letterSpacing: '0px',
            marginTop: '25px',
            marginRight: '15px',
            color: '#707070',
            padding: ' 16px 12px !important',
            minWidth: '300px',
            minHeight: '48px',
          
        },
        schedule:
        {
            textTransform:'uppercase',
            color: '#FFFFFF',
            background: `transparent linear-gradient(
                90deg
                , #0D004C 0%, #24AE90 100%) 0% 0% no-repeat padding-box`
        },
        scheduleCalander: {
            backgroundColor: "white",
        },
        scheduleClock: {
            backgroundColor: "white",
            padding:"1.5rem 3rem"
        }
    })
)
)
export default useStyles