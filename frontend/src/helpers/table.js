import React from 'react';
import { formatPercentage } from '../constants/utils';

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total ml-2">
    Showing {from} to {to} of {size} Results
  </span>
);

const paginationOptions = {
  paginationSize: 25,
  sizePerPage: 25,
  pageStartIndex: 1,
  firstPageText: 'First',
  prePageText: 'Back',
  nextPageText: 'Next',
  lastPageText: 'Last',
  nextPageTitle: 'First page',
  prePageTitle: 'Pre page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
  showTotal: true,
  paginationTotalRenderer: customTotal,
  sizePerPageList: [
    {
      text: '5',
      value: 5,
    },
    {
      text: '10',
      value: 10,
    },
    {
      text: '25',
      value: 25,
    },
    {
      text: '50',
      value: 50,
    },
    {
      text: '100',
      value: 100,
    },
  ],
};

const defaultSorted = [
  {
    dataField: 'id',
    order: 'asc',
  },
];

const currencyFilter = (filterValue, data, key) => {
  if (!filterValue) return data;

  return data.filter(loan => {
    if (!loan[key]) return false;
    return loan[key]
      .toString()
      .includes(
        filterValue
          .replace('$', '')
          .replace(',', '')
      );
  });
};

const percentageFilter = (filterValue, data, key) => {
  if (!filterValue) return data;

  return data.filter(loan => {
    if (!loan[key]) return false;
    return formatPercentage(loan[key]).includes(filterValue.replace('%', ''));
  })
};

export { paginationOptions, defaultSorted, currencyFilter, percentageFilter };