import {
  GET_LOANS,
  GET_LOANS_SUCCESS,
  GET_LOANS_FAILURE,
  GET_60_DAY_LOANS,
  GET_60_DAY_LOANS_SUCCESS,
  GET_60_DAY_LOANS_FAILURE,
  GET_CASH_FLOW_LOANS,
  GET_CASH_FLOW_LOANS_SUCCESS,
  GET_CASH_FLOW_LOANS_FAILURE,
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
  EDIT_LOAN_RATINGS,
  EDIT_LOAN_RATINGS_SUCCESS,
  EDIT_LOAN_RATINGS_FAILURE,
} from './constants';

type LoanAction = { type: String, payload: {} | String };

// Get Loans
export const getLoans = (nullMSN = false): LoanAction => ({
  type: GET_LOANS,
  payload: { nullMSN },
});

export const getLoansSuccess = (loan: Object): LoanAction => ({
  type: GET_LOANS_SUCCESS,
  payload: loan,
});

export const getLoansFailure = (err: Object): LoanAction => ({
  type: GET_LOANS_FAILURE,
  payload: err,
});

// Get 60-Day Loans
export const get60DayLoans = (): LoanAction => ({
  type: GET_60_DAY_LOANS,
  payload: { },
});

export const get60DayLoansSuccess = (loan: Object): LoanAction => ({
  type: GET_60_DAY_LOANS_SUCCESS,
  payload: loan,
});

export const get60DayLoansFailure = (err: Object): LoanAction => ({
  type: GET_60_DAY_LOANS_FAILURE,
  payload: err,
});

//Get Cash Flow Report
export const getCashFlowLoans = () => ({
  type: GET_CASH_FLOW_LOANS,
  payload: { }
})

export const getCashFlowLoansSuccess = (loan) => ({
  type: GET_CASH_FLOW_LOANS_SUCCESS,
  payload: loan
})

export const getCashFlowLoansFailure = (err) => ({
  type: GET_CASH_FLOW_LOANS_FAILURE,
  payload: err
})

// Get Loan
export const getLoan = (loanId: String): LoanAction => ({
  type: GET_LOAN,
  payload: { loanId },
});

export const getLoanSuccess = (loan: Object): LoanAction => ({
  type: GET_LOAN_SUCCESS,
  payload: loan,
});

export const getLoanFailure = (err: Object): LoanAction => ({
  type: GET_LOAN_FAILURE,
  payload: err,
});

// Create Loan
export const createLoan = (loan: Object = {}): LoanAction => ({
  type: CREATE_LOAN,
  payload: { loan },
});

export const createLoanSuccess = (loan: Object): LoanAction => ({
  type: CREATE_LOAN_SUCCESS,
  payload: loan,
});

export const createLoanFailure = (err: Object): LoanAction => ({
  type: CREATE_LOAN_FAILURE,
  payload: err,
});

// Edit Loan
export const editLoan = (loan: Object = {}): LoanAction => ({
  type: EDIT_LOAN,
  payload: { loan },
});

export const editLoanSuccess = (loan: Object): LoanAction => ({
  type: EDIT_LOAN_SUCCESS,
  payload: loan,
});

export const editLoanFailure = (err: Object): LoanAction => ({
  type: EDIT_LOAN_FAILURE,
  payload: err,
});

// Delete Loan
export const deleteLoan = (loanId: String = ''): LoanAction => ({
  type: DELETE_LOAN,
  payload: { loanId },
});

export const deleteLoanSuccess = (): LoanAction => ({
  type: DELETE_LOAN_SUCCESS,
  payload: {},
});

export const deleteLoanFailure = (err: Object): LoanAction => ({
  type: DELETE_LOAN_FAILURE,
  payload: err,
});

// Clear Loan
export const clearLoan = (): LoanAction => ({
  type: CLEAR_LOAN,
  payload: {  },
});

// Edit Loan Ratings
export const editLoanRatings = (ratings: Array = [], loanId: String = ''): LoanAction => ({
  type: EDIT_LOAN_RATINGS,
  payload: { ratings, loanId },
});

export const editLoanRatingsSuccess = (ratings: Object): LoanAction => ({
  type: EDIT_LOAN_RATINGS_SUCCESS,
  payload: ratings,
});

export const editLoanRatingsFailure = (err: Object): LoanAction => ({
  type: EDIT_LOAN_RATINGS_FAILURE,
  payload: err,
});