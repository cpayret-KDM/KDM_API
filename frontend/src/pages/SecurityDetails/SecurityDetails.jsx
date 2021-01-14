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
  const { loan = {}, loaded } = props;
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
  //   setOriginationDate(loan.originationDate);
  // }, [loan]);

  const today = new Date();
  const [originationDate, setOriginationDate] = useState(today);
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
        return { label: 'Create New Security', path: '/loans/create' };
      case 'edit':
        return { label: 'Edit Security', path: `/loans/${id}/edit` };
      default:
        return { label: 'Security Details', path: `/loans/${id}` };
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
      ...loan,
      ...values,
      originationDate: originationDate,
    };

    if (editing) {
      props.editSecurity(newSecurity);
    }
    if (creating) {
      props.createSecurity(newSecurity);
    }
  }

  const handleDeleteSecurity = (loanId) => {
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

  const handleDateChange = (date) => {
    setOriginationDate(date);
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Securities', path: '/loans/list' },
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
                <SecurityActionButtons creating={creating} editing={editing} viewing={viewing} loanId={loan.id} handleDeleteSecurity={handleDeleteSecurity} isSaving={isSaving} />
                <Card>
                  <CardBody>
                    <h4>Details</h4>

                    <Row>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="loanNumber">Note Number *</Label>
                          <AvInput name="loanNumber" id="loanNumber" value={loan.loanNumber} required disabled={viewing} />
                          <AvFeedback tooltip>Note Number is required</AvFeedback>
                        </AvGroup>
                      </Col>

                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="loanRate">Note Rate *</Label>
                          <div className="input-group">
                            <AvInput name="loanRate" id="loanRate" defaultValue={loan.loanRate} required disabled={viewing} />
                            <AvFeedback tooltip>Note Rate is required</AvFeedback>
                            <InputGroupAddon addonType="append">%</InputGroupAddon>
                          </div>
                        </AvGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="originationDate">Trade Date *</Label>
                          <div className="input-group">
                            <HyperDatepicker
                              hideAddon={true}
                              dateFormat="MM/dd/yyyy"
                              selected={originationDate}
                              onChange={handleDateChange}
                            />
                          </div>
                        </AvGroup>
                      </Col>

                      <Col sm={6}>
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
                </>)}
                <SecurityActionButtons creating={creating} editing={editing} viewing={viewing} loanId={loan.id} handleDeleteSecurity={handleDeleteSecurity} isSaving={isSaving} />
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
      <ModalDeleteSecurity
        isOpen={showDeleteSecurityModal}
        toggle={toggleDeleteSecurityModal}
        loanId={loan?.id}
      />
    </>
  );
};

const SecurityActionButtons = ({ creating, editing, viewing, loanId, handleDeleteSecurity, isSaving }) => {
  return (
    <div className="d-flex justify-content-end mb-3">
      {creating && (
        <>
          <Link to="/loans/list" className="btn btn-secondary mr-2">Cancel</Link>
          <Button type="submit" className="btn btn-primary">
            {isSaving
              ? (<Spinner size="sm" color="primary" />)
              : (<>Save New Security</>)
            }
          </Button>
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
          <Button className="btn btn-danger mr-2" onClick={(e) => handleDeleteSecurity(loanId)}>Delete Security</Button>
          <Link to={`/loans/${loanId}/edit`} className="btn btn-primary">Edit Security</Link>
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