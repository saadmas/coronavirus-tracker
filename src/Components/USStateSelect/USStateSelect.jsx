import React from 'react';
import { getLatestDataForUnitedStates } from '../../utils';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './USStateSelect.css';

const USStateSelect = ({ virusData, setSelectedUSState }) => {

  const getStates = () => {
    const latestData = getLatestDataForUnitedStates(virusData);
    const states = latestData.map(d => d['RegionName']);
    return states;
  };

  const getOptions = () => {
    const states = getStates();
    states.sort();
    return states;
  };

  const handleChange = (e, value) => {
    setSelectedUSState(value);
  };

  const render = () => {
    if (virusData === undefined || virusData.length === 0) {
      return null;
    }

    const options = getOptions();

    return (
      <div className="regionSelect selectContainer">
        <Autocomplete
          id="us-state-select-autocomplete"
          onChange={handleChange}
          style={{ width: 300 }}
          options={options}
          autoHighlight
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Choose a U.S. state"
            />
          )}
        />
      </div>
    );
  };

  return render();
};

export default USStateSelect;
