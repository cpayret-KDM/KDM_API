import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { AvField, AvGroup } from 'availity-reactstrap-validation';

import { deleteProperty } from '../../redux/actions';

const ModalAddLoan = (props) => {
  const { isOpen, toggle, loans } = props;
  const [isSaving, setIsSaving] = useState(false);
  const [loanId, setLoanId] = useState();

  useEffect(() => {
    if (props.loans?.length > 0) {
      setLoanId(props.loans[0].id);
    }
  }, [loans]);

  const handleLoanChange = (e) => {
    setLoanId(e.target.value)
  }

  const handleAddLoan = () => {
    setIsSaving(true);
    props.addNewLoan(loanId);
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
            onChange={(e) => handleLoanChange(e)}
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
  return state.Property;
};

export default connect(
  mapStateToProps,
  { 
    deleteProperty,
  }
)(ModalAddLoan);