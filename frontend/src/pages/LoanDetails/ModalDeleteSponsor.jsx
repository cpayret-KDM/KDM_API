import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';

import { deleteSponsor } from '../../redux/actions';

const ModalDeleteSponsor = (props) => {
  const { isOpen, toggle, sponsorId, loanId } = props;
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (props.deleted) {
      setIsSaving(false);
      toggle();
    }
  }, [props.deleted]);

  const handleDeleteSponsor = () => {
    setIsSaving(true);
    props.deleteSponsor(sponsorId, loanId);
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Sponsor</ModalHeader>
      <ModalBody>
        Are you sure you wish to delete this sponsor? Changes made cannot be undone.
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle} className="mr-2" disabled={isSaving}>Cancel</Button>
        <Button color="danger" onClick={handleDeleteSponsor} disabled={isSaving}>
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
    deleteSponsor,
  }
)(ModalDeleteSponsor);