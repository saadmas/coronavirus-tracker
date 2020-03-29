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
    day = "0" + month;
  }

  return (`${year}-${month}-${day}`);
};

export function getMonthAndDay(dateStr) {
  const monthAndDay = dateStr.slice(5);
  return monthAndDay;
}

export function getLatestData(data) {
  const todayDate = getDateString();
  const todayData = data.filter(x => x['Date'] === todayDate);

  if (todayData.length > 100) {
    return todayData;
  }

  const yesterdayDate = getDateString(1);
  const yesterdayData = data.filter(x => x['Date'] === yesterdayDate);

  return yesterdayData;
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