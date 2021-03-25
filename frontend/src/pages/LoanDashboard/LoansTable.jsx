import React, { useState } from 'react';;
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import moment from 'moment'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { Comparator, textFilter, dateFilter, selectFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import { Card, CardBody, Spinner } from 'reactstrap';
import { formatCurrency, formatPercentage, DATE_FORMAT, LOAN_STATUS_MAP, PROPERTY_TYPE_MAP } from '../../constants/utils';
import { paginationOptions, defaultSorted, percentageFilter, currencyFilter } from '../../helpers/table';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import TickerColumn from '../../helpers/TickerColumn'

const LoansTable = (props) => {
  const { loans } = props;
  
  const [ loansStats, setLoansStatsState] = useState(
    {ltv : 0, rate: 0},
  );

  // check here if the other state values are fucked up !!!!

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
    if (loan.KDMRating) {
      rating += loan.KDMRating
    }
    else {
      rating += '--';
    }

    if (loan.EJRating) {
      rating += ` / ${loan.EJRating}`;
    }
    else {
      rating += ` / --`;
    }

    return rating;
  }

  const afterFilter = (filteredLoans, newFilters) => {

    // LTV Weighted average
    const sumInitialAmountLTVWeight = filteredLoans.filter( (loan) => (loan.ltv != undefined) && (loan.ltv > 0) && (loan.initialAmount != undefined))
                        .map( (loan) => loan.initialAmount)
                        .reduce( (total, initialAmount) => total + initialAmount);

    const sumLtvData = filteredLoans.filter( (loan) => (loan.ltv != undefined) && (loan.ltv > 0) && (loan.initialAmount != undefined))
                        .map( (loan) => loan.ltv * loan.initialAmount)
                        .reduce( (total, ltvByInitial) => total + ltvByInitial);

    const ltv = sumLtvData / sumInitialAmountLTVWeight;

    // Rate Weighted average
    const sumInitialAmountRateWeight = filteredLoans.filter( (loan) => (loan.loanRate != undefined) && (loan.initialAmount != undefined))
                        .map( (loan) => loan.initialAmount)
                        .reduce( (total, initialAmount) => total + initialAmount);

    const sumRateData = filteredLoans.filter( (loan) => (loan.loanRate != undefined) && (loan.initialAmount != undefined))
                        .map( (loan) => loan.loanRate * loan.initialAmount)
                        .reduce( (total, rateByInitial) => total + rateByInitial);

    const rate = sumRateData / sumInitialAmountRateWeight;

    if ((loansStats.ltv != ltv) || (loansStats.rate != rate)) {
        setLoansStatsState({ltv : ltv, rate: rate});
    }
  }

  const columns = [
    {
      dataField: 'loanNumber',
      text: 'Ticker (Loan Number)',
      sort: true,
      style: { width: '200px', textAlign: 'center' },
      filter: textFilter({
        placeholder: ' ',
      }),
      formatter: TickerColumn,
      footer: '',
    },
    {
      dataField: 'dealName',
      text: 'Deal Name',
      sort: false,
      style: { width: '200px' },
      filter: textFilter({
        placeholder: ' ',
      }),
    formatter: (cell) => (<>{cell}</>),
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
          if (!filterValue) {
            return data;
          }

          return data.filter(loan => {
            if (!loan.properties || !loan.properties.length) {
              return false;
            }

            return loan.properties.some(property => property.type === filterValue);
          })
        }
      }),
      formatter: (cell, row) => {
        //TODO: refactor this into a testable function
        if (!row || row.properties.length === 0) {
          return '';
        }
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
          if (!filterValue) {
            return data;
          }

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
          if (!filterValue) {
            return data;
          }
          //FIXME: ?
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
      footer: (columnData) => `$${formatCurrency(columnData.reduce((acc, item) => acc + item, 0))}`,
    },
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
      formatter: (cell) => (cell)
        ? (<>{formatPercentage(cell)}%</>)
        : (<></>),
      footer: (columnData) => { return `${formatPercentage(loansStats.ltv)}%`},
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
      formatter: (cell) => (cell)
        ? (<>{formatPercentage(cell)}%</>)
        : (<></>),
      footer: (columnData) => `${formatPercentage(loansStats.rate)}%`,
    },
    {
      dataField: 'spread',
      text: 'Spread',
      sort: false,
      style: { width: '85px', textAlign: 'right' },
      headerStyle: { textAlign: 'right' },
      filter: textFilter({
        placeholder: ' ',
        onFilter: (filterValue, data) => percentageFilter(filterValue, data, 'spread'),
      }),
      formatter: (cell) => (cell)
        ? (<>{formatPercentage(cell)}%</>)
        : (<></>),
    },
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
    if (props.report === value) {
      return;
    }
    else if (value === '60-day') {
      window.location.href = "/loans/60-day";
    }
    else if (value === 'cash-flow') {
      window.location.href = "/loans/cash-flow";
    }
    else {
      window.location.href = "/loans/list";
    }
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
                      filter={filterFactory({ afterFilter })}
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