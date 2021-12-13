import {
    Theme,
    createStyles,
    createMuiTheme,
    makeStyles
} from '@material-ui/core/styles';
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
        
    })
)
)
export default useStyles