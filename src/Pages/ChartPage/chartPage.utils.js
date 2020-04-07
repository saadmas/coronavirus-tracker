import { getLatestData, getLatestDataForUnitedStates } from '../../utils';

export const parseChartSettingsFromParams = (params, countries, USStates) => {
  let chartTypeFromParams, countryNameFromParams, USStateNameFromParams;

  if (params.chartType === 'Country') {
    chartTypeFromParams = params.chartType;
    if (countries.indexOf(params.regionName) !== -1) {
      countryNameFromParams = params.regionName;
    }
  }

  if (params.chartType === 'USState') {
    chartTypeFromParams = params.chartType;
    if (USStates.indexOf(params.regionName) !== -1) {
      USStateNameFromParams = params.regionName;
    }
  }

  return {
    chartTypeFromParams,
    countryNameFromParams,
    USStateNameFromParams
  };
};

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