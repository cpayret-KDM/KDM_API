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
} from './actions';

import { getLoan } from '../loan/actions';

const SERVER_URL = process.env.REACT_APP_KDM_API_ENDPOINT;

// Create Property
function* createProperty({ payload: { property } }) {
  console.log('in saga')
  const options = {
    method: 'POST',
    body: JSON.stringify( property ),
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/property`, options);
    yield all([
      createPropertySuccess(response),
      getLoan(property.loanId)
    ]);
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

  console.log('saga property',property)

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/property${property.id}`, options);
    yield put(editPropertySuccess(response));
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
      yield put(editPropertyFailure(message));
  }
}

// Delete Property
function* deleteProperty({ payload: { propertyId } }) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/property${propertyId}`, options);
    yield put(deletePropertySuccess(response));
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
      yield put(deletePropertyFailure(message));
  }
}


/**
 * Watchers
 */
export function* watchCreateProperty(): any {
  console.log('in watcher')
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
