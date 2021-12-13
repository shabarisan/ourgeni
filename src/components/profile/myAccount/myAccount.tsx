import { Grid, Typography,Button,Snackbar } from '@material-ui/core';
import React from 'react';
import useStyles from './myAccountStyles';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import {TextField as FormikTextField} from 'formik-material-ui';
import axios from 'axios';
import configData from "../../../constants.json"
import Alert from '@material-ui/lab/Alert';

function MyAccount ({UserDetails}){
    const classes = useStyles();
    const [alert, setAlert] = React.useState({open:false,message:'',type:''});

    const yupInitialFormData = {
        first_name : UserDetails.first_name ? UserDetails.first_name : '',
        last_name : UserDetails.last_name ? UserDetails.last_name : '',
        mobile_no : UserDetails.mobile_no ? UserDetails.mobile_no : '',
        email : UserDetails.email ? UserDetails.email : '',
        userid : localStorage.getItem('UserId')
    }
    
    //const { t, i18n } = useTranslation();

    const validationSchema = yup.object({
        first_name: yup
        .string()
        .required('First Name is required')
        .min(5, 'First name must be greater than 5 character')
        .max(100,'First name must be less than 100 character'),
        last_name: yup
        .string()
        .max(100, 'Last name must be less than 100 character')
        .required('Last Name is required')
        
    })

    return(
        <Grid container className={classes.profilePages}>
            <Grid item sm={12}>
                <Typography className={classes.sectionHeading}>My Account </Typography>
            </Grid>
            <Grid item sm={12} className={classes.ProfileCard}>
                <Formik
                    initialValues={yupInitialFormData}
                    validationSchema={validationSchema}
                    onSubmit={async (values,{setStatus,setFieldError}) => { 
                        const formData = new FormData();
                        for (const key in values) {
                            let keys = key;
                            let value = values[key];
                            formData.append(keys, value)
                        }
                        axios.post(configData.allpApiUrl + 'update-profile',formData)
                        .then((response)=>{
                            if(response.data.success){
                                setAlert({open:true,message:response.data.message,type:'success'});
                                localStorage.setItem("user_name",response.data.data.first_name +' '+ response.data.data.last_name);
                                setTimeout(function(){
                                    window.location.reload();
                                },1000);
                            }
                        },(error)=>{
                            console.log(error);
                        })
                    }}
                    > 
                    {({ touched,errors,setFieldValue, values,isValid, handleChange , handleBlur  }) => (
                        
                        <Form>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <label className={classes.sectionLabel}>First Name</label>
                                    <Field
                                        component={FormikTextField}
                                        variant="outlined"
                                        id="first_name"
                                        name="first_name"
                                        value={values.first_name}
                                        className={classes.sectionInput}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={touched.first_name ? errors.first_name : ""}
                                        error={touched.first_name && Boolean(errors.first_name)}
                                        type="text"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <label className={classes.sectionLabel}>Last Name</label>
                                    <Field
                                        component={FormikTextField}
                                        variant="outlined"
                                        id="last_name"
                                        name="last_name"
                                        value={values.last_name}
                                        className={classes.sectionInput}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={touched.last_name ? errors.last_name : ""}
                                        error={touched.last_name && Boolean(errors.last_name)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <label className={classes.sectionLabel}>Mobile Number</label>
                                    <Field
                                        component={FormikTextField}
                                        variant="outlined"
                                        id="mobile_no"
                                        name="mobile_no"
                                        value={values.mobile_no}
                                        className={classes.sectionInput}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={touched.mobile_no ? errors.mobile_no : ""}
                                        error={touched.mobile_no && Boolean(errors.mobile_no)}
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <label className={classes.sectionLabel}>Email</label>
                                    <Field
                                        component={FormikTextField}
                                        variant="outlined"
                                        id="email"
                                        name="email"
                                        value={values.email}
                                        className={classes.sectionInput}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={touched.email ? errors.email : ""}
                                        error={touched.email && Boolean(errors.email)}
                                        fullWidth
                                        disabled

                                    />
                                </Grid>
                                <Grid item xs={12} alignItems="center" style={{textAlign:'left'}}>
                                   <Button type="submit" className={classes.updateButton}>
                                        Update 
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                 </Formik>
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                open={alert.open}
                onClose={()=>{setAlert({open:false,message:'',type:''})}}
            >
                <Alert variant="filled" severity="success">
                    {alert.message}
                </Alert>
            </Snackbar>
        </Grid>
    )
}

export default MyAccount;