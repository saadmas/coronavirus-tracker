import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import WorldMap from '../../Components/WorldMap/WorldMap';
import UnitedStatesMap from '../../Components/UnitedStatesMap/UnitedStatesMap';

import './MapPage.css';

const MapPage = ({ virusData }) => {
  const [mapType, setMapType] = React.useState('US');

  const getMap = () => {
    if (mapType === 'World') {
      return (
        <WorldMap virusData={virusData} />
      );
    } else if (mapType === 'US') {
      return (
        <UnitedStatesMap virusData={virusData} />
      );
    }
  };

  const handleChange = (e) => {
    setMapType(e.target.value);
  };

  return (
    <div>
      <Select
        className="mapTypeDropdown"
        defaultValue="World"
        auto={true}
        onChange={handleChange}
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left"
          }
        }}
      >
        <MenuItem value={'World'} key={`menu_item_world`}>World Map</MenuItem>
        <MenuItem value={'US'} key={`menu_item_us`}>USA Map</MenuItem>
      </Select>
      {getMap()}
    </div>
  );
};

export default MapPage;
