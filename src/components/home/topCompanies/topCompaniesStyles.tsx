import {
    makeStyles,
    createStyles,
    createMuiTheme,
    Theme
} from '@material-ui/core/styles'
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
        categoryContainer: {
            paddingLeft:'9px',
            paddingRight:'20px',
            marginTop: '30px',
            "& a": {
                color: '#878787',
                textDecoration: 'none',
                "&:hover":{
                    textDecoration:'none'
                }
            },
        },
        cardContainer:{
            marginTop: '24px',
            padding:'0 10px',
        },
        cardContainerMain:{
            marginTop: '24px',
            [`@media only screen and (max-width: 768px)`]:{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column',
                overflowX: 'scroll',
                maxHeight: '310px'
            },
        },
        companyCategoryBox: {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            border: '1px solid #E6E6E6',
            borderRadius: '8px',
            textAlign: 'center',
            padding: '33px 0px',
            width:'100%',
            minHeight: '250px',
            [`@media only screen and (max-width: 768px)`]:{
                minHeight: '280px',
                padding: '33px 20px'
            },
            [`@media only screen and (max-width: 600px)`]:{
                minHeight: '255px',
            },
            "& a": {
                color: '#878787',
                textDecoration: 'none',
            },
            "& img": {
                // width:'25%',
                font: "normal normal 16px/40px 'Montserrat-Medium'",
                letterSpacing: '0px',
                textTransform: 'capitalize',
                // margin:'5px 0 0 0 ',
                color: '#878787',
                width: '100%',
                maxWidth: '25%',
                maxHeight: '70px',
                objectFit: 'cover',
            },
            "& h3":{
                font: "normal normal 16px/40px 'Montserrat-Medium'",
                letterSpacing: '0px',
                textTransform: 'capitalize',
                margin:'5px 0 0 0 ',
                color: '#878787',
                fontWeight: '600',
                [`@media only screen and (max-width: 768px)`]:{
                    lineHeight:'1.2',
                    marginTop: '10px',
                },
            },
            '&:hover':{
                '& $HoverDetailLink':{
                    display:'block'
                
                }
            },
            
        },
        cardTitle:{

        },
        CompanyImage:{
            height: '70px',
            "& img":{
                height: 'inherit',
                
            }
           
        },
        CompanyImageitem:{
            verticalAlign: "middle",
            lineHeight: "110px",
            display: 'inline-block',
        },
        subTitleHeading: {
            fontFamily : 'Montserrat-SemiBold',
            fontSize: "24px",            
        },
        subTitlePragraph: {
            fontFamily : 'Montserrat-Medium',
            fontSize: "16px",
            color: '#A8A8A7 !important',
        },
        cText:{
            textAlign:'center',
            font:"normal normal normal 14px/24px 'Montserrat-Regular'",
            letterSpacing:'0px',
            color:'#878787',
            padding:'20px',
            marginBottom:'0',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            TextOverflow: 'ellipsis',
            '& p': {
                margin: '0px',
            },
        },
        viewAllContainer:{
            marginTop:'30px'
        },
        viewAllButton:{
            border:'1px solid #707070',
            borderRadius:"5px",
            fontSize:'20px',
            padding:'10px 60px 10px 60px',
            font:"normal normal 16px/32px 'Montserrat-Bold'",
            letterSpacing:'0px',
            minWidth:'180px',
            textAlign:'center',
            color:'#666666',
            textDecoration:'none',
            '&:hover':{
                textDecoration:'none'
            }
        },
        HoverLinkItem:{
            position:'absolute',
            top:'40%',
            left:'40%',
            zIndex:2
        },
        HoverDetailLink:{
            display:'none',
            width:'68px',
            lineHeight:'68px',
            backgroundColor:'#fff',
            borderRadius:'50px',
            height:"68px",
            textAlign:'center'
        }

    })))
export default useStyles;