import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './CountrySelect.css';

const CountrySelect = ({ countries, setSelectedCountry }) => {

  const getOptions = () => {
    countries.sort();
    return countries;
  };

  const handleChange = (e, value) => {
    setSelectedCountry(value);
  };

  const render = () => {
    const options = getOptions();

    return (
      <div className="regionSelect selectContainer">
        <Autocomplete
          id="country-select-autocomplete"
          onChange={handleChange}
          style={{ width: 300 }}
          options={options}
          autoHighlight
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Choose a country"
            />
          )}
        />
      </div>
    );
  };

  return render();
};

export default CountrySelect;
