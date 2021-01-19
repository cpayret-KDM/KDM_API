import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, CardBody, Spinner } from 'reactstrap';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { Comparator, textFilter, dateFilter, selectFilter } from 'react-bootstrap-table2-filter';

import { formatCurrency, formatPercentage, DATE_FORMAT, SECURITY_STATUS_MAP, PROPERTY_TYPE_MAP } from '../../helpers/utils';
import { paginationOptions, defaultSorted, percentageFilter, currencyFilter } from '../../helpers/table';

import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const SecuritiesTable = (props) => {
  const { securities } = props;

  // let propertyTypeOptions = [];
  // Object.entries(PROPERTY_TYPE_MAP).map((property) => {
  //   propertyTypeOptions.push({ value: property[0], label: property[1] });
  // });

  // let securityStatusOptions = [];
  // Object.entries(SECURITY_STATUS_MAP).map((status) => {
  //   securityStatusOptions.push({ value: status[0], label: status[1] });
  // });

  // let formatRatingString = (security) => {
  //   let rating = '';
  //   if (security.KDMRating) rating += security.KDMRating
  //   else rating += '--';

  //   if (security.EJRating) rating += ` / ${security.EJRating}`;
  //   else rating += ` / --`;

  //   return rating;
  // }

  const columns = [
    {
      dataField: 'id',
      text: '#',
      sort: true,
      style: { width: '40px', textAlign: 'center' },
      filter: textFilter({
        placeholder: ' ',
      }),
      formatter: (cell, row) => {
        return (<a href={`/securities/${cell}`} className="btn btn-sm btn-primary">{cell}</a>);
      },
      footer: '',
    },
    {
      dataField: 'number',
      text: 'Ticker (Note Number)',
      sort: true,
      style: { width: '140px' },
      filter: textFilter({
        placeholder: ' ',
      }),
      footer: '',
    },
    {
      dataField: 'noteRate',
      text: 'Note Rate',
      sort: false,
      style: { width: '85px', textAlign: 'right' },
      headerStyle: { textAlign: 'right' },
      footerStyle: { textAlign: 'right' },
      filter: textFilter({
        placeholder: ' ',
        onFilter: (filterValue, data) => percentageFilter(filterValue, data, 'noteRate'),
      }),
      formatter: (cell, row) => (cell)
        ? (<>{formatPercentage(cell)}%</>)
        : (<></>),
      footer: (columnData, column, columnIndex) => `${formatPercentage(columnData.reduce((acc, item) => acc + item, 0) / (!!columnData.length ? columnData.length : 1))}%`,
    },
    {
      dataField: 'tradeDate',
      text: 'Trade Date',
      sort: true,
      style: { width: '130px' },
      filter: dateFilter({
        placeholder: ' ',
        withoutEmptyComparatorOption: true,  // dont render empty option for comparator
        comparators: [Comparator.EQ],
      }),
      formatter: (cell) => (cell)
        ? (<>{moment(cell).format(DATE_FORMAT)}</>)
        : (<></>),
      footer: '',
    },
    {
      dataField: 'maturityDate',
      text: 'Maturity Date',
      sort: true,
      style: { width: '130px' },
      filter: dateFilter({
        placeholder: ' ',
        withoutEmptyComparatorOption: true,  // dont render empty option for comparator
        comparators: [Comparator.EQ],
      }),
      formatter: (cell) => (cell)
        ? (<>{moment(cell).format(DATE_FORMAT)}</>)
        : (<></>),
      footer: '',
    }
  ];

  const title = ((report) => {
    switch (report) {
      // case '60-day':
      //   return '60 Day Security Report';
      default:
        return 'All Securities';
    }
  })(props.report);

  const handleReportChange = (e, value) => {
    if (props.report === value) return;
    // else if (value === '60-day') window.location.href = "/securities/60-day";
    else window.location.href = "/securities/list";
  }

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between mb-2">
          <h4 className="header-title">{title}</h4>
          <Link to="/securities/create" className="btn btn-primary">Create New Security</Link>
        </div>

        {!securities ? (
          <div className="text-center"><Spinner size="lg" color="primary" /></div>
        ) : (
            <>
              {securities.length === 0 ? (
                <>No securities to show</>
              ) : (
                  <>
                    <AvForm className="">
                      <AvGroup className="position-relative">
                        <AvField
                          name="report"
                          type="select"
                          required
                          value={props.report}
                          className="custom-select report-type"
                          onChange={handleReportChange}
                        >
                          <option value="list">All Securities</option>
                          {/* <option value="60-day">60 Day Report</option> */}
                        </AvField>
                      </AvGroup>
                    </AvForm>
                    <BootstrapTable
                      bootstrap4
                      keyField="id"
                      data={securities}
                      columns={columns}
                      defaultSorted={defaultSorted}
                      filter={filterFactory()}
                      pagination={paginationFactory(paginationOptions)}
                      wrapperClasses="table-responsive security-list-table"
                    />
                  </>
                )}
            </>
          )}
      </CardBody>
    </Card>
  );
};

export default SecuritiesTable;