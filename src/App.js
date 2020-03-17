import React from 'react';
import Papa from 'papaparse';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';
import WorldMap from './WorldMap/WorldMap';
import CountryChart from './CountryChart/CountryChart';

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
      <Container fluid>
        <Row>
          <h1> CORONAVIRUS GLOBAL TRACKER</h1>
        </Row>
        <Row className='nav'>
          <Link to='/'> World Map </Link>
          <Link to='/country-charts'> Country Charts </Link>
          <Link to='/'> About </Link>
        </Row>
        <Switch>
          <Route
            exact
            path="/country-charts"
            render={(props) => <CountryChart virusData={virusData} {...props}/>}
          />
          <Route
            exact
            path="/"
            render={(props) => <WorldMap virusData={virusData} {...props}/>}
          />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
