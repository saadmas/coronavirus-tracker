import React from 'react';
import PublicIcon from '@material-ui/icons/Public';
import InfoIcon from '@material-ui/icons/Info';
import AssessmentIcon from '@material-ui/icons/Assessment';
import TableChartIcon from '@material-ui/icons/TableChart';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navBar">
      <div>
        <a href='/' className="navLink">
          <span className="navLinkText">Map </span>
          <PublicIcon className="navIcon mapIcon" />
        </a>
      </div>
      <div>
        <a href='/stats' className="navLink">
          <span className="navLinkText">Stats </span>
          <TableChartIcon className="navIcon statsIcon" />
        </a>
      </div>
      <div>
        <a href='/chart' className="navLink">
          <span className="navLinkText">Chart </span>
          <AssessmentIcon className="navIcon chartIcon" />
        </a>
      </div>
      {/* <div> ///
        <a href='/trends' className="navLink">
          <span className="navLinkText">Trends </span>
          <TrendingDownIcon className="navIcon trendsIcon" />
        </a>
      </div> */}
      <div>
        <a href='/about' className="navLink aboutLink">
          <span className="navLinkText">About </span>
          <InfoIcon className="navIcon aboutIcon" />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
