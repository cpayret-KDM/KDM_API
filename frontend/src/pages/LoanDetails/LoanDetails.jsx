import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Label, Button, InputGroupAddon, InputGroupText, Card, CardBody, Spinner } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../components/PageTitle';
import ModalProperty from './ModalProperty';
import ModalDeleteProperty from './ModalDeleteProperty';
import HyperDatepicker from '../../components/Datepicker';
import { getLoan, createLoan, editLoan, deleteLoan, clearLoan } from '../../redux/actions';

import { LOAN_STATUS_MAP, PIPELINE_STATUS_MAP, PROPERTY_TYPE_MAP } from '../../helpers/utils';

const LoanDetails = (props) => {
  const { loan = {}, loaded } = props;
  const creating = (props.mode === 'create');
  const editing = (props.mode === 'edit');
  const viewing = !editing && !creating;

  const { id } = props?.match?.params;
  useEffect(() => {
    if (!creating) {      
      props.getLoan(id);
    } else {
      props.clearLoan();
    }
  }, [creating, id]);

  const [property, setProperty] = useState({});
  const [propertyMode, setPropertyMode] = useState('create');
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showDeletePropertyModal, setShowDeletePropertyModal] = useState(false);

  const breadcrumb = ((mode) => {
    switch (mode) {
      case 'create':
        return { label: 'Create New Loan', path: '/loans/create' };
      case 'edit':
        return { label: 'Edit Loan', path: `/loans/${id}/edit` };
      default:
        return { label: 'Loan Details', path: `/loans/${id}` };
    }
  })(props.mode);

  const title = ((mode) => {
    switch (mode) {
      case 'create':
        return 'Create New Loan';
      case 'edit':
        return 'Edit Loan';
      default:
        return 'Loan Details';
    }
  })(props.mode);

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

  const handleAddNewProperty = () => {
    setProperty({});
    setPropertyMode('create');
    setShowPropertyModal(true);
  }

  const handleEditProperty = (property) => {
    setProperty({...property});
    setPropertyMode('edit');
    setShowPropertyModal(true);
  }

  const handleDeleteProperty = (property) => {
    setProperty({...property});
    setShowDeletePropertyModal(true);
  }

  const toggleDeletePropertyModal = () => {
    setShowDeletePropertyModal(!showDeletePropertyModal);
  }

  const toggleShowPropertyModal = () => {
    setShowPropertyModal(!showPropertyModal);
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Loans', path: '/loans/list' },
          {...breadcrumb},
        ]}
        title={title}
      />

      <Row>
        <Col sm={12}>
          {!loaded && !creating ? (
            <div className="text-center"><Spinner size="lg" color="primary" /></div>
          ) : (
            <AvForm onSubmit={submitLoan}>
              <LoanActionButtons creating={creating} editing={editing} viewing={viewing} loanId={loan.id} />
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
                        <Label for="principalAmount">Principal Amount *</Label>
                          <div className="input-group">
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <AvInput name="principalAmount" id="principalAmount" value={loan.principalAmount} disabled={viewing} />
                            <AvFeedback tooltip>Principal Amount is required</AvFeedback>
                          </div>
                      </AvGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="originationDate">Origination Date *</Label>
                        <div className="input-group">
                          {/* <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="mdi mdi-calendar-weekend" aria-hidden="true"></i>
                            </InputGroupText>
                          </InputGroupAddon> */}
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
                          value={loan.loanStatus || 'PERFORMING'}
                          className="custom-select"
                        >
                          {Object.entries(LOAN_STATUS_MAP).map((status, i) => 
                            (<option value={status[0]} key={i}>{status[1]}</option>)
                          )}
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
                          value={loan.pipelineStatus || 'NEW'}
                          className="custom-select"
                        >
                          {Object.entries(PIPELINE_STATUS_MAP).map((status, i) => 
                            (<option value={status[0]} key={i}>{status[1]}</option>)
                          )}
                        </AvField>
                        <AvFeedback tooltip>Pipeline Status is required</AvFeedback>
                      </AvGroup>
                    </Col>
                  </Row>
                  
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <h4>Properties</h4>
                    <div className="">
                      <Button className="btn btn-secondary" onClick={() => handleAddNewProperty()}>Add New Property</Button>
                    </div>
                  </div>

                  <Row>
                    {loan?.properties?.map((property, i) => (
                      <Col sm={4} key={i}>
                        <Card>
                          <CardBody>
                            <p>
                              {property.name && (<h5>{property.name}</h5>)}
                              <strong>{property.address.street1}</strong><br />
                              {property.address.street2 && (<>{property.address.street2}<br /></>)}
                              {property.address.city}, <span className="text-uppercase">{property.address.state}</span> {property.address.zip}<br />
                              <i>{PROPERTY_TYPE_MAP[property.type]}</i>
                            </p>
                            <p className="mb-0">
                              <Button className="btn btn-secondary mr-2" onClick={() => handleEditProperty(property)}>Edit</Button>
                              <Button className="btn btn-danger" onClick={() => handleDeleteProperty(property)}>Delete</Button>
                            </p>
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

              <LoanActionButtons creating={creating} editing={editing} viewing={viewing} loanId={loan.id} />
            </AvForm>
          )}
        </Col>
      </Row>

      <ModalProperty 
        isOpen={showPropertyModal} 
        toggle={toggleShowPropertyModal}
        mode={propertyMode}
        property={property}
        loanId={loan?.id}
      />
      <ModalDeleteProperty 
        isOpen={showDeletePropertyModal} 
        toggle={toggleDeletePropertyModal}
        propertyId={property.id}
        loanId={loan?.id}
      />
    </>
  );
};

const LoanActionButtons = ({ creating, editing, viewing, loanId }) => {
  return (
    <div className="d-flex justify-content-end mb-3">
      {creating && (
        <>
          <Link to="/loans/list" className="btn btn-secondary mr-2">Cancel</Link>
          <Button type="submit" className="btn btn-primary">Save New Loan</Button>
        </>
      )}

      {editing && (
        <>
          <Link to={`/loans/${loanId}`} className="btn btn-secondary mr-2">Cancel</Link>
          <Button type="submit" className="btn btn-primary">Save Changes</Button>
        </>
      )}

      {viewing && (
        <>
          <Link to={`/loans/${loanId}/edit`} className="btn btn-primary">Edit Loan</Link>
        </>
      )}


      {/* {!viewing ? (
        <>
          <Button color="secondary" className="mr-2" onClick={(e) => handleCancel(loanId)}>Cancel</Button>
          <Button color="primary" type="submit">
            {editing && (
              <>Save Changes</>
            )}
            {creating && (
              <>Create New Loan</>
            )}
          </Button>
        </>
      ) : (
        <>
          <Button color="primary" onClick={() => handleEditLoan(loanId)}>Edit Loan</Button>
        </>
      )} */}
    </div>
  );
}

const mapStateToProps = state => {
  const { 
    loan, 
    loaded
  } = state.Loan;
  return {
    loan,
    loaded
  };
};

export default connect(
  mapStateToProps,
  { getLoan, createLoan, editLoan, deleteLoan, clearLoan }
)(LoanDetails);