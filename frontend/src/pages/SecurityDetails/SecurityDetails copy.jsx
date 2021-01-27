import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Label, Button, InputGroupAddon, InputGroupText, Card, CardBody, Spinner } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import moment from 'moment';

import PageTitle from '../../components/PageTitle';
import ModalProperty from './ModalProperty';
import ModalDeleteProperty from './ModalDeleteProperty';
import ModalDeleteSecurity from './ModalDeleteSecurity';
import HyperDatepicker from '../../components/Datepicker';
import { getSecurity, createSecurity, editSecurity, deleteSecurity, clearSecurity } from '../../redux/actions';

import { DATE_FORMAT, SECURITY_STATUS_MAP, PIPELINE_STATUS_MAP, PROPERTY_TYPE_MAP } from '../../helpers/utils';

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

  // useEffect(() => {
  //   setOriginationDate(security.originationDate);
  // }, [security]);

  const today = new Date();
  const [tradeDate, setTradeDate] = useState(today);
  const [maturityDate, setMaturityDate] = useState(today);
  const [property, setProperty] = useState({});
  const [propertyMode, setPropertyMode] = useState('create');
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showDeletePropertyModal, setShowDeletePropertyModal] = useState(false);
  const [showDeleteSecurityModal, setShowDeleteSecurityModal] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (props.added || props.edited) {
      setIsSaving(false);
    }
  }, [props.added, props.edited]);

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

  const submitSecurity = (e, errors, values) => {
    if (errors.length !== 0) return;

    const newSecurity = {
      ...security,
      ...values,
      tradeDate: tradeDate,
      maturityDate: maturityDate,
    };

    if (editing) {
      props.editSecurity(newSecurity);
    }
    if (creating) {
      props.createSecurity(newSecurity);
    }
  }

  const handleDeleteSecurity = (securityId) => {
    setShowDeleteSecurityModal(true);
  }

  const handleAddNewProperty = () => {
    setProperty({});
    setPropertyMode('create');
    setShowPropertyModal(true);
  }

  const handleEditProperty = (property) => {
    setProperty({ ...property });
    setPropertyMode('edit');
    setShowPropertyModal(true);
  }

  const handleDeleteProperty = (property) => {
    setProperty({ ...property });
    setShowDeletePropertyModal(true);
  }

  const toggleDeletePropertyModal = () => {
    setShowDeletePropertyModal(!showDeletePropertyModal);
  }

  const toggleShowPropertyModal = () => {
    setShowPropertyModal(!showPropertyModal);
  }

  const toggleDeleteSecurityModal = () => {
    setShowDeleteSecurityModal(!showDeleteSecurityModal);
  }

  const handleTradeDateChange = (date) => {
    setTradeDate(date);
  }

  const handleMaturityDateChange = (date) => {
    setMaturityDate(date);
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
                <SecurityActionButtons creating={creating} editing={editing} viewing={viewing} securityId={security.id} handleDeleteSecurity={handleDeleteSecurity} isSaving={isSaving} />
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
                            {/* <HyperDatepicker
                              hideAddon={true}
                              dateFormat="MM/dd/yyyy"
                              selected={tradeDate}
                              onChange={handleTradeDateChange}
                            /> */}
                            <AvInput name="tradeDate" id="tradeDate" value={security.tradeDate} required disabled={viewing} />
                            <AvFeedback tooltip>Trade Date is required</AvFeedback>
                          </div>
                        </AvGroup>
                      </Col>
                      {/* (Ryan) attempting to fix maturityDate field */}
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="maturityDate">Maturity Date *</Label>
                          <div className="input-group">
                            {/* <HyperDatepicker
                              hideAddon={true}
                              dateFormat="MM/dd/yyyy"
                              selected={maturityDate}
                              onChange={handleMaturityDateChange}
                            /> */}
                            <AvInput name="maturityDate" id="maturityDate" value={security.maturityDate} required disabled={viewing} />
                            <AvFeedback tooltip>Maturity Date is required</AvFeedback>
                          </div>
                        </AvGroup>
                      </Col>
                      {/* <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="originationDate">Maturity Date *</Label>
                          <div className="input-group">
                            <HyperDatepicker
                              hideAddon={true}
                              dateFormat="MM/dd/yyyy"
                              selected={originationDate}
                              onChange={handleDateChange}
                            />
                          </div>
                        </AvGroup>
                      </Col> */}
                    </Row>

                  </CardBody>
                </Card>

                {/* verified to work in KDM-97-update-delete-new-security*/}
                <SecurityActionButtons creating={creating} editing={editing} viewing={viewing} securityId={security.id} handleDeleteSecurity={handleDeleteSecurity} isSaving={isSaving} />
              </AvForm>
            )}
        </Col>
      </Row>

      <ModalProperty
        isOpen={showPropertyModal}
        toggle={toggleShowPropertyModal}
        mode={propertyMode}
        property={property}
        securityId={security?.id}
      />
      <ModalDeleteProperty
        isOpen={showDeletePropertyModal}
        toggle={toggleDeletePropertyModal}
        propertyId={property.id}
        securityId={security?.id}
      />
      <ModalDeleteSecurity
        isOpen={showDeleteSecurityModal}
        toggle={toggleDeleteSecurityModal}
        securityId={security?.id}
      />
    </>
  );
};

const SecurityActionButtons = ({ creating, editing, viewing, securityId, handleDeleteSecurity, isSaving }) => {
  return (
    <div className="d-flex justify-content-end mb-3">
      {creating && (
        <>
          <Link to="/securities/list" className="btn btn-secondary mr-2">Cancel</Link>
          <Button type="submit" className="btn btn-primary">
            {isSaving
              ? (<Spinner size="sm" color="primary" />)
              : (<>Save New Security</>)
            }
          </Button>
        </>
      )}

      {/* verified to work in KDM-97-update-delete-new-security*/}
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