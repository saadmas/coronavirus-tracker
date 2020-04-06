import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
        regionColumnHint: 'Click on a row to chart that country\'s data',
        tableHeaderTitle: 'Country'
      }
    }
    return {
      regionColumnKey: 'RegionName',
      regionColumnLabel: 'State',
      regionType: 'USState',
      regionColumnHint: 'Click on a row to chart that U.S. state\'s data',
      tableHeaderTitle: 'U.S. State'
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
      }
    }
  });

  const getColumns = () => {
    const { regionColumnLabel, regionColumnHint } = getTableTypeProperties();
    const columns = [
      {
        name: 'name',
        label: regionColumnLabel,
        options: {
          hint: regionColumnHint
        }
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



  const onCellClick = (cellData, cellMeta) => {
    const { regionType } = getTableTypeProperties();
    const regionNameColumnIndex = 0;
    if (cellMeta.colIndex === regionNameColumnIndex) {
      history.push(`/chart/${regionType}/${cellData}`);
    }
  };

  const options = {
    selectableRows: 'none',
    rowsPerPage: 60,
    responsive: 'scrollFullHeight',
    viewColumns: false,
    onCellClick
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

  const render = () => {
    const { tableHeaderTitle } = getTableTypeProperties();

    return (
      <div className="statsTable">
        <h3 className="statsTableHeader"> {tableHeaderTitle} Statistics</h3>
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
