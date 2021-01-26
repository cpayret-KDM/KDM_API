import {
  GET_SECURITIES,
  GET_SECURITIES_SUCCESS,
  GET_SECURITIES_FAILURE,
  // GET_60_DAY_SECURITIES,
  // GET_60_DAY_SECURITIES_SUCCESS,
  // GET_60_DAY_SECURITIES_FAILURE,

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
} from './constants';

type SecurityAction = { type: String, payload: {} | String };

// Get Securities
export const getSecurities = (securityNumber: String = '', size: Number, page: Number, sort: String = ''): SecurityAction => ({
  type: GET_SECURITIES,
  payload: { securityNumber, size, page, sort },
});

export const getSecuritiesSuccess = (security: Object): SecurityAction => ({
  type: GET_SECURITIES_SUCCESS,
  payload: security,
});

export const getSecuritiesFailure = (err: Object): SecurityAction => ({
  type: GET_SECURITIES_FAILURE,
  payload: err,
});

// // Get 60-Day Securities
// export const get60DaySecurities = (): SecurityAction => ({
//   type: GET_60_DAY_SECURITIES,
//   payload: {},
// });

// export const get60DaySecuritiesSuccess = (security: Object): SecurityAction => ({
//   type: GET_60_DAY_SECURITIES_SUCCESS,
//   payload: security,
// });

// export const get60DaySecuritiesFailure = (err: Object): SecurityAction => ({
//   type: GET_60_DAY_SECURITIES_FAILURE,
//   payload: err,
// });

// Get Security
export const getSecurity = (securityId: String): SecurityAction => ({
  type: GET_SECURITY,
  payload: { securityId },
});

export const getSecuritySuccess = (security: Object): SecurityAction => ({
  type: GET_SECURITY_SUCCESS,
  payload: security,
});

export const getSecurityFailure = (err: Object): SecurityAction => ({
  type: GET_SECURITY_FAILURE,
  payload: err,
});

// Create Security
export const createSecurity = (security: Object = {}): SecurityAction => ({
  type: CREATE_SECURITY,
  payload: { security },
});

export const createSecuritySuccess = (security: Object): SecurityAction => ({
  type: CREATE_SECURITY_SUCCESS,
  payload: security,
});

export const createSecurityFailure = (err: Object): SecurityAction => ({
  type: CREATE_SECURITY_FAILURE,
  payload: err,
});

// Edit Security
export const editSecurity = (security: Object = {}): SecurityAction => ({
  type: EDIT_SECURITY,
  payload: { security },
});

export const editSecuritySuccess = (security: Object): SecurityAction => ({
  type: EDIT_SECURITY_SUCCESS,
  payload: security,
});

export const editSecurityFailure = (err: Object): SecurityAction => ({
  type: EDIT_SECURITY_FAILURE,
  payload: err,
});

// Delete Security
export const deleteSecurity = (securityId: String = ''): SecurityAction => ({
  type: DELETE_SECURITY,
  payload: { securityId },
});

export const deleteSecuritySuccess = (): SecurityAction => ({
  type: DELETE_SECURITY_SUCCESS,
  payload: {},
});

export const deleteSecurityFailure = (err: Object): SecurityAction => ({
  type: DELETE_SECURITY_FAILURE,
  payload: err,
});

// Delete Security
export const clearSecurity = (): SecurityAction => ({
  type: CLEAR_SECURITY,
  payload: {},
});