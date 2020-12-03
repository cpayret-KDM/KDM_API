import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Label, Button, InputGroupAddon, Card, CardBody, Spinner } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../components/PageTitle';
import PropertyMap from './PropertyMap';
import HyperDatepicker from '../../components/Datepicker';
import { getLoan, createLoan, editLoan, deleteLoan } from '../../redux/actions';




const LoanDetails = (props) => {
  const { mode, loan = {} } = props;
  const creating = (mode === 'create');
  const editing = (mode === 'edit');
  const viewing = !editing && !creating;

  const { id } = props?.match?.params;
  useEffect(() => {
    if (!creating) {      
      props.getLoan(id);
    }
  }, [mode]);

  const breadcrumb = ((mode) => {
    switch (mode) {
      case 'create':
        return { label: 'Create Loan', path: '/loans/create' };
      case 'edit':
        return { label: 'Edit Loan', path: `/loans/${id}/edit` };
      default:
        return { label: 'Loan Details', path: `/loans/${id}` };
    }
  })(mode);

  const submitLoan = (e, errors, values) => {
    e.preventDefault();
    if (errors.length !== 0) return;

    const newLoan = {
      ...loan,
      ...values,
    };

    if (editing) {
      props.editLoan(newLoan);
    }
    if (creating) {
      props.createLoan(newLoan);
    }
  }

  console.log('Loan:', loan)

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Loans', path: '/loans/list' },
          {...breadcrumb},
        ]}
        title={'Loan Details'}
      />

      <Row>
        <Col sm={12}>
          {!loan ? (
            <div className="text-center"><Spinner size="lg" color="primary" /></div>
          ) : (
            <AvForm onSubmit={submitLoan}>
              <LoanActionButtons creating={creating} editing={editing} viewing={viewing} />
              <Card>
                <CardBody>
                  <h4>Details</h4>

                  <Row>
                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="loanNumber">Loan Number *</Label>
                          <AvInput name="loanNumber" id="loanNumber" value={loan.loanNumber} required disabled={viewing} />
                          <AvFeedback tooltip>Loan Number is required</AvFeedback>
                      </AvGroup>
                    </Col>

                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="initialAmount">Initial Amount *</Label>
                          <div className="input-group">
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <AvInput name="initialAmount" id="initialAmount" value={loan.initialAmount} required disabled={viewing} />
                            <AvFeedback tooltip>Initial Amount is required</AvFeedback>
                          </div>
                      </AvGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="dealName">Deal Name *</Label>
                        <AvInput name="dealName" id="dealName" value={loan.dealName} required disabled={viewing} />
                        <AvFeedback tooltip>Deal Name is required</AvFeedback>
                      </AvGroup>
                    </Col>

                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="KDMRating">KDM Rating *</Label>
                        <AvInput name="KDMRating" id="KDMRating" value={loan.KDMRating} required disabled={viewing} />
                        <AvFeedback tooltip>KDM Rating is required</AvFeedback>
                      </AvGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="originationDate">Origination Date *</Label>
                        <div className="input-group">
                          <InputGroupAddon addonType="prepend">
                            a
                          </InputGroupAddon>
                          <HyperDatepicker 
                            name="originationDate" 
                            id="originationDate" 
                            value={loan.originationDate} 
                            hideAddon={true} 
                            dateFormat="MM/dd/yyyy" 
                            required 
                            disabled={viewing} 
                          />
                          <AvFeedback tooltip>Origination Date is required</AvFeedback>
                        </div>
                      </AvGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="loanRate">Loan Rate *</Label>
                        <div className="input-group">
                          <AvInput name="loanRate" id="loanRate" value={loan.loanRate} required disabled={viewing} />
                          <AvFeedback tooltip>Loan Rate is required</AvFeedback>
                          <InputGroupAddon addonType="append">%</InputGroupAddon>
                        </div>
                      </AvGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="loanStatus">Loan Status *</Label>
                        <AvField
                          name="loanStatus"
                          type="select"
                          required
                          disabled={viewing}
                          value={loan.loanStatus}
                          className="custom-select"
                        >
                          <option value="Performing">Performing</option>
                          <option value="30 Days Late">30 Days Late</option>
                          <option value="60 Days Late">60 Days Late</option>
                          <option value="90 Days Late">90 Days Late</option>
                          <option value="Default">Default</option>
                          <option value="Foreclosure">Foreclosure</option>
                        </AvField>
                        <AvFeedback tooltip>Loan Status is required</AvFeedback>
                      </AvGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="pipelineStatus">Pipeline Status *</Label>
                        <AvField
                          name="pipelineStatus"
                          type="select"
                          required
                          disabled={viewing}
                          value={loan.pipelineStatus}
                          className="custom-select"
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Funded">Funded</option>
                          <option value="Closed">Closed</option>
                        </AvField>
                        <AvFeedback tooltip>Pipeline Status is required</AvFeedback>
                      </AvGroup>
                    </Col>
                  </Row>
                  
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h4>Properties</h4>

                  <Row>
                    {loan?.properties?.map((property) => (
                      <Col sm={4}>
                        <Card>
                          <CardBody>
                            <strong>{property.address.street1}</strong>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  
                  {/* <PropertyMap /> */}
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h4>Sponsor</h4>
                </CardBody>
              </Card>

              <LoanActionButtons creating={creating} editing={editing} viewing={viewing} />
            </AvForm>
          )}
        </Col>
      </Row>
    </>
  );
};

const LoanActionButtons = ({ creating, editing, viewing }) => {
  return (
    <div className="d-flex justify-content-end mb-3">
      {!viewing && (
        <>
          <Button color="secondary" type="cancel" className="mr-2">Cancel</Button>
          <Button color="primary" type="submit">
            {editing && (
              <>Save Changes</>
            )}
            {creating && (
              <>Create New Loan</>
            )}
          </Button>
        </>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  const { loan } = state.Loan;
  return { loan };
};

export default connect(
  mapStateToProps,
  { getLoan, createLoan, editLoan, deleteLoan }
)(LoanDetails);