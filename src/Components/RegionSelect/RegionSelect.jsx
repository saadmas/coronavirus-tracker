import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './RegionSelect.css';

const RegionSelect = ({ regions, setSelectedRegion, isCountrySelect }) => {
  const handleChange = (e, value) => {
    setSelectedRegion(value);
  };

  return (
    <div className="regionSelect selectContainer animated bounce">
      <Autocomplete
        id="region-select-autocomplete"
        onChange={handleChange}
        style={{ width: 300 }}
        options={regions.sort()}
        autoHighlight
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={isCountrySelect ? "Choose a country" : "Choose a U.S. State"}
          />
        )}
      />
    </div>
  );
};

export default RegionSelect;
