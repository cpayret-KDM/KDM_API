import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';

import {
  GET_LOANS,
  GET_LOAN,
} from './constants';

import {
  getLoansSuccess,
  getLoansFailure,
  getLoanSuccess,
  getLoanFailure,
} from './actions';

const SERVER_URL = process.env.REACT_APP_KDM_API_ENDPOINT;

// Get Loans
function* getLoans({ payload: { loanNumber, size, page, sort } }) {
  const options = {
    //body: JSON.stringify({ loanNumber }),
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const params = '';
  // {
  //   loanNumber,
  //   size,
  //   page,
  //   sort,
  // };

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/loan${params}`, options);
    yield put(getLoansSuccess(response));
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
      yield put(getLoansFailure(message));
  }
}

// Get Loans
function* getLoan({ payload: { loanId } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/loan/${loanId}`, options);
    yield put(getLoanSuccess(response));
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
      yield put(getLoanFailure(message));
  }
}


/**
 * Watchers
 */
export function* watchGetLoans(): any {
  yield takeEvery(GET_LOANS, getLoans);
}

export function* watchGetLoan(): any {
  yield takeEvery(GET_LOAN, getLoan);
}

// export function* watchGetLoansSuccess(): any {
//   yield takeEvery(GET_LOANS_SUCCESS, getLoansSuccess);
// }

// export function* watchGetLoansFailure(): any {
//   yield takeEvery(GET_LOANS_FAILURE, getLoansFailure);
// }

function* LoanSaga(): any {
  yield all([
    fork(watchGetLoans),
    fork(watchGetLoan),
    // fork(watchGetLoansSuccess),
    // fork(watchGetLoansFailure),
  ]);
}

export default LoanSaga;
