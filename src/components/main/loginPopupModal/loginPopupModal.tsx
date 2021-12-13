import {Button, Grid,Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import configData from "../../../constants.json";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const LoginPopUpModal = ({openModal}) => {

    const [loginDetails, setValue] = useState({
        user_name: "",
        password: ""
    });
    
    const [open, setOpen] = React.useState(openModal);
    const [userAlerts, sertuserAlerts] = React.useState(false);
    const [userAlertMesasage, setuserAlertMesasage] = React.useState('');
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    useEffect(() => {
        if(openModal === true)
        {
            setOpen(true);
        }
        else{
            setOpen(false);
        }
    }, [])
    

    function removeAlert() {
        sertuserAlerts(false);
    }

    function handleSubmit() {
        if (localStorage.getItem('UserId') == '' || localStorage.getItem('UserId') == null) {
            sertuserAlerts(true);
            setuserAlertMesasage('Please login into your account');
            handleClickOpen();
        }
        else {
            window.location.href = '/services/cart';
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setValue((loginDetails) => ({
            ...loginDetails,
            [event.target.id]: event.target.value
        }))
    }
    
    const handleLogin = async () => {
        const formData = new FormData();
        for (const key in loginDetails) {
            let keys = key;
            let value = loginDetails[key];
            formData.append(keys, value)
        }
        const res = await axios.post(configData.userLoginApiUrl,formData);
        //console.log(res);
        if (res.data.statusMessage === "success") {
            localStorage.setItem("user_name",res.data.data.first_name +' '+ res.data.data.last_name);
            localStorage.setItem("mobile_no",res.data.data.mobile_no);
            localStorage.setItem("UserId",res.data.data.id);
            localStorage.setItem('CityID',res.data.data.city_id);
            localStorage.setItem("UserEmail",res.data.data.email);
            sertuserAlerts(true);
            setOpen(false);
            setuserAlertMesasage('Logged in successfully');
            handleClose();
            window.location.reload();
        }
        else {
            sertuserAlerts(true);
            setuserAlertMesasage('Invalid Credentials');
        }
        //props.logIn(formData);
    }

    return (
        <Grid container>
             <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown={true} disableBackdropClick={true}>
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            id="user_name"
                            label="Username"
                            type="text"
                            fullWidth
                            style={{ marginBottom: '30px' }}
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            style={{ marginBottom: '30px' }}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions style={{ textAlign: 'center' }}>
                        <Button onClick={handleLogin} variant="contained" color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Snackbar open={userAlerts} onClose={removeAlert}>
                <Alert onClose={removeAlert} severity="warning">
                    {userAlertMesasage}
                </Alert>
            </Snackbar>
        </Grid>
    )

}
export default LoginPopUpModal;