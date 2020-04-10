import React from 'react';
import PublicIcon from '@material-ui/icons/Public';
import InfoIcon from '@material-ui/icons/Info';
import AssessmentIcon from '@material-ui/icons/Assessment';
import TableChartIcon from '@material-ui/icons/TableChart';

import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navBar">
      <div>
        <a href='/' className="navLink mapLink">
          <span className="navLinkText">Map </span>
          <PublicIcon className="navIcon mapIcon" />
        </a>
      </div>
      <div>
        <a href='/' className="navLink statsLink">
          <span className="navLinkText">Stats </span>
          <TableChartIcon className="navIcon statsIcon" />
        </a>
      </div>
      <div>
        <a href='/chart' className="navLink chartLink">
          <span className="navLinkText">Chart </span>
          <AssessmentIcon className="navIcon chartIcon" />
        </a>
      </div>
      <div>
        <a href='/about' className="navLink aboutLink">
          <span className="navLinkText">About </span>
          <InfoIcon className="navIcon aboutIcon" />
        </a>
      </div>
    </div>
  );
};

export default NavBar;
