import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';

import {
  GET_BORROWERS,
  GET_BORROWER,
  CREATE_BORROWER,
  EDIT_BORROWER,
  DELETE_BORROWER,
} from './constants';

import {
  getBorrowersSuccess,
  getBorrowersFailure,
  getBorrowerSuccess,
  getBorrowerFailure,
  createBorrowerSuccess,
  createBorrowerFailure,
  editBorrowerSuccess,
  editBorrowerFailure,
  deleteBorrowerSuccess,
  deleteBorrowerFailure,
} from './actions';

import { getProperty } from '../property/actions';

const SERVER_URL = process.env.REACT_APP_KDM_API_ENDPOINT;


// Get Borrowers
function* getBorrowers({ payload: { } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/borrower`, options);
  if (!response.status || response.status === 200) {
    yield put(getBorrowersSuccess(response));
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
    yield put(getBorrowersFailure(message));
  }
}

// Get Borrower
function* getBorrower({ payload: { borrowerId } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/borrower/${borrowerId}`, options);
  if (!response.status || response.status === 200) {
    yield put(getBorrowerSuccess(response));
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
    yield put(getBorrowerFailure(message));
  }
}

// Create Borrower
function* createBorrower({ payload: { borrower, propertyId } }) {
  const options = {
    method: 'POST',
    body: JSON.stringify(borrower),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/borrower`, options);
  if (!response.status || response.status === 200) {
    yield put(createBorrowerSuccess(response));
    yield put(getProperty(propertyId));
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
    yield put(createBorrowerFailure(message));
  }
}

// Edit Borrower
function* editBorrower({ payload: { borrower, propertyId } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(borrower),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/borrower/${borrower.id}`, options);
  if (!response.status || response.status === 200) {
    yield put(editBorrowerSuccess(response));
    yield put(getProperty(propertyId));
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
    yield put(editBorrowerFailure(message));
  }
}

// Delete Borrower
function* deleteBorrower({ payload: { borrowerId, propertyId } }) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/borrower/${borrowerId}`, options);
  if (!response.status || response.status === 200) {
    yield put(deleteBorrowerSuccess(response));
    yield put(getProperty(propertyId));
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
    yield put(deleteBorrowerFailure(message));
  }
}


/**
 * Watchers
 */
export function* watchGetBorrowers(): any {
  yield takeEvery(GET_BORROWERS, getBorrowers);
}

export function* watchGetBorrower(): any {
  yield takeEvery(GET_BORROWER, getBorrower);
}

export function* watchCreateBorrower(): any {
  yield takeEvery(CREATE_BORROWER, createBorrower);
}

export function* watchEditBorrower(): any {
  yield takeEvery(EDIT_BORROWER, editBorrower);
}

export function* watchDeleteBorrower(): any {
  yield takeEvery(DELETE_BORROWER, deleteBorrower);
}

function* BorrowerSaga(): any {
  yield all([
    fork(watchGetBorrowers),
    fork(watchGetBorrower),
    fork(watchCreateBorrower),
    fork(watchEditBorrower),
    fork(watchDeleteBorrower),
  ]);
}

export default BorrowerSaga;
