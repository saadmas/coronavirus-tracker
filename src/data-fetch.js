import Papa from 'papaparse';

const urlWithoutDate = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/01-31-2020.csv';

export async function getCoronavirusDataForDate(cb) {
  return await Papa.parse(urlWithoutDate, {
    download: true,
    header: true,
    complete: cb
  });
}
