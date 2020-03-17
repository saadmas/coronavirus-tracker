import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FiMapPin, FiInfo } from 'react-icons/fi';
import { GiChart } from 'react-icons/gi';

import './NavBar.css';

const NavBar = () => {
  return (
    <Row>
      <Col>
        <a href='/' className="navLink">
          <span className="navLinkText">World Map</span>
          <FiMapPin className="navIcon" />
        </a>
      </Col>
      <Col>
        <a href='/country-charts' className="navLink">
          <span className="navLinkText">Country Charts </span>
          <GiChart className="navIcon" />
        </a>
      </Col>
      <Col>
        <a href='/about' className="navLink">
          <span className="navLinkText">About </span>
          <FiInfo className="navIcon" />
        </a>
      </Col>
    </Row>
  );
};

export default NavBar;
