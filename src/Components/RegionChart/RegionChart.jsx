import React from 'react';
import {
  LineChart, CartesianGrid, XAxis, YAxis, Tooltip,
  Legend, Line, ResponsiveContainer
} from "recharts";
import { getNumberWithCommas, getDecimalCount } from '../../utils';
import RegionSelectSmall from '../RegionSelect/RegionSelectSmall/RegionSelectSmall';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import './RegionChart.css';

const RegionChart = ({ chartData, regionName, regions, setSelectedCountry, setSelectedUSState, isCountryChart }) => {

  const onTooltip = (e) => {
    if (e.payload.length < 2) {
      return;
    }

    const payload = e.payload[1]['payload'];
    const date = payload['date'];
    const confirmed = getNumberWithCommas(payload['confirmed']);
    const deaths = getNumberWithCommas(payload['deaths']);

    return (
      <div className="tooltipStats">
        <ul className="tooltipStatsList">
          <li class>Date: {date}</li>
          <li>Cases: {confirmed}</li>
          <li>Deaths: {deaths}</li>
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

  const render = () => {
    const maxConfirmed = chartData[chartData.length - 1]['confirmed'];
    const totalDeaths = chartData[chartData.length - 1]['deaths'];
    let mortalityRate = (totalDeaths / maxConfirmed) * 100;

    if (getDecimalCount(mortalityRate) > 0) {
      mortalityRate = mortalityRate.toFixed(1);
    }

    const yTicks = getYTicks(maxConfirmed);

    return (
      <div className="regionChart">
        <div className="settingsRow">
          {getRegionSelect()}
          {/* <div className="dailySwitch"> ///
            <FormControlLabel
              control={
                <Switch
                  // checked={state.checkedB}
                  // onChange={handleChange}
                  name="dailySwitch"
                  color="primary"
                />
              }
              label="Daily"
              labelPlacement="top"
            />
          </div> */}
        </div>
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
              name="Reported Cases"
              type="monotone"
              dataKey="confirmed"
              stroke="#8884d8"
              dot={false}
            />
            <Line
              name="Reported Deaths"
              type="monotone"
              dataKey="deaths"
              stroke="#FF0000"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="regionStats">
          <h3 className="regionName">
            <span className="underline">
              {regionName}
            </span>
          </h3>
          <ul className="regionStatsList">
            <li variant="dark">Reported Cases: {getNumberWithCommas(maxConfirmed)}</li>
            <li variant="dark">Reported Deaths: {getNumberWithCommas(totalDeaths)}</li>
            <li variant="dark">Mortality Rate: {mortalityRate}%</li>
          </ul>
        </div>
      </div>
    );
  }

  return render();
};

export default RegionChart;
