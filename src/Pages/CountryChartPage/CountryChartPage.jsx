import React from 'react';
import { getMonthAndDay } from '../../utils';
import CountrySelect from '../../Components/CountrySelect/CountrySelect';
import CountryChart from '../../Components/CountryChart/CountryChart';

const CountryChartPage = ({ virusData }) => {
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [countryHasNoCases, setCountryHasNoCases] = React.useState('');

  const getIndexOfFirstConfirmed = (data, countryName) => {
    let i = 0;
    let confirmed = data[i]['Confirmed'];
    while (confirmed < 1 && i < data.length) {
      i++;
      confirmed = data[i]['Confirmed'];
    }
    if (confirmed < 1) {
      setCountryHasNoCases(countryName);
    } else {
      return i;
    }
  };

  const getChartData = (countryName) => {
    let countryData = virusData.filter(c => c['CountryName'] === countryName);

    const indexOfFirstConfirmed = getIndexOfFirstConfirmed(countryData, countryName);
    countryData = countryData.slice(indexOfFirstConfirmed);

    const chartData = countryData.map(d => ({
      confirmed: d['Confirmed'],
      deaths: d['Deaths'],
      date: getMonthAndDay(d['Date'])
    }));
    return chartData;
  };

  const render = () => {
    if (countryHasNoCases) {
      return (
        <h2>{countryHasNoCases} has no reported cases at this time</h2>
      );
    };

    if (selectedCountry) {
      const chartData = getChartData(selectedCountry);
      return (
        <CountryChart chartData={chartData} countryName={selectedCountry} />
      );
    };

    return (
      <div>
        <CountrySelect virusData={virusData} setSelectedCountry={setSelectedCountry} />
      </div>
    );
  };

  return render();
};

export default CountryChartPage;
