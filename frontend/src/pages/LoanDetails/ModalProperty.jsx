import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import { createProperty, editProperty } from '../../redux/actions';

const ModalProperty = (props) => {
  const { isOpen, toggle, property={}, loanId, mode } = props;
  const isCreate = (mode === 'create');
  const isEdit = (mode === 'edit');

  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (props.createPropertySuccess || props.editPropertySuccess) {
      setIsSaving(false);
      toggle();
    }
  }, [props.createPropertySuccess, props.editPropertySuccess]);

  const handleSubmitProperty = (e, errors, values) => {
    e.preventDefault();
    setIsSaving(true);

    let newProperty = {
      ...property,
      //name: values.name,
      loanId: loanId,
      address: {
        street1: values.street1,
        street2: values.street2,
        city: values.city,
        state: values.state,
        zip: values.zip,
      },
    };
    console.log('newProperty', newProperty)

    if (isCreate) {
      console.log('creating...')
      props.createProperty(newProperty);
    }
    else if (isEdit) {
      console.log('editing...')
      props.editProperty(newProperty);
    }
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
                  value={property.type}
                  className="custom-select"
                >
                  <option value="SINGLE_FAMILY">Single-Family</option>
                  <option value="MULTI_FAMILY">Multi-Family</option>
                  <option value="OFFICE">Office</option>
                  <option value="INDUSTRIAL">Industrial</option>
                  <option value="RETAIL">Retail</option>
                  <option value="HOTEL">Hotel</option>
                  <option value="SPECIAL_PURPOSE">Special-Purpose</option>
                </AvField>
                <AvFeedback tooltip>Property Type is required</AvFeedback>
              </AvGroup>
            </Col>
          </Row>
          
          <Row>
            <Col sm={6}>
              <AvGroup className="position-relative">
                <Label for="street1">Street Address *</Label>
                <AvInput name="street1" id="street1" value={property?.address?.street1} required />
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
                  value={property?.address?.state}
                  className="custom-select"
                >
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
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
  const { createPropertySuccess, editPropertySuccess } = state.Property;
  return { createPropertySuccess, editPropertySuccess };
};

export default connect(
  mapStateToProps,
  { 
    createProperty, editProperty,
  }
)(ModalProperty);