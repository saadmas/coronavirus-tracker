export const USStateNameCodeMap = [
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

export function getDateString(daysBeforeToday = 0) {
  let d = new Date();

  if (daysBeforeToday !== 0) {
    d.setDate(d.getDate() - daysBeforeToday);
  }

  const year = d.getFullYear();

  let month = d.getMonth();
  month++;
  month += "";

  if (month.length === 1) {
    month = "0" + month;
  }

  let day = d.getDate() + "";

  if (day.length === 1) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
};

export function getMonthAndDay(dateStr) {
  const monthAndDay = dateStr.slice(5);
  return monthAndDay;
}

export function getLatestData(data) {
  let daysBeforeToday = 0;
  const todayDate = getDateString(daysBeforeToday);
  let latestData = data.filter(x => x['Date'] === todayDate);

  while (latestData.filter(x => !x['RegionCode'] && !x['RegionName']).length < 100) {
    daysBeforeToday++;
    const dayBeforeDate = getDateString(daysBeforeToday);
    latestData = data.filter(x => x['Date'] === dayBeforeDate);
  }

  return latestData;
};

export function getLatestDataForUnitedStates(data) {
  let daysBeforeToday = 0;
  const latestDate = getDateString(daysBeforeToday);
  let latestData = data
    .filter(x => x['Date'] === latestDate && x['CountryName'] === 'United States of America' && x['RegionCode'] && x['RegionName']);


  while (latestData.length !== 50) {
    daysBeforeToday++;
    const dayBeforeDate = getDateString(daysBeforeToday);
    latestData = data
      .filter(x => x['Date'] === dayBeforeDate && x['CountryName'] === 'United States of America'
        && x['RegionCode'] && x['RegionName'] && isUSState(x['RegionCode']));
  }

  return latestData;
};

function isUSState(regionCode) {
  return USStateNameCodeMap.find(state => state[1] === regionCode);
}

export function getNumberWithCommas(num) {
  if (!num) {
    return '0';
  }

  if (num.toString().length < 5) {
    return num.toString();

  }

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function getDecimalCount(num) {
  if (!num) {
    return 0;
  }

  if (Math.floor(num) === num) {
    return 0;
  }

  return num.toString().split(".")[1].length || 0;
}

export function formateDate(date) {
  return date.split("-").join("/");
}

export function getNumberOfZeroDecimals(num) {
  if (Math.floor(num) === num) {
    return 0;
  }
  const afterDp = num.toString().split(".")[1];
  let zeroCount = 0;
  for (const val of afterDp) {
    if (val === '0') {
      zeroCount++;
    } else {
      break;
    }
  }
  return zeroCount;
}

export function getPopulationInfected(confirmed, population) {
  let populationInfected = (confirmed / population) * 100;

  if (getDecimalCount(populationInfected) > 0) {
    const numZeroes = getNumberOfZeroDecimals(populationInfected);
    const fracDigits = numZeroes === 0 ? 2 : numZeroes + 1;
    populationInfected = populationInfected.toFixed(fracDigits);
  }

  if (populationInfected < 100) {
    return populationInfected;
  }

  return Infinity;
}

export function parseChartSettingsFromParams(params, countries, USStates) {
  let countryNameFromParams, USStateNameFromParams;

  if (params.chartType === 'Country' & countries.includes(params.regionName)) {
    countryNameFromParams = params.regionName;
  }

  if (params.chartType === 'USState' && USStates.includes(params.regionName)) {
    USStateNameFromParams = params.regionName;
  }

  return {
    countryNameFromParams,
    USStateNameFromParams
  };
}

// export function addNameToVirusData(virusData, locationData) {
//   let mergedData = virusData.map(vd => {
//     const location = locationData.find(location => location.key === vd.key);
//     const aggLevel = location[location.length - 1];

//     if (!location || aggLevel === 2) {
//       return null;
//     }

//     return {
//       Date: vd[0],
//       Confirmed: vd[5],
//       Deaths: vd[6],
//       Recovered: vd[7],
//       RegionCode: location[0],
//       CountryName: location[4],
//       StateName: location[5],
//       AggLevel: aggLevel
//     };
//   });
//   mergedData = mergedData.filter(md => !!md && md['AggLevel'] === 0);
//   return mergedData;
// }