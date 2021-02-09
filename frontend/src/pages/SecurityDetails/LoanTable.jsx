import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { AvField, AvGroup, AvInput, UncontrolledAlert } from 'availity-reactstrap-validation';

import { getSecurityLoans, getLoans } from '../../redux/actions';
import { DATE_FORMAT, PROPERTY_TYPE_MAP } from '../../helpers/utils';
import ModalAddLoan from './ModalAddLoan';

const LoanTable = (props) => {
  const {  
    editing = false,
    viewing = false,
    securityId,
  } = props;

  /* Get list of Security Loans onPageLoad*/
  useEffect(() => {
    props.getSecurityLoans(securityId);
    props.getLoans(true);
  }, []);

  /* Set Security Loans onPageLoad */
  const [securityLoans, setSecurityLoans] = useState([]);
  const [unassignedLoans, setUnassignedLoans] = useState([]);
  useEffect(() => {
    if (props.security?.loans) {
      let newSecurityLoans = [...props.security.loans];
      setSecurityLoans(newSecurityLoans);
    }
    if (props.loans) {
      let newUnassignedLoans = [...props.loans];
      setUnassignedLoans(newUnassignedLoans);
    }
  }, [props.security]);

  useEffect(() => {
    console.log('securityLoans updated', securityLoans)
  }, [securityLoans]);
  useEffect(() => {
    console.log('unassignedLoans updated', unassignedLoans)
  }, [unassignedLoans]);

  /* State Functions */
  const [showAddNewLoanModal, setShowAddNewLoanModal] = useState(false);
  const handleAddNewLoan = (e, i) => {
    console.log('adding new loan')
    setShowAddNewLoanModal(true);
  }

  const addNewLoan = (loanId) => {
    console.log('loanId',loanId)
    setShowAddNewLoanModal(false);
  }

  const toggleAddLoanModal = () => {
    setShowAddNewLoanModal(!showAddNewLoanModal);
  }

  const handleRemoveLoan = (i) => {
    const newUnasignedLoans = [...unassignedLoans];
    newUnasignedLoans.push(newSecurityLoans[i]);
    setUnassignedLoans(newUnasignedLoans);

    const newSecurityLoans = [...securityLoans];
    newSecurityLoans.splice(i, 1);
    setSecurityLoans(newSecurityLoans);
  }
 
  return (
    <>
      {securityLoans?.length === 0 ? (
        <p>No loans have been added yet. {!editing && (<>Edit this security to add some.</>)}</p>
      ) : (
        <Table className="ratings-list-table table-centered table-nowrap mb-0">
          <thead>
            <tr>
              <th style={{'width': '150px'}}>#</th>
              <th style={{'width': '150px'}}>Ticker</th>
              <th>Property</th>
              <th style={{'width': '100px'}}>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {securityLoans.map((loan, i) =>(
              <tr key={i}>
                <td>
                  {loan.id}
                </td>
                <td>{loan.loanNumber}</td>
                <td>
                  {loan.properties.map((property, i) => {
                    return (
                      <p key={i}>
                        {property.address.name && (<>{property.address.name}<br /></>)}
                        {property.address.street1}
                        {property.address.street2 && (<>{property.address.street2}</>)}, {property.address.city} {property.address.state}, {property.address.zip}
                        {(i + 1) === loan.properties.length ? ('') : (<br />)}
                      </p>
                    );
                  })}
                </td>
                <td className="text-right">
                  {editing && (
                    <span className="btn btn-danger btn-secondary" onClick={() => handleRemoveLoan(i)}>remove</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {editing && unassignedLoans.length > 0 && (
        <span className="btn btn-secondary" onClick={(e) => handleAddNewLoan(e)}>Add New Loan</span>
      )}
      <ModalAddLoan
        loans={unassignedLoans} 
        isOpen={showAddNewLoanModal} 
        toggle={toggleAddLoanModal}
        addNewLoan={addNewLoan}
      />
    </>
  );
}


const mapStateToProps = state => {
  const security = {...state.Security};
  const loans = state.Loan.loans;
  return { security, loans };
};

export default connect(
  mapStateToProps,
  { getSecurityLoans, getLoans }
)(LoanTable);