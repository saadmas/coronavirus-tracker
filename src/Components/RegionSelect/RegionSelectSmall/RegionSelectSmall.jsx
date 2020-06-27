import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { USPrefix } from '../RegionSelect';

import './RegionSelectSmall.css';

const RegionSelectSmall = ({ regions, initiallySelectedRegion, setSelectedCountry, setSelectedUSState }) => {
  const [isEditing, setIsEditing] = React.useState(true);

  React.useEffect(() => {
    onRegionChange(initiallySelectedRegion);
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

  const onRegionChange = (e, regionName) => {
    if (regionName) {
      const isUSStateSelect = regionName.startsWith(USPrefix);
      if (isUSStateSelect) {
        const USStateNameWithoutPrefix = regionName.replace(USPrefix, '');
        setSelectedUSState(USStateNameWithoutPrefix);
      } else {
        setSelectedCountry(regionName);
      }
    }
  };

  return (
    <div className="regionSelectSmall selectContainer">
      <MuiThemeProvider theme={getMuiTheme()}>
        <Autocomplete
          id="region-select-small-autocomplete"
          onChange={onRegionChange}
          style={{ width: 300 }}
          options={regions}
          value={isEditing && initiallySelectedRegion}
          autoHighlight
          autoComplete
          blurOnSelect
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
