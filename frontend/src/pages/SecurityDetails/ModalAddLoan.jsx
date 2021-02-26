import React, { useState, useEffect } from 'react';
import { AvField, AvGroup } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';

const ModalAddLoan = (props) => {
  const { isOpen, toggle, loans } = props;
  const [isSaving, setIsSaving] = useState(false);
  const [loanId, setLoanId] = useState(undefined);

  useEffect(() => {
    setIsSaving(false);
    if (isOpen && loans?.length > 0) {
      setLoanId(loans[0].id);
    }
  }, [isOpen]);

  const handleLoanChange = (e) => {
    const newLoanId = e.target.value;
    setLoanId(newLoanId);
  }

  const handleAddLoan = () => {
    setIsSaving(true);
    loans.forEach(loan => {
      if (loan.id == loanId) {
        props.addNewLoan(loan);
      }
    });
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Loan to Security</ModalHeader>
      <ModalBody>
        <AvGroup className="position-relative mb-0">
          <AvField
            name="ratingAgency"
            type="select"
            className="custom-select"
            onChange={handleLoanChange}
          >
            {loans.length > 0 && loans.map((loan, i) => 
              (<option value={loan.id} key={i}>{loan.id} : {loan.loanNumber}</option>)
            )}
          </AvField>
        </AvGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle} className="mr-2">Cancel</Button>
        <Button color="primary" onClick={handleAddLoan}>
          {isSaving 
            ? (<Spinner size="sm" color="primary" />) 
            : (<>Add</>)
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
    
  }
)(ModalAddLoan);