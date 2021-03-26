import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import { getSecurities } from '../../redux/actions';
import SecuritiesTable from './SecuritiesTable';

const SecurityDashboard = (props) => {

  const { securities, report } = props;

  useEffect(() => {
    if (report === 'list') {
      props.getSecurities(100);
    }
  }, [report]);

  const breadcrumb = ((report) => {
    switch (report) {
      case 'list':
        return { label: 'Securities', path: '/securities/list' };
    }
  })(props.report);

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { ...breadcrumb },
        ]}
        title="Securities Dashboard"
      />

      <Row>
        <Col sm={12}>
          <SecuritiesTable securities={securities} report={report} />
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

