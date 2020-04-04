import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './USStateSelectSmall.css';

const USStateSelectSmall = ({ states, initiallySelectedState, setSelectedState }) => {

  const getOptions = () => {
    states.sort();
    return states;
  };

  const handleChange = (e, value) => {
    if (value) {
      setSelectedState(value);
    }
  };

  const render = () => {
    const options = getOptions();

    return (
      <div className="stateSelectSmall selectContainer">
        <Autocomplete
          id="state-select-small-autocomplete"
          onChange={handleChange}
          style={{ width: 300 }}
          options={options}
          defaultValue={initiallySelectedState}
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

export default USStateSelectSmall;
