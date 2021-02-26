import {
  GET_SECURITIES,
  GET_SECURITIES_SUCCESS,
  GET_SECURITIES_FAILURE,

  GET_SECURITY,
  GET_SECURITY_SUCCESS,
  GET_SECURITY_FAILURE,
  CREATE_SECURITY,
  CREATE_SECURITY_SUCCESS,
  CREATE_SECURITY_FAILURE,
  EDIT_SECURITY,
  EDIT_SECURITY_SUCCESS,
  EDIT_SECURITY_FAILURE,
  DELETE_SECURITY,
  DELETE_SECURITY_SUCCESS,
  DELETE_SECURITY_FAILURE,
  CLEAR_SECURITY,
  EDIT_SECURITY_RATINGS,
  EDIT_SECURITY_RATINGS_SUCCESS,
  EDIT_SECURITY_RATINGS_FAILURE,

  GET_SECURITY_LOANS,
  GET_SECURITY_LOANS_SUCCESS,
  GET_SECURITY_LOANS_FAILURE,
  EDIT_SECURITY_LOANS,
  EDIT_SECURITY_LOANS_SUCCESS,
  EDIT_SECURITY_LOANS_FAILURE,
} from './constants';

// Get Securities
export const getSecurities = (securityNumber = '', size, page, sort = '') => ({
  type: GET_SECURITIES,
  payload: { securityNumber, size, page, sort },
});

export const getSecuritiesSuccess = (security) => ({
  type: GET_SECURITIES_SUCCESS,
  payload: security,
});

export const getSecuritiesFailure = (err) => ({
  type: GET_SECURITIES_FAILURE,
  payload: err,
});

// Get Security
export const getSecurity = (securityId) => ({
  type: GET_SECURITY,
  payload: { securityId },
});

export const getSecuritySuccess = (security) => ({
  type: GET_SECURITY_SUCCESS,
  payload: security,
});

export const getSecurityFailure = (err) => ({
  type: GET_SECURITY_FAILURE,
  payload: err,
});

// Create Security
export const createSecurity = (security = {}) => ({
  type: CREATE_SECURITY,
  payload: { security },
});

export const createSecuritySuccess = (security) => ({
  type: CREATE_SECURITY_SUCCESS,
  payload: security,
});

export const createSecurityFailure = (err) => ({
  type: CREATE_SECURITY_FAILURE,
  payload: err,
});

// Edit Security
export const editSecurity = (security = {}) => ({
  type: EDIT_SECURITY,
  payload: { security },
});

export const editSecuritySuccess = (security) => ({
  type: EDIT_SECURITY_SUCCESS,
  payload: security,
});

export const editSecurityFailure = (err) => ({
  type: EDIT_SECURITY_FAILURE,
  payload: err,
});

// Delete Security
export const deleteSecurity = (securityId = '') => ({
  type: DELETE_SECURITY,
  payload: { securityId },
});

export const deleteSecuritySuccess = () => ({
  type: DELETE_SECURITY_SUCCESS,
  payload: {},
});

export const deleteSecurityFailure = (err) => ({
  type: DELETE_SECURITY_FAILURE,
  payload: err,
});

// Delete Security
export const clearSecurity = () => ({
  type: CLEAR_SECURITY,
  payload: {},
});

// Edit Security Ratings
export const editSecurityRatings = (ratings = [], securityId = '') => ({
  type: EDIT_SECURITY_RATINGS,
  payload: { ratings, securityId },
});

export const editSecurityRatingsSuccess = (ratings) => ({
  type: EDIT_SECURITY_RATINGS_SUCCESS,
  payload: ratings,
});

export const editSecurityRatingsFailure = (err) => ({
  type: EDIT_SECURITY_RATINGS_FAILURE,
  payload: err,
});

// Get Security Loans
export const getSecurityLoans = (securityId) => ({
  type: GET_SECURITY_LOANS,
  payload: { securityId },
});

export const getSecurityLoansSuccess = (loans) => ({
  type: GET_SECURITY_LOANS_SUCCESS,
  payload: loans,
});

export const getSecurityLoansFailure = (err) => ({
  type: GET_SECURITY_LOANS_FAILURE,
  payload: err,
});

// Edit Security Loans
export const editSecurityLoans = (loans, securityId) => ({
  type: EDIT_SECURITY_LOANS,
  payload: { loans, securityId },
});

export const editSecurityLoansSuccess = (loans) => ({
  type: EDIT_SECURITY_LOANS_SUCCESS,
  payload: loans,
});

export const editSecurityLoansFailure = (err) => ({
  type: EDIT_SECURITY_LOANS_FAILURE,
  payload: err,
});