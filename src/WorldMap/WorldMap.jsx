import React from 'react';
import { getDateStringOfToday } from '../utils';

const WorldMap = ({ virusData }) => {

  const getWorldDataForToday = () => {
    const todayDate = getDateStringOfToday();
    virusData = virusData.filter(x => x['Date'] === todayDate);
    console.log(virusData);
  };

  return (
    <div>
      foo
    </div>
  );
};

export default WorldMap;
