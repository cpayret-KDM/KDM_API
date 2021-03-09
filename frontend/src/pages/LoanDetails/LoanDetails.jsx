import React, { useState, useEffect } from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Label, Button, InputGroupAddon, Card, CardBody, Spinner, UncontrolledAlert } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import { formatCurrency, DATE_FORMAT, EMPTY_LOAN, LOAN_STATUS_MAP, PIPELINE_STATUS_MAP, PROPERTY_TYPE_MAP } from '../../constants/utils';
import { getLoan, createLoan, editLoan, deleteLoan, clearLoan } from '../../redux/actions';
import ModalDeleteLoan from './ModalDeleteLoan';
import ModalDeleteProperty from './ModalDeleteProperty';
import ModalDeleteSponsor from './ModalDeleteSponsor';
import ModalProperty from './ModalProperty';
import ModalSponsor from './ModalSponsor';
import RatingsTable from './RatingsTable';

const LoanDetails = (props) => {
  const { loan = {...EMPTY_LOAN} } = props;
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
  }, [id, creating, props.getLoan, props.clearLoan]);

  const [propertyId, setPropertyId] = useState(null);
  const [propertyMode, setPropertyMode] = useState('create');
  const [sponsorMode, setSponsorMode] = useState('create');

  const [originationDate, setOriginationDate] = useState(new Date());
  useEffect(() => {
    if (!loan.originationDate) {
      return;
    }
    setOriginationDate(moment(loan.originationDate).toDate());
  }, [loan]);

  const [showSponsorModal, setShowSponsorModal] = useState(false);
  
  const [sponsorId, setSponsorId] = useState(null);
  useEffect(() => {
    if (loan?.sponsor?.id) {
      setSponsorId(loan.sponsor.id);
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

  /* Loan */
  const submitLoan = (e, errors, values) => {
    if (errors.length !== 0) {
      return;
    }
    setIsSaving(true);

    const newLoan = {
      ...loan,
      ...values,
      ratings: formatRatings(loanRatings),
      originationDate: originationDate,
    };

    if (editing) {
      props.editLoan(newLoan);
    }
    if (creating) {
      props.clearLoan()
      props.createLoan(newLoan);
    }
  }

  const [showDeleteLoanModal, setShowDeleteLoanModal] = useState(false);
  //TODO: Why isn't loanId used here? Is this the right method to call?
  //const handleDeleteLoan = (loanId) => {
  const handleDeleteLoan = () => {
    setShowDeleteLoanModal(true);
  }

  const toggleDeleteLoanModal = () => {
    setShowDeleteLoanModal(!showDeleteLoanModal);
  }

  /* Properties */
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const toggleShowPropertyModal = () => {
    setShowPropertyModal(!showPropertyModal);
  }

  const handleAddNewPropertyModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    setPropertyId(1);
    setPropertyMode('create');
    setShowPropertyModal(true);
  }

  const handleEditPropertyModal = (propertyId) => {
    setPropertyId(propertyId);
    setPropertyMode('edit');
    setShowPropertyModal(true);
  }

  const [showDeletePropertyModal, setShowDeletePropertyModal] = useState(false);
  const handleDeletePropertyModal = (propertyId) => {
    setPropertyId(propertyId);
    setShowDeletePropertyModal(true);
  }

  const toggleDeletePropertyModal = () => {
    setShowDeletePropertyModal(false);
    setShowPropertyModal(false);
  }

  /* Sponsor */
  const toggleSponsorModal = () => {
    setShowSponsorModal(!showSponsorModal);
  }

  const handleAddSponsorModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    setSponsorId(1);
    setSponsorMode('create');
    setShowSponsorModal(true);
  }

  const handleEditSponsorModal = (sponsorId) => {
    setSponsorId(sponsorId);
    setSponsorMode('edit');
    setShowSponsorModal(true);
  }

  const [showDeleteSponsorModal, setShowDeleteSponsorModal] = useState(false);
  const handleDeleteSponsorModal = (sponsorId) => {
    setSponsorId(sponsorId);
    setShowDeleteSponsorModal(true);
  }

  const toggleDeleteSponsorModal = () => {
    setShowDeleteSponsorModal(false);
    setShowSponsorModal(false);
  }

  /* Ratings */
  const [loanRatings, setLoanRatings] = useState([]);
  const [hasRatingsError, setHasRatingsError] = useState(false);
  const handleEditLoanRatings = (ratings, hasError) => {
    if (hasError) {
      setHasRatingsError(true)
    }
    const newLoanRatings = [...ratings];
    setLoanRatings([...newLoanRatings]);
  }

  const formatRatings = (ratings) => {
    const formattedRatings = [];
    ratings.forEach(rating => {
      formattedRatings.push({
        ratingId: rating.value,
        note: rating.note,
        date: rating.date,
      });
    });
    return formattedRatings;
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
          {!props.loaded && !creating ? (
            <div className="text-center"><Spinner size="lg" color="primary" /></div>
          ) : (
            <AvForm onSubmit={submitLoan}>
              <LoanActionButtons creating={creating} editing={editing} viewing={viewing} loanId={loan.id} handleDeleteLoan={handleDeleteLoan} isSaving={isSaving} hasRatingsError={hasRatingsError} />
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
                          <AvInput name="loanNumber" id="loanNumber" value={loan?.loanNumber || ''} required disabled={viewing} />
                          <AvFeedback tooltip>Loan Number is required</AvFeedback>
                      </AvGroup>
                    </Col>

                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="initialAmount">Initial Amount *</Label>
                          <div className="input-group">
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <AvInput name="initialAmount" id="initialAmount" value={loan?.initialAmount || ''} required disabled={viewing} />
                            <AvFeedback tooltip>Initial Amount is required</AvFeedback>
                          </div>
                      </AvGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6}>
                      <AvGroup className="position-relative">
                        <Label for="dealName">Deal Name *</Label>
                        <AvInput name="dealName" id="dealName" value={loan?.dealName || ''} required disabled={viewing} />
                        <AvFeedback tooltip>Deal Name is required</AvFeedback>
                      </AvGroup>
                    </Col>

                    <Col sm={6}>
                    <AvGroup className="position-relative">
                        <Label for="principalBalance">Principal Amount *</Label>
                          <div className="input-group">
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <AvInput name="principalBalance" id="principalBalance" value={loan?.principalBalance || ''} required disabled={viewing} />
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
                              className="form-control date"
                              dateFormat="MM/dd/yyyy"
                              selected={originationDate}
                              onChange={ date => setOriginationDate(date) }
                              required disabled={ viewing }
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
                    {/* TODO: Remove this code if not needed */}
                    {/* Ryan - temp as I move to Properties Modal
                    <Row>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="borrower">Borrower *</Label>
                          <AvInput name="borrower" id="borrower" value={loan?.borrower} required disabled={viewing} />
                          <AvFeedback tooltip>Borrower is required</AvFeedback>
                        </AvGroup>
                      </Col>
                    </Row> */}

                  {!creating && (
                    <>
                      <hr />
                      <h4>Ratings</h4>
                      <RatingsTable 
                        item={loan}
                        itemType="loan"
                        editing={editing}
                        viewing={viewing}
                        update={handleEditLoanRatings}
                      />
                    </>
                  )}
                </CardBody>
              </Card>

              {loan && loan.id && (<>
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <h4>Properties</h4>
                      <div className="">
                        <Button className="btn btn-secondary" onClick={() => handleAddNewPropertyModal()}>Add New Property</Button>
                      </div>
                    </div>

                    {loan?.properties?.length === 0 ? (
                      <p>No properties exists for this loan. <strong><a href="/" onClick={(e) => handleAddNewPropertyModal(e)}>Add one &raquo;</a></strong></p>
                    ) : (
                      <Row>
                        {loan?.properties?.map((property, i) => (
                          <Col sm={4} key={i}>
                            <Card>
                              <CardBody>
                                <Row>
                                  <Col sm={6}>
                                    <p>
                                      {property.address.name && (<strong>{property.address.name}<br /></strong>)}
                                      {property.address.street1}<br />
                                      {property.address.street2 && (<>{property.address.street2}<br /></>)}
                                      {property.address.city}, <span className="text-uppercase">{property.address.state}</span> {property.address.zip}<br />
                                      <i>{PROPERTY_TYPE_MAP[property.type]}</i>
                                    </p>
                                    <p className="mb-0">
                                      <Button className="btn btn-secondary mr-2" onClick={() => handleEditPropertyModal(property.id)}>Edit</Button>
                                      <Button className="btn btn-danger" onClick={() => handleDeletePropertyModal(property.id)}>Delete</Button>
                                    </p>
                                  </Col>
                                  <Col sm={6}>
                                    {!property.appraisal ? (
                                      <em>No appraisal for this property.</em>
                                    ) : (
                                      <>
                                        <strong>Appraised for ${formatCurrency(property.appraisal.value)} on {moment(property.appraisal.date).format(DATE_FORMAT)}.</strong>
                                        {property.appraisal.note && (<em><br />{property.appraisal.note}</em>)}
                                      </>
                                    )}
                                  </Col>
                                </Row>
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
                      {!loan?.sponsor?.id && (
                        <div>
                          <Button className="btn btn-secondary" onClick={() => handleAddSponsorModal()}>Add Sponsor</Button>
                        </div>
                      )}
                    </div>

                    {!loan?.sponsor?.id ? (
                      <p>No sponsor exists for this loan. <strong><a href="/" onClick={(e) => handleAddSponsorModal(e)}>Add one &raquo;</a></strong></p>
                    ) : (
                      <Row>
                        <Col sm={4}>
                          <Card>
                            <CardBody>
                              <Row>
                                <Col sm={6}>
                                  <strong>{loan?.sponsor?.company}</strong><br />
                                  {loan?.sponsor?.firstName} {loan?.sponsor?.lastName}<br />
                                  {loan?.sponsor?.phone}<br />
                                  {loan?.sponsor?.email}<br />
                                  
                                </Col>
                                <Col sm={6}>
                                  {loan?.sponsor?.address?.street1}<br />
                                  {loan?.sponsor?.address?.street2 && (<>{loan?.sponsor?.address?.street2}<br /></>)}
                                  {loan?.sponsor?.address?.city}, <span className="text-uppercase">{loan?.sponsor?.address?.state}</span> {loan?.sponsor?.address?.zip}<br />
                                  <i>Registered in {loan?.sponsor?.registrationState}</i>
                                </Col>
                              </Row>
                              
                              <p className="mb-0 mt-3">
                                <Button className="btn btn-secondary mr-2" onClick={() => handleEditSponsorModal(loan.sponsor.id)}>Edit</Button>
                                <Button className="btn btn-danger" onClick={() => handleDeleteSponsorModal(loan.sponsor.id)}>Delete</Button>
                              </p>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    )}
                  </CardBody>
                </Card>
              </>)}
              <LoanActionButtons creating={creating} editing={editing} viewing={viewing} loanId={loan.id} handleDeleteLoan={handleDeleteLoan} isSaving={isSaving} hasRatingsError={hasRatingsError} />
            </AvForm>
          )}
        </Col>
      </Row>


      <ModalDeleteLoan
        isOpen={showDeleteLoanModal} 
        toggle={toggleDeleteLoanModal}
        loanId={loan?.id}
      />
      {propertyId && (
        <>
          <ModalProperty 
            isOpen={showPropertyModal} 
            toggle={toggleShowPropertyModal}
            mode={propertyMode}
            propertyId={propertyId}
            loanId={loan?.id}
          />
          <ModalDeleteProperty 
            isOpen={showDeletePropertyModal} 
            toggle={toggleDeletePropertyModal}
            propertyId={propertyId}
            loanId={loan?.id}
          />
        </>
      )}
      {sponsorId && (
        <>
          <ModalSponsor
            isOpen={showSponsorModal} 
            toggle={toggleSponsorModal}
            mode={sponsorMode}
            sponsorId={sponsorId}
            loanId={loan?.id}
          />
          <ModalDeleteSponsor
            isOpen={showDeleteSponsorModal} 
            toggle={toggleDeleteSponsorModal}
            sponsorId={sponsorId}
            loanId={loan?.id}
          />
        </>
      )}
    </>
  );
};

const LoanActionButtons = ({ creating, editing, viewing, loanId, handleDeleteLoan, isSaving, hasRatingsError }) => {
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
          <Button type="submit" className="btn btn-primary" disabled={hasRatingsError}>
            {isSaving 
              ? (<Spinner size="sm" color="primary" />) 
              : (<>Save Changes</>)
            }
          </Button>
        </>
      )}

      {viewing && (
        <>
          <Button className="btn btn-danger mr-2" onClick={() => handleDeleteLoan(loanId)}>Delete Loan</Button>
          <Link to={`/loans/${loanId}/edit`} className="btn btn-primary">Edit Loan</Link>
        </>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  const loan = state.Loan;
  const agencyRatings = state.Rating.ratings?.ratings;
  return { ...loan, agencyRatings };
};

export default connect(
  mapStateToProps,
  { getLoan, createLoan, editLoan, deleteLoan, clearLoan }
)(LoanDetails);