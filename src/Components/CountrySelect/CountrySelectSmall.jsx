import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './CountrySelectSmall.css';

const CountrySelectSmall = ({ countries, initiallySelectedCountry, setSelectedCountry }) => {

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
      </div>
    );
  };

  return render();
};

export default CountrySelectSmall;
