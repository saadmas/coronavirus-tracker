import React from 'react';
import CountrySelect from '../../Components/CountrySelect/CountrySelect';

const CountryChartPage = ({ virusData }) => {
  return (
    <div>
      <CountrySelect virusData={virusData} />
    </div>
  );
};

export default CountryChartPage;
