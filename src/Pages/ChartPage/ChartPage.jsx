import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getMonthAndDay, formateDate } from '../../utils';
import CountrySelect from '../../Components/CountrySelect/CountrySelect';
import USStateSelect from '../../Components/USStateSelect/USStateSelect';
import CountryChart from '../../Components/CountryChart/CountryChart';
import USStateChart from '../../Components/USStateChart/USStateChart';

import './ChartPage.css';

const ChartPage = ({ virusData }) => {
  const [countryOrUSState, setCountryOrUSState] = React.useState('Country');
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [countryHasNoCases, setCountryHasNoCases] = React.useState('');
  const [selectedUSState, setSelectedUSState] = React.useState('');

  const getIndexOfFirstConfirmed = (data, name) => {
    let i = 0;
    let confirmed = data[i]['Confirmed'];
    while (confirmed < 1 && i < data.length) {
      i++;
      confirmed = data[i]['Confirmed'];
    }
    if (confirmed < 1) {
      setCountryHasNoCases(name);
    } else {
      return i;
    }
  };

  const getCountryChartData = (countryName) => {
    let countryData = virusData
      .filter(c => (c['CountryName'] === countryName) && !(c['RegionCode'] || c['RegionName']));

    const indexOfFirstConfirmed = getIndexOfFirstConfirmed(countryData, countryName);
    countryData = countryData.slice(indexOfFirstConfirmed);

    const chartData = countryData.map(d => ({
      confirmed: d['Confirmed'],
      deaths: d['Deaths'],
      date: formateDate(getMonthAndDay(d['Date']))
    }));
    return chartData;
  };

  const getUSStateChartData = (stateName) => {
    let stateData = virusData.filter(c => (c['RegionName'] === stateName));

    const indexOfFirstConfirmed = getIndexOfFirstConfirmed(stateData, stateName);
    stateData = stateData.slice(indexOfFirstConfirmed);

    const chartData = stateData.map(d => ({
      confirmed: d['Confirmed'],
      deaths: d['Deaths'],
      date: formateDate(getMonthAndDay(d['Date']))
    }));
    return chartData;
  };

  const handleChange = (e) => {
    setCountryOrUSState(e.target.value);
  };

  const render = () => {
    if (countryHasNoCases) {
      return (
        <h2>{countryHasNoCases} has no reported cases at this time</h2>
      );
    };

    if (selectedCountry) {
      const chartData = getCountryChartData(selectedCountry);
      return (
        <CountryChart chartData={chartData} countryName={selectedCountry} />
      );
    } else if (selectedUSState) {
      const chartData = getUSStateChartData(selectedUSState);
      return (
        <USStateChart chartData={chartData} stateName={selectedUSState} />
      );
    }

    let selectDropdown;

    if (countryOrUSState === 'Country') {
      selectDropdown = (
        <CountrySelect virusData={virusData} setSelectedCountry={setSelectedCountry} />
      );
    } else if (countryOrUSState === 'USState') {
      selectDropdown = (
        <USStateSelect virusData={virusData} setSelectedUSState={setSelectedUSState} />
      );
    }

    return (
      <div>
        <div className="selectContainer chartTypeContainer">
          <h3>
            Country or U.S. State?
        </h3>
          <Select
            className="chartTypeDropdown"
            defaultValue="Country"
            auto={true}
            onChange={handleChange}
          >
            <MenuItem value={'Country'} key={`menu_item_country`}>Country</MenuItem>
            <MenuItem value={'USState'} key={`menu_item_us_state`}>U.S. State</MenuItem>
          </Select>
        </div>
        {selectDropdown}
      </div>
    );
  };

  return render();
};

export default ChartPage;
