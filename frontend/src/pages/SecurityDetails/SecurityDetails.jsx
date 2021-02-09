import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { Row, Col, Label, Button, InputGroupAddon, Table, Card, CardBody, Spinner } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import moment from 'moment';

import PageTitle from '../../components/PageTitle';
import ModalDeleteSecurity from './ModalDeleteSecurity';
import RatingsTable from '../LoanDetails/RatingsTable';
import { getSecurity, createSecurity, editSecurity, deleteSecurity, clearSecurity } from '../../redux/actions';

const SecurityDetails = (props) => {
  const { security = {}, loaded } = props;
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

  const [tradeDate, setTradeDate] = useState(new Date());
  const [maturityDate, setMaturityDate] = useState(new Date());
  useEffect(() => {
    if (!security.tradeDate) return;
    if (!security.maturityDate) return;
    setTradeDate(moment(security.tradeDate).toDate());
    setMaturityDate(moment(security.maturityDate).toDate());
  }, [security]);

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
  const submitSecurity = (e, errors, values) => {
    if (errors.length !== 0) return;

    const newSecurity = {
      ...security,
      ...values,
      tradeDate: tradeDate,
      ratings: formatRatings(securityRatings),
      maturityDate: maturityDate,
    };

    if (editing) {
      props.editSecurity(newSecurity);
    }
    if (creating) {
      props.createSecurity(newSecurity);
      // temporary until specifications received on styling, UI and such
      alert("Security Created");
      window.location.href = "/securities/list";
    }
  }

  const handleDeleteSecurity = (securityId) => {
    setShowDeleteSecurityModal(true);
  }

  const toggleDeleteSecurityModal = () => {
    setShowDeleteSecurityModal(!showDeleteSecurityModal);
  }

 /* Ratings */
 const [securityRatings, setSecurityRatings] = useState([]);
 const [hasRatingsError, setHasRatingsError] = useState(false);
 const handleEditSecurityRatings = (ratings, hasError) => {
   if (hasError) setHasRatingsError(true)
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
                          {/* <AvInput name="number" id="number" required disabled={viewing} /> */}
                          <AvInput name="number" id="number" value={security.number} required disabled={viewing} />
                          <AvFeedback tooltip>Note Number is required</AvFeedback>
                        </AvGroup>
                      </Col>

                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="noteRate">Note Rate *</Label>
                          <div className="input-group">
                            {/* <AvInput name="noteRate" id="noteRate" required disabled={viewing} /> */}
                            <AvInput name="noteRate" id="noteRate" value={security.noteRate} required disabled={viewing} />
                            <AvFeedback tooltip>Note Rate is required</AvFeedback>
                            <InputGroupAddon addonType="append">%</InputGroupAddon>
                          </div>
                        </AvGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="tradeDate">Trade Date *</Label>
                          <div className="input-group">
                            <DatePicker
                              required
                              className="form-control date"
                              dateFormat="MM/dd/yyyy"
                              selected={tradeDate}
                              onChange={date => setTradeDate(date)}
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
                          <AvInput name="cusip" id="cusip" value={security.cusip} required disabled={viewing} />
                          <AvFeedback tooltip>CUSIP is required</AvFeedback>
                        </AvGroup>
                      </Col>
                    </Row>

                    <hr />
                    <h4>Ratings</h4>
                    <RatingsTable 
                      item={security}
                      itemType="security"
                      editing={editing}
                      viewing={viewing}
                      update={handleEditSecurityRatings}
                    />
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
          <Button type="submit" className="btn btn-primary">Save Changes</Button>
        </>
      )}

      {viewing && (
        <>
          <Button className="btn btn-danger mr-2" onClick={(e) => handleDeleteSecurity(securityId)}>Delete Security</Button>
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
  { getSecurity, createSecurity, editSecurity, deleteSecurity, clearSecurity }
)(SecurityDetails);