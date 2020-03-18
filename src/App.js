import React from 'react';
import Papa from 'papaparse';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@material-ui/core';
import WorldMap from './Components/WorldMap/WorldMap';
import CountrySelect from './Components/CountrySelect/CountrySelect';
import NavBar from './Components/NavBar/NavBar';

import './App.css';

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
      header: true,
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
      <CssBaseline />
      <Container>
        <h1>CORONAVIRUS DAILY GLOBAL TRACKER</h1>
        <NavBar />
        <Switch>
          <Route
            exact
            path="/country-charts"
            render={(props) => <CountrySelect virusData={virusData} {...props} />}
          />
          <Route
            exact
            path="/"
            render={(props) => <WorldMap virusData={virusData} {...props} />}
          />
        </Switch>
      </Container>
    </div >
  );
};

export default App;
