import React from "react";
import { Button, Grid, FormControl,Card,CardContent,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import Rating from '@material-ui/lab/Rating';
import { useTranslation } from "react-i18next";
import {
    TextField as FormikTextField
} from 'formik-material-ui';
import CancelIcon from '@material-ui/icons/Cancel';
import "../../../../translations/i18n";
import axios from "axios";
import configData from '../../../../constants.json';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import './reviewFormStyles.css';

// interface ReviewProps  {
//     ServiceID:
// }

const useStyles = makeStyles({
    subminButton:{
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
        marginTop: '30px',
        textTransform: 'uppercase',
        "& :hover":{
            border:'none'
        }
    }
});

const ReviewForm = (props) =>{

    const {ServiceID,ServiceType,ProductID , handleUpdateReview} = props;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const { t } = useTranslation();
    const [state, setState] = React.useState({
        open: false,
        message:'',
        vertical: 'bottom',
        horizontal: 'center',
        severity : ''
    });

    const { vertical, horizontal, open, message, severity } = state;

    const [yupInitialFormData,updateInitalFormData] = React.useState({
        comments: '',
        rating: '',
        service_id: ServiceID?ServiceID:'',
        product_id:ProductID?ProductID:'',
        type: ServiceType,
        userid: localStorage.getItem('UserId'),
    });

    const validationSchema = yup.object({
        comments: yup
        .string()
        .min(5, t('min5Validation'))
        .required('Comment '+t('required'))
        .max(1000, t('max100Validation')),
        userid: yup
        .string()
        .required('Email'+t('required'))
    });

   

    const handleClose = () => {
        setState({ ...state, open: false });
    };
    console.log("product ",yupInitialFormData)

    return(
        <div className="card-padding add-review-box">
            <Formik
                initialValues={yupInitialFormData}
                validationSchema={validationSchema}
                onSubmit={async (values,{setStatus,setFieldError,resetForm}) =>{
                    const formData = new FormData();
                    for (const key in values){
                        let keys = key;
                        let value = values[key];
                        formData.append(keys, value)
                    }

                    axios.post(configData.allpApiUrl + 'review',formData)
                    .then((response)=>{
                        if(response.data.success){
                            setState({ ...state, open: true,message:response.data.message,severity:"success"});
                            resetForm();
                        
                            handleUpdateReview(response)
                            console.log(4444,response)
                            // onSubmit();
                        }
                        else{
                            setState({ ...state, open: true,message:response.data.message,severity:"error"});
                        }
                        //console.log(response);
                    },(error)=>{
                        console.log(error);
                    })
                }}
                >   
                {({ setFieldValue, values,isValid,handleReset  }) => (
                <Form>
                    <Grid container direction="row" spacing={3}>
                        <Grid item sm={6} xs={12}>
                            <label className="text">
                                How would you rate he business?
                            </label>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <FormControl  style={{width:'100%'}}>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                        setFieldValue('rating',newValue);
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <label className="text">
                                What would you like others to know about this business, based on your experience?
                            </label>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <FormControl  style={{width:'100%'}}>
                                {/* <label style={{marginBottom:'30px',fontFamily:'Montserrat-Regular'}} htmlFor="userid">Your Comment *</label> */}
                                <Field
                                    id="comments"
                                    name="comments"
                                    component={FormikTextField}
                                    className="textarea-field"
                                    InputProps={{ multiline:true }}
                                    fullWidth
                                />
                            </FormControl>
                            <Button className={classes.subminButton}  type="submit">Submit</Button>
                        </Grid>
                    </Grid>
                </Form>
                )}
            </Formik>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
            >
                <Alert variant="filled" severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ReviewForm;