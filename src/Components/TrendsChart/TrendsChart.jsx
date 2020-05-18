import React from 'react';
import {
  LineChart, CartesianGrid, XAxis, YAxis, Tooltip,
  Legend, Line, ResponsiveContainer
} from "recharts";
import RegionSelectSmall from '../RegionSelect/RegionSelectSmall/RegionSelectSmall';
import TrendsList from '../../Components/TrendsList/TrendsList';

import './TrendsChart.css';

const TrendsChart = ({ chartData, regionName, regions, setSelectedCountry, setSelectedUSState }) => {

  const onTooltip = (e) => {
    if (e.payload.length < 2) {
      return;
    }

    const payload = e.payload[1]['payload'];
    const date = payload['Date'];
    const transitStations = payload['TransitStations'];
    const retailAndRecreation = payload['RetailAndRecreation'];
    const groceryAndPharmacy = payload['GroceryAndPharmacy'];
    const parks = payload['Parks'];
    const residential = payload['Residential'];
    const workplaces = payload['Workplaces'];

    return (
      <div className="tooltipStats">
        <ul className="tooltipStatsList">
          <li>Date: {date}</li>
          <li>Transit Stations: {transitStations}</li>
          <li>Retail &amp; Recreation: {retailAndRecreation}</li>
          <li>Grocery &amp; Pharmacy: {groceryAndPharmacy}</li>
          <li>Parks: {parks}</li>
          <li>Residential: {residential}</li>
          <li>Workplaces: {workplaces}</li>
        </ul>
      </div>
    );
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
        <TrendsList />
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
          <Line
            name={'Transit Stations'}
            type="monotone"
            dataKey="TransitStations"
            stroke="#8884d8"
            dot={false}
          />
          <Line
            name={'Retail And Recreation'}
            type="monotone"
            dataKey="RetailAndRecreation"
            stroke="#FF0000"
            dot={false}
          />
          <Line
            name={'Grocery & Pharmacy'}
            type="monotone"
            dataKey="GroceryAndPharmacy"
            stroke="#F7F139"
            dot={false}
          />
          <Line
            name={'Parks'}
            type="monotone"
            dataKey="Parks"
            stroke="#1AE868"
            dot={false}
          />
          <Line
            name={'Residential'}
            type="monotone"
            dataKey="Residential"
            stroke="#FF7C00"
            dot={false}
          />
          <Line
            name={'Workplaces'}
            type="monotone"
            dataKey="Workplaces"
            stroke="#FC71FF"
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

export default TrendsChart;
