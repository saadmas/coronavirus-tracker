import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import CountUp from 'react-countup';
import { withStyles } from '@material-ui/core/styles';

import './StatsList.css';

const StatsList = ({ totalConfirmed, totalDeaths, mortalityRate, populationInfected, className, hideMortalityCountUp }) => {
  const MortalityRateTooltip = withStyles(theme => ({
    tooltip: {
      boxShadow: theme.shadows[1],
      fontSize: 9,
      marginTop: '7px'
    },
  }))(Tooltip);

  const getCountUp = (numToCountUp, decimals, separator) => (
    <CountUp
      end={numToCountUp}
      duration={5}
      delay={0.5}
      decimals={decimals || 0}
      separator={","}
    />
  );

  const getMortalityRate = () => {
    if (hideMortalityCountUp) {
      return mortalityRate;
    }

    return getCountUp(mortalityRate, 2);
  };

  return (
    <div className={className}>
      <div>
        <div className="statName">Reported Cases</div>
        <div>{getCountUp(totalConfirmed)}</div>
      </div>
      <div className="reportedDeaths">
        <div className="statName">Reported Deaths</div>
        <div>
          {getCountUp(totalDeaths)}
        </div>
      </div>
      <div className="mortalityRate">
        <MortalityRateTooltip title="Mortality Rate = Reported Deaths / Reported Cases" arrow>
          <div>
            <div className="statName">Mortality Rate</div>
            <div>{getMortalityRate()}%</div>
          </div>
        </MortalityRateTooltip>
      </div>
      {
        populationInfected && (
          <div className="populationInfected">
            <div className="statName">Population Infected</div>
            <div>{getCountUp(populationInfected, 2)}%</div>
          </div>
        )
      }
    </div>
  );
};

export default StatsList;