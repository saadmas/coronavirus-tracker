import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import './StatsList.css';

const StatsList = ({ totalConfirmed, totalDeaths, mortalityRate }) => {
  const MortalityRateTooltip = withStyles(theme => ({
    tooltip: {
      boxShadow: theme.shadows[1],
      fontSize: 9,
      marginTop: '7px'
    },
  }))(Tooltip);

  return (
    <div className="statsList">
      <div>
        <em>Reported Cases:</em> {totalConfirmed} &nbsp;&nbsp;
    </div>
      <div>
        <em>Reported Deaths:</em> {totalDeaths} &nbsp;&nbsp;
    </div>
      <div>
        <MortalityRateTooltip title="Mortality Rate = Reported Deaths / Reported Cases" arrow>
          <span className="mortalityRate"><em>Mortality Rate:</em> {mortalityRate}% </span>
        </MortalityRateTooltip>
      </div>
    </div>
  );
};

export default StatsList;