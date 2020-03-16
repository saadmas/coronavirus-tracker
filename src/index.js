import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import WorldMap from './WorldMap/WorldMap';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/country-charting" component={WorldMap} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
