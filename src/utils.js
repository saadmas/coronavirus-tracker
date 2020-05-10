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

  while (latestData.length < 51) {
    daysBeforeToday++;
    const dayBeforeDate = getDateString(daysBeforeToday);
    latestData = data
      .filter(x => x['Date'] === dayBeforeDate && x['CountryName'] === 'United States of America' && x['RegionCode'] && x['RegionName']);
  }

  return latestData;
};

export function getNumberWithCommas(num) {
  if (num.toString().length < 5) {
    return num.toString();
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function getDecimalCount(num) {
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

  return populationInfected;
}