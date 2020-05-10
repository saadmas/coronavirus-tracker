import React from 'react';
import { VectorMap } from 'react-jvectormap';
import { getNumberWithCommas, getDecimalCount, getPopulationInfected } from '../../utils';
import StatsList from '../StatsList/StatsList';

const USMap = ({ summaryData, statesData }) => {

  const getTotalConfirmed = () => statesData.reduce((a, b) => a + Number(b['Confirmed']), 0)

  const normalizeRegionCode = (rc) => "US-" + rc

  const getRegionsHeat = () => {
    if (statesData.length > 0) {
      const regionsHeat = [];
      for (const state of statesData) {
        const regionCode = normalizeRegionCode(state['RegionCode']);
        regionsHeat[regionCode] = state['Confirmed'];
      }
      return regionsHeat;
    };
  };

  const getStateStats = (regionCode) => {
    const stateData = statesData.find(s => normalizeRegionCode(s['RegionCode']) === regionCode);
    if (!!stateData) {
      return stateData;
    }
    return null;
  };

  const onRegionTipShow = (evt, el, regionCode) => {
    const stateStats = getStateStats(regionCode);
    let tooltip;

    if (stateStats) {
      let mortalityRate = (stateStats['Deaths'] / stateStats['Confirmed']) * 100;
      if (getDecimalCount(mortalityRate) > 0) {
        mortalityRate = mortalityRate.toFixed(1);
      }

      const confirmed = getNumberWithCommas(stateStats['Confirmed']);
      const deaths = getNumberWithCommas(stateStats['Deaths']);
      const populationInfected = getPopulationInfected(stateStats['Confirmed'], stateStats['Population']);

      tooltip = `
        <b>${el.html()}</b><br>
        Confirmed: ${confirmed}<br/>
        Deaths: ${deaths}<br/>
        Mortality Rate: ${mortalityRate}% <br/>
        Population Infected: ${populationInfected}% 
      `;
    } else {
      tooltip = `
        <b>${el.html()}</b><br/>
        <b>No reported cases</b>
      `;
    }
    return el.html(tooltip);
  };

  const getRegionLabelOffsets = (code) => {
    return {
      'AK': [50, -25],
      'CA': [-10, 10],
      'CT': [-2, -4],
      'FL': [45, 0],
      'HI': [25, 60],
      'ID': [0, 40],
      'KY': [10, 5],
      'LA': [-20, 0],
      'ME': [-5, -8],
      'MI': [30, 30],
      'MA': [-5, 0],
      'MN': [-10, 0],
      'NH': [-2, 15],
      'NJ': [3, 0],
      'OK': [25, 0],
      'SC': [10, -5],
      'VA': [15, 5],
      'WV': [-10, 10]
    }[code.split('-')[1]];
  };

  const renderRegionLabels = (code) => {
    const doNotShow = ['US-RI', 'US-DC', 'US-DE', 'US-MD'];

    if (doNotShow.indexOf(code) === -1) {
      return code.split('-')[1];
    }
  };

  if (statesData.length > 0) {
    let totalConfirmed = summaryData.confirmed;
    let totalDeaths = summaryData.deaths;
    let mortalityRate = (totalDeaths / totalConfirmed) * 100;

    if (getDecimalCount(mortalityRate) > 0) {
      mortalityRate = mortalityRate.toFixed(1);
    }

    return (
      <div className="map">
        <StatsList
          totalConfirmed={getNumberWithCommas(totalConfirmed)}
          totalDeaths={getNumberWithCommas(totalDeaths)}
          mortalityRate={mortalityRate}
          className="mapStatsList"
        />
        <VectorMap
          map="us_aea"
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
          regionLabelStyle={{
            initial: {
              fill: 'black',
              'font-size': '7px',
              'font-family': 'Open Sans'
            },
            hover: {
              fill: 'white',
              cursor: 'default'
            }
          }}
          labels={{
            regions: {
              render: renderRegionLabels,
              offsets: getRegionLabelOffsets
            }
          }}
        />
      </div>
    );
  }
  return null;
};

export default USMap;
