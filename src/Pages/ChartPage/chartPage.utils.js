import { getLatestData, getLatestDataForUnitedStates } from '../../utils';

export const getCountries = (virusData) => {
  const latestData = getLatestData(virusData);
  const countries = latestData
    .filter(c => !c['RegionCode'] && !c['RegionName'])
    .map(c => c['CountryName']);
  return countries;
};

export const getUSStates = (virusData) => {
  const latestData = getLatestDataForUnitedStates(virusData);
  const states = latestData.map(d => d['RegionName']);
  return states;
};