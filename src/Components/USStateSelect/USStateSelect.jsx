import React from 'react';
import { getLatestData } from '../../utils';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './USStateSelect.css';

const USStateSelect = ({ virusData, setSelectedUSState }) => {

  const getStates = () => {
    const latestData = getLatestData(virusData);
    const states = latestData
      .filter(x => x['CountryName'] === 'United States of America' && x['RegionCode'] && x['RegionName'])
      .map(d => d['RegionName']);
    return states;
  };

  const getMenuItems = () => {
    const states = getStates();
    states.sort();
    const stateMenuItems = states.map(s => (
      <MenuItem value={s} key={`menu_item_${s}`}>{s}</MenuItem>
    ));
    return stateMenuItems;
  };

  const handleChange = (e) => {
    setSelectedUSState(e.target.value);
  };

  const render = () => {
    if (virusData === undefined || virusData.length === 0) {
      return null;
    }

    const menuItems = getMenuItems();

    return (
      <div className="regionSelect selectContainer">
        <h3>Which U.S. State?</h3>
        <Select
          className="regionDropdown USStateDropdown"
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
          {menuItems}
        </Select>
      </div>
    );
  };

  return render();
};

export default USStateSelect;
