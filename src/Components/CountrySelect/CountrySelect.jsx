import React from 'react';
import { getLatestData } from '../../utils';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './CountrySelect.css';

const CountrySelect = ({ virusData, setSelectedCountry }) => {

  const getCountries = () => {
    const latestData = getLatestData(virusData);
    const countries = latestData
      .filter(c => !(c['RegionCode'] || c['RegionName']))
      .map(c => c['CountryName']);
    return countries;
  };

  const getOptions = () => {
    const countries = getCountries();
    countries.sort();
    return countries;
  };

  const handleChange = (e, value) => {
    setSelectedCountry(value);
  };

  const render = () => {
    if (virusData === undefined || virusData.length === 0) {
      return null;
    }

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
