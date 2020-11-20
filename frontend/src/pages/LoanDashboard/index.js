import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col} from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import LoansTable from './LoansTable';
import { getLoans } from '../../redux/actions';

const LoanDashboard = (props) => {

  useEffect(() => {
    props.getLoans();
  }, []);

  const { loans } = props;
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Loans', path: '/loans/list' },
        ]}
        title={'Loans'}
      />

      <Row>
        <Col sm={12}>
          <LoansTable loans={loans?.content} />
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = state => {
  const { loans } = state.Loan;
  return { loans };
};

export default connect(
  mapStateToProps,
  { getLoans }
)(LoanDashboard);

