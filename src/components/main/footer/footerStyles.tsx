import {
    Theme,
    makeStyles,
    createStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
export const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiLink: {
            root: {
                color: '#ffff',
            }
        },
    }
});
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        
        footer: {
            bottom: 0,
            background: '#878787 0% 0% no-repeat padding-box',
            color: '#fff',
            padding: '60px 0 15px 0',
            "& .MuiLink-root":{
                fontSize:'14px',
            },
            "& .MuiButton-label":{
                color:'#FFFFFF',
                fontSize:'14px',
                fontWeight:600,
                font:"normal normal 18px/14px 'Montserrat-Bold'"
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffff",
              },
            "& .MuiOutlinedInput-input":{
                color:"#ffff",
                height:'40px',
                padding:'0 0 0 20px !important'
            }
            ,
            '& *':{
                color: '#ffff',
                fontFamily:"Montserrat-regular"
            }
        },
        // new styles for new footer
        footerMenuLinks:{
            display: 'flex',
            padding: '0',
            listStyle: 'none',
            '& li':{
                marginRight: '30px',
                '& a':{
                    textDecoration: 'none',
                }
            },
            [`@media only screen and (max-width: 768px)`]:{
                flexWrap: 'wrap',
            },
        },
        footer_basic_bx:{
            borderTop: '1px solid #fff',
            '& ul':{
                padding: '0',
                listStyle: 'none',
                '& li':{
                    margin: '10px 30px 0px 0',
                    display: 'inline-block',
                    '& span':{
                        fontWeight: 'bold',
                    },
                    '& a':{
                        textDecoration: 'none',
                    }
                },
            }
        },
        footer_bottom_bx1:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        footer_bottom_bx:{
            borderTop: '1px solid #fff',
            paddingTop: '10px',
        },
        // new styles for new footer end
        countryName:{
            margin: '20px 0 10px',
        },
        serving:{
            display: 'flex',
            flexWrap: 'wrap',
        },
        footerHeading: {
            fontSize:'16px',
            fontWeight:600,
            color:'#fff',
            position:'relative',
            paddingBottom:'12px',
            marginBottom:'8px',
            fontFamily: 'Montserrat-Regular'
        },
        footerList: {
            '& :first-child':{
                paddingTop:'0px',
            }
        },
        list:{
            paddingLeft:'0px',
            fontSize:'14px',
        },
        quickLinks:{
            padding:'0 15px',
            '& .MuiList-padding':{
                padding:'0px'
            }
        },
        logoContainer: {
            // padding:'0 15px',
        },
        contactInfo:{
            padding:'0 15px',
            '& .MuiListItem-root':{
                padding:'0px'
            },
            '& .MuiBox-root':{
                paddingTop: 0,
                paddingBottom: '15px',
                paddingLeft: '25px',
            },
            '& .MuiList-padding':{
                padding:'0px'
            }
            
        },
        newsLetter: {
             paddingRight:'3px',
            '& .MuiOutlinedInput-adornedEnd':{
                paddingRight:'0px'
            }
        },
        iconContainer:{
            margin:'16px 0px',
            display: 'flex',
            justifyContent: 'center'
        },
        storeContainer:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        formInput: {
            width: '100%',
            [theme.breakpoints.down('md')]:{
                marginTop:'15px',
            },
            marginTop:'30px',
            color:'#ffff',
        },
        formButton: {
            // Some CSS
            background: `transparent linear-gradient(
                    270deg
                    , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box`,
            borderRadius: 7,
            border: 0,
            height: '40px',
            padding: '0 30px',
            color: '#FFFFFF',
            font: "normal normal 18px/14px 'Montserrat-Bold'",
            letterSpacing: '0px',
            textTransform: 'uppercase',
            "& :hover":{
                border:'none'
            }

        },
        divider: {
            backgroundColor: 'white',

        },
        termsList: {
            width:"70vW",
            textAlign:'center',
            display: 'flex',
            margin:'0 auto',
            paddingTop:"15px",
            flexDirection: 'row',
            '& .MuiLink-root':{
                font:"normal normal normal 12px/24px 'Montserrat'"
            }
            
        },
        termsItems: {
            width:'100vW'
        },
        icons: {
            position:'relative',
            top:'-10px',
        },
        storeIcons:{
            paddingRight:'10px',
            [`@media only screen and (max-width: 600px)`]:{
                width: '95%',
                paddingRight:'5px',
            },
        },
        logo: {

        },
        mediaIcons: {
            fontSize: '18px',
            display: 'inline-block',
            color: '#fff',
            lineHeight: '1',
            padding:' 8px 0',
            marginRight: '4px',
            borderRadius: '50%',
            textAlign: 'center',
            width: '36px',
            height: '36px',
            transition:' 0.3s',
        },
        iconSvg:{
            fontSize: '18px',
        },
        footerAboutUs:{
            fontFamily:'Montserrat-Regular',
            fontSize : '16px',
            marginTop : '10px',
            color:'#fff',
             marginBottom:'10px'
        },
        alertClass:{
            marginTop:'10px'
        },
        bottomNav:{
            display:'none',
            [`@media (max-width: 464px)`]: 
            {
                display:'block'
            }
        }

    })
)
)
export default useStyles