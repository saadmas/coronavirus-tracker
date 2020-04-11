import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { VectorMap } from 'react-jvectormap';
import { getNumberWithCommas, getDecimalCount } from '../../utils';

import './WorldMap.css';

const WorldMap = ({ worldData }) => {
  const getTotalConfirmed = () => worldData.reduce((a, b) => a + Number(b['Confirmed']), 0)

  const getTotalDeaths = () => worldData.reduce((a, b) => a + Number(b['Deaths']), 0)

  const getRegionsHeat = () => {
    if (worldData.length > 0) {
      const regionsHeat = [];
      for (const country of worldData) {
        regionsHeat[country['CountryCode']] = country['Confirmed'];
      }
      return regionsHeat;
    };
  }

  const getCountryStats = (countryCode) => {
    const countryData = worldData.find(c => c['CountryCode'] === countryCode);
    if (!!countryData) {
      return countryData;
    }
    return null;
  };

  const onRegionTipShow = (evt, el, countryCode) => {
    let tooltip;
    let countryStats;
    const isPR = countryCode === 'PR';

    if (isPR) {
      countryStats = getCountryStats('US');
    } else {
      countryStats = getCountryStats(countryCode);
    }

    if (countryStats) {
      let mortalityRate = (countryStats['Deaths'] / countryStats['Confirmed']) * 100;
      if (getDecimalCount(mortalityRate) > 0) {
        mortalityRate = mortalityRate.toFixed(1);
      }

      const confirmed = getNumberWithCommas(countryStats['Confirmed']);
      const deaths = getNumberWithCommas(countryStats['Deaths']);

      tooltip = (`
      <b>${isPR ? 'United States' : el.html()}</b></br>
      <span>Confirmed: ${confirmed}</br>
      Deaths: ${deaths}</br>
      Mortality Rate: ${mortalityRate}%</span>
    `);
    } else {
      tooltip = (`
      <b>${el.html()}</b></br>
      <b>No reported cases</b>
      `);
    }
    return el.html(tooltip);
  };

  const MortalityRateTooltip = withStyles(theme => ({
    tooltip: {
      boxShadow: theme.shadows[1],
      fontSize: 9,
      marginTop: '7px'
    },
  }))(Tooltip);

  const render = () => {
    if (worldData.length > 0) {
      let totalConfirmed = getTotalConfirmed();
      let totalDeaths = getTotalDeaths();

      let mortalityRate = (totalDeaths / totalConfirmed) * 100;

      if (getDecimalCount(mortalityRate) > 0) {
        mortalityRate = mortalityRate.toFixed(1);
      }

      totalConfirmed = getNumberWithCommas(totalConfirmed);
      totalDeaths = getNumberWithCommas(totalDeaths);

      const mortalityRateInfo = 'Mortality Rate = Reported Deaths / Reported Cases';

      return (
        <div className="map">
          <ul className="statsList">
            <li>Reported Cases: {totalConfirmed}</li>
            <li>Reported Deaths: {totalDeaths}</li>
            <MortalityRateTooltip title={mortalityRateInfo} arrow>
              <li className="mortalityRate">Mortality Rate: {mortalityRate}%</li>
            </MortalityRateTooltip>
          </ul>
          <VectorMap
            map="world_mill"
            onRegionTipShow={onRegionTipShow}
            zoomOnScroll={false}
            backgroundColor="transparent"
            containerStyle={{
              width: "100%",
              height: "400px"
            }}
            containerClassName="map"
            regionStyle={{
              hover: {
                "fill-opacity": 0.8,
              }
            }}
            series={{
              regions: [
                {
                  values: getRegionsHeat(),
                  scale: ["#FFFFFF", "#FF0000"],
                  normalizeFunction: "polynomial",
                  max: getTotalConfirmed(),
                  min: 0
                }
              ]
            }}
          />
        </div>
      );
    }
    return null;
  }

  return render();
};

export default WorldMap;
