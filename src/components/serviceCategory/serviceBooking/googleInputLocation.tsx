import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import { Field } from 'formik';
import {
  TextField as FormikTextField,
} from 'formik-material-ui';
import axios from 'axios';

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

interface PlaceType {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      },
    ];
  };
}

export default function GoogleMaps({ onChange }) {
  const classes = useStyles();
  const [value, setValue] = React.useState<PlaceType | null>();

  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<PlaceType[]>([]);;
  const loaded = React.useRef(false);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
      alert("Geolocation is not supported by this browser.");

    }
  }
  React.useEffect(() => {
    getCurrentLocation()

  }, [])


  const showPosition = async (position) => {

    let active = true
    var lat = position.coords.latitude
    var lng = position.coords.longitude
    var results = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCsSMOQKo0RE0mKvmqjQWMGhHmVVqqEmsU`)
      .then(responseJSON => {
        return responseJSON.data.results[0].address_components

      })
    //     var results=place.data.results[0].address_components
        console.log(555555,results)
        var area,city,state,country;
        if(results?.length>0){
            for (var i=0 ;i<results.length;i++){
              if (results[i].types[2] == "sublocality_level_1") {
                //this is the object you are looking for area
                  area = results[i].long_name
              }
                if (results[i].types[0] == "administrative_area_level_2") {
                    //this is the object you are looking for City
                     city = results[i].long_name
                }
                if (results[i].types[0] == "administrative_area_level_1") {
                        //this is the object you are looking for State
                        state = results[i].long_name;
                    }
                if (results[i].types[0] == "country") {
                        //this is the object you are looking for contry
                    country = results[i].long_name;
                    }
            }
          }
          var userCurrentLocation =  `${area}, ${city}, ${state}, ${country}`
          console.log(123,userCurrentLocation)
    if (!autocompleteService.current && (window as any).google) {

      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      navigator.geolocation.getCurrentPosition(showPosition);
      return undefined;
    }
    if (inputValue === '') {
      fetch({ input: userCurrentLocation }, (results?: PlaceType[]) => {
        if (active) {
          let newOptions = [] as PlaceType[];

          if (value) {
            console.log(666,value)
            newOptions = [value];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }
          setValue(newOptions[0])
          setOptions(newOptions);
        }
      });
      return () => {
        active = false;
      };
    }


  }


  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCsSMOQKo0RE0mKvmqjQWMGhHmVVqqEmsU&libraries=places',
        document.querySelector('head'),
        'google-maps',
      );
    }
    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request: { input: string }, callback: (results?: PlaceType[]) => void) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback);
      }, 200),
    [],
  );



  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: PlaceType[]) => {
      if (active) {

        let newOptions = [] as PlaceType[];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };


  }, [value, inputValue, fetch]);

  {
    return (

      <Autocomplete
        id="google-map-demo"
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        onChange={(event: any, newValue: PlaceType | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          onChange(newValue);

        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          //console.log(newInputValue);
        }}
        renderInput={(params) => (
          <Field {...params} component={FormikTextField} value={value} name="location" id="location" label="Enter Your Location" variant="outlined" fullWidth />
        )}
        renderOption={(option) => {
          const matches = option.structured_formatting.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match: any) => [match.offset, match.offset + match.length]),
          );

          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon className={classes.icon} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="textSecondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
    );
  }

}