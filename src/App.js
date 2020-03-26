import React from 'react';
import Papa from 'papaparse';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@material-ui/core';
import CountryChartPage from './Pages/CountryChartPage/CountryChartPage';
import MapPage from './Pages/MapPage/MapPage';
import AboutPage from './Pages/AboutPage/AboutPage';
import NavBar from './Components/NavBar/NavBar';

import './App.css';

const App = () => {
  const [virusData, setVirusData] = React.useState([]);
  const [isDataFetchError, setIsDataFetchError] = React.useState(false);

  React.useEffect(() => {
    getCoronavirusData();
  }, []);

  const getCoronavirusData = () => {
    const dataUrl = 'https://open-covid-19.github.io/data/data.csv';
    Papa.parse(dataUrl, {
      download: true,
      header: true,
      complete: (result) => {
        if (!(!!result.data) || result.data.length === 0) {
          setIsDataFetchError(true);
        }
        setVirusData(result.data);
      }
    });
  };

  const render = () => {
    if (isDataFetchError) {
      return (
        <div className="App">
          <CssBaseline />
          <Container>
            <h1>COVID-19 DAILY TRACKER</h1>
            <NavBar />
            <h2>Uh oh... Error fetching coronavirus data. <br />Please refresh the page to try again.</h2>
          </Container>
        </div>
      );
    }
    return (
      <div className="App">
        <CssBaseline />
        <Container>
          <h1>COVID-19 DAILY TRACKER</h1>
          <NavBar />
          <Switch>
            <Route
              exact
              path="/country-charts"
              render={(props) => <CountryChartPage virusData={virusData} {...props} />}
            />
            <Route
              exact
              path="/about"
              render={(props) => <AboutPage />}
            />
            <Route
              exact
              path="/"
              render={(props) => <MapPage virusData={virusData} {...props} />}
            />
          </Switch>
        </Container>
      </div>
    );
  };
  return render();
};

export default App;
