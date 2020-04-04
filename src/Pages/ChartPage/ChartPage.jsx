import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getMonthAndDay, formateDate } from '../../utils';
import { parseChartSettingsFromParams, getCountries, getUSStates } from './chartPage.utils';
import CountrySelect from '../../Components/CountrySelect/CountrySelect';
import USStateSelect from '../../Components/USStateSelect/USStateSelect';
import CountryChart from '../../Components/CountryChart/CountryChart';
import USStateChart from '../../Components/USStateChart/USStateChart';

import './ChartPage.css';

const ChartPage = ({ virusData, match, history }) => {
  const countries = getCountries(virusData);
  const USStates = getUSStates(virusData);

  let {
    chartTypeFromParams,
    countryNameFromParams,
    USStateNameFromParams
  } = parseChartSettingsFromParams(match.params, countries, USStates);

  const [countryOrUSState, setCountryOrUSState] = React.useState(chartTypeFromParams || 'Country');
  const [selectedCountry, setSelectedCountry] = React.useState(countryNameFromParams || '');
  const [countryHasNoCases, setCountryHasNoCases] = React.useState('');
  const [selectedUSState, setSelectedUSState] = React.useState(USStateNameFromParams || '');

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
      deaths: d['Deaths'] || 0,
      date: formateDate(getMonthAndDay(d['Date']))
    }));
    return chartData;
  };

  const handleChartTypeChange = (e) => {
    setCountryOrUSState(e.target.value);
  };

  const render = () => {
    // Invalid route params
    if (!!match.params.chartType || !!match.params.regionName &&
      (!(!!countryNameFromParams) && !(!!USStateNameFromParams))) {
      history.push('/country-charts');
    }

    if (countryHasNoCases) {
      return (
        <h2>{countryHasNoCases} has no reported cases at this time</h2>
      );
    };



    if (selectedCountry) {
      return (
        <CountryChart
          chartData={getCountryChartData(selectedCountry)}
          countryName={selectedCountry}
          countries={countries}
          setSelectedCountry={setSelectedCountry}
        />
      );
    } else if (selectedUSState) {
      return (
        <USStateChart
          chartData={getUSStateChartData(selectedUSState)}
          stateName={selectedUSState}
          states={USStates}
          setSelectedUSState={setSelectedUSState}
        />
      );
    }

    let selectDropdown;

    if (countryOrUSState === 'Country') {
      selectDropdown = (
        <div className="animated bounce">
          <CountrySelect countries={countries} setSelectedCountry={setSelectedCountry} />
        </div>
      );
    } else if (countryOrUSState === 'USState') {
      selectDropdown = (
        <div className="animated shake">
          <USStateSelect states={USStates} setSelectedUSState={setSelectedUSState} />
        </div>
      );
    }

    return (
      <div>
        <div className="selectContainer chartTypeContainer">
          <h3>
            Country or U.S. state?
        </h3>
          <Select
            className="chartTypeDropdown"
            defaultValue="Country"
            auto={true}
            onChange={handleChartTypeChange}
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
