import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { getDateString } from '../../utils';
import { GiWorld } from 'react-icons/gi';

const CountrySelect = ({ virusData }) => {
  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    const listOfCountries = getCountries(virusData);
    setCountries(listOfCountries);
  }, [virusData]);

  const getCountries = (data) => {
    const todayDate = getDateString('today');
    const todayData = data.filter(x => x['Date'] === todayDate);
    const countries = todayData.map(d => d['CountryName']);
  };

  const render = () => {
    if (virusData === undefined || virusData.length === 0) {
      return null;
    }

    return (
      <div className="CountrySelect">
        <h3>Select country: </h3>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <GiWorld />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  return render();
};

export default CountrySelect;
