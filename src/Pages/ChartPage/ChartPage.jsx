import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getMonthAndDay, formateDate } from '../../utils';
import { parseChartSettingsFromParams, getCountries, getUSStates } from './chartPage.utils';
import RegionSelect, { USPrefix } from '../../Components/RegionSelect/RegionSelect';
import RegionChart from '../../Components/RegionChart/RegionChart';

import './ChartPage.css';

const ChartPage = ({ virusData, match, history }) => {
  const [selectedCountry, setCountry] = React.useState('');
  const [selectedUSState, setUSState] = React.useState('');
  const [countryHasNoCases, setCountryHasNoCases] = React.useState('');
  const countries = getCountries(virusData);
  const USStates = getUSStates(virusData);

  React.useEffect(() => {
    let {
      chartTypeFromParams,
      countryNameFromParams,
      USStateNameFromParams
    } = parseChartSettingsFromParams(match.params, countries, USStates);

    setCountry(countryNameFromParams || '');
    setUSState(USStateNameFromParams || '');
  }, [match.params]);

  const setSelectedCountry = (countryName) => {
    setCountry(countryName);
    history.push(`/chart/Country/${countryName}`);
  };

  const setSelectedUSState = (USStateName) => {
    setUSState(USStateName);
    history.push(`/chart/USState/${USStateName}`);
  };

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
      .filter(c => c['CountryName'] === countryName && !c['RegionCode'] && !c['RegionName']);

    const indexOfFirstConfirmed = getIndexOfFirstConfirmed(countryData, countryName);
    countryData = countryData.slice(indexOfFirstConfirmed);

    const chartData = countryData.map(d => ({
      confirmed: d['Confirmed'],
      deaths: d['Deaths'],
      date: formateDate(getMonthAndDay(d['Date'])),
      population: d['Population']
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
      date: formateDate(getMonthAndDay(d['Date'])),
      population: d['Population']
    }));
    return chartData;
  };

  const getRegions = () => {
    let regions = countries.sort();
    const sortedUSStates = USStates.sort().map(state => USPrefix + state);
    return regions.concat(sortedUSStates);
  };

  // Invalid route params
  // if (!!match.params.chartType || !!match.params.regionName &&
  //   (!(!!countryNameFromParams) && !(!!USStateNameFromParams))) {
  //   history.push('/chart');
  // } /// 

  if (countryHasNoCases) {
    return <h2>{countryHasNoCases} has no reported cases at this time</h2>;
  };



  if (selectedCountry) {
    return (
      <RegionChart
        chartData={getCountryChartData(selectedCountry)}
        regionName={selectedCountry}
        regions={getRegions()}
        setSelectedCountry={setSelectedCountry}
        setSelectedUSState={setSelectedUSState}
      />
    );
  } else if (selectedUSState) {
    return (
      <RegionChart
        chartData={getUSStateChartData(selectedUSState)}
        regionName={selectedUSState}
        regions={getRegions()}
        setSelectedCountry={setSelectedCountry}
        setSelectedUSState={setSelectedUSState}
      />
    );
  }

  let selectDropdown;

  return (
    <RegionSelect
      regions={getRegions()}
      setSelectedCountry={setSelectedCountry}
      setSelectedUSState={setSelectedUSState}
    />
  );
};

export default ChartPage;
