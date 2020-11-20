import {
  GET_LOANS,
  GET_LOANS_SUCCESS,
  GET_LOANS_FAILURE,
  GET_LOAN,
  GET_LOAN_SUCCESS,
  GET_LOAN_FAILURE,
} from './constants';

type LoanAction = { type: string, payload: {} | string };

// Get Loans
export const getLoans = (loanNumber: string = '', size: Number, page: Number, sort: string = ''): LoanAction => ({
  type: GET_LOANS,
  payload: { loanNumber, size, page, sort },
});

export const getLoansSuccess = (loan: object): LoanAction => {
  return ({
  type: GET_LOANS_SUCCESS,
  payload: loan,
})};

export const getLoansFailure = (err: object): LoanAction => ({
  type: GET_LOANS_FAILURE,
  payload: err,
});

// Get Loan
export const getLoan = (loanId: string): LoanAction => ({
  type: GET_LOAN,
  payload: { loanId },
});

export const getLoanSuccess = (loan: object): LoanAction => ({
  type: GET_LOAN_SUCCESS,
  payload: loan,
});

export const getLoanFailure = (err: object): LoanAction => ({
  type: GET_LOAN_FAILURE,
  payload: err,
});