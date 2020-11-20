import React from 'react';
import { Card, CardBody, Spinner } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { formatCurrency } from '../../helpers/utils';
import { paginationOptions, defaultSorted } from '../../helpers/table';

const ActionButtons = (cell, row) => {
  return (
    <div>
      <a
        href={`/loans/${row.id}`}
        type="button"
        className="btn btn-outline-primary btn-sm ts-buttom"
        size="sm"
      >
        View
      </a>
    </div>
  );
};

const LoansTable = (props) => {
  const { loans } = props;
  //console.log('LoansTable', loans)

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
    },
    {
      dataField: 'propertyType',
      text: 'Property Type',
      sort: true,
    },
    {
      dataField: 'ejRating',
      text: 'EJ Rating *',
      sort: false,
    },
    {
      dataField: 'maturity',
      text: 'Maturity',
      sort: false,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      
    },
    {
      dataField: 'initialAmount',
      text: 'Loan Amount',
      sort: true,
      formatter: (cell, row) => <>${formatCurrency(cell)}</>,
    },
    {
      dataField: 'appraisedValue',
      text: 'Appraised Value',
      sort: false,
    },
    {
      dataField: 'appraisalDate',
      text: 'Appraisal Date',
      sort: false,
    },
    {
      dataField: 'principalBalance',
      text: 'Principal Balance',
      sort: false,
    },
    {
      dataField: 'ltv',
      text: 'LTV',
      sort: false,
      formatter: (cell, row) => <>{cell}%</>,
    },
    {
      dataField: 'loanRate',
      text: 'Loan Rate',
      sort: false,
      formatter: (cell, row) => <>{cell}%</>,
    },
    {
      dataField: 'noteRate',
      text: 'Note Rate',
      sort: false,
    },
    {
      dataField: 'spread',
      text: 'Spread',
      sort: false,
    },
    {
      dataField: 'cusip',
      text: 'CUSIP',
      sort: false,
    },
    {
      dataField: 'annualSpread',
      text: 'Annual Spread',
      sort: false,
    },
    {
      dataField: 'monthlySpread',
      text: 'Monthly Spread',
      sort: false,
    },
    {
      dataField: "buttons",
      text: "",
      isDummyField: true,
      formatter: ActionButtons,
    }
  ];

  return (
    <Card>
      <CardBody>
        <h4 className="header-title">Current Loans</h4>

        {!loans ? (
          <p className="text-center"><Spinner size="lg" color="primary" /></p>
        ) : (
          <>
            {loans.length === 0 ? (
              <>No loans to show</>
            ) : (
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={loans}
                columns={columns}
                defaultSorted={defaultSorted}
                pagination={paginationFactory(paginationOptions)}
                wrapperClasses="table-responsive"
              />
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default LoansTable;