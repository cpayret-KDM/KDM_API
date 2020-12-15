import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import PropertyMap from './PropertyMap';
import { createProperty, editProperty } from '../../redux/actions';
import { PROPERTY_TYPE_MAP, US_STATES_MAP } from '../../helpers/utils';

const ModalProperty = (props) => {
  const { isOpen, toggle, property = {}, loanId, mode } = props;
  const isCreate = (mode === 'create');
  const isEdit = (mode === 'edit');

  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (props.added || props.edited) {
      setIsSaving(false);
      toggle();
    }
  }, [props.added, props.edited]);

  const handleSubmitProperty = (e, errors, values) => {
    if (errors.length > 0) return false;
    e.preventDefault();
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
      props.editProperty(newProperty);
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
          <Row>
            <Col sm={6}>
              <AvGroup className="position-relative">
                <Label for="name">Name</Label>
                <AvInput name="name" id="name" value={property?.name} />
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
                <AvInput name="street1" id="street1" value={property?.address?.street1 || ''} required />
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
    createProperty, editProperty,
  }
)(ModalProperty);