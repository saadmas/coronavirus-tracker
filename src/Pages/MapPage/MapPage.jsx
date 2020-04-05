import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import WorldMap from '../../Components/WorldMap/WorldMap';
import USMap from '../../Components/USMap/USMap';
import StatsTable from '../../Components/StatsTable/StatsTable';
import { getLatestData } from '../../utils';

import './MapPage.css';

const MapPage = ({ virusData }) => {
  const [mapType, setMapType] = React.useState('World');

  const getMap = () => {
    if (mapType === 'World') {
      const latestData = getLatestData(virusData);
      const countryOnlyData = latestData.filter(x => !(x['RegionCode'] || x['RegionName']));
      return (
        <>
          <WorldMap worldData={countryOnlyData} />
          <hr className="mapTableDivider" />
          <StatsTable
            tableData={countryOnlyData}
            isCountryOrUSState="Country"
          />
        </>
      );
    } else if (mapType === 'US') {
      return (
        <USMap virusData={virusData} />
      );
    }
  };

  const handleChange = (e) => {
    setMapType(e.target.value);
  };

  return (
    <div>
      <div className="animated bounce">
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
          <MenuItem value={'US'} key={`menu_item_us`}>U.S. Map</MenuItem>
        </Select>
      </div>
      {
        getMap()
      }
    </div>
  );
};

export default MapPage;
