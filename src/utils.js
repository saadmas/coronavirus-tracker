export function getDateString(date) {
  let d = new Date();

  if (date === 'yesterday') {
    d.setDate(d.getDate() - 1);
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
  const todayDate = getDateString('today');
  const todayData = data.filter(x => x['Date'] === todayDate);

  if (todayData.length > 100) {
    return todayData;
  }
  const yesterdayDate = getDateString('yesterday');
  const yesterdayData = data.filter(x => x['Date'] === yesterdayDate);
  return yesterdayData;
};

export function getLatestDataForUnitedStates(data) {
  const todayDate = getDateString('today');
  const todayData = data
    .filter(x => x['Date'] === todayDate && x['CountryName'] === 'United States of America' && x['RegionCode'] && x['RegionName']);

  if (todayData.length > 100) {
    return todayData;
  }

  const yesterdayDate = getDateString('yesterday');
  const yesterdayData = data
    .filter(x => x['Date'] === yesterdayDate && x['CountryName'] === 'United States of America' && x['RegionCode'] && x['RegionName']);
  return yesterdayData;
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