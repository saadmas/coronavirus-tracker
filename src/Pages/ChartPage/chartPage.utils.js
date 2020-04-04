import { getLatestData, getLatestDataForUnitedStates } from '../../utils';

export const parseChartSettingsFromQueryString = (qs, countries, USStates) => {
  let chartTypeFromQueryString, countryNameFromQueryString, USStateNameFromQueryString;

  if (qs.chartType === 'Country') {
    chartTypeFromQueryString = qs.chartType;
    if (countries.indexOf(qs.countryName) !== -1) {
      countryNameFromQueryString = qs.countryName;
    }
  }

  if (qs.chartType === 'USState') {
    chartTypeFromQueryString = qs.chartType;
    if (USStates.indexOf(qs.USStateName) !== -1) {
      USStateNameFromQueryString = qs.USStateName;
    }
  }

  return {
    chartTypeFromQueryString,
    countryNameFromQueryString,
    USStateNameFromQueryString
  };
};

export const getCountries = (virusData) => {
  const latestData = getLatestData(virusData);
  const countries = latestData
    .filter(c => !(c['RegionCode'] || c['RegionName']))
    .map(c => c['CountryName']);
  return countries;
};

export const getUSStates = (virusData) => {
  const latestData = getLatestDataForUnitedStates(virusData);
  const states = latestData.map(d => d['RegionName']);
  return states;
};