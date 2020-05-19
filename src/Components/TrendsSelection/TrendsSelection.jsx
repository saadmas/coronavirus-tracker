import React from 'react';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import './TrendsSelection.css'

const TrendsSelection = ({ chartLines, setChartLines }) => {
  const getChips = () => {
    const chips = chartLines.map(chartLine => (
      <div className="chip">
        <Chip
          label={chartLine.name}
          clickable={true}
          onClick={() => onChipClick(chartLine)}
          icon={getChipIcon(chartLine.isEnabled)}
        />
      </div>
    ));
    return chips;
  };

  const getChipIcon = (isEnabled) => {
    const chipIcon = isEnabled ? (
      <RemoveIcon />
    ) : (
        <AddIcon />
      );
    return chipIcon;
  };

  const onChipClick = (chartLine) => {
    setChartLines(prevChartLines => prevChartLines.map(cl => {
      if (cl.dataKey === chartLine.dataKey) {
        cl.isEnabled = !cl.isEnabled;
      }
      return cl;
    }));
  };

  return (
    <div className="trendsSelection">
      {getChips()}
    </div>
  );
};

export default TrendsSelection;