import React, { useState, useEffect } from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Label, Button, InputGroupAddon, Card, CardBody, Spinner } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import { getSecurity, createSecurity, editSecurity, deleteSecurity, clearSecurity, getSecurityLoans } from '../../redux/actions';
import RatingsTable from '../LoanDetails/RatingsTable';
import LoanTable from './LoanTable';
import ModalDeleteSecurity from './ModalDeleteSecurity';


const SecurityDetails = (props) => {
  const { security = {}, loaded, loansLoaded } = props;
  const creating = (props.mode === 'create');
  const editing = (props.mode === 'edit');
  const viewing = !editing && !creating;

  const { id } = props?.match?.params;
  useEffect(() => {
    if (!creating) {
      props.getSecurity(id);
    } else {
      props.clearSecurity();
    }
  }, [creating, id]);

  const [showDeleteSecurityModal, setShowDeleteSecurityModal] = useState(false);

  const [settlementDate, setSettlementDate] = useState(new Date());
  const [maturityDate, setMaturityDate] = useState(new Date());
  useEffect(() => {
    if (!security.settlementDate) {
      return;
    }
    if (!security.maturityDate) {
      return;
    }
    setSettlementDate(moment(security.settlementDate).toDate());
    setMaturityDate(moment(security.maturityDate).toDate());

    console.log(`loaded=${loaded} security = ${security}, id= ${(security !== null)? security.id : 'undefined' }`);

    if ((loaded) && (security != null) && (!loansLoaded)) {
        props.getSecurityLoans(security.id);
    }
  }, [security, loaded]);

  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (props.added || props.edited) {
      setIsSaving(false);
    }
  }, [props.added, props.edited]);

  /* UI */
  const breadcrumb = ((mode) => {
    switch (mode) {
      case 'create':
        return { label: 'Create New Security', path: '/securities/create' };
      case 'edit':
        return { label: 'Edit Security', path: `/securities/${id}/edit` };
      default:
        return { label: 'Security Details', path: `/securities/${id}` };
    }
  })(props.mode);

  const title = ((mode) => {
    switch (mode) {
      case 'create':
        return 'Create New Security';
      case 'edit':
        return 'Edit Security';
      default:
        return 'Security Details';
    }
  })(props.mode);

  /* Security */
  const [securityLoans, setSecurityLoans] = useState([]);
  const submitSecurity = (e, errors, values) => {
    if (errors.length !== 0) {
      return;
    }
    setIsSaving(true);

    const newSecurity = {
      ...security,
      ...values,
      settlementDate: settlementDate,
      ratings: formatRatings(securityRatings),
      loans: formatLoans(securityLoans),
      maturityDate: maturityDate,
    };

    if (editing) {
      props.editSecurity(newSecurity);
    }
    if (creating) {
      props.createSecurity(newSecurity);
      // temporary until specifications received on styling, UI and such
      //alert("Security Created");
      window.location.href = "/securities/list";
    }
  }

  const handleDeleteSecurity = () => {
    setShowDeleteSecurityModal(true);
  }

  const toggleDeleteSecurityModal = () => {
    setShowDeleteSecurityModal(!showDeleteSecurityModal);
  }

 /* Ratings */
 const [securityRatings, setSecurityRatings] = useState([]);
 const [hasRatingsError, setHasRatingsError] = useState(false);
 const handleEditSecurityRatings = (ratings, hasError) => {
   if (hasError) {
     setHasRatingsError(true)
   }
   const newSecurityRatings = [...ratings];
   setSecurityRatings([...newSecurityRatings]);
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

 /* Loans */
 const handleEditSecurityLoans = (loans) => {
   const newSecurityLoans = [...loans];
   setSecurityLoans([...newSecurityLoans]);
 }

 const formatLoans = (loans) => {
   let loanIds = [];
   loans.forEach(loan => {
     loanIds.push(loan.id);
  });
  return loanIds;
 }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Securities', path: '/securities/list' },
          { ...breadcrumb },
        ]}
        title={title}
      />

      <Row>
        <Col sm={12}>
          {!loaded && !creating ? (
            <div className="text-center"><Spinner size="lg" color="primary" /></div>
          ) : (
              <AvForm onSubmit={submitSecurity}>
                <SecurityActionButtons creating={creating} editing={editing} viewing={viewing} securityId={security.id} handleDeleteSecurity={handleDeleteSecurity} isSaving={isSaving} hasRatingsError={hasRatingsError} />
                <Card>
                  <CardBody>
                    <h4>Details</h4>

                    <Row>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="number">Note Number *</Label>
                          <AvInput name="number" id="number" value={security.number || ''} required disabled={viewing} />
                          <AvFeedback tooltip>Note Number is required</AvFeedback>
                        </AvGroup>
                      </Col>

                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="noteRate">Note Rate *</Label>
                          <div className="input-group">
                            <AvInput name="noteRate" id="noteRate" value={(security.noteRate!= undefined)? `${security.noteRate}` : ''} required disabled={viewing} />
                            <AvFeedback tooltip>Note Rate is required</AvFeedback>
                            <InputGroupAddon addonType="append">%</InputGroupAddon>
                          </div>
                        </AvGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="settlementDate">Settlement Date *</Label>
                          <div className="input-group">
                            <DatePicker
                              className="form-control date"
                              dateFormat="MM/dd/yyyy"
                              selected={settlementDate}
                              // selected={settlementDate}
                              onChange={date => setSettlementDate(date)}
                              required disabled={viewing}
                            />
                          </div>
                        </AvGroup>
                      </Col>
                      {/* (Ryan) attempting to fix maturityDate field */}
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="maturityDate">Maturity Date *</Label>
                          <div className="input-group">
                            <DatePicker
                              className="form-control date"
                              dateFormat="MM/dd/yyyy"
                              selected={maturityDate}
                              onChange={date => setMaturityDate(date)}
                              required disabled={viewing}
                            />
                          </div>
                        </AvGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="cusip">CUSIP *</Label>
                          <AvInput name="cusip" id="cusip" value={ security.cusip || ''} required disabled={viewing} />
                          <AvFeedback tooltip>CUSIP is required</AvFeedback>
                        </AvGroup>
                      </Col>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="dealSize">Deal Size</Label>
                          <div className="input-group">
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <AvInput name="dealSize" id="dealSize" value={security?.dealSize || ''} disabled={viewing} />
                          </div>
                        </AvGroup>
                      </Col>
                    </Row>

                    {!creating && (
                      <>
                        <hr />
                        <h4>Ratings</h4>
                        <RatingsTable 
                          item={security}
                          itemType="security"
                          editing={editing}
                          viewing={viewing}
                          update={handleEditSecurityRatings}
                        />

                        <hr />
                        <h4>Loans</h4>
                        <LoanTable 
                          securityId={security.id}
                          editing={editing}
                          viewing={viewing}
                          update={handleEditSecurityLoans}
                        />
                      </>
                    )}
                  </CardBody>
                </Card>

                <SecurityActionButtons creating={creating} editing={editing} viewing={viewing} securityId={security.id} handleDeleteSecurity={handleDeleteSecurity} isSaving={isSaving} hasRatingsError={hasRatingsError} />
              </AvForm>
            )}
        </Col>
      </Row>

      <ModalDeleteSecurity
        isOpen={showDeleteSecurityModal}
        toggle={toggleDeleteSecurityModal}
        securityId={security?.id}
      />
    </>
  );
};

const SecurityActionButtons = ({ creating, editing, viewing, securityId, handleDeleteSecurity, isSaving, hasRatingsError }) => {
  return (
    <div className="d-flex justify-content-end mb-3">
      {creating && (
        <>
          <Link to="/securities/list" className="btn btn-secondary mr-2">Cancel</Link>
          <Button type="submit" className="btn btn-primary" disabled={hasRatingsError}>
            {isSaving
              ? (<Spinner size="sm" color="primary" />)
              : (<>Save New Security</>)
            }
          </Button>
        </>
      )}

      {editing && (
        <>
          <Link to={`/securities/${securityId}`} className="btn btn-secondary mr-2">Cancel</Link>
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
          <Button className="btn btn-danger mr-2" onClick={() => handleDeleteSecurity(securityId)}>Delete Security</Button>
          <Link to={`/securities/${securityId}/edit`} className="btn btn-primary">Edit Security</Link>
        </>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return state.Security;
};

export default connect(
  mapStateToProps,
  { getSecurity, createSecurity, editSecurity, deleteSecurity, clearSecurity, getSecurityLoans }
)(SecurityDetails);