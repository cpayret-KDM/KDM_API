import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Row, Col, Label, Button, InputGroupAddon, Card, CardBody, Spinner, UncontrolledAlert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../components/PageTitle';
import ModalProperty from './ModalProperty';
import ModalDeleteProperty from './ModalDeleteProperty';
import ModalDeleteLoan from './ModalDeleteLoan';
import ModalSponsor from './ModalSponsor';
import ModalDeleteSponsor from './ModalDeleteSponsor';

import { getLoan, createLoan, editLoan, deleteLoan, clearLoan } from '../../redux/actions';

import { EMPTY_LOAN, LOAN_STATUS_MAP, PIPELINE_STATUS_MAP, PROPERTY_TYPE_MAP } from '../../helpers/utils';

const LoanDetails = (props) => {
  const { loan = {...EMPTY_LOAN}, loaded } = props;
  const creating = (props.mode === 'create');
  const editing = (props.mode === 'edit');
  const viewing = !editing && !creating;

  const { id } = props?.match?.params;
  useEffect(() => {
    if (!props.creating) {      
      props.getLoan(id);
    } else {
      props.clearLoan();
    }
  }, [id, props]);

  const [property, setProperty] = useState({});
  const [propertyMode, setPropertyMode] = useState('create');
  const [sponsorMode, setSponsorMode] = useState('create');
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showDeletePropertyModal, setShowDeletePropertyModal] = useState(false);
  const [showDeleteLoanModal, setShowDeleteLoanModal] = useState(false);

  const [originationDate, setOriginationDate] = useState(new Date());
  useEffect(() => {
    if (!loan.originationDate) return;
    setOriginationDate(moment(loan.originationDate).toDate());
  }, [loan]);

  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [showDeleteSponsorModal, setShowDeleteSponsorModal] = useState(false);
  const [sponsor, setSponsor] = useState({});
  useEffect(() => {
    if (loan?.sponsor?.id) {
      setSponsor(loan.sponsor);
    }
  }, [loan]);

  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (props.added || props.edited) {
      setIsSaving(false);
    }
  }, [props.added, props.edited]);

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
    if (errors.length !== 0) return;
    setIsSaving(true);

    const newLoan = {
      ...loan,
      ...values,
      originationDate: originationDate,
    };

    if (editing) {
      props.editLoan(newLoan);
    }
    if (creating) {
      props.createLoan(newLoan);
    }
  }

  const handleDeleteLoan = (loanId) => {
    setShowDeleteLoanModal(true);
  }

  const handleAddNewProperty = (e) => {
    if (e) e.preventDefault();
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

  const toggleDeleteLoanModal = () => {
    setShowDeleteLoanModal(!showDeleteLoanModal);
  }

  const toggleSponsorModal = () => {
    setShowSponsorModal(!showSponsorModal);
  }

  const handleAddSponsor = (e) => {
    if (e) e.preventDefault();
    setSponsor({});
    setSponsorMode('create');
    setShowSponsorModal(true);
  }

  const handleEditSponsor = (sponsor) => {
    setSponsor({...sponsor});
    setSponsorMode('edit');
    setShowSponsorModal(true);
  }

  const handleDeleteSponsor = (sponsor) => {
    setSponsor({...sponsor});
    setShowDeleteSponsorModal(true);
  }

  const toggleDeleteSponsorModal = () => {
    setShowDeleteSponsorModal(!showDeleteSponsorModal);
  }

  console.log('loan',loan)

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
              <LoanActionButtons creating={creating} editing={editing} viewing={viewing} loanId={loan.id} handleDeleteLoan={handleDeleteLoan} isSaving={isSaving} />
              <Card>
                <CardBody>
                  <h4>Details</h4>

                  {props.added || props.edited && (
                    <UncontrolledAlert color="success">
                      {props.added && (<>Loan has been created.</>)}
                      {props.edited && (<>Changes have been saved.</>)}
                    </UncontrolledAlert>
                  )}

                  <Row>
                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="loanNumber">Loan Number *</Label>
                          <AvInput name="loanNumber" id="loanNumber" value={loan?.loanNumber} required disabled={viewing} />
                          <AvFeedback tooltip>Loan Number is required</AvFeedback>
                      </AvGroup>
                    </Col>

                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="initialAmount">Initial Amount *</Label>
                          <div className="input-group">
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <AvInput name="initialAmount" id="initialAmount" value={loan?.initialAmount} required disabled={viewing} />
                            <AvFeedback tooltip>Initial Amount is required</AvFeedback>
                          </div>
                      </AvGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="dealName">Deal Name *</Label>
                        <AvInput name="dealName" id="dealName" value={loan?.dealName} required disabled={viewing} />
                        <AvFeedback tooltip>Deal Name is required</AvFeedback>
                      </AvGroup>
                    </Col>

                    <Col sm={6}>
                    <AvGroup className="position-relative">
                        <Label for="principalBalance">Principal Amount *</Label>
                          <div className="input-group">
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <AvInput name="principalBalance" id="principalBalance" value={loan?.principalBalance} required disabled={viewing} />
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
                          <DatePicker
                            className={`form-control date ${viewing ? 'disabled' : ''}`}
                            dateFormat="MM/dd/yyyy" 
                            selected={originationDate}
                            onChange={date => setOriginationDate(date)}
                          />
                        </div>
                      </AvGroup>
                    </Col>

                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="loanStatus">Loan Status *</Label>
                        <AvField
                          name="loanStatus"
                          type="select"
                          required
                          disabled={viewing}
                          value={loan?.loanStatus || 'PERFORMING'}
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
                        <Label for="loanRate">Loan Rate *</Label>
                        <div className="input-group">
                          <AvInput name="loanRate" id="loanRate" value={loan?.loanRate} required disabled={viewing} />
                          <AvFeedback tooltip>Loan Rate is required</AvFeedback>
                          <InputGroupAddon addonType="append">%</InputGroupAddon>
                        </div>
                      </AvGroup>
                    </Col>

                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="pipelineStatus">Pipeline Status *</Label>
                        <AvField
                          name="pipelineStatus"
                          type="select"
                          required
                          disabled={viewing}
                          value={loan?.pipelineStatus || 'NEW'}
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

                  <Row>
                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="loanTermMonths">Loan Term (months) *</Label>
                        <AvInput type="number" name="loanTermMonths" id="loanTermMonths" value={loan?.loanTermMonths} required disabled={viewing} />
                        <AvFeedback tooltip>Loan Term is required</AvFeedback>
                      </AvGroup>
                    </Col>

                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="prepayMonths">Prepay (months) *</Label>
                        <AvInput type="number" name="prepayMonths" id="prepayMonths" value={loan?.prepayMonths} required disabled={viewing} />
                        <AvFeedback tooltip>Prepay is required</AvFeedback>
                      </AvGroup>
                    </Col>
                  </Row>

                  <hr />
                  <h4>Ratings</h4>

                  <Row>
                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="KDMRating">KDM Rating *</Label>
                        <AvInput name="KDMRating" id="KDMRating" value={loan?.KDMRating} required disabled={viewing} />
                        <AvFeedback tooltip>KDM Rating is required</AvFeedback>
                      </AvGroup>
                    </Col>

                    <Col sm={6}>
                      {/* <AvGroup className="position-relative">
                        <Label for="EJRating">EJ Rating *</Label>
                        <AvInput name="EJRating" id="EJRating" value={loan?.EJRating} required disabled={viewing} />
                        <AvFeedback tooltip>EJ Rating is required</AvFeedback>
                      </AvGroup> */}
                    </Col>
                  </Row>
                  
                </CardBody>
              </Card>

              {loan && loan.id && (<>
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <h4>Properties</h4>
                      <div className="">
                        <Button className="btn btn-secondary" onClick={() => handleAddNewProperty()}>Add New Property</Button>
                      </div>
                    </div>

                    {loan?.properties?.length === 0 ? (
                      <p>No properties exists for this loan. <strong><a href="/" onClick={(e) => handleAddNewProperty(e)}>Add one &raquo;</a></strong></p>
                    ) : (
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
                    )}
                    
                    {/* <PropertyMap /> */}
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                  <div className="d-flex justify-content-between">
                    <h4>Sponsor</h4>
                    {!sponsor.id && (
                      <div>
                        <Button className="btn btn-secondary" onClick={() => handleAddSponsor()}>Add Sponsor</Button>
                      </div>
                    )}
                  </div>

                    {!loan?.sponsor?.id ? (
                      <p>No sponsor exists for this loan. <strong><a href="/" onClick={(e) => handleAddSponsor(e)}>Add one &raquo;</a></strong></p>
                    ) : (
                      <Row>
                        <Col sm={4}>
                          <Card>
                            <CardBody>
                              <Row>
                                <Col sm={6}>
                                  <strong>{sponsor?.company}</strong><br />
                                  {sponsor?.firstName} {sponsor?.lastName}<br />
                                  {sponsor?.phone}<br />
                                  {sponsor?.email}<br />
                                  
                                </Col>
                                <Col sm={6}>
                                  {sponsor?.address?.street1}<br />
                                  {sponsor?.address?.street2 && (<>{sponsor?.address?.street2}<br /></>)}
                                  {sponsor?.address?.city}, <span className="text-uppercase">{sponsor?.address?.state}</span> {sponsor?.address?.zip}<br />
                                  <i>Registered in {sponsor?.registrationState}</i>
                                </Col>
                              </Row>
                              
                              <p className="mb-0 mt-3">
                                <Button className="btn btn-secondary mr-2" onClick={() => handleEditSponsor(sponsor)}>Edit</Button>
                                <Button className="btn btn-danger" onClick={() => handleDeleteSponsor(sponsor)}>Delete</Button>
                              </p>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    )}
                    
                  </CardBody>
                </Card>
              </>)}
              <LoanActionButtons creating={creating} editing={editing} viewing={viewing} loanId={loan.id} handleDeleteLoan={handleDeleteLoan} isSaving={isSaving} />
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
      <ModalDeleteLoan
        isOpen={showDeleteLoanModal} 
        toggle={toggleDeleteLoanModal}
        loanId={loan?.id}
      />
      <ModalSponsor
        isOpen={showSponsorModal} 
        toggle={toggleSponsorModal}
        mode={sponsorMode}
        sponsor={sponsor}
        loanId={loan?.id}
      />
      <ModalDeleteSponsor
        isOpen={showDeleteSponsorModal} 
        toggle={toggleDeleteSponsorModal}
        sponsorId={sponsor.id}
        loanId={loan?.id}
      />
    </>
  );
};

