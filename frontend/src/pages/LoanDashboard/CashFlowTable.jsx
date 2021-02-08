import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Spinner } from 'reactstrap';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { Comparator, textFilter, dateFilter, selectFilter } from 'react-bootstrap-table2-filter';

import { paginationOptions, defaultSorted, percentageFilter, currencyFilter } from '../../helpers/table';

import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

var inc = 0;

const CashFlowTable = (props) => {
    console.log("render", ++inc)
    const { loans } = props;

    console.log(props);

    const title = "Cash Flow Report";
   
    //redundant with Loans Table method
    const handleReportChange = (e, value) => {
        if (props.report === value) return;
        else if (value === '60-day') window.location.href = "/loans/60-day";
        else window.location.href = "/loans/list";
      }

    const columns = [
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
            style: { width: '140px' },
            filter: textFilter({
                placeholder: ' ',
            }),
            footer: ''
        },
        {
            dataField: 'loanRate',
            text: 'Loan Rate',
            sort: true,
            style: { width: '140px' },
            filter: textFilter({
                placeholder: ' ',
            }),
            footer: ''
        },
        {
            dataField: 'msnRate',
            text: 'MSN Rate',
            sort: true,
            style: { width: '140px' },
            filter: textFilter({
                placeholder: ' ',
            }),
            footer: ''
        },
        {
            dataField: 'annualRevenue',
            text: 'Annual Revenue',
            sort: true,
            style: { width: '140px' },
            filter: textFilter({
                placeholder: ' ',
            }),
            footer: ''
        },
        {
            dataField: 'monthlyRevenue',
            text: 'Monthly Revenue',
            sort: true,
            style: { width: '140px' },
            filter: textFilter({
                placeholder: ' ',
            }),
            footer: ''
        },
        {
            dataField: 'dailyRevenue',
            text: 'Daily Revenue',
            sort: true,
            style: { width: '140px' },
            filter: textFilter({
                placeholder: ' ',
            }),
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
                            </AvField>
                        </AvGroup>
                        </AvForm>
                        <BootstrapTable
                            bootstrap4
                            keyField="loanNumber"
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

export default CashFlowTable;