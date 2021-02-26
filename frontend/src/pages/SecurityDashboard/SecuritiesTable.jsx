import React from 'react';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import moment from 'moment';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { Comparator, textFilter, dateFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import { Card, CardBody, Spinner } from 'reactstrap';
import { formatPercentage, DATE_FORMAT } from '../../constants/utils';
import { paginationOptions, defaultSorted, percentageFilter } from '../../helpers/table';

import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const SecuritiesTable = (props) => {
  const { securities } = props;

  const columns = [
    {
      dataField: 'id',
      text: '#',
      sort: true,
      style: { width: '40px', textAlign: 'center' },
      filter: textFilter({
        placeholder: ' ',
      }),
      formatter: (cell) => {
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
      dataField: 'cusip',
      text: 'CUSIP',
      sort: true,
      style: { width: '50px' },
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
      formatter: (cell) => (cell)
        ? (<>{formatPercentage(cell)}%</>)
        : (<></>),
      footer: (columnData) => `${formatPercentage(columnData.reduce((acc, item) => acc + item, 0) / (!columnData.length ? columnData.length : 1))}%`,
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
      default:
        return 'All Securities';
    }
  })(props.report);

  const handleReportChange = (e, value) => {
    if (props.report === value) {
      return;
    }
    else {
      window.location.href = "/securities/list";
    }
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