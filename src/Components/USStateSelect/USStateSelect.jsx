import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './USStateSelect.css';

const USStateSelect = ({ states, setSelectedUSState }) => {

  const getOptions = () => {
    states.sort();
    return states;
  };

  const handleChange = (e, value) => {
    setSelectedUSState(value);
  };

  const render = () => {
    const options = getOptions();

    return (
      <div className="regionSelect selectContainer animated bounce">
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
