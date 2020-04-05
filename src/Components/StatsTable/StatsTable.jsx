import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withRouter } from 'react-router-dom';

import './StatsTable.css'

const StatsTable = ({ tableData, history }) => {
  /// US toggle
  const columns = [
    {
      name: 'countryName',
      label: 'Country Name'
    },
    {
      name: 'confirmed',
      label: 'Reported Cases',
      options: {
        sortDirection: 'desc'
      }
    },
    {
      name: 'deaths',
      label: 'Reported Deaths'
    },
    {
      name: 'mortalityRate',
      label: 'Mortality Rate'
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
    searchOpen: true,
    print: false,
    download: false,
    onCellClick
  };

  const transformTableData = () => {
    const transformedData = tableData.map(c => {
      /// number with commas, mortality rate decimal place
      /// handle / 0 Mortality Rate
      /// US toggle
      return {
        countryName: c['CountryName'],
        confirmed: c['Confirmed'],
        deaths: c['Deaths'],
        mortalityRate: c['Confirmed'] / c['Deaths']
      };
    });
    return transformedData;
  };

  const render = () => {
    return (
      <div className="statsTable">
        {/* /// US toggle */}
        <h3 className="statsTableHeader"> Country Statistics Table</h3>
        <MUIDataTable
          data={transformTableData()}
          columns={columns}
          options={options}
        />
      </div>
    );
  };

  return render();
};

export default withRouter(StatsTable);
