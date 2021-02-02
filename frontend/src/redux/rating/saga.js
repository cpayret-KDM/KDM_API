import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';

import {
  GET_RATINGS,
  GET_RATING,
  CREATE_RATING,
  EDIT_RATING,
  DELETE_RATING,
} from './constants';

import {
  getRatingsSuccess,
  getRatingsFailure,
  getRatingSuccess,
  getRatingFailure,
  createRatingSuccess,
  createRatingFailure,
  editRatingSuccess,
  editRatingFailure,
  deleteRatingSuccess,
  deleteRatingFailure,
} from './actions';

import { getLoan } from '../loan/actions';

const SERVER_URL = process.env.REACT_APP_KDM_API_ENDPOINT;


// Get Ratings
function* getRatings({ payload: { } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/rating`, options);
  if (!response.status || response.status === 200) {
    yield put(getRatingsSuccess(response));
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
    yield put(getRatingsFailure(message));
  }
}

// Get Rating
function* getRating({ payload: { ratingId } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/rating/${ratingId}`, options);
  if (!response.status || response.status === 200) {
    yield put(getRatingSuccess(response));
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
    yield put(getRatingFailure(message));
  }
}

// Create Rating
function* createRating({ payload: { rating, loanId } }) {
  const options = {
    method: 'POST',
    body: JSON.stringify( rating ),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/rating`, options);
  if (!response.status || response.status === 200) {
    yield put(createRatingSuccess(response));
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
    yield put(createRatingFailure(message));
  }
}

// Edit Rating
function* editRating({ payload: { rating, loanId } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify( rating ),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/rating/${rating.id}`, options);
  if (!response.status || response.status === 200) {
    yield put(editRatingSuccess(response));
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
    yield put(editRatingFailure(message));
  }
}

// Delete Rating
function* deleteRating({ payload: { ratingId, loanId } }) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/rating/${ratingId}`, options);
  if (!response.status || response.status === 200) {
    yield put(deleteRatingSuccess(response));
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
    yield put(deleteRatingFailure(message));
  }
}


/**
 * Watchers
 */
export function* watchGetRatings(): any {
  yield takeEvery(GET_RATINGS, getRatings);
}

 export function* watchGetRating(): any {
  yield takeEvery(GET_RATING, getRating);
}

 export function* watchCreateRating(): any {
  yield takeEvery(CREATE_RATING, createRating);
}

export function* watchEditRating(): any {
  yield takeEvery(EDIT_RATING, editRating);
}

export function* watchDeleteRating(): any {
  yield takeEvery(DELETE_RATING, deleteRating);
}

function* RatingSaga(): any {
  yield all([
    fork(watchGetRatings),
    fork(watchGetRating),
    fork(watchCreateRating),
    fork(watchEditRating),
    fork(watchDeleteRating),
  ]);
}

export default RatingSaga;
