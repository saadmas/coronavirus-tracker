import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@material-ui/core';
import ChartPage from './Pages/ChartPage/ChartPage';
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

  const getCoronavirusData = async () => {
    const dataUrl = 'https://open-covid-19.github.io/data/data.json';
    try {
      let data = await fetch(dataUrl);
      data = await data.json();
      setVirusData(data);
    } catch (error) {
      setIsDataFetchError(true);
    }
  };

  const render = () => {
    if (isDataFetchError) {
      return (
        <div className="App">
          <CssBaseline />
          <Container>
            <h1>COVID-19 DAILY TRACKER</h1>
            <NavBar />
            <h2>Uh oh... Error fetching COVID-19 data. <br />Please refresh the page to try again.</h2>
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
          {
            virusData && virusData.length > 0 && (
              <Switch>
                <Route
                  exact
                  path="/country-charts"
                  render={(props) => <ChartPage virusData={virusData} {...props} />}
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
            )
          }
        </Container>
      </div>
    );
  };
  return render();
};

export default App;
