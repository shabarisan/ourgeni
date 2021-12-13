import {
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      height: '100%',
      width:'100%',
      '& .MuiFab-root':{
        backgroundColor:'#1acc8d',
        color:'#ffff' ,
        borderRadius:'5px',
      }
    },
    backToTop: {
      position: 'fixed',
      zIndex:99999,
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      
    },
    topBar:{
      background: `transparent linear-gradient(
        180deg
        , #0D004C 0%, #24AE90 100%) 0% 0% no-repeat padding-box`,
    }

  })
)
)
export default useStyles