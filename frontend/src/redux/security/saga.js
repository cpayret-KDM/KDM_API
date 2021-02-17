import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';

import {
  GET_SECURITIES,
  GET_SECURITY,
  GET_SECURITY_LOANS,
  EDIT_SECURITY_LOANS,
  CREATE_SECURITY,
  EDIT_SECURITY,
  DELETE_SECURITY,
  EDIT_SECURITY_RATINGS,
} from './constants';

import {
  getSecuritiesSuccess,
  getSecuritiesFailure,
  getSecurity,
  getSecuritySuccess,
  getSecurityFailure,
  createSecuritySuccess,
  createSecurityFailure,
  editSecuritySuccess,
  editSecurityFailure,
  deleteSecuritySuccess,
  deleteSecurityFailure,
  editSecurityRatings,
  editSecurityRatingsSuccess,
  editSecurityRatingsFailure,

  getSecurityLoansSuccess,
  getSecurityLoansFailure,
  editSecurityLoans,
  editSecurityLoansSuccess,
  editSecurityLoansFailure,
} from './actions';

const SERVER_URL = process.env.REACT_APP_KDM_API_ENDPOINT;

// Get Securities
function* getSecurities({ payload: { securityNumber, size, page, sort } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/msn?size=500`, options);
  if (!response.status || response.status === 200) {
    yield put(getSecuritiesSuccess(response));
  } else {
    let message;
    switch (message.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = response.message;
    }
    yield put(getSecuritiesFailure(message));
  }
}

// Get Security
function* getSecuritySaga({ payload: { securityId } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/msn/${securityId}`, options);
  if (!response.status || response.status === 200) {
    yield put(getSecuritySuccess(response));
  } else {
    let message;
    switch (message.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = response.message;
    }
    yield put(getSecurityFailure(message));
  }
}

// Get Security Loans
function* getSecurityLoans({ payload: { securityId } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/msn/${securityId}/loans`, options);
  if (!response.status || response.status === 200) {
    yield put(getSecurityLoansSuccess(response));
  } else {
    let message;
    switch (message.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = response.message;
    }
    yield put(getSecurityLoansFailure(message));
  }
}

// Create Security
function* createSecurity({ payload: { security } }) {
  const options = {
    method: 'POST',
    body: JSON.stringify(security),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/msn`, options);
  if (!response.status || response.status === 200) {
    yield put(createSecuritySuccess(response));
  } else {
    let message;
    switch (message.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = response.message;
    }
    yield put(createSecurityFailure(message));
  }
}

// Edit Security
function* editSecurity({ payload: { security } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(security),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/msn/${security.id}`, options);
  if (!response.status || response.status === 200) {
    yield put(editSecuritySuccess(response));
    if (security.ratings?.length > 0) {
      yield put(editSecurityRatings(security.ratings, security.id));
    }
    if (security.loans?.length > 0) {
      yield put(editSecurityLoans(security.loans, security.id));
    }
    if (security.loans?.length === 0 && security.ratings?.length === 0) {
      yield put(getSecurity(security.id));
    }
  } else {
    let message;
    switch (message.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = response.message;
    }
    yield put(editSecurityFailure(message));
  }
}

// Delete Security
function* deleteSecurity({ payload: { securityId } }) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/msn/${securityId}`, options);
  if (!response.status || response.status === 200) {
    yield put(deleteSecuritySuccess(response));
  } else {
    let message;
    switch (message.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = response.message;
    }
    yield put(deleteSecurityFailure(message));
  }
}

// Edit Security Ratings
function* editSecurityRatingsSaga({ payload: { ratings, securityId } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(ratings),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/msn/${securityId}/rating`, options);
  if (!response.status || response.status === 200) {
    yield put(editSecurityRatingsSuccess(response));
    yield put(getSecurity(securityId));
  } else {
    let message;
    switch (response.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
      break;
      default:
        message = response.message;
    }
    yield put(editSecurityRatingsFailure(message));
  }
}

// Edit Security Loans
function* editSecurityLoansSaga({ payload: { loans, securityId } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(loans),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/msn/${securityId}/loan`, options);
  if (!response.status || response.status === 200) {
    yield put(editSecurityLoansSuccess(response));
    yield put(getSecurity(securityId));
  } else {
    let message;
    switch (response.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
      break;
      default:
        message = response.message;
    }
    yield put(editSecurityLoansFailure(message));
  }
}

/**
 * Watchers
 */
export function* watchGetSecurities(): any {
  yield takeEvery(GET_SECURITIES, getSecurities);
}

export function* watchGetSecurity(): any {
  yield takeEvery(GET_SECURITY, getSecuritySaga);
}

export function* watchGetSecurityLoans(): any {
  yield takeEvery(GET_SECURITY_LOANS, getSecurityLoans);
}

export function* watchCreateSecurity(): any {
  yield takeEvery(CREATE_SECURITY, createSecurity);
}

export function* watchEditSecurity(): any {
  yield takeEvery(EDIT_SECURITY, editSecurity);
}

export function* watchDeleteSecurity(): any {
  yield takeEvery(DELETE_SECURITY, deleteSecurity);
}

export function* watchEditSecurityRatings(): any {
  yield takeEvery(EDIT_SECURITY_RATINGS, editSecurityRatingsSaga);
}

export function* watchEditSecurityLoans(): any {
  yield takeEvery(EDIT_SECURITY_LOANS, editSecurityLoansSaga);
}

function* SecuritySaga(): any {
  yield all([
    fork(watchGetSecurities),
    fork(watchGetSecurity),
    fork(watchGetSecurityLoans),
    fork(watchCreateSecurity),
    fork(watchEditSecurity),
    fork(watchDeleteSecurity),
    fork(watchEditSecurityRatings),
    fork(watchEditSecurityLoans),
  ]);
}

export default SecuritySaga;
