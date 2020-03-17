import React from 'react';
import {
  Charts, ChartContainer, ChartRow, YAxis, LineChart
} from "react-timeseries-charts";
import { TimeRange } from 'pondjs';

const CountryChart = ({ virusData }) => {
  const [chartData, setChartData] = React.useState({});

  React.useEffect(() => {
    getDefaultCountryChartData();
  }, [virusData]);

  const getUSData = () => {
    const USData = virusData.filter(c => c['CountryCode'] === 'US');
    let startDate = USData[0]['Date'];
    let endDate = USData[USData.length - 1]['Date'];
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const timeRange = new TimeRange(startDate, endDate);
    const data = USData.map(d => d['Confirmed']);
    return {
      timeRange,
      data
    };
  };

  const getDefaultCountryChartData = () => {
    const USData = getUSData(); ///
  };

  const render = () => {
    if (!(!!virusData) || virusData.length === 0) {
      return null;
    }

    const data = getDefaultCountryChartData();
    setChartData(data);

    return (
      <div>
        <ChartContainer timeRange={chartData['timeRange']} >
          <ChartRow height="200">
            {/* /// dynamically set 'max' */}
            <YAxis id="y" label="Count" min={0.5} max={3000} /> s
            <Charts>
              <LineChart
                axis="y"
                breakLine={false}
                series={chartData['data']} ///
                columns={["US"]} /// dynamically set
                interpolation="curveBasis" />
            </Charts>
          </ChartRow>
        </ChartContainer>
        <h1> FOO </h1>
      </div>
    );
  }

  return render();
};

export default CountryChart;
