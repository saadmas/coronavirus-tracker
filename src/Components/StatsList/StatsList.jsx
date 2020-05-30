import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import './StatsList.css';

const StatsList = ({ totalConfirmed, totalDeaths, mortalityRate, populationInfected, className }) => {
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
        <div className="statName">Reported Cases</div>
        <div>{totalConfirmed}</div>
      </div>
      <div className="reportedDeaths">
        <div className="statName">Reported Deaths</div>
        <div>{totalDeaths}</div>
      </div>
      <div className="mortalityRate">
        <MortalityRateTooltip title="Mortality Rate = Reported Deaths / Reported Cases" arrow>
          <div>
            <div className="statName">Mortality Rate</div>
            <div>{mortalityRate}%</div>
          </div>
        </MortalityRateTooltip>
      </div>
      {
        populationInfected && (
          <div className="populationInfected">
            <div className="statName">Population Infected</div>
            <div>{populationInfected}%</div>
          </div>
        )
      }
    </div>
  );
};

export default StatsList;