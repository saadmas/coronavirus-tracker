import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { getNumberWithCommas, getDecimalCount } from '../../utils';

import './StatsTable.css'

const StatsTable = ({ tableData, history }) => {

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

  /// US toggle
  const columns = [
    {
      name: 'countryName',
      label: 'Country Name',
      options: {
        hint: 'Click on a country name to chart that country\'s data'
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

  const onCellClick = (cellData, cellMeta) => {
    /// US toggle
    const regionNameColumnIndex = 0;
    const regionType = 'Country';
    if (cellMeta.colIndex === regionNameColumnIndex) {
      history.push(`/chart/${regionType}/${cellData}`);
    }
  };

  const options = {
    selectableRows: 'none',
    rowsPerPage: 50,
    responsive: 'scrollFullHeight',
    print: false,
    download: false,
    viewColumns: false,
    onCellClick
  };

  const transformTableData = () => {
    const transformedData = tableData.map(c => {
      /// US toggle
      return {
        countryName: c['CountryName'],
        confirmed: c['Confirmed'],
        deaths: c['Deaths'],
        mortalityRate: (c['Deaths'] / c['Confirmed']) * 100
      };
    });
    return transformedData;
  };

  const render = () => {
    return (
      <div className="statsTable">
        {/* /// US toggle */}
        <h3 className="statsTableHeader"> Country Statistics</h3>
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            data={transformTableData()}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </div>
    );
  };

  return render();
};

export default withRouter(StatsTable);
