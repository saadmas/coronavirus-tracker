import React from 'react';
import { VectorMap } from 'react-jvectormap';
import { getLatestData, getNumberWithCommas, getDecimalCount } from '../../utils';

import './WorldMap.css';

const WorldMap = ({ virusData }) => {
  const [worldData, setWorldData] = React.useState([]);

  React.useEffect(() => {
    getWorldDataForToday();
  }, [virusData]);

  const getWorldDataForToday = () => {
    const latestData = getLatestData(virusData);
    setWorldData(latestData);
  };

  const getTotalConfirmed = () => {
    return worldData.reduce((a, b) => a + Number(b['Confirmed']), 0);
  };

  const getTotalDeaths = () => {
    return worldData.reduce((a, b) => a + Number(b['Deaths']), 0);
  };

  const getRegionsHeat = () => {
    if (worldData.length > 0) {
      const totalConfirmed = getTotalConfirmed();
      const regionsHeat = {};
      for (const country of worldData) {
        const countryConfirmedRatio = country['Confirmed'] / totalConfirmed;
        regionsHeat[country['CountryCode']] = countryConfirmedRatio;
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
    const countryStats = getCountryStats(countryCode);
    let tooltip;
    if (countryStats) {
      let mortalityRate = (countryStats['Deaths'] / countryStats['Confirmed']) * 100;
      if (getDecimalCount(mortalityRate) > 0) {
        mortalityRate = mortalityRate.toFixed(1);
      }

      const confirmed = getNumberWithCommas(countryStats['Confirmed']);
      const deaths = getNumberWithCommas(countryStats['Deaths']);

      tooltip = (`
      <b>${el.html()}</b></br>
      <b># Confirmed: ${confirmed}</b></br>
      <b># Deaths: ${deaths}</b></br>
      <b>Mortality Rate: ${mortalityRate}%</b></br>
    `);
    } else {
      tooltip = (`
      <b>${el.html()}</b></br>
      <b>No reported cases</b>
      `);
    }
    return el.html(tooltip);

  };

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

      return (
        <div className="worldMap">
          <ul className="globalStatsList">
            <li variant="dark">Reported Cases: {totalConfirmed}</li>
            <li variant="dark">Reported Deaths: {totalDeaths}</li>
            <li variant="dark">Mortality Rate: {mortalityRate}%</li>
          </ul>
          <VectorMap
            map={"world_mill"}
            onRegionTipShow={onRegionTipShow}
            backgroundColor="transparent"
            zoomOnScroll={false}
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
                  normalizeFunction: "polynomial"
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
