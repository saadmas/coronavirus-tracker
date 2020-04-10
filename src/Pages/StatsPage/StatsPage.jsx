import React from 'react';
import StatsTable from '../../Components/StatsTable/StatsTable';
import { getLatestData, getLatestDataForUnitedStates } from '../../utils';


const StatsPage = ({ virusData }) => {
  const [isCountryOrUSState, setIsCountryOrUSState] = React.useState('Country');
  const [countryTableData, setCountryTableData] = React.useState([]);
  const [USStateTableData, setUSStateTableData] = React.useState([]);

  React.useEffect(() => {
    getCountryOnlyData();
    getUSOnlyData();
  }, [virusData]);

  const getCountryOnlyData = () => {
    const latestData = getLatestData(virusData);
    const countryOnlyData = latestData.filter(x => !x['RegionCode'] && !x['RegionName']);
    setCountryTableData(countryOnlyData);
  };

  const getUSOnlyData = () => {
    let USData = getLatestDataForUnitedStates(virusData);

    USData = USData.map(s => ({
      ...s,
      Deaths: s['Deaths'] || 0
    }));

    setUSStateTableData(USData);
  };

  const getTableData = () => {
    if (isCountryOrUSState === 'Country') {
      return countryTableData;
    }
    return USStateTableData;
  };

  return (
    <StatsTable
      isCountryOrUSState={isCountryOrUSState}
      setIsCountryOrUSState={setIsCountryOrUSState}
      tableData={getTableData()}
    />
  );
};

export default StatsPage;