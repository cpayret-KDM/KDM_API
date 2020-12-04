import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalProperty = (props) => {
  const { isOpen, toggle, className } = props;

  return (
    <Modal isOpen={isOpen} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>Delete Property</ModalHeader>
      <ModalBody>
        Are you sure you wish to delete this property? Changes made cannot be undone.
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle} className="mr-2">Cancel</Button>
        <Button color="primary" onClick={toggle}>Delete Property</Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalProperty;