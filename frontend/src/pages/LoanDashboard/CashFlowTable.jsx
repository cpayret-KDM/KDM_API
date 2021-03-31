import React, { useState } from 'react';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import { Card, CardBody, Spinner } from 'reactstrap';
import { formatCurrency, formatPercentage } from '../../constants/utils';
import { paginationOptions, defaultCashflowSorted } from '../../helpers/table';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const CashFlowTable = (props) => {
    const { loans } = props;

    const calculateLoanRate = (loans) => {
      if (loans) {
        const filteredForRate = loans.filter( (loan) => (loan.loanRate != undefined) && (loan.principalBalance != undefined));
        if (filteredForRate.length > 0) {
          const sumPrincipalBalanceRateWeight = filteredForRate
            .map( (loan) => loan.principalBalance)
            .reduce( (total, principalBalance) => total + principalBalance);
    
          const sumRateData = filteredForRate
            .map( (loan) => loan.loanRate * loan.principalBalance)
            .reduce( (total, rateByPrincipal) => total + rateByPrincipal);
        
          return sumRateData / sumPrincipalBalanceRateWeight;
        }
      }
    }

    const calculateMSNRate = (loans) => {
        if (loans) {
          const filteredForRate = loans.filter( (loan) => (loan.msnRate != undefined) && (loan.principalBalance != undefined));
          if (filteredForRate.length > 0) {
            const sumPrincipalBalanceRateWeight = filteredForRate
              .map( (loan) => loan.principalBalance)
              .reduce( (total, principalBalance) => total + principalBalance);
      
            const sumRateData = filteredForRate
              .map( (loan) => loan.msnRate * loan.principalBalance)
              .reduce( (total, rateByPrincipal) => total + rateByPrincipal);
          
            return sumRateData / sumPrincipalBalanceRateWeight;
          }
        }
      }

    let loanRate = calculateLoanRate(loans);
    let msnRate = calculateMSNRate(loans);
    
    
    const [ cashFlowStats, setCashFlowStatsState] = useState(
      {loanRate : loanRate, msnRate: msnRate},
    );

    const title = "Cash Flow Report";
   
    //redundant with Loans Table method
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

    const afterFilter = (filteredLoans, newFilters) => {
        if (!filteredLoans) {
            return;
        }

        const loanRateCalculation = calculateLoanRate(filteredLoans);
        const msnRateCalculation = calculateMSNRate(filteredLoans);
        if ((cashFlowStats.loanRate != loanRateCalculation) || (cashFlowStats.msnRate != msnRateCalculation)) {
            setCashFlowStatsState({loanRate : loanRateCalculation, msnRate: msnRateCalculation});
        }
    }

    const columns = [
        {
            dataField: 'id',
            sort: true,
            hidden: true,
            footer: '',
        },
        {
            dataField: 'loanNumber',
            text: 'Ticker',
            sort: true,
            style: { width: '140px' },
            filter: textFilter({
                placeholder: ' ',
            }),
            footer: ''
        },
        {
            dataField: 'principalBalance',
            text: 'Balance',
            sort: true,
            style: { width: '140px', textAlign: 'right'  },
            filter: textFilter({
                placeholder: ' ',
            }),
            formatter: (cell) => (cell != undefined)
                ? (<>${formatCurrency(cell)}</>)
                : (<></>),
            footer: (columnData) => `$${formatCurrency(columnData.reduce((acc, item) => acc + item, 0))}`,
            footerStyle: { textAlign: 'right' },
        },
        {
            dataField: 'loanRate',
            text: 'Loan Rate',
            sort: true,
            style: { width: '100px', textAlign: 'right' },
            filter: textFilter({
                placeholder: ' ',
            }),
            formatter: (cell) => (cell != undefined)
                ? (<>{formatPercentage(cell)}%</>)
                : (<></>),
            //footer: (columnData) => `${formatPercentage(columnData.reduce((acc, item) => acc + item, 0) / (!columnData.length ? columnData.length : 1))}%`,
            footerStyle: { textAlign: 'right' },
            footer: (columnData) => { return `${formatPercentage(cashFlowStats.loanRate? cashFlowStats.loanRate : loanRate)}%`},
        },
        {
            dataField: 'msnRate',
            text: 'MSN Rate',
            sort: true,
            style: { width: '100px', textAlign: 'right' },
            filter: textFilter({
                placeholder: ' ',
            }),
            formatter: (cell) => (cell != undefined)
                ? (<>{formatPercentage(cell)}%</>)
                : (<></>),
                footer: (columnData) => { return `${formatPercentage(cashFlowStats.msnRate? cashFlowStats.msnRate : msnRate)}%`},
            footerStyle: { textAlign: 'right' },
        },
        {
            dataField: 'anualRevenue',
            text: 'Annual Revenue',
            sort: true,
            style: { width: '140px', textAlign: 'right' },
            filter: textFilter({
                placeholder: ' ',
            }),
            formatter: (cell) => (<>${formatCurrency(cell)}</>),
            footer: (columnData) => `$${formatCurrency(columnData.reduce((acc, item) => acc + item, 0))}`,
            footerStyle: { textAlign: 'right' },
        },
        {
            dataField: 'monthlyRevenue',
            text: 'Monthly Revenue',
            sort: true,
            style: { width: '140px', textAlign: 'right' },
            filter: textFilter({
                placeholder: ' ',
            }),
            formatter: (cell) => (<>${formatCurrency(cell)}</>),
            footer: (columnData) => `$${formatCurrency(columnData.reduce((acc, item) => acc + item, 0))}`,
            footerStyle: { textAlign: 'right' },
        },
        {
            dataField: 'monthsToMaturity',
            text: 'Months to Maturity',
            sort: true,
            style: { width: '140px', textAlign: 'right' },
            filter: textFilter({
                placeholder: ' ',
            }),
            formatter: (cell) => (<>{cell}</>),
            footer: ''
        }
    ];

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
                            keyField="loanNumber"
                            data={loans}
                            columns={columns}
                            defaultSorted={defaultCashflowSorted}
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

export default CashFlowTable;