import React from 'react';
import { getDateString } from '../../utils';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './CountrySelect.css';

const CountrySelect = ({ virusData }) => {
  const [countries, setCountries] = React.useState([]);

  const getCountries = () => {
    const todayDate = getDateString('today');
    const todayData = virusData.filter(x => x['Date'] === todayDate);
    const countries = todayData.map(d => d['CountryName']);
    return countries;
  };

  const getMenuItems = () => {
    const countries = getCountries();
    const countryMenuItems = countries.map(c => (
      <MenuItem value={c}>{c}</MenuItem>
    ));
    return countryMenuItems;
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
          MenuProps={{
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: "bottom",
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
