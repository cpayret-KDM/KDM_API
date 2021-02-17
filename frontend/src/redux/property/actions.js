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

type PropertyAction = { type: String, payload: {} | String };

// Get Property
export const getProperty = (propertyId: String): PropertyAction => ({
  type: GET_PROPERTY,
  payload: { propertyId },
});

export const getPropertySuccess = (property: Object): PropertyAction => ({
  type: GET_PROPERTY_SUCCESS,
  payload: property,
});

export const getPropertyFailure = (err: Object): PropertyAction => ({
  type: GET_PROPERTY_FAILURE,
  payload: err,
});

// Create Property
export const createProperty = (property: Object = {}): PropertyAction => ({
  type: CREATE_PROPERTY,
  payload: { property },
});

export const createPropertySuccess = (property: Object): PropertyAction => ({
  type: CREATE_PROPERTY_SUCCESS,
  payload: property,
});

export const createPropertyFailure = (err: Object): PropertyAction => ({
  type: CREATE_PROPERTY_FAILURE,
  payload: err,
});

// Edit Property
export const editProperty = (property: Object = {}, borrowerId ): PropertyAction => ({
  type: EDIT_PROPERTY,
  payload: { property, borrowerId},
});

export const editPropertySuccess = (property: Object): PropertyAction => ({
  type: EDIT_PROPERTY_SUCCESS,
  payload: property,
});

export const editPropertyFailure = (err: Object): PropertyAction => ({
  type: EDIT_PROPERTY_FAILURE,
  payload: err,
});

// Delete Property
export const deleteProperty = (propertyId: String = '', loanId: String = ''): PropertyAction => ({
  type: DELETE_PROPERTY,
  payload: { propertyId, loanId },
});

export const deletePropertySuccess = (): PropertyAction => ({
  type: DELETE_PROPERTY_SUCCESS,
  payload: {},
});

export const deletePropertyFailure = (err: Object): PropertyAction => ({
  type: DELETE_PROPERTY_FAILURE,
  payload: err,
});

// Assign Appraisal to Property
export const assignAppraisal = (propertyId: String, loanId: String, appraisal: Object = {}): PropertyAction => ({
  type: ASSIGN_APPRAISAL,
  payload: { propertyId, loanId, appraisal },
});

export const assignAppraisalSuccess = (appraisal: Object): PropertyAction => ({
  type: ASSIGN_APPRAISAL_SUCCESS,
  payload: appraisal,
});

export const assignAppraisalFailure = (err: Object): PropertyAction => ({
  type: ASSIGN_APPRAISAL_FAILURE,
  payload: err,
});

// Assign Borrower to Property
export const assignBorrower = (propertyId: String, loanId: String, borrower: Object = {}): PropertyAction => ({
  type: ASSIGN_BORROWER,
  payload: { propertyId, loanId, borrower },
});

export const assignBorrowerSuccess = (borrower: Object): PropertyAction => ({
  type: ASSIGN_BORROWER_SUCCESS,
  payload: borrower,
});

export const assignBorrowerFailure = (err: Object): PropertyAction => ({
  type: ASSIGN_BORROWER_FAILURE,
  payload: err,
});

// Edit Borrower
export const editBorrower = (borrower: Object = {}, loanId: String = ''): BorrowerAction => ({
  type: EDIT_BORROWER,
  payload: { borrower, loanId },
})

export const editBorrowerSuccess = (borrower: Object): BorrowerAction => ({
  type: EDIT_BORROWER_SUCCESS,
  payload: borrower,
})

export const editBorrowerFailure = (err: Object): BorrowerAction => ({
  type: EDIT_BORROWER_FAILURE,
  payload: err,
});

// Clear Property
export const clearProperty = (): LoanAction => ({
  type: CLEAR_PROPERTY,
  payload: {},
});