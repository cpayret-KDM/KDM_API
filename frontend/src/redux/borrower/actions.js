import {
  GET_BORROWERS,
  GET_BORROWERS_SUCCESS,
  GET_BORROWERS_FAILURE,
  GET_BORROWER,
  GET_BORROWER_SUCCESS,
  GET_BORROWER_FAILURE,
  CREATE_BORROWER,
  CREATE_BORROWER_SUCCESS,
  CREATE_BORROWER_FAILURE,
  EDIT_BORROWER,
  EDIT_BORROWER_SUCCESS,
  EDIT_BORROWER_FAILURE,
  DELETE_BORROWER,
  DELETE_BORROWER_SUCCESS,
  DELETE_BORROWER_FAILURE,
  CLEAR_BORROWER,
} from './constants';

type BorrowerAction = { type: String, payload: {} | String };

// Get Borrowers
export const getBorrowers = (): BorrowerAction => ({
  type: GET_BORROWERS,
  payload: {},
});

export const getBorrowersSuccess = (borrowers: Array): BorrowerAction => ({
  type: GET_BORROWERS_SUCCESS,
  payload: { borrowers },
});

export const getBorrowersFailure = (err: Object): BorrowerAction => ({
  type: GET_BORROWERS_FAILURE,
  payload: err,
});

// Get Borrower
export const getBorrower = (borrowerId: String = ''): BorrowerAction => ({
  type: GET_BORROWER,
  payload: { borrowerId },
});

export const getBorrowerSuccess = (borrower: Object): BorrowerAction => ({
  type: GET_BORROWER_SUCCESS,
  payload: borrower,
});

export const getBorrowerFailure = (err: Object): BorrowerAction => ({
  type: GET_BORROWER_FAILURE,
  payload: err,
});

// Create Borrower
export const createBorrower = (borrower: Object = {}, propertyId: String = ''): BorrowerAction => ({
  type: CREATE_BORROWER,
  payload: { borrower, propertyId },
});

export const createBorrowerSuccess = (borrower: Object): BorrowerAction => ({
  type: CREATE_BORROWER_SUCCESS,
  payload: borrower,
});

export const createBorrowerFailure = (err: Object): BorrowerAction => ({
  type: CREATE_BORROWER_FAILURE,
  payload: err,
});

// Edit Borrower
export const editBorrower = (borrower: Object = {}, propertyId: String = ''): BorrowerAction => ({
  type: EDIT_BORROWER,
  payload: { borrower, propertyId },
});

export const editBorrowerSuccess = (borrower: Object): BorrowerAction => ({
  type: EDIT_BORROWER_SUCCESS,
  payload: borrower,
});

export const editBorrowerFailure = (err: Object): BorrowerAction => ({
  type: EDIT_BORROWER_FAILURE,
  payload: err,
});

// Delete Borrower
export const deleteBorrower = (borrowerId: String = '', propertyId: String = ''): BorrowerAction => ({
  type: DELETE_BORROWER,
  payload: { borrowerId, propertyId },
});

export const deleteBorrowerSuccess = (): BorrowerAction => ({
  type: DELETE_BORROWER_SUCCESS,
  payload: {},
});

export const deleteBorrowerFailure = (err: Object): BorrowerAction => ({
  type: DELETE_BORROWER_FAILURE,
  payload: err,
});

// Ryan - unsure about this one, if it should be PropertyAction or LoanAction
// Clear Borrower
export const clearBorrower = (): PropertyAction => ({
  type: CLEAR_BORROWER,
  payload: {},
});