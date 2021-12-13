import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './bannerStyles';
import { useHistory } from "react-router-dom";
const LocationBox = ({ onChange, areaList, serviceList, allServices }) => {

  const [areavalue, setAreaValue] = React.useState(areaList);
  const [areaInputValue, setAreaInputValue] = React.useState('');

  const [servicevalue, setServiceValue] = React.useState(serviceList);
  const [serviceInputValue, setServiceInputValue] = React.useState('');
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <Grid item sm={4} md={4} xl={4} className={classes.BannerSelect}>
        <Autocomplete className={classes.BannerAutocomplete}
          value={areavalue}
          onChange={(event, newValue) => {
            setAreaValue(newValue);
            onChange(newValue);
          }}
          inputValue={areaInputValue}
          onInputChange={(event, newInputValue) => {
            setAreaInputValue(newInputValue);
            //onChange(newInputValue);
          }}
          id="area-states-demo"
          options={areaList}
          getOptionLabel={(option) => option.city_name ? option.city_name : ''}
          renderInput={(params) =>
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true, className: classes.BannerAutocomplete, }}
              variant="standard"
              name="area_id"
              id="area_id"
              placeholder="Select City"

            />}
        />
      </Grid>
      <Grid item sm={8} md={8} xl={8}>
        <Autocomplete
          value={servicevalue}
          onChange={(event, newValue) => {

            setServiceValue(newValue);
            newValue && history.push({
              pathname: 'services/sub/service/' + newValue.id,
              state: {
                cityId: localStorage.getItem('CityID')
              }
            })
          }}
          inputValue={serviceInputValue}
          onInputChange={(event, newInputValue) => {
            setServiceInputValue(newInputValue);

          }}
          id="service-states-demo"
          options={allServices}
          getOptionLabel={(option) => option.service_name ? option.service_name : ''}
          renderInput={(params) =>
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true, className: classes.BannerAutoSearch, startAdornment: <InputAdornment position="end"><SearchIcon style={{ fill: "#999999", marginRight: "10px" }} /></InputAdornment> }}
              variant="standard"
              name="service"
              id="service"
              placeholder="Search for a service"
            />}
        />
      </Grid>
    </>
  )
}

export default LocationBox;