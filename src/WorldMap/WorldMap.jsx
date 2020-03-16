import React from 'react';
import { VectorMap } from 'react-jvectormap';
import { getDateStringOfToday } from '../utils';

const WorldMap = ({ virusData }) => {
  const [worldData, setWorldData] = React.useState([]);

  React.useEffect(() => {
    getWorldDataForToday();
  }, [virusData]);

  const getWorldDataForToday = () => {
    const todayDate = getDateStringOfToday();
    const todayData = virusData.filter(x => x['Date'] === todayDate);
    /// if virusData.length === 0 --> NO DATA FOR TODAY YET
    setWorldData(todayData);
  };

  const getRegionsHeat = () => {
    if (worldData.length > 0) {
      const totalConfirmed = worldData.reduce((a, b) => a + Number(b['Confirmed']), 0);
      const regionsHeat = {};
      for (const country of worldData) {
        const countryConfirmedRatio = country['Confirmed'] / totalConfirmed;
        regionsHeat[country['CountryCode']] = countryConfirmedRatio;
      }
      console.log(regionsHeat);
      return regionsHeat;
    };
  }

  getRegionsHeat();

  return (
    <div>
      <VectorMap
        map={"world_mill"}
        backgroundColor="transparent"
        zoomOnScroll={false}
        containerStyle={{
          width: "100%",
          height: "520px"
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
