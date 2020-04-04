import React from 'react';
import { FiMapPin, FiInfo } from 'react-icons/fi';
import { GiChart } from 'react-icons/gi';

import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navBar">
      <div>
        <a href='/' className="navLink">
          <span className="navLinkText">Map</span>
          <FiMapPin className="navIcon" />
        </a>
      </div>
      <div>
        <a href='/country-charts?chartType=Country&amp;regionName=Pakistan' className="navLink">
          <span className="navLinkText">Chart </span>
          <GiChart className="navIcon" />
        </a>
      </div>
      <div>
        <a href='/about' className="navLink">
          <span className="navLinkText">About </span>
          <FiInfo className="navIcon" />
        </a>
      </div>
    </div>
  );
};

export default NavBar;
