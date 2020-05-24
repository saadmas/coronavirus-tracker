import { getName } from 'country-list';
import { USStateNameCodeMap } from '../../utils';

export function getCountryNames(trendsData) {
  const countryCodes = trendsData.map(t => t.Key).filter(countryCode => !countryCode.includes('_'));
  const uniqueCountryCodes = [...new Set(countryCodes)];
  const countryNames = uniqueCountryCodes.map(countryCode => getName(countryCode));
  return countryNames;
}

export function getUSStateNames(trendsData) {
  const stateCodes = trendsData.map(t => t.Key).filter(countryCode => {
    const splitCode = countryCode.split('_');
    const isUSState = splitCode[0] === 'US' && splitCode[1];
    const isDC = splitCode[1] === 'DC';
    return isUSState && !isDC;
  });
  const uniqueStateCodes = [...new Set(stateCodes)];
  const stateCodesWithoutUSPrefix = uniqueStateCodes.map(stateCode => stateCode.split('_')[1]);

  const stateNames = stateCodesWithoutUSPrefix.map(stateCode => {
    const nameCodePair = USStateNameCodeMap.find(ncp => ncp[1] === stateCode);
    return nameCodePair && nameCodePair[0];
  });
  return stateNames;
}

export function getUSStateCode(stateName) {
  const nameCodePair = USStateNameCodeMap.find(ncp => ncp[0] === stateName);
  return nameCodePair[1];
}