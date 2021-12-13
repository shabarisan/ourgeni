import {
    makeStyles,
    Theme,
    createStyles,
    createMuiTheme
} from '@material-ui/core/styles';
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
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        root: {
            listStyle: 'none',
            width:'100%',
        },
        grow: {
            flexGrow: 1,
        },
        img:{
            marginTop:'10px',
            marginBottom:'5px',
            height:'auto',
            [`@media only screen and (max-width: 768px)`]:{
                width: '80px',
            },
            [`@media only screen and (max-width: 600px)`]:{
                width: '60px',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        signInButton:{
            font: 'normal normal 500 16px/19px Montserrat',
            textTransform: 'none',
            color:'#ffff',
            textAlign:'left',
            letterSpacing:'0px',
            padding:'10px 0 10px 3px'
        },
        signUpButton:{
            font: 'normal normal 500 16px/19px Montserrat',
            textTransform: 'none',
            color:'#ffff',
            textAlign:'left',
            letterSpacing:'0px',
            padding:'10px 0 10px 13px'
        },
        button:{
            font: 'normal normal 500 16px/19px Montserrat',
            textTransform: 'none',
            color:'#ffff',
            textAlign:'left',
            letterSpacing:'0px',
            padding:'10px',
            '&:hover':{
                textDecoration:'none'
            }
        },
        ProfileMenu:{
            top:'50px !important'
        },
        menuLinks:{
            color:"#01036f",
            minWidth:'120px',
            font:"normal normal normal 14px/19px Montserrat",
            padding:"5px 5px",
            '&:hover':{
                textDecoration:'none',
                color:"#1acc8d"
            }
        },
        menuDrawer:{
            minWidth:'180px',
            marginLeft:'20px'
        },
        bottomNav:{
            display:'none',
            [`@media (max-width: 959px)`]: 
            {
                display:'block',
                float:'right'
            }
        },
        locationNavSelect: {
            [`@media only screen and (max-width: 380px)`]:{
                maxWidth: '100px',
            },
            '&:hover': {
                '& .MuiInput-underline:hover:not(.Mui-disabled):before' : {
                    borderBottom: "2px solid #fff !important",
                },
            },

            '&:before': {
                borderBottom: "1px solid #fff",
            },
            
            color: "#fff",
            marginLeft: "10px",
            maxWidth: "140px",
            '& svg': {
                color: "#fff",     
            },
            '& .MuiSelect-selectMenu':{
                width: '240px',
            },
        },
        locationBox: {
            display: "flex",
            alignItems: "center",
            marginLeft: "30px",
            [`@media only screen and (max-width: 600px)`]:{
                marginLeft: "10px",
            },
        },
        menu_option:{
            padding: "5px 10px 0px 0px",
            color: '#000',
        }
       
    })
)
)
export default useStyles