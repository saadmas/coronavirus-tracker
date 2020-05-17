import { getCode, getName } from 'country-list';

const USStateNameCodeMap = [
  ['Arizona', 'AZ'],
  ['Alabama', 'AL'],
  ['Alaska', 'AK'],
  ['Arkansas', 'AR'],
  ['California', 'CA'],
  ['Colorado', 'CO'],
  ['Connecticut', 'CT'],
  ['Delaware', 'DE'],
  ['Florida', 'FL'],
  ['Georgia', 'GA'],
  ['Hawaii', 'HI'],
  ['Idaho', 'ID'],
  ['Illinois', 'IL'],
  ['Indiana', 'IN'],
  ['Iowa', 'IA'],
  ['Kansas', 'KS'],
  ['Kentucky', 'KY'],
  ['Louisiana', 'LA'],
  ['Maine', 'ME'],
  ['Maryland', 'MD'],
  ['Massachusetts', 'MA'],
  ['Michigan', 'MI'],
  ['Minnesota', 'MN'],
  ['Mississippi', 'MS'],
  ['Missouri', 'MO'],
  ['Montana', 'MT'],
  ['Nebraska', 'NE'],
  ['Nevada', 'NV'],
  ['New Hampshire', 'NH'],
  ['New Jersey', 'NJ'],
  ['New Mexico', 'NM'],
  ['New York', 'NY'],
  ['North Carolina', 'NC'],
  ['North Dakota', 'ND'],
  ['Ohio', 'OH'],
  ['Oklahoma', 'OK'],
  ['Oregon', 'OR'],
  ['Pennsylvania', 'PA'],
  ['Rhode Island', 'RI'],
  ['South Carolina', 'SC'],
  ['South Dakota', 'SD'],
  ['Tennessee', 'TN'],
  ['Texas', 'TX'],
  ['Utah', 'UT'],
  ['Vermont', 'VT'],
  ['Virginia', 'VA'],
  ['Washington', 'WA'],
  ['West Virginia', 'WV'],
  ['Wisconsin', 'WI'],
  ['Wyoming', 'WY'],
];

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