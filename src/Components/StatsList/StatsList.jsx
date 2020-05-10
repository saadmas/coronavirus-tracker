import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import './StatsList.css';

const StatsList = ({ totalConfirmed, totalDeaths, mortalityRate, className }) => {
  const MortalityRateTooltip = withStyles(theme => ({
    tooltip: {
      boxShadow: theme.shadows[1],
      fontSize: 9,
      marginTop: '7px'
    },
  }))(Tooltip);

  return (
    <div className={className}>
      <div>
        <div>Reported Cases</div>
        <div>{totalConfirmed}</div>
      </div>
      <div className="reportedDeaths">
        <div>Reported Deaths</div>
        <div>{totalDeaths}</div>
      </div>
      <div className="mortalityRate">
        <MortalityRateTooltip title="Mortality Rate = Reported Deaths / Reported Cases" arrow>
          <div>
            <div>Mortality Rate</div>
            <div>{mortalityRate}%</div>
          </div>
        </MortalityRateTooltip>
      </div>
    </div>
  );
};

export default StatsList;