const LoanActionButtons = ({ creating, editing, viewing, loanId, handleDeleteLoan, isSaving }) => {
  return (
    <div className="d-flex justify-content-end mb-3">
      {creating && (
        <>
          <Link to="/loans/list" className="btn btn-secondary mr-2">Cancel</Link>
          <Button type="submit" className="btn btn-primary">
            {isSaving 
              ? (<Spinner size="sm" color="primary" />) 
              : (<>Save New Loan</>)
            }
          </Button>
        </>
      )}

      {editing && (
        <>
          <Link to={`/loans/${loanId}`} className="btn btn-secondary mr-2">Cancel</Link>
          <Button type="submit" className="btn btn-primary">
            {isSaving 
              ? (<Spinner size="sm" color="primary" />) 
              : (<>Save Changes</>)
            }
          </Button>
        </>
      )}

      {viewing && (
        <>
          <Button className="btn btn-danger mr-2" onClick={(e) => handleDeleteLoan(loanId)}>Delete Loan</Button>
          <Link to={`/loans/${loanId}/edit`} className="btn btn-primary">Edit Loan</Link>
        </>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return state.Loan
};

export default connect(
  mapStateToProps,
  { getLoan, createLoan, editLoan, deleteLoan, clearLoan }
)(LoanDetails);