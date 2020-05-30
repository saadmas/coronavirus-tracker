import React from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  const [trendsData, setTrendsData] = React.useState([]);
  const [isDataFetchError, setIsDataFetchError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getCoronavirusData();
    getMobilityData();
    setIsLoading(false);
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

  const getMobilityData = async () => {
    const trendsDataUrl = 'https://open-covid-19.github.io/data/mobility.json';
    try {
      let data = await fetch(trendsDataUrl);
      data = await data.json();
      setTrendsData(data);
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

  const getRoutes = () => {
    if (virusData && virusData.length) {
      return (
        <Switch>
          <Route
            exact
            path="/chart/:chartType?/:regionName?"
            render={(props) => <ChartPage virusData={virusData} {...props} />}
          />
          <Route
            exact
            path="/trends/:chartType?/:regionName?"
            render={(props) => <TrendsPage virusData={virusData} trendsData={trendsData} {...props} />}
          />
          <Route
            exact
            path="/stats"
            render={(props) => <StatsPage virusData={virusData} {...props} />}
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
          <Route component={ErrorPage} />
        </Switch>
      );
    }
  }

  const getAppContent = () => {
    if (isDataFetchError) {
      return <h2>Uh oh... Error fetching COVID-19 data. <br />Please refresh the page to try again.</h2>
    }

    if (isLoading) {
      return <CircularProgress color="secondary" />
    }

    return getRoutes();
  }

  return (
    <div className="App">
      <CssBaseline />
      <Container>
        <h1 className="siteTitle">COVID-19 Daily Tracker</h1>
        <NavBar />
        {getAppContent()}
      </Container>
    </div>
  );
};

export default App;
