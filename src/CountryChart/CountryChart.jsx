import React from 'react';
import {
  Charts, ChartContainer, ChartRow, YAxis, LineChart
} from "react-timeseries-charts";

const CountryChart = ({ virusData }) => {
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    getDefaultCountryChartSettings();
  }, []);

  const getUSData = () => {
    const USData = virusData.filter(c => c['CountryCode'] === 'US');
  };

  getUSData();

  const getDefaultCountryChartSettings = () => {
    const USData = getUSData(); ///
  };

  return (
    <div>
      {/* <ChartContainer timeRange={this.state.timerange} >
        <ChartRow height="200">
          <YAxis id="y" label="Count" min={0.5} max={3000} />
          <Charts>
            <LineChart
              axis="y"
              breakLine={false}
              series={currencySeries} ///
              columns={["aud", "euro"]} ///
              style={style}
              interpolation="curveBasis" />
          </Charts>
        </ChartRow>
      </ChartContainer> */}
      <h1> FOO </h1>
    </div>
  );
};

export default CountryChart;
