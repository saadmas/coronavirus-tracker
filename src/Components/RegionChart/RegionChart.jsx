import React from 'react';
import {
  LineChart, CartesianGrid, XAxis, YAxis, Tooltip,
  Legend, Line, ResponsiveContainer
} from "recharts";
import { getNumberWithCommas, getDecimalCount } from '../../utils';
import RegionSelectSmall from '../RegionSelect/RegionSelectSmall/RegionSelectSmall';
import StatsList from '../StatsList/StatsList';
import DailySwitch from '../DailySwitch/DailySwitch';

import './RegionChart.css';

const RegionChart =
  ({ chartData, regionName, regions, setSelectedCountry, setSelectedUSState, isCountryChart }) => {
    const [isDailyChart, setIsDailyChart] = React.useState(false);

    const onDailySwitchChange = (e) => {
      setIsDailyChart(prevVal => !prevVal);
    };

    const getDailyChartData = () => {
      const dailyChartData = chartData.map((cumulativeStatsForDay, idx, arr) => {
        if (idx === 0) {
          return cumulativeStatsForDay;
        }

        const prevDayStats = arr[idx - 1];
        const dailyStats = {
          confirmed: cumulativeStatsForDay.confirmed - prevDayStats.confirmed,
          deaths: cumulativeStatsForDay.deaths - prevDayStats.deaths,
          date: cumulativeStatsForDay.date
        };

        return dailyStats;
      });

      return dailyChartData;
    };

    const onTooltip = (e) => {
      if (e.payload.length < 2) {
        return;
      }

      const payload = e.payload[1]['payload'];
      const date = payload['date'];
      const confirmed = getNumberWithCommas(payload['confirmed']);
      const deaths = getNumberWithCommas(payload['deaths']);

      let casesText;
      let deathsText;

      if (isDailyChart) {
        casesText = 'New Cases';
        deathsText = 'New Deaths';
      } else {
        casesText = 'Cases';
        deathsText = 'Deaths';
      }

      return (
        <div className="tooltipStats">
          <ul className="tooltipStatsList">
            <li class>Date: {date}</li>
            <li>{casesText}: {confirmed}</li>
            <li>{deathsText}: {deaths}</li>
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

    const getRegionSelect = () => {
      let setSelectedRegion;
      if (isCountryChart) {
        setSelectedRegion = setSelectedCountry;
      } else {
        setSelectedRegion = setSelectedUSState;
      }
      return (
        <RegionSelectSmall
          regions={regions}
          initiallySelectedRegion={regionName}
          setSelectedRegion={setSelectedRegion}
        />
      );
    };

    const maxConfirmed = chartData[chartData.length - 1]['confirmed'];
    const totalDeaths = chartData[chartData.length - 1]['deaths'];
    let mortalityRate = (totalDeaths / maxConfirmed) * 100;

    if (getDecimalCount(mortalityRate) > 0) {
      mortalityRate = mortalityRate.toFixed(1);
    }

    let yTicks;
    let yMax;
    let pointsForLineChart;

    if (isDailyChart) {
      pointsForLineChart = getDailyChartData();
      const maxForDailyStats = Math.max.apply(Math, pointsForLineChart.map(point => point.confirmed));
      yTicks = getYTicks(maxForDailyStats);
      yMax = maxForDailyStats;
    } else {
      pointsForLineChart = chartData;
      yTicks = getYTicks(maxConfirmed);
      yMax = maxConfirmed;
    }

    return (
      <div className="regionChart">
        <div className="settingsRow">
          {getRegionSelect()}
          <DailySwitch
            isDailyChart={isDailyChart}
            onDailySwitchChange={onDailySwitchChange}
          />
          <StatsList
            totalConfirmed={getNumberWithCommas(maxConfirmed)}
            totalDeaths={getNumberWithCommas(totalDeaths)}
            mortalityRate={mortalityRate}
            className="chartStatsList"
          />
        </div>
        <ResponsiveContainer width="95%" height={400}>
          <LineChart
            width={800}
            height={500}
            data={pointsForLineChart}
            margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="1 1"
            />
            <XAxis dataKey="date" angle={-45} textAnchor="end" />
            <YAxis domain={[0, yMax]} ticks={yTicks} />
            <Tooltip content={onTooltip} />
            <Legend
              layout="vertical"
              size={20}
              wrapperStyle={{
                top: '380px'
              }}
            />
            <Line
              name={isDailyChart ? 'New Cases' : 'Reported Cases'}
              type="monotone"
              dataKey="confirmed"
              stroke="#8884d8"
              dot={false}
            />
            <Line
              name={isDailyChart ? 'New Deaths' : 'Reported Deaths'}
              type="monotone"
              dataKey="deaths"
              stroke="#FF0000"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <h3 className="regionName">
          <span className="underline">{regionName}</span>
        </h3>
      </div>
    );
  };

export default RegionChart;
