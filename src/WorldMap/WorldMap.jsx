import React from 'react';
import { VectorMap } from 'react-jvectormap';
import { ListGroup } from 'react-bootstrap';
import { getDateString } from '../utils';

import './WorldMap.css';

const WorldMap = ({ virusData }) => {
  const [worldData, setWorldData] = React.useState([]);

  React.useEffect(() => {
    getWorldDataForToday();
  }, [virusData]);

  const getWorldDataForToday = () => {
    const todayDate = getDateString('today');
    const todayData = virusData.filter(x => x['Date'] === todayDate);
    // No data for current day et ///
    if (todayData.length === 0) {
      const yesterdayDate = getDateString('yesterday');
      const yesterdayData = virusData.filter(x => x['Date'] === yesterdayDate);
      console.log(yesterdayDate);
      setWorldData(yesterdayData);
    } else {
      setWorldData(todayData);
    }
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
      console.log(regionsHeat);
      return regionsHeat;
    };
  }

  const getCountryStats = (countryCode) => {
    console.log(countryCode);
    console.log(worldData);
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
      mortalityRate = mortalityRate.toFixed(0);
      tooltip = (`
      <b>${el.html()}</b></br>
      <b># Confirmed: ${countryStats['Confirmed']}</b></br>
      <b># Deaths: ${countryStats['Deaths']}</b></br>
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
      const totalConfirmed = getTotalConfirmed();
      const totalDeaths = getTotalDeaths();
      let mortalityRate = (totalDeaths / totalConfirmed) * 100;
      mortalityRate = mortalityRate.toFixed(0);
      return (
        <div className="worldMap">
          <ListGroup className="globalStats">
            <ListGroup.Item variant="dark">Reported Cases: {totalConfirmed}</ListGroup.Item>
            <ListGroup.Item variant="dark">Reported Deaths: {totalDeaths}</ListGroup.Item>
            <ListGroup.Item variant="dark">Mortality Rate: {mortalityRate}%</ListGroup.Item>
          </ListGroup>
          <VectorMap
            map={"world_mill"}
            onRegionTipShow={onRegionTipShow}
            backgroundColor="transparent"
            zoomOnScroll={false}
            containerStyle={{
              width: "100%",
              height: "450px"
            }}
            /// onRegionClick={handleClick} 
            containerClassName="map"
            regionStyle={{
              hover: {
                "fill-opacity": 0.8,
                cursor: "pointer" ///
              },
              selectedHover: {}
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
