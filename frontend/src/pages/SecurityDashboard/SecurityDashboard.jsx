import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import SecuritiesTable from './SecuritiesTable';
import { getSecurities } from '../../redux/actions';
// import { getSecurities, get60DaySecurities } from '../../redux/actions';

const SecurityDashboard = (props) => {

  const { securities, report } = props;

  useEffect(() => {
    if (report === 'list') {
      props.getSecurities();
    }
  }, [report]);

  const breadcrumb = ((report) => {
    switch (report) {
      case 'list':
        return { label: 'Securities', path: '/securities/list' };
    }
  })(props.report);

  // const { securities, report } = props;
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { ...breadcrumb },
        ]}
        title="Dashboard"
      />

      <Row>
        <Col sm={12}>
          <SecuritiesTable securities={securities?.content} report={report} />
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = state => {
  const { securities } = state.Security;
  return { securities };
};

export default connect(
  mapStateToProps,
  { getSecurities }
)(SecurityDashboard);

