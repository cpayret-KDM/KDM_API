import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col} from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import { getLoans, get60DayLoans, getCashFlowLoans } from '../../redux/actions';
import CashFlowTable from './CashFlowTable';
import LoansTable from './LoansTable';

const LoanDashboard = (props) => {

  const { loans, loansStats, report } = props;

  useEffect(() => {
    if (report === 'list') {
      props.getLoans();
    }
    else if (report === '60-day') {
      props.get60DayLoans();
    }
    else if (report === 'cash-flow') {
      props.getCashFlowLoans();
    }
  }, [report]);

  const breadcrumb = ((report) => {
    switch (report) {
      case 'list':
        return { label: 'Loans', path: '/loans/list' };
      case '60-day':
        return { label: '60 Day Loan Report', path: '/loans/60-day' };
      case 'cash-flow':
        return { label: 'Cash Flow Report', path: '/loans/cash-flow' }
      default:
        return { label: '', path: '' };
    }
  })(props.report);

  if (report === 'cash-flow') {
    return (
      <>
        <PageTitle
          breadCrumbItems={[
            {...breadcrumb},
          ]}
          title="Cash Flow Report"
        />

        <Row>
          <Col sm={12}>
            <CashFlowTable loans={loans} report={report} />
          </Col>
        </Row>
      </>
    );
  }
  else {
    return (
      <>
        <PageTitle
          breadCrumbItems={[
            {...breadcrumb},
          ]}
          title="Loans Dashboard"
        />

        <Row>
          <Col sm={12}>
            <LoansTable loans={loans} loansStats={loansStats} report={report} />
          </Col>
        </Row>
      </>
    );
  }
};

const mapStateToProps = state => {
  const { loans, loansStats } = state.Loan;
  return { loans, loansStats };
};

export default connect(
  mapStateToProps,
  { getLoans, get60DayLoans, getCashFlowLoans }
)(LoanDashboard);

