import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';

import {
  CREATE_PROPERTY,
  EDIT_PROPERTY,
  DELETE_PROPERTY,
} from './constants';

import {
  createPropertySuccess,
  createPropertyFailure,
  editPropertySuccess,
  editPropertyFailure,
  deletePropertySuccess,
  deletePropertyFailure,
  assignAppraisalSuccess,
  assignAppraisalFailure,
} from './actions';

import { getLoan } from '../loan/actions';

const SERVER_URL = process.env.REACT_APP_KDM_API_ENDPOINT;

// Create Property
function* createProperty({ payload: { property } }) {
  const options = {
    method: 'POST',
    body: JSON.stringify( property ),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/property`, options);
  if (!response.status || response.status === 200) {
    yield put(createPropertySuccess(response));
    yield put(assignAppraisal(property.id, property.loanId, property.appraisal));
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
        message = response.msesage;
    }
    yield put(createPropertyFailure(message));
  }
}

// Edit Property
function* editProperty({ payload: { property } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(property),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/property/${property.id}`, options);
  if (!response.status || response.status === 200) {
    yield put(editPropertySuccess(response));
    console.log('property', property)
    yield assignAppraisal(property.id, property.loanId, property.appraisal);
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
    yield put(assignAppraisalSuccess(response));
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
    yield put(assignAppraisalFailure(message));
  }
}


/**
 * Watchers
 */
export function* watchCreateProperty(): any {
  yield takeEvery(CREATE_PROPERTY, createProperty);
}

export function* watchEditProperty(): any {
  yield takeEvery(EDIT_PROPERTY, editProperty);
}

export function* watchDeleteProperty(): any {
  yield takeEvery(DELETE_PROPERTY, deleteProperty);
}

function* PropertySaga(): any {
  yield all([
    fork(watchCreateProperty),
    fork(watchEditProperty),
    fork(watchDeleteProperty),
  ]);
}

export default PropertySaga;
