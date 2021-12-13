import {
    Theme,
    createStyles
  } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        root:{
            background: '#F9F9F9 0% 0% no-repeat padding-box'
        },
        paper:{
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9,
            marginTop:'30',
            objectFit: 'cover'

          },
          content:{
            "& > *": {
                marginBottom:'1rem !important',
                }         
          },
          ratingBadge:{
            display:'flex',
            backgroundColor:'#1c7e7d',
            borderRadius:'4px',
            padding:'4px 6px',
            color:'#fff',
            fontFamily: 'Montserrat-Regular',
          },
          viewCount:{
            fontFamily: 'Montserrat-Regular',
            fontSize:'14px',
            paddingLeft:'10px',
          },
          productTitle:{

          },
          button:{
            border:'1px solid #ddd',

            width:'25px',
            backgroundColor:'#0D004C',
            padding:'0',
            height:'30px',
            color:'#fff',
            lineHeight:'30px',
          },
          up:{
            borderLeft:0,
            borderRadius:'30px 0 0 30px',
          },
          down:{
              borderRight:0,
              borderRadius:'0 30px 30px 0',
            },
            buttonAdd:{
                background:'transparent linear-gradient(270deg, #24AE90 0%, #0D004C 100%) 0% 0% no-repeat padding-box',
                borderRadius: '5px',
                border: 'none',
                minWidth: '100%',
                minHeight: '42px',
                textAlign: 'center',
                font:" normal normal 16px/21px 'Montserrat-Bold'",
                letterSpacing: '0px',
                color:' #FFFFFF',
                textTransform: 'uppercase',
                lineHeight: '42px',
            },
        
    })
    )
)
export default useStyles