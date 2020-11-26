import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, Spinner } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import { getLoan } from '../../redux/actions';

const LoanDetails = (props) => {
  const { id } = props?.match?.params;

  useEffect(() => {
    props.getLoan(id);
  }, []);

  const { loan } = props;
  console.log('the loan', loan)
  
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Loans', path: '/loans/list' },
          { label: 'Loan Details', path: `/loans/${id}` },
        ]}
        title={'Loan Details'}
      />

      <Row>
        <Col sm={12}>
          {!loan ? (
            <p className="text-center"><Spinner size="lg" color="primary" /></p>
          ) : (
            <>
              <Card>
                <CardBody>
                  <h4>Details</h4>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h4>Properties</h4>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h4>Sponsor</h4>
                </CardBody>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = state => {
  const { loan } = state.Loan;
  return { loan };
};

export default connect(
  mapStateToProps,
  { getLoan }
)(LoanDetails);

