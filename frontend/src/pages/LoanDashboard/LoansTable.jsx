import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, CardBody, Spinner } from 'reactstrap';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { Comparator, textFilter, dateFilter, selectFilter } from 'react-bootstrap-table2-filter';

import { formatCurrency, formatPercentage, DATE_FORMAT, LOAN_STATUS_MAP, PROPERTY_TYPE_MAP } from '../../helpers/utils';
import { paginationOptions, defaultSorted, percentageFilter, currencyFilter } from '../../helpers/table';

import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const LoansTable = (props) => {
  const { loans } = props;

  let propertyTypeOptions = [];
  Object.entries(PROPERTY_TYPE_MAP).map((property) => {
    propertyTypeOptions.push({ value: property[0], label: property[1] });
    return true;
  });

  let loanStatusOptions = [];
  Object.entries(LOAN_STATUS_MAP).map((status) => {
    loanStatusOptions.push({ value: status[0], label: status[1] });
    return true;
  });

  let formatRatingString = (loan) => {
    let rating = '';
    if (loan.KDMRating) rating += loan.KDMRating
    else rating += '--';

    if (loan.EJRating) rating += ` / ${loan.EJRating}`;
    else rating += ` / --`;

    return rating;
  }

  const columns = [
    {
      dataField: 'loanNumber',
      text: '#',
      sort: true,
      style: { width: '40px', textAlign: 'center' },
      filter: textFilter({
        placeholder: ' ',
      }),
      formatter: (cell, row) => {
        return (<a href={`/loans/${row.id}`} className="btn btn-sm btn-primary">{cell}</a>);
      },
      footer: '',
    },
    {
      dataField: 'property',
      text: 'Property',
      sort: false,
      style: { minWidth: '350px' },
      filter: textFilter({
        placeholder: ' ',
        onFilter: (filterValue, data) => {
          if (!filterValue) return data;

          return data.filter(loan => {
            if (!loan.properties || !loan.properties.length) return false;
            const addresses = [];

            loan.properties.forEach((property) => {
              const address = property.address;
              const addressStr = `${address.name} ${address.street1} ${address.street2} ${address.city}, ${address.state} ${address.zip}`;
              addresses.push(addressStr.toLowerCase());
            });

            return addresses.some(address => address.includes(filterValue.toLowerCase()));
          })
        },
      }),
      formatter: (cell, row) => {
        if (row.properties.length === 0) return '';
        return (
          <>
            {row.properties.map((property, i) => {
              return (
                <p key={i}>
                  {row.dealName && (<>{row.dealName}<br /></>)}
                  {/* {property.address.name && (<>{property.address.name}<br /></>)} */}
                  {property.address.street1}
                  {property.address.street2 && (<>{property.address.street2}</>)}, {property.address.city} {property.address.state}, {property.address.zip}
                  {(i + 1) === row.properties.length ? ('') : (<br />)}
                </p>
              );
            })}
          </>
        );
      },
      footer: '',
    },
    {
      dataField: 'propertyType',
      text: 'Property Type',
      sort: true,
      style: { width: '130px' },
      filter: selectFilter({
        options: propertyTypeOptions,
        placeholder: 'All',
        onFilter: (filterValue, data) => {
          if (!filterValue) return data;

          return data.filter(loan => {
            if (!loan.properties || !loan.properties.length) return false;

            return loan.properties.some(property => property.type === filterValue);
          })
        }
      }),
      formatter: (cell, row) => {
        if (row.properties.length === 0) return '';
        return (
          <>
            {row.properties.map((property, i) => {
              return (
                <span key={i}>
                  {PROPERTY_TYPE_MAP[property.type]}
                  {/* {property.address.name && (<>{property.address.name}<br /></>)} */}
                  {(i + 1) === row.properties.length ? ('') : (<br />)}
                  {' '}<br />
                </span>
              );
            })}
          </>
        );
      },
      // formatter: (cell) => (<>{PROPERTY_TYPE_MAP[cell]}</>),
      footer: '',
    },
    {
      dataField: 'KDMRating',
      text: 'KDM / EJ Rating',
      sort: false,
      style: { width: '70px' },
      formatter: (cell, row) => formatRatingString(row),
      filter: textFilter({
        placeholder: ' ',
        onFilter: (filterValue, data) => {
          if (!filterValue) return data;

          return data.filter(loan => {
            const ratingStr = formatRatingString(loan).toLowerCase();
            return ratingStr.includes(filterValue.toLowerCase());
          });
        }
      }),
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
    },
    {
      dataField: 'loanStatus',
      text: 'Loan Status',
      sort: true,
      style: { width: '120px' },
      filter: selectFilter({
        options: loanStatusOptions,
        placeholder: 'All',
        defaultValue: 'PERFORMING',
        style: { color: '#495057' },
        onFilter: (filterValue, data) => {
          if (!filterValue) return data;

          // return data.filter(loan => {
          //   if (!loan.properties || !loan.properties.length) return false;

          //   return loan.properties.some(property => property.type === filterValue);
          // })
        }
      }),
      formatter: (cell) => (<>{LOAN_STATUS_MAP[cell]}</>),
      footer: '',
    },
    {
      dataField: 'initialAmount',
      text: 'Loan Amount',
      sort: false,
      style: { width: '110px', textAlign: 'right' },
      headerStyle: { textAlign: 'right' },
      footerStyle: { textAlign: 'right' },
      filter: textFilter({
        placeholder: ' ',
        onFilter: (filterValue, data) => currencyFilter(filterValue, data, 'initialAmount'),
      }),
      formatter: (cell) => (cell)
        ? (<>${formatCurrency(cell)}</>)
        : (<></>),
      footer: (columnData, column, columnIndex) => `$${formatCurrency(columnData.reduce((acc, item) => acc + item, 0))}`,
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
    //   dataField: '',
    //   text: 'Principal Balance',
    //   sort: false,
    // },
    {
      dataField: 'ltv',
      text: 'LTV',
      sort: false,
      style: { width: '85px', textAlign: 'right' },
      headerStyle: { textAlign: 'right' },
      footerStyle: { textAlign: 'right' },
      filter: textFilter({
        placeholder: ' ',
        onFilter: (filterValue, data) => percentageFilter(filterValue, data, 'ltv'),
      }),
      formatter: (cell, row) => (cell)
        ? (<>{formatPercentage(cell)}%</>)
        : (<></>),
      footer: (columnData, column, columnIndex) => `${formatPercentage(columnData.reduce((acc, item) => acc + item, 0) / (!!columnData.length ? columnData.length : 1))}%`,
    },
    {
      dataField: 'loanRate',
      text: 'Loan Rate',
      sort: false,
      style: { width: '85px', textAlign: 'right' },
      headerStyle: { textAlign: 'right' },
      footerStyle: { textAlign: 'right' },
      filter: textFilter({
        placeholder: ' ',
        onFilter: (filterValue, data) => percentageFilter(filterValue, data, 'loanRate'),
      }),
      formatter: (cell, row) => (cell)
        ? (<>{formatPercentage(cell)}%</>)
        : (<></>),
      footer: (columnData, column, columnIndex) => `${formatPercentage(columnData.reduce((acc, item) => acc + item, 0) / (!!columnData.length ? columnData.length : 1))}%`,
    },
    // {
    //   dataField: 'noteRate',
    //   text: 'Note Rate',
    //   sort: false,
    // },
    {
      dataField: 'spread',
      text: 'Spread',
      sort: false,
      // value is loanRate - noteRate, Diego will provide this
    },
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
    else if (value === 'cash-flow') window.location.href = "/loans/cash-flow";
    else window.location.href = "/loans/list";
  }

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
                          <option value="cash-flow">Cash Flow Report</option>
                        </AvField>
                      </AvGroup>
                    </AvForm>
                    <BootstrapTable
                      bootstrap4
                      keyField="id"
                      data={loans}
                      columns={columns}
                      defaultSorted={defaultSorted}
                      filter={filterFactory()}
                      pagination={paginationFactory(paginationOptions)}
                      wrapperClasses="table-responsive loan-list-table"
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