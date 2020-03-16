import React from 'react';
import Papa from 'papaparse';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
          <h1> Coronavirus Tracker</h1>
        </Row>
        <Row className='nav'>
          <Link to='/'> World Map </Link>
          <Link to='/'> Country Chart </Link>
          <Link to='/'> About </Link>
        </Row>
        <WorldMap virusData={virusData} />
      </Container>
    </div>
  );
};

export default App;
