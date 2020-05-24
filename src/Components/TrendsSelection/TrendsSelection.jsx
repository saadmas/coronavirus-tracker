import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import './TrendsSelection.css'

const TrendsSelection = ({ visibleChartLines, setVisibleChartLines }) => {

  const onCheckboxClick = (e) => {
    const toggledLine = e.target.value;
    if (visibleChartLines.includes(toggledLine)) {
      setVisibleChartLines(prevLines => prevLines.filter(line => line !== toggledLine));
    } else {
      setVisibleChartLines(prevLines => [toggledLine, ...prevLines]);
    }
  };

  const getLabelClass = (label) => {
    let className = '';
    
    const isChartLineVisible = visibleChartLines.includes(label);
    if (isChartLineVisible) {
      className = label;
    }

    return className;
  };

  return (
    <div className="trendsSelection">
      <FormGroup row>
        <FormControlLabel
          className={getLabelClass('RetailAndRecreation')}
          value="RetailAndRecreation"
          control={
            <Checkbox 
              color="default" 
              checked={visibleChartLines.includes('RetailAndRecreation')}
              onChange={onCheckboxClick}
            />
          }
          label="Retail & Recreation"
          labelPlacement="start"
        />
        <FormControlLabel
          className={getLabelClass('TransitStations')}
          value="TransitStations"
          control={
            <Checkbox 
              color="default" 
              checked={visibleChartLines.includes('TransitStations')}
              onChange={onCheckboxClick}
            />
          }
          label="Transit Stations"
          labelPlacement="start"
        />
        <FormControlLabel
          className={getLabelClass('GroceryAndPharmacy')}
          value="GroceryAndPharmacy"
          control={
            <Checkbox 
              color="default" 
              checked={visibleChartLines.includes('GroceryAndPharmacy')}
              onChange={onCheckboxClick}
            />
          }
          label="Grocery & Pharmacy"
          labelPlacement="start"
        />
        <FormControlLabel
          className={getLabelClass('Residential')}
          value="Residential"
          control={
            <Checkbox 
              color="default" 
              checked={visibleChartLines.includes('Residential')}
              onChange={onCheckboxClick}
            />
          }
          label="Residential"
          labelPlacement="start"
        />
        <FormControlLabel
          className={getLabelClass('Workplaces')}
          value="Workplaces"
          control={
            <Checkbox 
              color="default" 
              checked={visibleChartLines.includes('Workplaces')}
              onChange={onCheckboxClick}
            />
          }
          label="Workplaces"
          labelPlacement="start"
        />
         <FormControlLabel
          className={getLabelClass('Parks')}
          value="Parks"
          control={
            <Checkbox 
              color="default" 
              checked={visibleChartLines.includes('Parks')}
              onChange={onCheckboxClick}
            />
          }
          label="Parks"
          labelPlacement="start"
        />
      </FormGroup>
    </div>
  );
};

export default TrendsSelection;