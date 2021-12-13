import React, { useState } from 'react'
import { Box, Grid, Typography, Button, Input, Snackbar } from '@material-ui/core';
import useStyles from './accountInfoStyles';
import { Formik, Field, Form } from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import cardImg from '../../../assets/img/profile-17.jpg';
import invalidMail from '../../../assets/img/invalid-envelope.svg';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import configData from "../../../constants.json"
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import * as yup from 'yup';
import clsx from 'clsx';



function MyAccount({ UserDetails, onChange }) {
    const classes = useStyles();
    const [alert, setAlert] = useState({ open: false, message: '', type: '' });
    const [isEdit, setIsEdit] = useState(false)


    function handleChange() {
        onChange(3);
    }
    const yupInitialFormData = {
        first_name: UserDetails.first_name ? UserDetails.first_name : '',
        last_name: UserDetails.last_name ? UserDetails.last_name : '',
        mobile_no: UserDetails.mobile_no ? UserDetails.mobile_no : '',
        email: UserDetails.email ? UserDetails.email : '',
        userid: localStorage.getItem('UserId'),
        profile_pic: null
    }

    //const { t, i18n } = useTranslation();

    const validationSchema = yup.object({
        first_name: yup
            .string()
            .required('First Name is required')
            .min(5, 'First name must be greater than 5 character')
            .max(100, 'First name must be less than 100 character'),
        last_name: yup
            .string()
            .max(100, 'Last name must be less than 100 character')
            .required('Last Name is required')

    })
    const handleEdit = () => {
        setIsEdit(true)
    }
    
    const handleSubmit = async (values, { setStatus, setFieldError }) => {
        const formData = new FormData();
        for (const key in values) {
            let keys = key;
            let value = values[key];
            formData.append(keys, value)
        }
        axios.post(configData.allpApiUrl + 'update-profile', formData)
            .then((response) => {
                if (response.data.success) {
                    setAlert({ open: true, message: response.data.message, type: 'success' });
                    setIsEdit(false)
                    localStorage.setItem("user_name", response.data.data.first_name + ' ' + response.data.data.last_name);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                }
            }, (error) => {
                console.log(error);
            })

    }

    return (
        <Grid container className={classes.profilePages}>
            <Grid item sm={12} className={classes.w_md_full}>
                <Typography className={classes.sectionHeading}>Account Info</Typography>
            </Grid>


            <Grid item sm={12} className={classes.ProfileCard}>
                <Formik
                    initialValues={yupInitialFormData}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ touched, errors, setFieldValue, handleSubmit, values, isValid, handleChange, handleBlur }) => (

                        <Form  >
                            <Grid container spacing={3}>
                                <Grid item lg={2} md={4} sm={12} xs={12}>
                                    <Box className={classes.uploadContainer}>
                                        <span className={classes.uploadShow}>
                                            <img src={configData.backendUrl + UserDetails.photo} />
                                        </span>
                                        <label htmlFor="file">
                                            <Field
                                                component={FormikTextField}
                                                onChange={(event) => {
                                                 setFieldValue("profile_pic", event.currentTarget.files[0]);
                                                   }
                                                }
                                                id="file"
                                                name="profile_pic"
                                                fullWidth
                                                InputProps={{ type: "file" }}
                                                className={classes.upload_inp}
                                                value={undefined}
                                                disabled={!isEdit}
                                            />
                                            <IconButton className={classes.iconSpan} aria-label="upload picture" component="span">
                                                <PhotoCamera />
                                            </IconButton>
                                        </label>
                                    </Box>
                                </Grid>
                                <Grid item lg={10} md={8} sm={12} xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item md={6} xs={12}>
                                            <Field
                                                component={FormikTextField}
                                                label="First Name"
                                                id="first_name"
                                                name="first_name"
                                                value={values.first_name}
                                                fullWidth
                                                disabled={!isEdit}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Box className={classes.customInput}>
                                                <Field
                                                    component={FormikTextField}
                                                    label="Last Name"
                                                    id="last_name"
                                                    name="last_name"
                                                    value={values.last_name}
                                                    fullWidth
                                                    disabled={!isEdit}
                                                />
                                                {isEdit &&
                                                    <Button variant="outlined" type="submit" color='secondary' className={classes.verifyBtnSave} >save</Button>
                                                }
                                                {/* <Button className={classes.verifiedBtnEdit} type="button" color='secondary' onClick={()=>handleClick()} >Edit</Button>  */}

                                                {/* } */}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box className={classes.customInput}>
                                                <Field
                                                    component={FormikTextField}
                                                    label="Email"
                                                    id="email"
                                                    name="email"
                                                    value={values.email}
                                                    fullWidth
                                                    disabled
                                                />
                                                {UserDetails.email_verified_at?
                                                <Button className={classes.verifiedBtn} startIcon={<CheckOutlinedIcon />}>VERIFIED</Button>
                                                 :
                                                 <Box className={classes.verifyBtnGroup}>
                                                    <img src={invalidMail} alt="mail" />
                                                    <Button variant="outlined" color='secondary' className={classes.verifyBtn} >VERIFY</Button>
                                                </Box>
                                                }
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box className={classes.customInput}>
                                                <Field
                                                    component={FormikTextField}
                                                    label="Phone"
                                                    id="mobile_no"
                                                    value={values.mobile_no}
                                                    name="mobile_no"
                                                    fullWidth
                                                    disabled
                                                />
                                                {UserDetails.mobile_verfication_at?
                                                <Button className={classes.verifiedBtn} startIcon={<CheckOutlinedIcon />}>VERIFIED</Button>
                                                 :
                                                 <Box className={classes.verifyBtnGroup}>
                                                    <img src={invalidMail} alt="mail" />
                                                    <Button variant="outlined" color='secondary' className={classes.verifyBtn} >VERIFY</Button>
                                                </Box>
                                                }
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} alignItems="center" style={{ textAlign: 'left' }}>
                                            {/* <Button type="submit" className={classes.updateButton}>
                                                Update
                                            </Button> */}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>


                <Grid container spacing={3}>

                    <Grid item md={3} xs={6}>
                        {!isEdit &&
                            <Box width="100%">
                                <Button
                                    // startIcon={<CreateIcon />} 
                                    className={clsx(classes.verifiedBtnEdit, classes.Edit_btn)}
                                    onClick={() => handleEdit()} color="secondary">Edit </Button>
                            </Box>
                        }
                    </Grid>

                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={alert.open}
                onClose={() => { setAlert({ open: false , message: '' , type: '' }) }}
            >
                <Alert variant="filled" severity="success">
                    {alert.message}
                </Alert>
            </Snackbar>
        </Grid>
    )
}

export default MyAccount;