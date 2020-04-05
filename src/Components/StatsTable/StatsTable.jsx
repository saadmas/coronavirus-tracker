import React from 'react';
import MUIDataTable from 'mui-datatables';

import './StatsTable.css'

const StatsTable = ({ tableData }) => {
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

  const onRowClick = (rowData) => {
    /// US toggle
    console.log(rowData[0]);
  };

  const options = {
    selectableRows: 'none',
    pagination: false,
    searchOpen: true,
    print: false,
    download: false,
    onRowClick
  };

  const transformTableData = () => {
    const transformedData = tableData.map(c => {
      /// number with commas, mortality rate decimal place
      /// handle / 0 Mortality Rate
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

export default StatsTable;