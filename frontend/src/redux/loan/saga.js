import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import {
  getLoansSuccess,
  getLoansFailure,
  get60DayLoansSuccess,
  get60DayLoansFailure,
  getCashFlowLoansSuccess,
  getCashFlowLoansFailure,
  getLoan,
  getLoanSuccess,
  getLoanFailure,
  createLoanSuccess,
  createLoanFailure,
  editLoanSuccess,
  editLoanFailure,
  deleteLoanSuccess,
  deleteLoanFailure,
  editLoanRatings,
  editLoanRatingsSuccess,
  editLoanRatingsFailure,
} from './actions';
import {
  GET_LOANS,
  GET_60_DAY_LOANS,
  GET_CASH_FLOW_LOANS,
  GET_LOAN,
  CREATE_LOAN,
  EDIT_LOAN,
  DELETE_LOAN,
  EDIT_LOAN_RATINGS,
} from './constants';

const SERVER_URL = process.env.REACT_APP_KDM_API_ENDPOINT;

// Get Loans
function* getLoansSaga({ payload: { nullMSN } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const nullMSNString = (nullMSN) ? `&nullMSN=${nullMSN}` : '';

  const response = yield call(fetchJSON, `${SERVER_URL}/loan?size=500${nullMSNString}`, options);
  if (!response.status || response.status === 200) {
    yield put(getLoansSuccess(response));
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
    yield put(getLoansFailure(message));
  }
}

// Get 60 Day Loans
function* get60DayLoansSaga({ payload: { days } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  //days defaults to 60 if not present
  days = days || 60

  const response = yield call(fetchJSON, `${SERVER_URL}/loan/anniversary?days=${days}`, options);
  if (!response.status || response.status === 200) {
    yield put(get60DayLoansSuccess(response));
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
    yield put(get60DayLoansFailure(message));
  }
}

//generator for get Cash Flow Loans
function* getCashFlowLoans() {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/loan/cashflow`, options);
  if (!response.status || response.status === 200) {
    yield put(getCashFlowLoansSuccess(response));
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
    yield put(getCashFlowLoansFailure(message));
  }
}

// Get Loan
function* getLoanSaga({ payload: { loanId } }) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/loan/${loanId}`, options);
  if (!response.status || response.status === 200) {
    yield put(getLoanSuccess(response));
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
    yield put(getLoanFailure(message));
  }
}

// Create Loan
function* createLoanSaga({ payload: { loan } }) {
  const options = {
    method: 'POST',
    body: JSON.stringify(loan),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/loan`, options);
  if (!response.status || response.status === 200) {
    yield put(createLoanSuccess(response));
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
    yield put(createLoanFailure(message));
  }
}

// Edit Loan
function* editLoanSaga({ payload: { loan } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(loan),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/loan/${loan.id}`, options);
  if (!response.status || response.status === 200) {
    yield put(editLoanSuccess(response));
    if (loan.ratings.length > 0) {
      yield put(editLoanRatings(loan.ratings, loan.id));
    } else {
      yield put(getLoan(loan.id));
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
    yield put(editLoanFailure(message));
  }
}

// Delete Loan
function* deleteLoanSaga({ payload: { loanId } }) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/loan/${loanId}`, options);
  if (!response.status || response.status === 200) {
    yield put(deleteLoanSuccess(response));
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
    yield put(deleteLoanFailure(message));
  }
}

// Edit Loan Ratings
function* editLoanRatingsSaga({ payload: { ratings, loanId } }) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(ratings),
    headers: { 'Content-Type': 'application/json' },
  };

  const response = yield call(fetchJSON, `${SERVER_URL}/loan/${loanId}/rating`, options);
  if (!response.status || response.status === 200) {
    yield put(editLoanRatingsSuccess(response));
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
    yield put(editLoanRatingsFailure(message));
  }
}


/**
 * Watchers
 */
export function* watchGetLoans() {
  yield takeEvery(GET_LOANS, getLoansSaga);
}

export function* watchGet60DayLoans() {
  yield takeEvery(GET_60_DAY_LOANS, get60DayLoansSaga);
}

export function* watchGetCashFlowLoans() {
  yield takeEvery(GET_CASH_FLOW_LOANS, getCashFlowLoans);
}

export function* watchGetLoan() {
  yield takeEvery(GET_LOAN, getLoanSaga);
}

export function* watchCreateLoan() {
  yield takeEvery(CREATE_LOAN, createLoanSaga);
}

export function* watchEditLoan() {
  yield takeEvery(EDIT_LOAN, editLoanSaga);
}

export function* watchDeleteLoan() {
  yield takeEvery(DELETE_LOAN, deleteLoanSaga);
}

export function* watchEditLoanRatings() {
  yield takeEvery(EDIT_LOAN_RATINGS, editLoanRatingsSaga);
}

function* LoanSaga() {
  yield all([
    fork(watchGetLoans),
    fork(watchGet60DayLoans),
    fork(watchGetCashFlowLoans),
    fork(watchGetLoan),
    fork(watchCreateLoan),
    fork(watchEditLoan),
    fork(watchDeleteLoan),
    fork(watchEditLoanRatings),
  ]);
}

export default LoanSaga;
