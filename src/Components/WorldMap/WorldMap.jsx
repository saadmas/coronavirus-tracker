import React from 'react';
import { VectorMap } from 'react-jvectormap';
import { getNumberWithCommas, getDecimalCount, getPopulationInfected } from '../../utils';
import StatsList from '../StatsList/StatsList';

import './WorldMap.css';

const WorldMap = ({ worldData }) => {
  const getTotalConfirmed = () => worldData.reduce((a, b) => a + Number(b['Confirmed']), 0)

  const getTotalDeaths = () => worldData.reduce((a, b) => a + Number(b['Deaths']), 0)

  const getRegionsHeat = () => {
    const regionsHeat = [];
    if (worldData.length > 0) {
      for (const country of worldData) {
        regionsHeat[country['CountryCode']] = country['Confirmed'] || 0;
      }
    };
    return regionsHeat;
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
        mortalityRate = mortalityRate.toFixed(2);
      }

      const confirmed = getNumberWithCommas(countryStats['Confirmed']);
      const deaths = getNumberWithCommas(countryStats['Deaths']);
      const populationInfected = getPopulationInfected(countryStats['Confirmed'], countryStats['Population'])
      const populationInfectedText = populationInfected === Infinity ?
        'Unavailable'
        : populationInfected + '%'

      tooltip = `
        <b>${isPR ? 'United States' : el.html()}</b><br>
        Confirmed: ${confirmed}<br/>
        Deaths: ${deaths}<br/>
        Mortality Rate: ${mortalityRate}% <br/>
        Population Infected: ${populationInfectedText} 
      `;
    } else {
      tooltip = `
        <b>${el.html()}</b><br/>
        <b>No reported cases</b>
      `;
    }
    return el.html(tooltip);
  };

  if (worldData.length > 0) {
    let totalConfirmed = getTotalConfirmed();
    let totalDeaths = getTotalDeaths();
    const mortalityRate = (totalDeaths / totalConfirmed) * 100;

    return (
      <div className="map">
        <StatsList
          totalConfirmed={totalConfirmed}
          totalDeaths={totalDeaths}
          mortalityRate={mortalityRate}
          className="mapStatsList"
        />
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
              "fill-opacity": 0.8
            }
          }}
          series={{
            regions: [
              {
                values: getRegionsHeat(),
                scale: ["#FFFFFF", "#FF0000"],
                normalizeFunction: "polynomial",
                // max: getTotalConfirmed(),
                min: 0
              }
            ]
          }}
        />
      </div>
    );
  }
  return null;
};

export default WorldMap;
