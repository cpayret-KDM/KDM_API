import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';

import {
  GET_SPONSOR,
  CREATE_SPONSOR,
  EDIT_SPONSOR,
  DELETE_SPONSOR,
} from './constants';

import {
  getSponsorSuccess,
  getSponsorFailure,
  createSponsorSuccess,
  createSponsorFailure,
  editSponsorSuccess,
  editSponsorFailure,
  deleteSponsorSuccess,
  deleteSponsorFailure,
} from './actions';

import { getLoan } from '../loan/actions';

const SERVER_URL = process.env.REACT_APP_KDM_API_ENDPOINT;

// Get Sponsor
function* getSponsor({ payload: { sponsorId } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/sponsor/${sponsorId}`, options);
  if (!response.status || response.status === 200) {
    yield put(getSponsorSuccess(response));
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
    yield put(getSponsorFailure(message));
  }
}

// Create Sponsor
function* createSponsor({ payload: { sponsor, loanId } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify( sponsor ),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/loan/${loanId}/sponsor/`, options);
  if (!response.status || response.status === 200) {
    yield put(createSponsorSuccess(response));
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
    yield put(createSponsorFailure(message));
  }
}

// Edit Sponsor
function* editSponsor({ payload: { sponsor, loanId } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify( sponsor ),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/sponsor/${sponsor.id}`, options);
  if (!response.status || response.status === 200) {
    yield put(editSponsorSuccess(response));
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
    yield put(editSponsorFailure(message));
  }
}

// Delete Sponsor
function* deleteSponsor({ payload: { sponsorId, loanId } }) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/sponsor/${sponsorId}`, options);
  if (!response.status || response.status === 200) {
    yield put(deleteSponsorSuccess(response));
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
    yield put(deleteSponsorFailure(message));
  }
}


/**
 * Watchers
 */
export function* watchGetSponsor(): any {
  yield takeEvery(GET_SPONSOR, getSponsor);
}

 export function* watchCreateSponsor(): any {
  yield takeEvery(CREATE_SPONSOR, createSponsor);
}

export function* watchEditSponsor(): any {
  yield takeEvery(EDIT_SPONSOR, editSponsor);
}

export function* watchDeleteSponsor(): any {
  yield takeEvery(DELETE_SPONSOR, deleteSponsor);
}

function* SponsorSaga(): any {
  yield all([
    fork(watchGetSponsor),
    fork(watchCreateSponsor),
    fork(watchEditSponsor),
    fork(watchDeleteSponsor),
  ]);
}

export default SponsorSaga;
