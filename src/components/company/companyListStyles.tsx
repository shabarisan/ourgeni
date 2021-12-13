import { createStyles, makeStyles } from '@material-ui/core/styles';
import companyBanner from '../../assets/img/company-banner.png'
export const useStyles = makeStyles(()=>createStyles(
    {
        companyListBanner:{
            height:'450px',
            background: `url(${companyBanner}) no-repeat `,
            padding:'190px 0 0',
            position: 'relative',
            color:'white',
            '&:before':{
                height:'100%',
                width:'100%',
                left: 0,
                top: 0,
                position: 'absolute',
                content: '""',
                background:'rgb(0 0 0 / 82%)',
            }
        },
        CompanyHeadingContainer:{
            width:'100%',
            position:'absolute',
            textAlign:'center',
        },
        CompanyHeading:{
        
        },
        viewDetails:{
           
        },
        viewDetailButton:{
            background: `transparent linear-gradient(
                270deg
                , #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box`,
                    borderRadius: '5px',
                    border: 'none',
                    minWidth: '180px',
                    minHeight: '48px',
                    textAlign: 'center',
                    font: `normal normal 18px/14px 'Montserrat-Bold'`,
                    letterSpacing: '0px',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    lineHeight: '48px',
        }
    }
))