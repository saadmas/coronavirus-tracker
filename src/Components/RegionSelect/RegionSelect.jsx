import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './RegionSelect.css';

export const USPrefix = 'U.S. - ';

const RegionSelect = ({ regions, setSelectedCountry, setSelectedUSState }) => {

  const onRegionChange = (e, regionName) => {
    const isUSStateSelect = regionName.startsWith(USPrefix);
    if (isUSStateSelect) {
      const USStateNameWithoutPrefix = regionName.replace(USPrefix, '');
      setSelectedUSState(USStateNameWithoutPrefix);
    } else {
      setSelectedCountry(regionName);
    }
  };

  return (
    <div className="regionSelect selectContainer">
      <Autocomplete
        id="region-select-autocomplete"
        onChange={onRegionChange}
        style={{ width: 300 }}
        options={regions}
        autoHighlight
        autoComplete
        blurOnSelect
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Choose a country or U.S. State"
          />
        )}
      />
    </div>
  );
};

export default RegionSelect;
