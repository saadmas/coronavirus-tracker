import React from 'react';
import { getLatestData } from '../../utils';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './CountrySelect.css';

const CountrySelect = ({ virusData, setSelectedCountry }) => {

  const getCountries = () => {
    const latestData = getLatestData(virusData);
    const countries = latestData.map(d => d['CountryName']);
    return countries;
  };

  const getMenuItems = () => {
    const countries = getCountries();
    const countryMenuItems = countries.map(c => (
      <MenuItem value={c} key={`menu_item_${c}`}>{c}</MenuItem>
    ));
    return countryMenuItems;
  };

  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const render = () => {
    if (virusData === undefined || virusData.length === 0) {
      return null;
    }

    const menuItems = getMenuItems();

    return (
      <div className="countrySelect">
        <h3>Select Country</h3>
        <Select
          className="countryDropdown"
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

export default CountrySelect;
