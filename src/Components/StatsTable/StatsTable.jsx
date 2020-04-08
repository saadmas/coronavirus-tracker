import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from 'react-router-dom';
import { getNumberWithCommas, getDecimalCount } from '../../utils';

import './StatsTable.css'

const StatsTable = ({ tableData, history, isCountryOrUSState }) => {
  const getTableTypeProperties = () => {
    if (isCountryOrUSState === 'Country') {
      return {
        regionColumnKey: 'CountryName',
        regionColumnLabel: 'Country',
        regionType: 'Country',
        tableHeaderTitle: 'Country',
        tooltipText: 'Click on a row to chart that country\'s data'
      }
    }
    return {
      regionColumnKey: 'RegionName',
      regionColumnLabel: 'State',
      regionType: 'USState',
      tableHeaderTitle: 'U.S. State',
      tooltipText: 'Click on a row to chart that state\'s data'
    }
  };

  const getMuiTheme = () => createMuiTheme({
    overrides: {
      'MUIDataTableBodyCell': {
        root: {
          backgroundColor: 'black',
          color: 'white'
        },
        hover: {
          opacity: 0.5,
          cursor: 'pointer'
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
        mortalityRate: (c['Deaths'] / c['Confirmed']) * 100
      };
    });
    return transformedData;
  };

  const ChartInfoTooltip = withStyles(theme => ({
    tooltip: {
      boxShadow: theme.shadows[1],
      fontSize: '20px',
      marginTop: '10px',
    },
  }))(Tooltip);

  const render = () => {
    const { tableHeaderTitle, tooltipText } = getTableTypeProperties();

    return (
      <div className="statsTable">
        <h3 className="statsTableHeader">
          {tableHeaderTitle} Statistics
          <span>
            <ChartInfoTooltip title={tooltipText} arrow>
              <HelpIcon className="helpIcon" />
            </ChartInfoTooltip>
          </span>
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
