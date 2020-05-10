import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import './RegionSelectSmall.css';

const RegionSelectSmall = ({ regions, initiallySelectedRegion, setSelectedRegion }) => {
  const [isEditing, setIsEditing] = React.useState(true);

  React.useEffect(() => {
    handleChange(initiallySelectedRegion);
  }, [initiallySelectedRegion]);

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
        }
      }
    }
  });

  const getOptions = () => {
    regions.sort();
    return regions;
  };

  const handleChange = (e, value) => {
    if (value) {
      setSelectedRegion(value);
    }
  };

  const options = getOptions();

  return (
    <div className="regionSelectSmall selectContainer">
      <MuiThemeProvider theme={getMuiTheme()}>
        <Autocomplete
          id="region-select-small-autocomplete"
          onChange={handleChange}
          style={{ width: 300 }}
          options={options}
          value={isEditing && initiallySelectedRegion}
          autoHighlight
          renderInput={params => (
            <TextField
              {...params}
              className='textField'
              variant="outlined"
            />
          )}
        />
      </MuiThemeProvider>
    </div>
  );
};

export default RegionSelectSmall;
