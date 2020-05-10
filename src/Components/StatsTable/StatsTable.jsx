import React from 'react';
import MUIDataTable from 'mui-datatables';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from 'react-router-dom';
import { getNumberWithCommas, getDecimalCount, getPopulationInfected } from '../../utils';

import './StatsTable.css'

const StatsTable = ({ tableData, history, isCountryOrUSState, setIsCountryOrUSState }) => {
  const getTableTypeProperties = () => {
    if (isCountryOrUSState === 'Country') {
      return {
        regionColumnKey: 'CountryName',
        regionColumnLabel: 'Country',
        regionType: 'Country',
        tooltipText: 'Click on a row to chart that country\'s data'
      }
    }
    return {
      regionColumnKey: 'RegionName',
      regionColumnLabel: 'State',
      regionType: 'USState',
      tooltipText: 'Click on a row to chart that state\'s data'
    }
  };

  const getMuiTheme = () => createMuiTheme({
    overrides: {
      'MUIDataTableBodyCell': {
        root: {
          backgroundColor: 'black',
          color: 'white'
        }
      },
      'MuiToolbar': {
        root: {
          backgroundColor: 'black',
          color: 'white'
        }
      },
      'MuiSvgIcon': {
        root: {
          color: 'white'
        }
      },
      'MuiTableCell': {
        footer: {
          backgroundColor: 'black'
        }
      },
      'MUIDataTableHeadCell': {
        'sortActive': {
          color: 'white'
        }
      },
      'MuiTableSortLabel': {
        'icon': {
          color: 'white !important'
        }
      }
    }
  });

  const getColumns = () => {
    const { regionColumnLabel } = getTableTypeProperties();
    const columns = [
      {
        name: 'name',
        label: regionColumnLabel
      },
      {
        name: 'confirmed',
        label: 'Reported Cases',
        options: {
          sortDirection: 'desc',
          customBodyRender: (numberOfConfirmed) => getNumberWithCommas(numberOfConfirmed)
        }
      },
      {
        name: 'deaths',
        label: 'Reported Deaths',
        options: {
          customBodyRender: (numberOfDeaths) => getNumberWithCommas(numberOfDeaths)
        }
      },
      {
        name: 'mortalityRate',
        label: 'Mortality Rate',
        options: {
          customBodyRender: (mortalityRate) => {
            let formattedMortalityRate = mortalityRate;
            if (getDecimalCount(mortalityRate) > 0) {
              formattedMortalityRate = mortalityRate.toFixed(1);
            }
            formattedMortalityRate += "%"
            return formattedMortalityRate;
          }
        }
      },
      {
        name: 'populationInfected',
        label: 'Population Infected',
        options: {
          customBodyRender: (populationInfected) => populationInfected += '%'
        }
      }
    ];
    return columns;
  };

  const onRowClick = (rowData) => {
    const { regionType } = getTableTypeProperties();
    const regionName = rowData[0];
    history.push(`/chart/${regionType}/${regionName}`);
  };

  const options = {
    selectableRows: 'none',
    rowsPerPage: 60,
    responsive: 'scrollFullHeight',
    viewColumns: false,
    filter: false,
    onRowClick
  };

  const transformTableData = () => {
    const transformedData = tableData.map(c => {
      const { regionColumnKey } = getTableTypeProperties();
      return {
        'name': c[regionColumnKey],
        confirmed: c['Confirmed'],
        deaths: c['Deaths'],
        mortalityRate: (c['Deaths'] / c['Confirmed']) * 100,
        populationInfected: getPopulationInfected(c['Confirmed'], c['Population'])
      };
    });
    return transformedData;
  };

  const handleStatsTypeChange = (e) => {
    setIsCountryOrUSState(e.target.value);
  };

  const getStatsTypeSelect = () => {
    return (
      <Select
        className="statsTypeDropdown animated bounce"
        defaultValue="Country"
        auto={true}
        onChange={handleStatsTypeChange}
      >
        <MenuItem value={'Country'} key={`menu_item_country`}>Countries</MenuItem>
        <MenuItem value={'USState'} key={`menu_item_us_state`}>U.S. States</MenuItem>
      </Select>
    );
  };

  const ChartInfoTooltip = withStyles(theme => ({
    tooltip: {
      boxShadow: theme.shadows[1],
      fontSize: '20px',
      marginTop: '10px',
    },
  }))(Tooltip);

  const render = () => {
    const { tooltipText } = getTableTypeProperties();

    return (
      <div className="statsTable">
        <h3 className="statsTableHeader">
          {getStatsTypeSelect()}
          <ChartInfoTooltip title={tooltipText} arrow>
            <HelpIcon className="helpIcon" />
          </ChartInfoTooltip>
        </h3>
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            data={transformTableData()}
            columns={getColumns()}
            options={options}
          />
        </MuiThemeProvider>
      </div>
    );
  };

  return render();
};

export default withRouter(StatsTable);
