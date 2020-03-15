import React from 'react';
import './App.css';
import WorldMap from './WorldMap/WorldMap';
import { getCoronavirusDataForDate } from './data-fetch';

const App = () => {
  const [virusData, setVirusData] = React.useState({});

  React.useEffect(() => {
    const data = getAllCoronavirusData();
    /// setVirusData(data);
  }, virusData);

  const getAllCoronavirusData = () => {
    getCoronavirusDataForDate((data) => {
      console.log(data.data);
    });
  };

  const getDateString = (date) => {
    console.log(today.getDate(), today.getMonth(), today.getFullYear());
  };

  const getDateStringsSinceJan22 = () => {
    const dates = [];
    const jan22 = 
    const today = new Date();

  };

  return (
    <div className="App">
      <h1> Coronavirus Tracker</h1>
      <WorldMap virusData={virusData} />
    </div>
  );
};

export default App;
