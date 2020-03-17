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