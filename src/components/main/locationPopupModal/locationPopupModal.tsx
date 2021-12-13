import { Box, Grid,Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import configData from "../../../constants.json";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import CityBg from '../../../assets/img/city-bg.png';

const LoginPopUpModal = () => {

    const fetchCityList = () => {
        axios.get(configData.allpApiUrl+'all-areas')
            .then((response) => {
                if (response.data.success) {
                    setAreaList(response.data.data);
                }
                
            }, (error) => {
                console.log(error);
            });
    }

    const [areaList, setAreaList] = useState<any>([]);

    const [areavalue, setAreaValue] = React.useState(areaList);
    const [areaInputValue, setAreaInputValue] = React.useState('');
    const [open, setOpen] = React.useState(true);
    useEffect(() => {
        fetchCityList();
    }, [])


    const handleClose = () => {
        setOpen(false);
    };


    const handleLogin = (LocObj) => {

        if (LocObj !== null) {
            localStorage.setItem('CityID',LocObj.id);
            localStorage.setItem('CityName',LocObj.area_name);
            setOpen(false);
            window.location.reload();
        }
    }
    return (
        <Grid container>
            <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown={true} disableBackdropClick={true}>
                <DialogTitle ><Typography style={{font: "normal normal 20px/40px 'Montserrat-Medium'",textAlign:'center'}}>Current City {localStorage.getItem('CityName')}</Typography></DialogTitle>
                <DialogContent>
                    <Box p={3}>
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <Autocomplete
                                value={areavalue}
                                onChange={(event, newValue) => {
                                    setAreaValue(newValue);
                                    handleLogin(newValue);
                                }}
                                inputValue={areaInputValue}
                                onInputChange={(event, newInputValue) => {
                                    setAreaInputValue(newInputValue);
                                    //onChange(newInputValue);
                                }}
                                id="area-states-demo"
                                options={areaList}
                                getOptionLabel={(option) => option.area_name ? option.area_name + ', ' + option.city_info.city_name + ', ' + option.state_info.state_name + ', ' + option.country_info.country_name : ''}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        fullWidth
                                        variant="outlined"
                                        name="area_id"
                                        id="area_id"
                                        placeholder="Enter your city"
                                    />}
                            />
                        </Grid>
                        <Grid md={12} xs={12}>
                            <Box m={2} p={3}>
                                <Typography variant="h6" style={{font: "normal normal 20px/40px 'Montserrat-Medium'"}}>
                                    Search city name and help our professional reach on-time
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid md={12} xs={12}>
                            <img src={CityBg} style={{maxWidth:'100%',height:"auto"}} alt="CityBg" />
                        </Grid>
                    </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </Grid>
    )

}
export default LoginPopUpModal;