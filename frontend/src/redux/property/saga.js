import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import { getLoan, editPropertyLoanSuccess } from '../loan/actions';
import {
  getPropertySuccess,
  getPropertyFailure,
  createPropertySuccess,
  createPropertyFailure,
  editPropertySuccess,
  editPropertyFailure,
  deletePropertySuccess,
  deletePropertyFailure,
  assignAppraisalSuccess,
  assignAppraisalFailure,
  assignBorrowerSuccess,
  assignBorrowerFailure,
  editBorrowerSuccess,
  editBorrowerFailure,
} from './actions';
import {
  GET_PROPERTY,
  CREATE_PROPERTY,
  EDIT_PROPERTY,
  DELETE_PROPERTY,
} from './constants';

const SERVER_URL = process.env.REACT_APP_KDM_API_ENDPOINT;

// Get Property
function* getProperty({ payload: { propertyId } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/property/${propertyId}`, options);
  if (!response.status || response.status === 200) {
    yield put(getPropertySuccess(response));
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
    yield put(getPropertyFailure(message));
  }
}

// Create Property
function* createProperty({ payload: { property } }) {
  const options = {
    method: 'POST',
    body: JSON.stringify(property),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/property`, options);
  if (!response.status || response.status === 200) {
    yield put(createPropertySuccess(response));
    yield put(getLoan(property.loanId));
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
    yield put(createPropertyFailure(message));
  }
}

// Edit Property
function* editProperty({ payload: { property, borrowerId } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(property),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/property/${property.id}`, options);
  if (!response.status || response.status === 200) {
    yield put(editPropertySuccess(response));
    yield assignAppraisal(property.id, property.loanId, property.appraisal);
    if (borrowerId) {
      yield editBorrower(property.id, property.loanId, property.borrower)
    } else {
      yield assignBorrower(property.id, property.loanId, property.borrower)
    }
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
    yield put(editPropertyFailure(message));
  }
}

// Delete Property
function* deleteProperty({ payload: { propertyId, loanId } }) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/property/${propertyId}`, options);
  if (!response.status || response.status === 200) {
    yield put(deletePropertySuccess(response));
    yield put(getLoan(loanId));
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
    yield put(deletePropertyFailure(message));
  }
}


// Assign Appraisal
function* assignAppraisal(propertyId, loanId, appraisal) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(appraisal),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/property/${propertyId}/appraisal`, options);
  if (!response.status || response.status === 200) {
      debugger;
    yield put(assignAppraisalSuccess(response));
    yield put(editPropertyLoanSuccess(response));
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
    yield put(assignAppraisalFailure(message));
  }
}

// Assign (Create) Borrower
function* assignBorrower(propertyId, loanId, borrower) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(borrower),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/property/${propertyId}/borrower/`, options);
  if (!response.status || response.status === 200) {
    yield put(assignBorrowerSuccess(response));
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
    yield put(assignBorrowerFailure(message));
  }
}

// Edit Borrower
function* editBorrower(propertyId, loanId, borrower)  {
  const options = {
    method: 'PUT',
    body: JSON.stringify(borrower),
    headers: { 'Content-Type': 'application/json' },
  }

  const response = yield call(fetchJSON, `${SERVER_URL}/borrower/${borrower.id}`, options)
  if (!response.status || response.status === 200) {
    yield put(editBorrowerSuccess(response))
  } else {
    let message
    switch (response.status) {
      case 500:
        message = 'Internal Server Error'
        break
      case 401:
        message = 'Invalid credentials'
        break
      default:
        message = response.message
    }
    yield put(editBorrowerFailure(message))
  }
}

/**
 * Watchers
 */
export function* watchGetProperty() {
  yield takeEvery(GET_PROPERTY, getProperty);
}

export function* watchCreateProperty() {
  yield takeEvery(CREATE_PROPERTY, createProperty);
}

export function* watchEditProperty() {
  yield takeEvery(EDIT_PROPERTY, editProperty);
}

export function* watchDeleteProperty() {
  yield takeEvery(DELETE_PROPERTY, deleteProperty);
}

function* PropertySaga() {
  yield all([
    fork(watchGetProperty),
    fork(watchCreateProperty),
    fork(watchEditProperty),
    fork(watchDeleteProperty),
  ]);
}

export default PropertySaga;
