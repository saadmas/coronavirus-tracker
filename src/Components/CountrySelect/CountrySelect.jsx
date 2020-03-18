import React from 'react';
import { getDateString } from '../../utils';
import { GiWorld } from 'react-icons/gi';

const CountrySelect = ({ virusData }) => {
  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    const listOfCountries = getCountries(virusData);
    setCountries(listOfCountries);
  }, [virusData]);

  const getCountries = (data) => {
    const todayDate = getDateString('today');
    const todayData = data.filter(x => x['Date'] === todayDate);
    const countries = todayData.map(d => d['CountryName']);
  };

  const render = () => {
    if (virusData === undefined || virusData.length === 0) {
      return null;
    }

    return (
      <div className="CountrySelect">
        <h3>Select country: </h3>
      </div>
    );
  };

  return render();
};

export default CountrySelect;
