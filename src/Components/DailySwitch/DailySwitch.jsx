import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import './DailySwitch.css';

const DailySwitch = ({ isDailyChart, onDailySwitchChange }) => {

  const StyledDailySwitch = withStyles(theme => ({
    track: {
      background: 'grey'
    }
  }))(Switch);

  return (
    <div className="dailySwitch">
      <FormControlLabel
        control={
          <StyledDailySwitch
            checked={isDailyChart}
            onChange={onDailySwitchChange}
            name="dailySwitch"
            color="primary"
          />
        }
        label="Daily"
        labelPlacement="top"
      />
    </div>
  );
};

export default DailySwitch;