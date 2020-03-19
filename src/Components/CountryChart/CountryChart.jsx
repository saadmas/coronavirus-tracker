import React from 'react';
import {
  LineChart, CartesianGrid, XAxis, YAxis, Tooltip,
  Legend, Line, ResponsiveContainer
} from "recharts";

import './CountryChart.css';

const CountryChart = ({ chartData, countryName }) => {

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

  const getYTicks = (yMax) => {
    if (yMax <= 10) {
      return [0, 10];
    }

    const gap = yMax / 5;
    const divTen = Math.ceil(gap / 10) * 10;
    const yTicks = [0];
    let yTick = divTen;

    while (yTick <= yMax) {
      yTicks.push(yTick);
      yTick += divTen;
    }

    yTicks.push(yTick);
    return yTicks;
  };

  const render = () => {
    const maxConfirmed = chartData[chartData.length - 1]['confirmed'];
    const totalDeaths = chartData[chartData.length - 1]['deaths'];
    let mortalityRate = (totalDeaths / maxConfirmed) * 100;
    mortalityRate = mortalityRate.toFixed(1);

    const yTicks = getYTicks(maxConfirmed);

    return (
      <div className="countryChart">
        <ResponsiveContainer width="95%" height={400}>
          <LineChart
            width={800}
            height={500}
            data={chartData}
            margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="1 1"
            />
            <XAxis dataKey="date" angle={-45} textAnchor="end" />
            <YAxis domain={[0, maxConfirmed]} ticks={yTicks} />
            <Tooltip content={onTooltip} />
            <Legend
              layout="vertical"
              size={20}
              wrapperStyle={{
                top: '380px'
              }}
            />
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
        <div className="countryStats">
          <h3 className="countryTitle">
            <span className="countryText">{countryName}</span>
          </h3>
          <ul className="countryStatsList">
            <li variant="dark">Reported Cases: {maxConfirmed}</li>
            <li variant="dark">Reported Deaths: {totalDeaths}</li>
            <li variant="dark">Mortality Rate: {mortalityRate}%</li>
          </ul>
        </div>
      </div>
    );
  }

  return render();
};

export default CountryChart;