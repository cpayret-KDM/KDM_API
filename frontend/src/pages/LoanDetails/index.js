import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';


import PageTitle from '../../components/PageTitle';

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
          Loan Details
        </Col>
      </Row>
    </>
  );
};

export default LoanDashboard;
