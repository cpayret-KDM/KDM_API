import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import PageTitle from '../../components/PageTitle';

const records = [
  {
    number: 1,
    ticker: 'KDM2017-N001',
    property: '4771 78th Avenue, LLC, and 14120 Palm Street',
    propertyType: 'Multi-family',
    ejRating: 'A+',
    maturity: '5/1/2017',
    status: 'Performing',
    loanAmount: '$1,059,000',
    appraisedValue: '$1,920,000',
    appraisalDate: '3/1/2017',
    principalBalance: '$1,018,765',
    ltv: '53.06%',
    loanRate: '5.25%',
    noteRate: '5.00%',
    spread: '0.25%',
    cusip: '50067AAC6',
    annualSpread: '$4,659',
    monthlySpread:  '$388',
  },
  {
    number: 2,
    ticker: 'KDM2017-N001',
    property: '4771 78th Avenue, LLC, and 14120 Palm Street',
    propertyType: 'Multi-family',
    ejRating: 'A+',
    maturity: '5/1/2017',
    status: 'Performing',
    loanAmount: '$1,059,000',
    appraisedValue: '$1,920,000',
    appraisalDate: '3/1/2017',
    principalBalance: '$1,018,765',
    ltv: '53.06%',
    loanRate: '5.25%',
    noteRate: '5.00%',
    spread: '0.25%',
    cusip: '50067AAC6',
    annualSpread: '$4,659',
    monthlySpread:  '$388',
  },
  {
    number: 3,
    ticker: 'KDM2017-N001',
    property: '4771 78th Avenue, LLC, and 14120 Palm Street',
    propertyType: 'Multi-family',
    ejRating: 'A+',
    maturity: '5/1/2017',
    status: 'Performing',
    loanAmount: '$1,059,000',
    appraisedValue: '$1,920,000',
    appraisalDate: '3/1/2017',
    principalBalance: '$1,018,765',
    ltv: '53.06%',
    loanRate: '5.25%',
    noteRate: '5.00%',
    spread: '0.25%',
    cusip: '50067AAC6',
    annualSpread: '$4,659',
    monthlySpread:  '$388',
  },
  {
    number: 4,
    ticker: 'KDM2017-N001',
    property: '4771 78th Avenue, LLC, and 14120 Palm Street',
    propertyType: 'Multi-family',
    ejRating: 'A+',
    maturity: '5/1/2017',
    status: 'Performing',
    loanAmount: '$1,059,000',
    appraisedValue: '$1,920,000',
    appraisalDate: '3/1/2017',
    principalBalance: '$1,018,765',
    ltv: '53.06%',
    loanRate: '5.25%',
    noteRate: '5.00%',
    spread: '0.25%',
    cusip: '50067AAC6',
    annualSpread: '$4,659',
    monthlySpread:  '$388',
  },
  {
    number: 5,
    ticker: 'KDM2017-N001',
    property: '4771 78th Avenue, LLC, and 14120 Palm Street',
    propertyType: 'Multi-family',
    ejRating: 'A+',
    maturity: '5/1/2017',
    status: 'Performing',
    loanAmount: '$1,059,000',
    appraisedValue: '$1,920,000',
    appraisalDate: '3/1/2017',
    principalBalance: '$1,018,765',
    ltv: '53.06%',
    loanRate: '5.25%',
    noteRate: '5.00%',
    spread: '0.25%',
    cusip: '50067AAC6',
    annualSpread: '$4,659',
    monthlySpread:  '$388',
  },
];

const columns = [
  {
    dataField: 'number',
    text: '#',
    sort: true,
  },
  {
    dataField: 'ticker',
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
    sort: false,
  },
  {
    dataField: 'loanAmount',
    text: 'Loan Amount',
    sort: false,
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
  },
  {
    dataField: 'loanRate',
    text: 'Loan Rate',
    sort: false,
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
];

const defaultSorted = [
  {
    dataField: 'id',
    order: 'asc',
  },
];


const LoanDashboard = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Loans', path: '/pages/loans' },
        ]}
        title={'Loans'}
      />

      <Row>
        <Col sm={12}>
          <LoanTable />
        </Col>
      </Row>
    </>
  );
};

const LoanTable = () => {
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-2">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const paginationOptions = {
    paginationSize: 5,
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
        text: 'All',
        value: records.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  return (
    <Card>
      <CardBody>
        <h4 className="header-title">Recent Loans</h4>
        <p className="text-muted font-14 mb-4">
          * Ratings are the original ratings received at issuance from Egan-Jones Ratings Agency.<br />
          ** Non-sequential loan numbers are due to some loans having been issued a file number, but the transaction was not closed or is waiting to be closed.
        </p>

        <BootstrapTable
          bootstrap4
          keyField="id"
          data={records}
          columns={columns}
          defaultSorted={defaultSorted}
          pagination={paginationFactory(paginationOptions)}
          wrapperClasses="table-responsive"
        />
      </CardBody>
    </Card>
  );
};

export default LoanDashboard;
