import React from 'react';
import {
  LineChart, CartesianGrid, XAxis, YAxis, Tooltip,
  Line, ResponsiveContainer
} from "recharts";
import RegionSelectSmall from '../RegionSelect/RegionSelectSmall/RegionSelectSmall';
import TrendsSelection from '../TrendsSelection/TrendsSelection';

import './TrendsChart.css';

const TrendsChart = ({ chartData, regionName, regions, setSelectedCountry, setSelectedUSState }) => {
  const [visibleChartLines, setVisibleChartLines] = React.useState(['RetailAndRecreation']);

  const chartLines = {
    'RetailAndRecreation': {
      name: 'Retail And Recreation',
      dataKey: 'RetailAndRecreation',
      stroke: '#FF3434'
    },
    'TransitStations': {
      name: 'Transit Stations',
      dataKey: 'TransitStations',
      stroke: '#8884d8'
    },
    'GroceryAndPharmacy': {
      name: 'Grocery & Pharmacy',
      dataKey: 'GroceryAndPharmacy',
      stroke: '#F7F139'
    },
    'Parks': {
      name: 'Parks',
      dataKey: 'Parks',
      stroke: '#1AE868'
    },
    'Residential': {
      name: 'Residential',
      dataKey: 'Residential',
      stroke: '#FF7C00'
    },
    'Workplaces': {
      name: 'Workplaces',
      dataKey: 'Workplaces',
      stroke: '#71FDFF'
    }
  };

  const onTooltip = (e) => {
    if (!e || !e.payload.length) {
      return;
    }

    const payload = e.payload[0]['payload'];
    const date = payload['Date'];
    const chartLineListItems = [];

    for (const [key, chartLine] of Object.entries(chartLines)) {
      if (visibleChartLines.includes(key)) {
        chartLineListItems.push(
          <li>{chartLine.name}: {payload[chartLine.dataKey]}</li>
        );
      }
    }

    return (
      <div className="tooltipStats">
        <ul className="tooltipStatsList">
          <li>Date: {date}</li>
          {chartLineListItems}
        </ul>
      </div>
    );
  };

  const getLines = () => {
    const lines = [];
    for (const [key, chartLine] of Object.entries(chartLines)) {
      if (visibleChartLines.includes(key)) {
        lines.push(
            <Line
              name={chartLine.name}
              dataKey={chartLine.dataKey}
              stroke={chartLine.stroke}
              // hide={!visibleChartLines.includes(key)}
              type="monotone"
              dot={false}
            />
        );
      }
    }
    return lines;
  };

  const formatXTick = (xTick) => {
    const [year, month, day] = xTick.split('-');
    return [month, day].join('/');
  }

  return (
    <div className="trendsChart">
      <div className="settingsRow">
        <RegionSelectSmall
          regions={regions}
          initiallySelectedRegion={regionName}
          setSelectedCountry={setSelectedCountry}
          setSelectedUSState={setSelectedUSState}
        />
        <TrendsSelection
          visibleChartLines={visibleChartLines}
          setVisibleChartLines={setVisibleChartLines}
        />
      </div>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart
          width={800}
          height={600}
          data={chartData}
          margin={{ top: 5, right: 30, left: 5, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="1 1"
          />
          <XAxis 
            dataKey="Date"
            angle={-45}
            textAnchor="end"
            tickFormatter={formatXTick}
          />
          <YAxis />
          <Tooltip content={onTooltip} />
          {getLines()}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendsChart;
