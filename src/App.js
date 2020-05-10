import React from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChartPage from './Pages/ChartPage/ChartPage';
import MapPage from './Pages/MapPage/MapPage';
import StatsPage from './Pages/StatsPage/StatsPage';
import TrendsPage from './Pages/TrendsPage/TrendsPage';
import AboutPage from './Pages/AboutPage/AboutPage';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
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

  if (isDataFetchError) {
    return (
      <div className="App">
        <CssBaseline />
        <Container>
          <h1 className="siteTitle">COVID-19 DAILY TRACKER</h1>
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
        <h1 className="siteTitle">COVID-19 Daily Tracker</h1>
        <NavBar />
        {
          virusData && virusData.length > 0 && (
            <Switch>
              <Route
                exact
                path="/chart/:chartType?/:regionName?"
                render={(props) => <ChartPage virusData={virusData} {...props} />}
              />
              <Route
                exact
                path="/stats"
                render={(props) => <StatsPage virusData={virusData} {...props} />}
              />
              {/* <Route
                exact
                path="/trends"
                render={(props) => <TrendsPage virusData={virusData} setIsDataFetchError={setIsDataFetchError} {...props} />}
              /> */}
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
              <Route component={ErrorPage} />
            </Switch>
          )
        }
      </Container>
    </div>
  );
};

export default App;
