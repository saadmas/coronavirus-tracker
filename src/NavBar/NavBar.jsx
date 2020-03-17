import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import './NavBar.css';

const NavBar = () => {
  return (
    <Navbar className="navBar">
      <Nav >
        <Nav.Link href='/' className="navLink"> World Map </Nav.Link>
        <Nav.Link href='/country-charts' className="navLink"> Country Charts </Nav.Link>
        <Nav.Link href='/about' className="navLink"> About </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
