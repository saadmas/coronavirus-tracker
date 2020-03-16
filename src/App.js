import React from 'react';
import Papa from 'papaparse';
import './App.css';
import WorldMap from './WorldMap/WorldMap';
import { Container, Row, Navbar, Nav } from 'react-bootstrap';

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
          <Navbar bg="light" expand="lg">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">World Map</Nav.Link>
                <Nav.Link href="#country-chart">Country Chart</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        <WorldMap virusData={virusData} />ss
      </Container>
    </div>
  );
};

export default App;
