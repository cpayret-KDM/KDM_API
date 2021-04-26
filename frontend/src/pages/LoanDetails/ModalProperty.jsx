import React, { useState, useEffect } from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { Row, Col, Label, Button, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { PROPERTY_TYPE_MAP, US_STATES_MAP } from '../../constants/utils';
import { getProperty, createProperty, editProperty, clearProperty, editBorrower, assignBorrower } from '../../redux/actions';

const ModalProperty = (props) => {
  const { isOpen, toggle, mode, loanId } = props;
  const isCreate = (mode === 'create');
  const isEdit = (mode === 'edit');

  useEffect(() => {
    if (isEdit) {
      props.getProperty(props.propertyId);
    } else {
      props.clearProperty();
      setProperty({});
    }
  }, [props.propertyId, isEdit]);

  /* Setting the property in state instead of props so that validation doesn't flash when form is submitted */
  const [property, setProperty] = useState({ ...props.property });
  useEffect(() => {
    if (props?.property?.id) {
      setProperty({ ...props.property });
    }
  }, [props.property]);

  const [appraisalDate, setAppraisalDate] = useState(new Date());
  useEffect(() => {
    if (!property?.appraisal?.date) {
      return;
    }
    setAppraisalDate(moment(property.appraisal.date).toDate());
  }, [props.property]);

  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (props.error) {
      setIsSaving(false);
    }
    else if (props.added || props.deleted) {
      setIsSaving(false);
      toggle();
    }
    else if (props.edited) {
      setIsSaving(false);
      props.getProperty(props.propertyId);
    }
  }, [props.added, props.edited, props.deleted, props.error]);

  const handleSubmitProperty = (e, errors, values) => {
    if (errors.length > 0) {
      return false;
    }
    setIsSaving(true);

    let newProperty = {
      ...property,
      loanId: loanId,
      type: values.type,
      address: {
        name: values.name,
        street1: values.street1,
        street2: values.street2,
        city: values.city,
        state: values.state,
        zip: values.zip,
      },
    };

    if (isCreate) {
      props.createProperty(newProperty);
    }
    else if (isEdit) {
      newProperty.appraisal = {
        ...property.appraisal,
        value: Number(values.appraisalValue),
        date: moment(appraisalDate).utc().format(),
        note: values.appraisalNote,
      };
      newProperty.borrower = {
        ...property.borrower,
        address: {
          street1: values.borrowerStreet1,
          street2: values.borrowerStreet2,
          city: values.borrowerCity,
          state: values.borrowerState,
          zip: values.borrowerZip,
          name: 'NA',
        },
        company: values.borrowerCompany,
        firstName: values.borrowerFirstName,
        lastName: values.borrowerLastName,
        phone: values.borrowerPhone,
        email: values.borrowerEmail,
      };
      props.editProperty(newProperty, property.borrower?.id);
      toggle()
    }
    return true;
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <AvForm onSubmit={handleSubmitProperty}>
        <ModalHeader toggle={toggle}>
          {isCreate && (<>Add New Property</>)}
          {isEdit && (<>Edit Property</>)}
        </ModalHeader>
        <ModalBody>
          {isEdit && !property.id ? (
            <Spinner size="lg" color="primary" />
          ) : (
              <>
                <Row>
                  <Col sm={6}>
                    <AvGroup className="position-relative">
                      <Label for="name">Name</Label>
                      <AvInput name="name" id="name" value={property?.address?.name} />
                    </AvGroup>
                  </Col>
                  <Col sm={6}>
                    <AvGroup className="position-relative">
                      <Label for="type">Property Type *</Label>
                      <AvField
                        name="type"
                        type="select"
                        required
                        value={property.type || 'SINGLE_FAMILY'}
                        className="custom-select"
                      >
                        {Object.entries(PROPERTY_TYPE_MAP).map((property, i) =>
                          (<option value={property[0]} key={i}>{property[1]}</option>)
                        )}
                      </AvField>
                      <AvFeedback tooltip>Property Type is required</AvFeedback>
                    </AvGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6}>
                    <AvGroup className="position-relative">
                      <Label for="street1">Street Address *</Label>
                      <AvInput name="street1" id="street1" value={property?.address?.street1 || ' '} required />
                      <AvFeedback tooltip>Street Address is required</AvFeedback>
                    </AvGroup>
                  </Col>
                  <Col sm={6}>
                    <AvGroup className="position-relative">
                      <Label for="street2">Street Address 2</Label>
                      <AvInput name="street2" id="street2" value={property?.address?.street2} />
                    </AvGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm={4}>
                    <AvGroup className="position-relative">
                      <Label for="city">City *</Label>
                      <AvInput name="city" id="city" value={property?.address?.city} required />
                      <AvFeedback tooltip>City is required</AvFeedback>
                    </AvGroup>
                  </Col>
                  <Col sm={4}>
                    <AvGroup className="position-relative">
                      <Label for="state">State *</Label>
                      <AvField
                        name="state"
                        type="select"
                        required
                        value={property?.address?.state || 'AL'}
                        className="custom-select"
                      >
                        {Object.entries(US_STATES_MAP).map((location, i) =>
                          (<option value={location[0]} key={i}>{location[1]}</option>)
                        )}
                      </AvField>
                      <AvFeedback tooltip>State is required</AvFeedback>
                    </AvGroup>
                  </Col>
                  <Col sm={4}>
                    <AvGroup className="position-relative">
                      <Label for="zip">Zip Code *</Label>
                      <AvInput name="zip" id="zip" value={property?.address?.zip} required />
                      <AvFeedback tooltip>Zip Code is required</AvFeedback>
                    </AvGroup>
                  </Col>
                </Row>

                {isEdit && (
                  <>
                    <hr />
                    <Row>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="appraisalValue">Appraisal Amount</Label>
                          <div className="input-group">
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <AvInput name="appraisalValue" id="appraisalValue" value={property?.appraisal?.value || ''} />
                          </div>
                        </AvGroup>
                      </Col>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="appraisalDate">Appraisal Date</Label>
                          <div className="input-group">
                            <DatePicker
                              className="form-control date"
                              dateFormat="MM/dd/yyyy"
                              selected={ appraisalDate }
                              onChange={ date => setAppraisalDate(date) }
                              isClearable
                            />
                          </div>
                        </AvGroup>
                      </Col>
                      <Col sm={12}>
                        <AvGroup className="position-relative">
                          <Label for="appraisalNote">Appraisal Note</Label>
                          <AvInput name="appraisalNote" id="appraisalNote" value={property?.appraisal?.note || ''} />
                        </AvGroup>
                      </Col>
                    </Row>
                    <hr />
                    <Label>Borrower</Label>
                    <Row>
                      <Col sm={12}>
                        <AvGroup className="position-relative">
                          <Label for="borrowerCompany">Company</Label>
                          <AvInput name="borrowerCompany" id="borrowerCompany" value={property?.borrower?.company || ''} />
                        </AvGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="borrowerFirstName">First Name</Label>
                          <AvInput name="borrowerFirstName" id="borrowerFirstName" value={property?.borrower?.firstName || ' '} />
                        </AvGroup>
                      </Col>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="borrowerLastName">Last Name</Label>
                          <AvInput name="borrowerLastName" id="borrowerLastName" value={property?.borrower?.lastName || ' '} />
                        </AvGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="borrowerPhone">Phone Number</Label>
                          <AvInput name="borrowerPhone" id="borrowerPhone" value={property?.borrower?.phone || ' '} />
                        </AvGroup>
                      </Col>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="borrowerEmail">Email</Label>
                          <AvInput name="borrowerEmail" id="borrowerEmail" value={property?.borrower?.email || ' '} />
                        </AvGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="borrowerStreet1">Street Address</Label>
                          <AvInput name="borrowerStreet1" id="borrowerStreet1" value={property?.borrower?.address.street1 || ' '} />
                        </AvGroup>
                      </Col>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="borrowerStreet2">Street Address 2</Label>
                          <AvInput name="borrowerStreet2" id="borrowerStreet2" value={property?.borrower?.address.street2 || ''} />
                        </AvGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <AvGroup className="position-relative">
                          <Label for="borrowerCity">City</Label>
                          <AvInput name="borrowerCity" id="borrowerCity" value={property?.borrower?.address.city || ''} />
                        </AvGroup>
                      </Col>
                      <Col sm={4}>
                        <AvGroup className="position-relative">
                          <Label for="borrowerState">State</Label>
                          <AvField
                            name="borrowerState"
                            type="select"
                            required
                            value={property?.borrower?.address.state || 'AL'}
                            className="custom-select"
                          >
                            {Object.entries(US_STATES_MAP).map((location, i) =>
                              (<option value={location[0]} key={i}>{location[1]}</option>)
                            )}
                          </AvField>
                        </AvGroup>
                      </Col>
                      <Col sm={4}>
                        <AvGroup className="position-relative">
                          <Label for="borrowerZip">Zip Code</Label>
                          <AvInput name="borrowerZip" id="borrowerZip" value={property?.borrower?.address.zip || ''} />
                        </AvGroup>
                      </Col>
                    </Row>

                  </>
                )}
              </>
            )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle} className="mr-2" disabled={isSaving}>Cancel</Button>
          <Button color="primary" type="submit" disabled={isSaving}>
            {!isSaving && isCreate && (<>Add</>)}
            {!isSaving && isEdit && (<>Save</>)}
            {isSaving && (<Spinner size="sm" color="primary" />)}
          </Button>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
}

const mapStateToProps = state => {
  return state.Property;
};

export default connect(
  mapStateToProps,
  {
    getProperty, createProperty, editProperty, clearProperty, editBorrower, assignBorrower
  }
)(ModalProperty);