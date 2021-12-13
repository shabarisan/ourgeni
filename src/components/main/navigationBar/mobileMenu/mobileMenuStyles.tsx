import {  makeStyles,
    createMuiTheme } from "@material-ui/core/styles";
export const theme = createMuiTheme({
    overrides:{
        MuiToolbar:{
        regular:{
            [`@media (min-width: 600px)`]:{
                minHeight:'80px'
            }
        }
        },
    }
})
const useStyles = makeStyles(theme => ({
    root: {
      display: "flex"
    },
  
    drawer: {
      flexShrink: 0,
      width: 280
    },
    drawerPaper: {
      width: 280
    },
    mobilMenuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
      [`@media only screen and (max-width: 600px)`]:{
        marginRight: '0 !important',
      },
      
    },
    nested: {
      paddingLeft: theme.spacing(4),
      font:"normal normal normal 16px/19px Montserrat",
    },
    menuListItems:{
      '& *':{
        fontFamily:'Montserrat-regular'
      }
    },
    MenuLinks:{
      font:"normal normal normal 16px/19px Montserrat",
      letterSpacing:'0px',
      textTransform:'none',
      color:"#01036f",
      '&:hover':{
        color: '#1acc8d',
        textDecoration:'none'
      }
    },
    menu_cart_bx:{
      display: 'flex',
    }
  }));

  export default useStyles