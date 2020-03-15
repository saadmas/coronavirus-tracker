export function getDateStringOfToday() {
  const today = new Date();
  const year = today.getFullYear();

  let month = today.getMonth();
  month++;
  month += "";
  if (month.length === 1) {
    month = "0" + month;
  }

  let day = today.getDate() + "";
  if (day.length === 1) {
    day = "0" + month;
  }

  return (`${year}-${month}-${day}`);
};