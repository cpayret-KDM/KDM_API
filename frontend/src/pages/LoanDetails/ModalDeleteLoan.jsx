import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { deleteLoan } from '../../redux/actions';

const ModalDeleteLoan = (props) => {
  const { isOpen, toggle, loanId } = props;
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (props.deleted) {
      setIsSaving(false);
      setTimeout(() => {
        window.location.href = "/loans/list";
      }, 750);
    }
  }, [props.deleted]);

  const handleDeleteLoan = () => {
    setIsSaving(true);
    props.deleteLoan(loanId);
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Loan</ModalHeader>
      <ModalBody>
        {props.deleted 
          ? (<>This loan has been deleted.</>) 
          : (<>Are you sure you wish to delete this loan? Changes made cannot be undone.</>)
        }
        
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle} className="mr-2" disabled={isSaving || props.deleted}>Cancel</Button>
        <Button color="danger" onClick={handleDeleteLoan} disabled={isSaving || props.deleted}>
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
  return state.Loan;
};

export default connect(
  mapStateToProps,
  { 
    deleteLoan,
  }
)(ModalDeleteLoan);