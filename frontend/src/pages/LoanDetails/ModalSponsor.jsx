import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { createSponsor, editSponsor } from '../../redux/actions';
import { US_STATES_MAP } from '../../helpers/utils';

const ModalSponsor = (props) => {
  const { isOpen, toggle, sponsor = {}, loanId, mode } = props;
  const isCreate = (mode === 'create');
  const isEdit = (mode === 'edit');

  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (props.added || props.edited || props.deleted) {
      setIsSaving(false);
      toggle();
    }
  }, [props.added, props.edited, props.deleted, toggle]);

  const handleSubmitSponsor = (e, errors, values) => {
    if (errors.length > 0) return false;
    e.preventDefault();
    setIsSaving(true);

    let newSponsor = {
      ...sponsor,
      company: values.company,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
      registrationState: values.registrationState,
      address: {
        ...sponsor.address,
        street1: values.street1,
        street2: values.street2,
        city: values.city,
        state: values.state,
        zip: values.zip,
      },
    };

    if (isCreate) {
      props.createSponsor(newSponsor, loanId);
    }
    else if (isEdit) {
      props.editSponsor(newSponsor, loanId);
    }
    return true;
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <AvForm onSubmit={handleSubmitSponsor}>
        <ModalHeader toggle={toggle}>
          {isCreate && (<>Add Sponsor</>)}
          {isEdit && (<>Edit Sponsor</>)}
        </ModalHeader>
        <ModalBody>
        <Row>
          <Col sm={12}>
            <AvGroup className="position-relative">
              <Label for="company">Company</Label>
              <AvInput name="company" id="company" value={sponsor?.company} />
            </AvGroup>
          </Col>
        </Row>
          <Row>
            <Col sm={6}>
              <AvGroup className="position-relative">
                <Label for="firstName">First Name *</Label>
                <AvInput name="firstName" id="firstName" value={sponsor?.firstName} required />
                <AvFeedback tooltip>First Name is required</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm={6}>
              <AvGroup className="position-relative">
                <Label for="lastName">Last Name *</Label>
                <AvInput name="lastName" id="lastName" value={sponsor?.lastName} required />
                <AvFeedback tooltip>Last Name is required</AvFeedback>
              </AvGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <AvGroup className="position-relative">
                <Label for="phone">Phone Number *</Label>
                <AvInput name="phone" id="phone" value={sponsor?.phone} required />
                <AvFeedback tooltip>Phone Number is required</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm={6}>
              <AvGroup className="position-relative">
                <Label for="email">Email *</Label>
                <AvInput name="email" id="email" value={sponsor?.email} required />
                <AvFeedback tooltip>Email is required</AvFeedback>
              </AvGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <AvGroup className="position-relative">
                <Label for="street1">Street Address *</Label>
                <AvInput name="street1" id="street1" value={sponsor?.address?.street1 || ''} required />
                <AvFeedback tooltip>Street Address is required</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm={6}>
              <AvGroup className="position-relative">
                <Label for="street2">Street Address 2</Label>
                <AvInput name="street2" id="street2" value={sponsor?.address?.street2} />
              </AvGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={4}>
              <AvGroup className="position-relative">
                <Label for="city">City *</Label>
                <AvInput name="city" id="city" value={sponsor?.address?.city} required />
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
                
                  value={sponsor?.address?.state || 'AL'}
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
                <AvInput name="zip" id="zip" value={sponsor?.address?.zip} required />
                <AvFeedback tooltip>Zip Code is required</AvFeedback>
              </AvGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={4}>
              <AvGroup className="position-relative">
                <Label for="registrationState">Registration State *</Label>
                <AvField
                  name="registrationState"
                  type="select"
                  required
                
                  value={sponsor?.registrationState || 'AL'}
                  className="custom-select"
                >
                  {Object.entries(US_STATES_MAP).map((location, i) => 
                    (<option value={location[0]} key={i}>{location[1]}</option>)
                  )}
                </AvField>
                <AvFeedback tooltip>Registration is required</AvFeedback>
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
  return state.Sponsor;
};

export default connect(
  mapStateToProps,
  { 
    createSponsor, editSponsor,
  }
)(ModalSponsor);