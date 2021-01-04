import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';

import {
  GET_LOANS,
  GET_60_DAY_LOANS,
  GET_LOAN,
  CREATE_LOAN,
  EDIT_LOAN,
  DELETE_LOAN,
} from './constants';

import {
  getLoansSuccess,
  getLoansFailure,
  get60DayLoansSuccess,
  get60DayLoansFailure,
  
  getLoanSuccess,
  getLoanFailure,
  createLoanSuccess,
  createLoanFailure,
  editLoanSuccess,
  editLoanFailure,
  deleteLoanSuccess,
  deleteLoanFailure,
} from './actions';

const SERVER_URL = process.env.REACT_APP_KDM_API_ENDPOINT;

// Get Loans
function* getLoans({ payload: { loanNumber, size, page, sort } }) {
  const options = {
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

// Get 60 Day Loans
function* get60DayLoans({ payload: { loanNumber, size, page, sort } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const params =  {
    days: 60,
    // loanNumber,
    // size,
    // page,
    // sort,
  };

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/loan/anniversary?days=60`, options);
    yield put(get60DayLoansSuccess(response));
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
      yield put(get60DayLoansFailure(message));
  }
}

// Get Loan
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

// Create Loan
function* createLoan({ payload: { loan } }) {
  const options = {
    method: 'POST',
    body: JSON.stringify(loan),
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/loan`, options);
    yield put(createLoanSuccess(response));
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
      yield put(createLoanFailure(message));
  }
}

// Edit Loan
function* editLoan({ payload: { loan } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(loan),
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/loan/${loan.id}`, options);
    yield put(editLoanSuccess(response));
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
      yield put(editLoanFailure(message));
  }
}

// Delete Loan
function* deleteLoan({ payload: { loanId } }) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = yield call(fetchJSON, `${SERVER_URL}/loan/${loanId}`, options);
    yield put(deleteLoanSuccess(response));
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
      yield put(deleteLoanFailure(message));
  }
}


/**
 * Watchers
 */
export function* watchGetLoans(): any {
  yield takeEvery(GET_LOANS, getLoans);
}

export function* watchGet60DayLoans(): any {
  yield takeEvery(GET_60_DAY_LOANS, get60DayLoans);
}

export function* watchGetLoan(): any {
  yield takeEvery(GET_LOAN, getLoan);
}

export function* watchCreateLoan(): any {
  yield takeEvery(CREATE_LOAN, createLoan);
}

export function* watchEditLoan(): any {
  yield takeEvery(EDIT_LOAN, editLoan);
}

export function* watchDeleteLoan(): any {
  yield takeEvery(DELETE_LOAN, deleteLoan);
}

function* LoanSaga(): any {
  yield all([
    fork(watchGetLoans),
    fork(watchGet60DayLoans),
    fork(watchGetLoan),
    fork(watchCreateLoan),
    fork(watchEditLoan),
    fork(watchDeleteLoan),
  ]);
}

export default LoanSaga;
