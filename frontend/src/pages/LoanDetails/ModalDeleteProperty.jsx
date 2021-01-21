import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';

import { deleteProperty } from '../../redux/actions';

const ModalDeleteProperty = (props) => {
  const { isOpen, toggle, propertyId, loanId } = props;
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (props.deleted) {
      setIsSaving(false);
      toggle();
    }
  }, [props.deleted, toggle]);

  const handleDeleteProperty = () => {
    setIsSaving(true);
    props.deleteProperty(propertyId, loanId);
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Property</ModalHeader>
      <ModalBody>
        Are you sure you wish to delete this property? Changes made cannot be undone.
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle} className="mr-2" disabled={isSaving}>Cancel</Button>
        <Button color="danger" onClick={handleDeleteProperty} disabled={isSaving}>
          {isSaving 
            ? (<Spinner size="sm" color="primary" />) 
            : (<>Delete</>)
          }
        </Button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = state => {
  return state.Property;
};

export default connect(
  mapStateToProps,
  { 
    deleteProperty,
  }
)(ModalDeleteProperty);