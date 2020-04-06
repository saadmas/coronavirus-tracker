import React from 'react';
import PublicIcon from '@material-ui/icons/Public';
import InfoIcon from '@material-ui/icons/Info';
import AssessmentIcon from '@material-ui/icons/Assessment';

import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navBar">
      <div>
        <a href='/' className="navLink">
          <span className="navLinkText">Map</span>
          <PublicIcon className="navIcon" />
        </a>
      </div>
      <div>
        <a href='/chart' className="navLink chartLink">
          <span className="navLinkText">Chart </span>
          <AssessmentIcon className="navIcon" />
        </a>
      </div>
      <div>
        <a href='/about' className="navLink aboutLink">
          <span className="navLinkText">About </span>
          <InfoIcon className="navIcon" />
        </a>
      </div>
    </div>
  );
};

export default NavBar;
