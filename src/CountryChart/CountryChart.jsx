import React from 'react';
import {
  LineChart, CartesianGrid, XAxis, YAxis, Tooltip,
  Legend, Line
} from "recharts";
import { getMonthAndDay } from '../utils';

import './CountryChart.css';

const CountryChart = ({ virusData }) => {
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    const USData = getUSData();
    setChartData(USData);
  }, [virusData]);

  const getIndexOfFirstConfirmed = (data) => {
    let i = 0;
    let confirmed = data[i]['Confirmed'];
    while (confirmed < 1 && i < data.length) {
      i++;
      confirmed = data[i]['Confirmed'];
    }
    return i;
    /// handle no reported cases
  };

  const getUSData = () => {
    if (!!virusData && virusData.length > 0) {
      let USData = virusData.filter(c => c['CountryCode'] === 'US');
      const indexOfFirstConfirmed = getIndexOfFirstConfirmed(USData);
      USData = USData.slice(indexOfFirstConfirmed);
      const chartData = USData.map(d => ({
        confirmed: d['Confirmed'],
        deaths: d['Deaths'],
        date: getMonthAndDay(d['Date'])
      }));
      return chartData;
    }
  };

  const getMaxConfirmed = () => {
    console.log(chartData[chartData.length - 1]['confirmed'])
    return chartData[chartData.length - 1]['confirmed'];
  };

  const render = () => {
    if (!(!!chartData) || chartData.length === 0) {
      return null;
    }
    return (
      <div className="countryChart">
        <LineChart width={1000} height={500} data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, getMaxConfirmed()]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="confirmed" stroke="#8884d8" />
          <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
        </LineChart>
        <h1> FOO </h1>
      </div>
    );
  }

  return render();
};

export default CountryChart;
