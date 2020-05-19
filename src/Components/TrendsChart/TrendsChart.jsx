import React from 'react';
import {
  LineChart, CartesianGrid, XAxis, YAxis, Tooltip,
  Legend, Line, ResponsiveContainer
} from "recharts";
import RegionSelectSmall from '../RegionSelect/RegionSelectSmall/RegionSelectSmall';
import TrendsSelection from '../TrendsSelection/TrendsSelection';

import './TrendsChart.css';

const TrendsChart = ({ chartData, regionName, regions, setSelectedCountry, setSelectedUSState }) => {
  const [chartLines, setChartLines] = React.useState([chartLineMap.RetailAndRecreation]);

  const chartLineMap = {
    'RetailAndRecreation': {
      name: 'Retail And Recreation',
      dataKey: 'RetailAndRecreation',
      stroke: '#FF0000',
      isEnabled: true,
    },
    'TransitStations': {
      name: 'Transit Stations',
      dataKey: 'TransitStations',
      stroke: '#8884d8',
      isEnabled: false,
    },
    'GroceryAndPharmacy': {
      name: 'Grocery & Pharmacy',
      dataKey: 'GroceryAndPharmacy',
      stroke: '#F7F139',
      isEnabled: false,
    },
    'Parks': {
      name: 'Parks',
      dataKey: 'Parks',
      stroke: '#1AE868',
      isEnabled: false,
    },
    'Residential': {
      name: 'Residential',
      dataKey: 'Residential',
      stroke: '#FF7C00',
      isEnabled: false,
    },
    'Workplaces': {
      name: 'Workplaces',
      dataKey: 'Workplaces',
      stroke: '#1AE868',
      isEnabled: false,
    }
  };

  const onTooltip = (e) => {
    if (!e || !e.payload.length) {
      return;
    }

    const payload = e.payload[0]['payload'];
    const date = payload['Date'];
    const chartLineListItems = chartLines.map(chartLine => chartLine.isEnabled && (
      <li>{chartLine.name}: {payload[chartLine.dataKey]}</li>
    ));

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
    const lines = chartLines.map(chartLine => chartLine.isEnabled && (
      <Line
        name={chartLine.name}
        dataKey={chartLine.dataKey}
        stroke={chartLine.stroke}
        type="monotone"
        dot={false}
        hide={false} ///
      />
    ));
    return lines;
  };

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
          chartLines={chartLines}
          setChartLines={setChartLines}
        />
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
          <XAxis dataKey="Date" angle={-45} textAnchor="end" />
          <YAxis domain={[100, 0]} />
          <Tooltip content={onTooltip} />
          <Legend
            layout="vertical"
            size={20}
            wrapperStyle={{
              top: '350px'
            }}
          />
          {getLines()}
        </LineChart>
      </ResponsiveContainer>
      <h3 className="regionName">
        <span className="underline">{regionName}</span>
      </h3>
    </div>
  );
};

export default TrendsChart;
