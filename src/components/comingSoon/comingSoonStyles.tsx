import {
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        comingSoonContent:{
            color: '#878787',
            fontSize: '16px',
            margin: '25px 0px 33px',
        },
        comingSoonTitleBox:{
            marginBottom: '0px',
        },
        comingSoonImage:{
            maxWidth: '100%',
        },
        comingSoonPage:{
            marginTop: '125px',
            marginBottom: '25px',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        contactButton:{
            marginLeft:'0px',
            font:"normal normal 18px/14px 'Montserrat-Bold'",
            minWidth:"200px",
            minHeight:"48px",
            fontFamily:'"Montserrat", sans-serif',
            fontWeight:600,
            color:'#fff',
            background:`transparent linear-gradient(
                270deg
                , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box;
                    border-radius: 5px`
        }
    })))
export default useStyles;