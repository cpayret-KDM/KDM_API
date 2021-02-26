import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, UncontrolledAlert } from 'reactstrap';
import { getSecurityLoans, getLoans } from '../../redux/actions';
import ModalAddLoan from './ModalAddLoan';

const LoanTable = (props) => {
  const {  
    editing = false,
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
  const [securityLoansLoaded, setSecurityLoansLoaded] = useState(false);
  const [unassignedLoansLoaded, setUnassignedLoansLoaded] = useState(false);
  useEffect(() => {
    if (props.security?.loans?.length > 0 && securityLoans.length === 0 && !securityLoansLoaded) {
      let newSecurityLoans = [...props.security.loans];
      setSecurityLoans(newSecurityLoans);
      setSecurityLoansLoaded(true);
    }
    if (props.loans?.length > 0 && unassignedLoans.length === 0 && !unassignedLoansLoaded) {
      let newUnassignedLoans = [...props.loans];
      setUnassignedLoans(newUnassignedLoans);
      setUnassignedLoansLoaded(true);
    }
  }, [props.security]);

  /* State Functions */
  const [showAddNewLoanModal, setShowAddNewLoanModal] = useState(false);
  const handleAddNewLoan = () => {
    setShowAddNewLoanModal(true);
  }

  const addNewLoan = (loan) => {
    // Add Loan
    let newSecurityLoans = [...securityLoans];
    newSecurityLoans.push(loan);
    setSecurityLoans(newSecurityLoans);

    // Remove from Unassigned
    let newUnassignedLoans = [...unassignedLoans];
    unassignedLoans.forEach((ua, i) => {
      if (ua.id == loan.id) {
        newUnassignedLoans.splice(i, 1);
      }
    });
    setUnassignedLoans(newUnassignedLoans);
    setShowAddNewLoanModal(false);
  }

  const toggleAddLoanModal = () => {
    setShowAddNewLoanModal(!showAddNewLoanModal);
  }

  const handleRemoveLoan = (i) => {
    const newUnasignedLoans = [...unassignedLoans];
    newUnasignedLoans.push(securityLoans[i]);
    setUnassignedLoans(newUnasignedLoans);

    const newSecurityLoans = [...securityLoans];
    newSecurityLoans.splice(i, 1);
    setSecurityLoans(newSecurityLoans);
  }

  useEffect(() => {
    props.update(securityLoans);
  }, [securityLoans]);
 
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
      {editing && (
        <>
          {unassignedLoans.length > 0 ? (
            <span className="btn btn-secondary" onClick={(e) => handleAddNewLoan(e)}>Add New Loan</span>
          ) : (
            <UncontrolledAlert color="success">
              No unassigned loans remain
            </UncontrolledAlert>
          )}
        </>
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
  const security = {...state.Security.security};
  const loans = state.Loan.loans;
  return { security, loans };
};

export default connect(
  mapStateToProps,
  { getSecurityLoans, getLoans }
)(LoanTable);