import {
  GET_PROPERTY,
  GET_PROPERTY_SUCCESS,
  GET_PROPERTY_FAILURE,
  CREATE_PROPERTY,
  CREATE_PROPERTY_SUCCESS,
  CREATE_PROPERTY_FAILURE,
  EDIT_PROPERTY,
  EDIT_PROPERTY_SUCCESS,
  EDIT_PROPERTY_FAILURE,
  DELETE_PROPERTY,
  DELETE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAILURE,
  ASSIGN_APPRAISAL,
  ASSIGN_APPRAISAL_SUCCESS,
  ASSIGN_APPRAISAL_FAILURE,
  ASSIGN_BORROWER,
  ASSIGN_BORROWER_SUCCESS,
  ASSIGN_BORROWER_FAILURE,
  EDIT_BORROWER,
  EDIT_BORROWER_SUCCESS,
  EDIT_BORROWER_FAILURE,
  CLEAR_PROPERTY,
} from './constants';

// Get Property
export const getProperty = (propertyId) => ({
  type: GET_PROPERTY,
  payload: { propertyId },
});

export const getPropertySuccess = (property) => ({
  type: GET_PROPERTY_SUCCESS,
  payload: property,
});

export const getPropertyFailure = (err) => ({
  type: GET_PROPERTY_FAILURE,
  payload: err,
});

// Create Property
export const createProperty = (property = {}) => ({
  type: CREATE_PROPERTY,
  payload: { property },
});

export const createPropertySuccess = (property) => ({
  type: CREATE_PROPERTY_SUCCESS,
  payload: property,
});

export const createPropertyFailure = (err) => ({
  type: CREATE_PROPERTY_FAILURE,
  payload: err,
});

// Edit Property
export const editProperty = (property = {}, borrowerId ) => ({
  type: EDIT_PROPERTY,
  payload: { property, borrowerId},
});

export const editPropertySuccess = (property) => ({
  type: EDIT_PROPERTY_SUCCESS,
  payload: property,
});

export const editPropertyFailure = (err) => ({
  type: EDIT_PROPERTY_FAILURE,
  payload: err,
});

// Delete Property
export const deleteProperty = (propertyId = '', loanId = '') => ({
  type: DELETE_PROPERTY,
  payload: { propertyId, loanId },
});

export const deletePropertySuccess = () => ({
  type: DELETE_PROPERTY_SUCCESS,
  payload: {},
});

export const deletePropertyFailure = (err) => ({
  type: DELETE_PROPERTY_FAILURE,
  payload: err,
});

// Assign Appraisal to Property
export const assignAppraisal = (propertyId, loanId, appraisal = {}) => ({
  type: ASSIGN_APPRAISAL,
  payload: { propertyId, loanId, appraisal },
});

export const assignAppraisalSuccess = (appraisal) => ({
  type: ASSIGN_APPRAISAL_SUCCESS,
  payload: appraisal,
});

export const assignAppraisalFailure = (err) => ({
  type: ASSIGN_APPRAISAL_FAILURE,
  payload: err,
});

// Assign Borrower to Property
export const assignBorrower = (propertyId, loanId, borrower = {}) => ({
  type: ASSIGN_BORROWER,
  payload: { propertyId, loanId, borrower },
});

export const assignBorrowerSuccess = (borrower) => ({
  type: ASSIGN_BORROWER_SUCCESS,
  payload: borrower,
});

export const assignBorrowerFailure = (err) => ({
  type: ASSIGN_BORROWER_FAILURE,
  payload: err,
});

// Edit Borrower
export const editBorrower = (borrower = {}, loanId = '') => ({
  type: EDIT_BORROWER,
  payload: { borrower, loanId },
})

export const editBorrowerSuccess = (borrower) => ({
  type: EDIT_BORROWER_SUCCESS,
  payload: borrower,
})

export const editBorrowerFailure = (err) => ({
  type: EDIT_BORROWER_FAILURE,
  payload: err,
});

// Clear Property
export const clearProperty = () => ({
  type: CLEAR_PROPERTY,
  payload: {},
});