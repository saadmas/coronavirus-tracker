import React from 'react';
import { VectorMap } from 'react-jvectormap';
import { getDateString } from '../utils';

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
      tooltip = (`
      <b>${el.html()}</b></br>
      <b># Confirmed: ${countryStats['Confirmed']}</b></br>
      <b># Deaths: ${countryStats['Deaths']}</b></br>
    `);
    } else {
      tooltip = (`
      <b>${el.html()}</b></br>
      <b>No reported cases</b>
      `);
    }
    return el.html(tooltip);

  };

  return (
    <div>
      {/* /// {worldData.length > 0 && (
        <h3>Worlwide Cases: getTotalConfirmed()</h3>
        <h3>Worlwide Deaths: getTotalDeaths()</h3>
      )} */}
      <VectorMap
        map={"world_mill"}
        onRegionTipShow={onRegionTipShow}
        backgroundColor="transparent"
        zoomOnScroll={false}
        containerStyle={{
          width: "100%",
          height: "500px"
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
};

export default WorldMap;
