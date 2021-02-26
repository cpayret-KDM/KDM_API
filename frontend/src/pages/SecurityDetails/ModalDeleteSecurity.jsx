import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { deleteSecurity } from '../../redux/actions';

const ModalDeleteSecurity = (props) => {
  const { isOpen, toggle, securityId } = props;
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (props.deleted) {
      setIsSaving(false);
      setTimeout(() => {
        window.location.href = "/securities/list";
      }, 750);
    }
  }, [props.deleted]);

  const handleDeleteSecurity = () => {
    setIsSaving(true);
    props.deleteSecurity(securityId);
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Security</ModalHeader>
      <ModalBody>
        {props.deleted
          ? (<>This security has been deleted.</>)
          : (<>Are you sure you wish to delete this security? Changes made cannot be undone.</>)
        }

      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle} className="mr-2" disabled={isSaving || props.deleted}>Cancel</Button>
        <Button color="danger" onClick={handleDeleteSecurity} disabled={isSaving || props.deleted}>
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
  return state.Security;
};

export default connect(
  mapStateToProps,
  {
    deleteSecurity,
  }
)(ModalDeleteSecurity);