import {
  GET_LOANS,
  GET_LOANS_SUCCESS,
  GET_LOANS_FAILURE,
  GET_60_DAY_LOANS,
  GET_60_DAY_LOANS_SUCCESS,
  GET_60_DAY_LOANS_FAILURE,

  GET_LOAN,
  GET_LOAN_SUCCESS,
  GET_LOAN_FAILURE,
  CREATE_LOAN,
  CREATE_LOAN_SUCCESS,
  CREATE_LOAN_FAILURE,
  EDIT_LOAN,
  EDIT_LOAN_SUCCESS,
  EDIT_LOAN_FAILURE,
  DELETE_LOAN,
  DELETE_LOAN_SUCCESS,
  DELETE_LOAN_FAILURE,
  CLEAR_LOAN,
} from './constants';

type LoanAction = { type: string, payload: {} | string };

// Get Loans
export const getLoans = (loanNumber: string = '', size: Number, page: Number, sort: string = ''): LoanAction => ({
  type: GET_LOANS,
  payload: { loanNumber, size, page, sort },
});

export const getLoansSuccess = (loan: object): LoanAction => ({
  type: GET_LOANS_SUCCESS,
  payload: loan,
});

export const getLoansFailure = (err: object): LoanAction => ({
  type: GET_LOANS_FAILURE,
  payload: err,
});

// Get 60-Day Loans
export const get60DayLoans = (): LoanAction => ({
  type: GET_60_DAY_LOANS,
  payload: { },
});

export const get60DayLoansSuccess = (loan: object): LoanAction => ({
  type: GET_60_DAY_LOANS_SUCCESS,
  payload: loan,
});

export const get60DayLoansFailure = (err: object): LoanAction => ({
  type: GET_60_DAY_LOANS_FAILURE,
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

// Create Loan
export const createLoan = (loan: object = {}): LoanAction => ({
  type: CREATE_LOAN,
  payload: { loan },
});

export const createLoanSuccess = (loan: object): LoanAction => ({
  type: CREATE_LOAN_SUCCESS,
  payload: loan,
});

export const createLoanFailure = (err: object): LoanAction => ({
  type: CREATE_LOAN_FAILURE,
  payload: err,
});

// Edit Loan
export const editLoan = (loan: object = {}): LoanAction => ({
  type: EDIT_LOAN,
  payload: { loan },
});

export const editLoanSuccess = (loan: object): LoanAction => ({
  type: EDIT_LOAN_SUCCESS,
  payload: loan,
});

export const editLoanFailure = (err: object): LoanAction => ({
  type: EDIT_LOAN_FAILURE,
  payload: err,
});

// Delete Loan
export const deleteLoan = (loanId: string = ''): LoanAction => ({
  type: DELETE_LOAN,
  payload: { loanId },
});

export const deleteLoanSuccess = (): LoanAction => ({
  type: DELETE_LOAN_SUCCESS,
  payload: {},
});

export const deleteLoanFailure = (err: object): LoanAction => ({
  type: DELETE_LOAN_FAILURE,
  payload: err,
});

// Delete Loan
export const clearLoan = (): LoanAction => ({
  type: CLEAR_LOAN,
  payload: {  },
});