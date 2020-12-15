import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, CardBody, Spinner, Label } from 'reactstrap';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { formatCurrency, DATE_FORMAT, LOAN_STATUS_MAP, PROPERTY_TYPE_MAP } from '../../helpers/utils';
import { paginationOptions, defaultSorted } from '../../helpers/table';

const ActionButtons = (cell, row) => {
  return (
    <div>
      <a
        href={`/loans/${row.id}`}
        type="button"
        className="btn btn-primary mr-2"
        size="sm"
      >
        View
      </a>
      <a
        href={`/loans/${row.id}/edit`}
        type="button"
        className="btn btn-secondary"
        size="sm"
      >
        Edit
      </a>
    </div>
  );
};

const LoansTable = (props) => {
  const { loans } = props;
  const columns = [
    {
      dataField: 'id',
      text: '#',
      sort: true,
    },
    {
      dataField: 'loanNumber',
      text: 'Ticker',
      sort: true,
    },
    {
      dataField: 'property',
      text: 'Property',
      sort: false,
      formatter: (cell, row) => {
        if (row.properties.length === 0) return '';
        return (
          <>
            {row.properties.map((property, i) => {
              return (
                <span key={i}>
                  {property.address.street1}
                  {property.address.street2 && (<>{property.address.street2}</>)}, {property.address.city} {property.address.state}, {property.address.zip}
                  {(i+1) === row.properties.length ? ('') : (<br />)}
                </span>
              );
            })}
          </>
        );
      },
    },
    {
      dataField: 'propertyType',
      text: 'Property Type',
      sort: true,
      formatter: (cell, row) => {
        if (row.properties.length === 0) return '';
        return (
          <>
            {row.properties.map((property, i) => {
              return (
                <span key={i}>
                  {PROPERTY_TYPE_MAP[property.type]}
                  {(i+1) === row.properties.length ? ('') : (<br />)}
                </span>
              );
            })}
          </>
        );
      },
    },
    {
      dataField: 'KDMRating',
      text: 'KDM Rating',
      sort: false,
    },
    {
      dataField: 'maturityDate',
      text: 'Maturity Date',
      sort: false,
      formatter: (cell) => (cell)
        ? (<>${moment(cell).format(DATE_FORMAT)}</>)
        : (<></>)
    },
    {
      dataField: 'loanStatus',
      text: 'Loan Status',
      sort: true,
      formatter: (cell) => (<>{LOAN_STATUS_MAP[cell]}</>),
    },
    {
      dataField: 'initialAmount',
      text: 'Loan Amount',
      sort: true,
      formatter: (cell) => (cell)
        ? (<>${formatCurrency(cell)}</>)
        : (<></>)
    },
    // {
    //   dataField: 'appraisedValue',
    //   text: 'Appraised Value',
    //   sort: false,
    // },
    // {
    //   dataField: 'appraisalDate',
    //   text: 'Appraisal Date',
    //   sort: false,
    // },
    // {
    //   dataField: 'balance',
    //   text: 'Principal Balance',
    //   sort: false,
    // },
    {
      dataField: 'ltv',
      text: 'LTV',
      sort: false,
      formatter: (cell, row) => (cell)
        ? (<>{cell}%</>)
        : (<></>)
    },
    {
      dataField: 'loanRate',
      text: 'Loan Rate',
      sort: false,
      formatter: (cell, row) => (cell)
        ? (<>{cell}%</>)
        : (<></>)
    },
    // {
    //   dataField: 'noteRate',
    //   text: 'Note Rate',
    //   sort: false,
    // },
    // {
    //   dataField: 'spread',
    //   text: 'Spread',
    //   sort: false,
    // },
    // {
    //   dataField: 'cusip',
    //   text: 'CUSIP',
    //   sort: false,
    // },
    // {
    //   dataField: 'annualSpread',
    //   text: 'Annual Spread',
    //   sort: false,
    // },
    // {
    //   dataField: 'monthlySpread',
    //   text: 'Monthly Spread',
    //   sort: false,
    // },
    {
      dataField: "buttons",
      text: "",
      isDummyField: true,
      formatter: ActionButtons,
    }
  ];

  const title = ((report) => {
    switch (report) {
      case '60-day':
        return '60 Day Loan Report';
      default:
        return 'All Loans';
    }
  })(props.report);

  const handleReportChange = (e, value) => {
    if (props.report === value) return;
    else if (value === '60-day') window.location.href = "/loans/60-day";
    else window.location.href = "/loans/list";
  }

  console.log('loans',loans)

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between mb-2">
          <h4 className="header-title">{title}</h4>
          <Link to="/loans/create" className="btn btn-primary">Create New Loan</Link>
        </div>

        {!loans ? (
          <div className="text-center"><Spinner size="lg" color="primary" /></div>
        ) : (
          <>
            {loans.length === 0 ? (
              <>No loans to show</>
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
                      <option value="list">All Loans</option>
                      <option value="60-day">60 Day Report</option>
                    </AvField>
                  </AvGroup>

                </AvForm>
                <BootstrapTable
                  bootstrap4
                  keyField="id"
                  data={loans}
                  columns={columns}
                  defaultSorted={defaultSorted}
                  pagination={paginationFactory(paginationOptions)}
                  wrapperClasses="table-responsive"
                />
              </>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default LoansTable;