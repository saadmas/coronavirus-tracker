import React from 'react';

import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div>
      <h2>
        Uh oh... Something went wrong.
        <div className="siteMapSection">
          <p>
            <span className="clickOptions">You can click on:</span>
          </p>
          <ul className="siteMapList">
            <li>"Map" to see a world map or U.S. state map of COVID-19 cases and deaths</li>
            <li>"Stats" to see data in table format for countries or U.S. states collectively</li>
            <li>"Chart" to see a timeline of data for a specific country or U.S. state</li>
            <li>"Trends" to chart movement trends over time by geography, across different categories of place, via data from Google</li>
            <li>"About" to learn more about COVID-19 and the data behind this website</li>
          </ul>
        </div>
      </h2>
    </div>
  )
};

export default ErrorPage;




