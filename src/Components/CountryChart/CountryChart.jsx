import React from 'react';
import {
  LineChart, CartesianGrid, XAxis, YAxis, Tooltip,
  Legend, Line, ResponsiveContainer
} from "recharts";
import { getMonthAndDay } from '../../utils';

import './CountryChart.css';

const CountryChart = ({ chartData }) => {

  const onTooltip = (e) => {
    if (e.payload.length < 2) {
      return;
    }

    const payload = e.payload[1]['payload'];
    const date = payload['date'];
    const confirmed = payload['confirmed'];
    const deaths = payload['deaths'];

    return (
      <div className="tooltipStats">
        <ul className="tooltipStatsList">
          <li>Date: {date}</li>
          <li>#Confirmed: {confirmed}</li>
          <li>#Deaths: {deaths}</li>
        </ul>
      </div>
    );
  };

  const render = () => {
    const maxConfirmed = chartData[chartData.length - 1]['Confirmed']; /// not working

    return (
      <div className="countryChart">
        <ResponsiveContainer width="99%" height="80%" aspect={3}>
          <LineChart
            width={1000}
            height={500}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="1 1"
            />
            <XAxis dataKey="date" />
            <YAxis domain={[0, maxConfirmed]} />
            <Tooltip content={onTooltip} />
            <Legend layout="vertical" size={20} />
            <Line
              type="monotone"
              dataKey="confirmed"
              stroke="#8884d8"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="deaths"
              stroke="#FF0000"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return render();
};

export default CountryChart;
