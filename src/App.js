import React from 'react';
import Papa from 'papaparse';
import './App.css';
import WorldMap from './WorldMap/WorldMap';

const App = () => {
  const [virusData, setVirusData] = React.useState([]);
  const [isDataFetchError, setIsDataFetchError] = React.useState(false);

  React.useEffect(() => {
    getCoronavirusData();
  }, []);

  const getCoronavirusData = () => {
    const dataUrl = 'https://raw.githubusercontent.com/open-covid-19/data/master/output/world.csv';
    Papa.parse(dataUrl, {
      download: true,
      complete: (result) => {
        if (result.errors.length > 0) {
          setIsDataFetchError(true);
        }
        setVirusData(result.data);
      }
    });
  };

  return (
    <div className="App">
      <h1> Coronavirus Tracker</h1>
      <WorldMap virusData={virusData} />
    </div>
  );
};

export default App;
