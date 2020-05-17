import React from 'react';
import RegionSelect, { USPrefix } from '../../Components/RegionSelect/RegionSelect';
import { getCountryNames, getUSStateNames } from './trendsPage.utils';

import './TrendsPage.css';

const TrendsPage = ({ virusData, setIsDataFetchError, history }) => {
  const [trendsData, setTrendsData] = React.useState([]);
  const [selectedCountry, setCountry] = React.useState('');
  const [selectedUSState, setUSState] = React.useState('');
  const [regions, setRegions] = React.useState([]);

  React.useEffect(() => {
    fetchMobilityData();
  }, [virusData]);

  const fetchMobilityData = async () => {
    const trendsDataUrl = 'https://open-covid-19.github.io/data/mobility.json';
    try {
      let data = await fetch(trendsDataUrl);
      data = await data.json();
      setTrendsData(data);
      const regionsFromData = getRegions(data);
      setRegions(regionsFromData);
    } catch (error) {
      setIsDataFetchError(true);
    }
  };

  const setSelectedCountry = (countryName) => {
    setCountry(countryName);
    history.push(`/trends/Country/${countryName}`);
  };

  const setSelectedUSState = (USStateName) => {
    setUSState(USStateName);
    history.push(`/trends/USState/${USStateName}`);
  };

  const getRegions = (dataForRegions) => {
    const countries = getCountryNames(dataForRegions);
    const USStates = getUSStateNames(dataForRegions);
    let regions = countries.sort();
    const sortedUSStates = USStates.sort().map(state => USPrefix + state);
    regions = regions.concat(sortedUSStates);
    return regions;
  };

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