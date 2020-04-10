import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import WorldMap from '../../Components/WorldMap/WorldMap';
import USMap from '../../Components/USMap/USMap';
import { getLatestData, getLatestDataForUnitedStates } from '../../utils';

import './MapPage.css';

const MapPage = ({ virusData }) => {
  const [mapType, setMapType] = React.useState('World');

  const getWorldMap = () => {
    const latestData = getLatestData(virusData);
    const countryOnlyData = latestData.filter(x => !x['RegionCode'] && !x['RegionName']);
    return <WorldMap worldData={countryOnlyData} />
  };

  const getUSMap = () => {
    let USData = getLatestDataForUnitedStates(virusData);

    USData = USData.map(s => ({
      ...s,
      Deaths: s['Deaths'] || 0
    }));

    const latestECDCData = getLatestData(virusData);
    const USDataFromECDC = latestECDCData.find(x => !(x['RegionCode'] || x['RegionName']) && x['CountryCode'] === 'US');
    const summaryData = {
      deaths: USDataFromECDC['Deaths'],
      confirmed: USDataFromECDC['Confirmed'],
    }

    return (
      <>
        <USMap statesData={USData} summaryData={summaryData} />
        {/* /// <hr className="mapTableDivider" />
        <StatsTable
          tableData={USData}
          isCountryOrUSState="USState"
        /> */}
      </>
    );
  };

  const getMap = () => {
    let map;

    if (mapType === 'World') {
      map = getWorldMap();
    } else if (mapType === 'US') {
      map = getUSMap();
    }

    return map;
  };

  const onMapTypeChange = (e) => {
    setMapType(e.target.value);
  };

  return (
    <div>
      <div className="animated bounce">
        <Select
          className="mapTypeDropdown"
          defaultValue="World"
          auto={true}
          onChange={onMapTypeChange}
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
