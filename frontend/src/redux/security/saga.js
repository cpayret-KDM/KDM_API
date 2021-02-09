import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';

import {
  GET_SECURITIES,
  // GET_60_DAY_SECURITIES,
  GET_SECURITY,
  CREATE_SECURITY,
  EDIT_SECURITY,
  DELETE_SECURITY,
  EDIT_SECURITY_RATINGS,
} from './constants';

import {
  getSecuritiesSuccess,
  getSecuritiesFailure,
  // get60DaySecuritiesSuccess,
  // get60DaySecuritiesFailure,

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
} from './actions';

const SERVER_URL = process.env.REACT_APP_KDM_API_ENDPOINT;

// Get Securities
function* getSecurities({ payload: { securityNumber, size, page, sort } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const params = '';
  // {
  //   securityNumber,
  //   size,
  //   page,
  //   sort,
  // };

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/msn${params}`, options);
    yield put(getSecuritiesSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(getSecuritiesFailure(message));
  }
}

// Get Security
function* getSecurity({ payload: { securityId } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/msn/${securityId}`, options);
    yield put(getSecuritySuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(getSecurityFailure(message));
  }
}

// Create Security
function* createSecurity({ payload: { security } }) {
  const options = {
    method: 'POST',
    body: JSON.stringify(security),
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/msn`, options);
    yield put(createSecuritySuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
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

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/msn/${security.id}`, options);
    yield put(editSecuritySuccess(response));
    yield put(editSecurityRatings(security.ratings, security.id));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
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

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/msn/${securityId}`, options);
    yield put(deleteSecuritySuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
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

/**
 * Watchers
 */
export function* watchGetSecurities(): any {
  yield takeEvery(GET_SECURITIES, getSecurities);
}

// export function* watchGet60DaySecurities(): any {
//   yield takeEvery(GET_60_DAY_SECURITIES, get60DaySecurities);
// }

export function* watchGetSecurity(): any {
  yield takeEvery(GET_SECURITY, getSecurity);
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

function* SecuritySaga(): any {
  yield all([
    fork(watchGetSecurities),
    // fork(watchGet60DaySecurities),
    fork(watchGetSecurity),
    fork(watchCreateSecurity),
    fork(watchEditSecurity),
    fork(watchDeleteSecurity),
    fork(watchEditSecurityRatings),
  ]);
}

export default SecuritySaga;
