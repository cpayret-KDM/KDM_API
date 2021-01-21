import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';

import {
  CREATE_SPONSOR,
  EDIT_SPONSOR,
  DELETE_SPONSOR,
} from './constants';

import {
  createSponsorSuccess,
  createSponsorFailure,
  editSponsorSuccess,
  editSponsorFailure,
  deleteSponsorSuccess,
  deleteSponsorFailure,
} from './actions';

import { getLoan } from '../loan/actions';

const SERVER_URL = process.env.REACT_APP_KDM_API_ENDPOINT;

// Create Sponsor
function* createSponsor({ payload: { sponsor, loanId } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify( sponsor ),
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/loan/${loanId}/sponsor/`, options);
    yield put(createSponsorSuccess(response));
    yield put(getLoan(loanId));
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

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/sponsor/${sponsor.id}`, options);
    yield put(editSponsorSuccess(response));
    yield put(getLoan(loanId));
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
      yield put(editSponsorFailure(message));
  }
}

// Delete Sponsor
function* deleteSponsor({ payload: { sponsorId, loanId } }) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/sponsor/${sponsorId}`, options);
    yield put(deleteSponsorSuccess(response));
    yield put(getLoan(loanId));
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
      yield put(deleteSponsorFailure(message));
  }
}


/**
 * Watchers
 */
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
    fork(watchCreateSponsor),
    fork(watchEditSponsor),
    fork(watchDeleteSponsor),
  ]);
}

export default SponsorSaga;
