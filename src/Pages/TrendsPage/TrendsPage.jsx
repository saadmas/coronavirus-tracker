import React from 'react';
import Papa from 'papaparse';

import './TrendsPage.css';

const TrendsPage = ({ virusData, setIsDataFetchError }) => {
  const [trendsData, setTrendsData] = React.useState([]);

  React.useEffect(() => {
    const trendsDataUrl = 'https://www.gstatic.com/covid19/mobility/Global_Mobility_Report.csv';
    Papa.parse(trendsDataUrl, {
      download: true,
      header: true,
      complete: (result) => {
        console.log(result.data);
        if (!(!!result.data) || result.data.length === 0) {
          setIsDataFetchError(true);
        }
        setTrendsData(result.data);
        console.log(result.data);
      },
      error: (error) => console.log(error.message)
    });
  }, [virusData]);

  return (
    <div>
      <div className="trendsInfo">
        <p>
          Community Mobility Reports by <b>Google</b> aim to provide insights into
          what has changed in response to policies aimed at combating COVID-19.
          The reports chart movement trends over time by geography, across different categories of places such as:
        </p>
        <h3>Grocery &amp; pharmacy</h3>
        <ul>
          <li>Grocery markets</li>
          <li>Food warehouses</li>
          <li>Farmers markets</li>
          <li>Specialty food shops</li>
          <li>Drug stores</li>
          <li>Pharmacies</li>
        </ul>
        <h3>Parks</h3>
        <ul>
          <li>Local parks</li>
          <li>National parks</li>
          <li>Public beaches</li>
          <li>Marinas</li>
          <li>Dog parks</li>
          <li>Plazas</li>
          <li>Public gardens</li>
        </ul>
        <h3>Transit stations</h3>
        <ul>
          <li>Subway stations</li>
          <li>Bus stations</li>
          <li>Train stations</li>
        </ul>
        <h3>Retail &amp; recreation</h3>
        <ul>
          <li>Restaurants</li>
          <li>Cafes</li>
          <li>Shopping centers</li>
          <li>Theme parks</li>
          <li>Museums</li>
          <li>Libaries</li>
          <li>Movie theaters</li>
        </ul>
        <h3>Residential</h3><br />
        <h3>Workplaces</h3><br />
      </div>
    </div>
  );
}

export default TrendsPage;