import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { FiMapPin, FiInfo } from 'react-icons/fi';
import { GiChart } from 'react-icons/gi';

import './NavBar.css';

const NavBar = () => {
  return (
    <Navbar className="navBar">
      <Nav >
        <Nav.Link href='/' className="navLink">
          <span className="navLinkText">World Map</span>
          <FiMapPin className="navIcon" />
        </Nav.Link>
        <Nav.Link href='/country-charts' className="navLink">
          <span className="navLinkText">Country Charts </span>
          <GiChart className="navIcon" />
        </Nav.Link>
        <Nav.Link href='/about' className="navLink">
          <span className="navLinkText">About </span>
          <FiInfo className="navIcon" />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
