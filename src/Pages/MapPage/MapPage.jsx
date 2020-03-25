import React from 'react';
import WorldMap from '../../Components/WorldMap/WorldMap';

const MapPage = ({ virusData }) => {
  return (
    <div>
      <WorldMap virusData={virusData} />
    </div>
  );
};

export default MapPage;
