import React from 'react';
import WorldMap from '../../Components/WorldMap/WorldMap';

const WorldMapPage = ({ virusData }) => {
  return (
    <div>
      <WorldMap virusData={virusData} />
    </div>
  );
};

export default WorldMapPage;
