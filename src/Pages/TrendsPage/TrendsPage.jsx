import React from 'react';
import { getCode } from 'country-list';
import RegionSelect, { USPrefix } from '../../Components/RegionSelect/RegionSelect';
import TrendsChart from '../../Components/TrendsChart/TrendsChart';
import { getCountryNames, getUSStateNames, getUSStateCode } from './trendsPage.utils';
import { parseChartSettingsFromParams } from '../../utils';

import './TrendsPage.css';

const TrendsPage = ({ trendsData, match, history }) => {
  const [selectedCountry, setCountry] = React.useState('');
  const [selectedUSState, setUSState] = React.useState('');
  const [regions, setRegions] = React.useState([]);
  const [countries, setCountries] = React.useState([]);
  const [USStates, setUSStates] = React.useState([]);

  React.useEffect(() => {
    if (trendsData.length) {
      const countriesFromData = getCountryNames(trendsData);
      const USStatesFromData = getUSStateNames(trendsData);
      let regionsFromData = countriesFromData.sort();
      const sortedUSStates = USStatesFromData.sort().map(state => USPrefix + state);
      regionsFromData = regionsFromData.concat(sortedUSStates);
      setRegions(regionsFromData);
      setCountries(countriesFromData);
      setUSStates(USStatesFromData);
    }
  }, [trendsData]);

  React.useEffect(() => {
    let {
      countryNameFromParams,
      USStateNameFromParams
    } = parseChartSettingsFromParams(match.params, countries, USStates);
    console.log(countryNameFromParams) ///
    setCountry(countryNameFromParams || '');
    setUSState(USStateNameFromParams || '');
  }, [match.params, regions]);

  const setSelectedCountry = (countryName) => {
    setCountry(countryName);
    history.push(`/trends/Country/${countryName}`);
  };

  const setSelectedUSState = (USStateName) => {
    setUSState(USStateName);
    history.push(`/trends/USState/${USStateName}`);
  };

  const getCountryData = () => {
    const countryCode = getCode(selectedCountry);
    const countryData = trendsData.filter(t => t.Key === countryCode);
    return countryData;
  };

  const getUSStateData = () => {
    const USStateCode = getUSStateCode(selectedUSState);
    const USStateData = trendsData.filter(t => t.Key === `US_${USStateCode}`);
    return USStateData;
  };

  if (selectedCountry) {
    return (
      <TrendsChart
        chartData={getCountryData()}
        setSelectedCountry={setSelectedCountry}
        setSelectedUSState={setSelectedUSState}
        regionName={selectedCountry}
        regions={regions}
      />
    );
  }

  if (selectedUSState) {
    return (
      <TrendsChart
        chartData={getUSStateData()}
        setSelectedCountry={setSelectedCountry}
        setSelectedUSState={setSelectedUSState}
        regionName={selectedUSState}
        regions={regions}
      />
    );
  }

  return (
    <div>
      <div>
        <RegionSelect
          regions={regions}
          setSelectedCountry={setSelectedCountry}
          setSelectedUSState={setSelectedUSState}
        />
      </div>
      <div className="trendsInfo">
        <p>
          Community Mobility Reports by <b>Google</b> aim to provide insights into
          what has changed in response to policies aimed at combating COVID-19.
          The reports chart movement trends over time by geography, across different categories of places such as:
        </p>
        <h3>Grocery &amp; pharmacy</h3>
        <ul className="trendsInfoList">
          <li>Grocery markets</li>
          <li>Food warehouses</li>
          <li>Farmers markets</li>
          <li>Specialty food shops</li>
          <li>Drug stores</li>
          <li>Pharmacies</li>
        </ul>
        <h3>Parks</h3>
        <ul>
          <li>Local parks</li>
          <li>National parks</li>
          <li>Public beaches</li>
          <li>Marinas</li>
          <li>Dog parks</li>
          <li>Plazas</li>
          <li>Public gardens</li>
        </ul>
        <h3>Transit stations</h3>
        <ul>
          <li>Subway stations</li>
          <li>Bus stations</li>
          <li>Train stations</li>
        </ul>
        <h3>Retail &amp; recreation</h3>
        <ul>
          <li>Restaurants</li>
          <li>Cafes</li>
          <li>Shopping centers</li>
          <li>Theme parks</li>
          <li>Museums</li>
          <li>Libaries</li>
          <li>Movie theaters</li>
        </ul>
        <h3>Residential</h3><br />
        <h3>Workplaces</h3><br />
      </div>
    </div>
  );
}

export default TrendsPage;