import { Grid, Typography, Button,Snackbar,InputAdornment } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './changePasswordStyles';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import {
    TextField as FormikTextField
} from 'formik-material-ui';
import axios from 'axios';
import configData from "../../../constants.json"
import Alert from '@material-ui/lab/Alert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


function MyAccount ({UserDetails}){
    const classes = useStyles();
    
    const [alert, setAlert] = React.useState({open:false,message:'',type:''});
    const [showPassword, updateShowPasword] = useState(false);
    const [showOldPassword, updateOldShowPasword] = useState(false);
    const [showConfirmPassword, updateConfirmShowPasword] = useState(false);

    const yupInitialFormData = {
        first_name : UserDetails.first_name ? UserDetails.first_name : '',
        last_name : UserDetails.last_name ? UserDetails.last_name : '',
        old_password :  '',
        password :  '',
        confirm_password : '',
        userid : localStorage.getItem('UserId')
    }


    const validationSchema = yup.object({
        old_password: yup
        .string()
        .required('Old Password is required')
        .min(6, 'Old Password must be greater than 5 character')
        .max(100,'Old Password must be less than 100 character'),
        password:yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be greater than 6 character')
        .max(100,'Password must be less than 100 character')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        ),
        confirm_password:yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref("password"), null], 'Must be same as password')
        
    })

    return(
        <Grid container className={classes.profilePages}>
            <Grid item sm={12}>
                <Typography className={classes.sectionHeading}> Change Password </Typography>
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
                    {({ touched,errors,setFieldValue, values,isValid,handleChange,handleBlur }) => (
                        
                        <Form>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <label className={classes.sectionLabel}>Old Password</label>
                                    <Field
                                        component={FormikTextField}
                                        id="old_password"
                                        name="old_password"
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={classes.sectionInput}
                                        type={showOldPassword == false ? 'password' : 'text'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    {showOldPassword === false ? <VisibilityOffIcon  onClick={()=>{updateOldShowPasword(true)}} /> : <VisibilityIcon onClick={()=>{updateOldShowPasword(false)}} />}
                                                </InputAdornment>
                                            )
                                            
                                        }} 
                                        helperText={touched.old_password ? errors.old_password : ""}
                                        error={touched.old_password && Boolean(errors.old_password)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <label className={classes.sectionLabel}>Password</label>
                                    <Field
                                        component={FormikTextField}
                                        variant="outlined"
                                        id="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={classes.sectionInput}
                                        type={showPassword === false ? 'password' : 'text'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    { showPassword === false ? <VisibilityOffIcon  onClick={()=>{updateShowPasword(true)}} /> : <VisibilityIcon onClick={()=>{updateShowPasword(false)}} />}
                                                </InputAdornment>
                                            )
                                            
                                        }}
                                        helperText={touched.password ? errors.password : ""}
                                        error={touched.password && Boolean(errors.password)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <label className={classes.sectionLabel}> Confirm Password </label>
                                    <Field
                                        component={FormikTextField}
                                        variant="outlined"
                                        id="confirm_password"
                                        name="confirm_password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={classes.sectionInput}
                                        type={showConfirmPassword === false ? 'password' : 'text'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    {showConfirmPassword === false ? <VisibilityOffIcon  onClick={()=>{updateConfirmShowPasword(true)}} /> : <VisibilityIcon onClick={()=>{updateConfirmShowPasword(false)}} />}
                                                </InputAdornment>
                                            )
                                            
                                        }}
                                        helperText={touched.confirm_password ? errors.confirm_password : ""}
                                        error={touched.confirm_password && Boolean(errors.confirm_password)}
                                        fullWidth
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