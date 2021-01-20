import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col} from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import LoansTable from './LoansTable';
import { getLoans, get60DayLoans } from '../../redux/actions';

const LoanDashboard = (props) => {

  const { loans, report } = props;

  useEffect(() => {
    if (report === 'list') {
      props.getLoans();
    }
    else if (report === '60-day') {
      props.get60DayLoans();
    }
  }, [report]);

  const breadcrumb = ((report) => {
    switch (report) {
      case 'list':
        return { label: 'Loans', path: '/loans/list' };
      case '60-day':
        return { label: '60 Day Loan Report', path: '/loans/60-day' };
      default:
        return { label: '', path: '' };
    }
  })(props.report);

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {...breadcrumb},
        ]}
        title="Dashboard"
      />

      <Row>
        <Col sm={12}>
          <LoansTable loans={loans?.content} report={report} />
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
  { getLoans, get60DayLoans }
)(LoanDashboard);

