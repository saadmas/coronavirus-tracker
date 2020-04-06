import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import './CountrySelectSmall.css';

const CountrySelectSmall = ({ countries, initiallySelectedCountry, setSelectedCountry }) => {

  const getMuiTheme = () => createMuiTheme({
    overrides: {
      'MuiInputBase': {
        root: {
          backgroundColor: 'white'
        }
      },
      'MuiAutocomplete': {
        input: {
          textAlign: 'center'
        },
        inputRoot: {
          width: '250px',
          fontSize: '15px'
        }
      }
    }
  });

  const getOptions = () => {
    countries.sort();
    return countries;
  };

  const handleChange = (e, value) => {
    if (value) {
      setSelectedCountry(value);
    }
  };

  const render = () => {
    const options = getOptions();

    return (
      <div className="countrySelectSmall selectContainer">
        <MuiThemeProvider theme={getMuiTheme()}>
          <Autocomplete
            id="country-select-small-autocomplete"
            onChange={handleChange}
            style={{ width: 300 }}
            options={options}
            defaultValue={initiallySelectedCountry}
            autoHighlight
            renderInput={params => (
              <TextField
                className='textField'
                {...params}
                variant="outlined"
              />
            )}
          />
        </MuiThemeProvider>
      </div>
    );
  };

  return render();
};

export default CountrySelectSmall;
