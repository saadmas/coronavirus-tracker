import React from 'react';
import StatsTable from '../../Components/StatsTable/StatsTable';
import { getLatestData, getLatestDataForUnitedStates } from '../../utils';


const StatsPage = ({ virusData }) => {
  ///
  const [isCountryOrUSState, setIsCountryOrUSState] = React.useState('Country');

  /// put into state
  const getCountryOnlyData = () => {
    const latestData = getLatestData(virusData);
    const countryOnlyData = latestData.filter(x => !x['RegionCode'] && !x['RegionName']);
    return countryOnlyData;
  };

  return (
    <StatsTable
      isCountryOrUSState={isCountryOrUSState}
      setIsCountryOrUSState={setIsCountryOrUSState}
      tableData={getCountryOnlyData()}
      isCountryOrUSState="Country"
    />
  );
};

export default StatsPage;