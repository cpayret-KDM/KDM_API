import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';

import {
  GET_LOANS,
  GET_LOAN,
  CREATE_LOAN,
  EDIT_LOAN,
  DELETE_LOAN,
} from './constants';

import {
  getLoansSuccess,
  getLoansFailure,
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
    body: JSON.stringify({ loan }),
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
    body: loan,
    headers: { 'Content-Type': 'application/json' },
  };


  // {
  //   "sponsorID": 0,
  //   "msnId": 0,
  //   "id": 0,
  //   "loanNumber": "string",
  //   "dealName": "string",
  //   "originationDate": "2020-12-03T02:04:14.066Z",
  //   "maturityDate": "2020-12-03T02:04:14.066Z",
  //   "tradeDate": "2020-12-03T02:04:14.066Z",
  //   "loanStatus": "Performing",
  //   "initialAmount": 0,
  //   "pipelineStatus": "Closed",
  //   "ltv": 0,
  //   "loanRate": 0,
  //   "memoUrl": "string"
  // }
 
 
  console.log('saga loan',loan)
  //JSON parse error: Cannot deserialize instance of `com.kdm.web.model.Loan` out of START_ARRAY token;
  // {
  //   KDMRating: "A+"
  //   dealName: "Test"
  //   id: 1
  //   initialAmount: 1059000
  //   loanNumber: "KDM2017-L001"
  //   loanRate: 5.25
  //   loanStatus: "Performing"
  //   ltv: 53.7
  //   maturityDate: "2027-05-01T00:00:01Z"
  //   memoUrl: null
  //   msnId: 1
  //   originationDate: null
  //   pipelineStatus: "Closed"
  //   properties: (2) [{…}, {…}]
  //   sponsorID: null
  //   tradeDate: null
  // }

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
    fork(watchGetLoan),
    fork(watchCreateLoan),
    fork(watchEditLoan),
    fork(watchDeleteLoan),
  ]);
}

export default LoanSaga;
