import React from 'react';
import { getMonthAndDay } from '../../utils';
import CountrySelect from '../../Components/CountrySelect/CountrySelect';
import CountryChart from '../../Components/CountryChart/CountryChart';

const CountryChartPage = ({ virusData }) => {
  const [selectedCountry, setSelectedCountry] = React.useState('');

  const getIndexOfFirstConfirmed = (data) => {
    let i = 0;
    let confirmed = data[i]['Confirmed'];
    while (confirmed < 1 && i < data.length) {
      i++;
      confirmed = data[i]['Confirmed'];
    }
    return i;
    /// handle no reported cases
  };

  const getChartData = (countryName) => {
    let countryData = virusData.filter(c => c['CountryName'] === countryName);

    const indexOfFirstConfirmed = getIndexOfFirstConfirmed(countryData);
    countryData = countryData.slice(indexOfFirstConfirmed);

    const chartData = countryData.map(d => ({
      confirmed: d['Confirmed'],
      deaths: d['Deaths'],
      date: getMonthAndDay(d['Date'])
    }));
    return chartData;
  };

  const render = () => {
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
