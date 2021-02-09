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

type Action = { type: string, payload: {} };

type State = {
  loans: Array<{}>,
  loan: {},
  loaded: boolean,
  deleted: boolean
};

const initialState = {
  loans: [],
  loan: {},
  loaded: false,
  deleted: false
};

const Loan = (state: State = initialState, action: Action) => {
  switch (action.type) {
    /* Loans */
    case GET_LOANS:
      return {
        ...state,
        loans: undefined,
      };
    case GET_LOANS_SUCCESS:
      return { 
        ...state, 
        loans: action.payload,
      };
    case GET_LOANS_FAILURE:
      return { 
        ...state,
        loans: action.payload,
        error: action.payload,
      };

    case GET_60_DAY_LOANS:
      return {
        ...state,
        loans: undefined,
      };
    case GET_60_DAY_LOANS_SUCCESS:
      return { 
        ...state, 
        loans: action.payload,
      };
    case GET_60_DAY_LOANS_FAILURE:
      return { 
        ...state,
        loans: undefined,
        error: action.payload,
      };

    case GET_CASH_FLOW_LOANS:
      return {
        ...state,
        loans: undefined
      };
    case GET_CASH_FLOW_LOANS_SUCCESS:
      return {
        ...state,
        loans: action.payload
      };
    case GET_CASH_FLOW_LOANS_FAILURE:
      return {
        ...state,
        loans: undefined,
        error: action.payload
      };

    /* Loan */
    case GET_LOAN:
      return {
        ...state,
      };
    case GET_LOAN_SUCCESS:
      return { 
        ...state, 
        loan: action.payload,
        loaded: true,
        added: false,
        edited: false,
      };
    case GET_LOAN_FAILURE:
      return { 
        ...state,
        loan: undefined,
        loaded: true,
        error: action.payload,
      };

    case CREATE_LOAN:
      return {
        ...state,
        loan: undefined,
        added: false,
      };
    case CREATE_LOAN_SUCCESS:
      return { 
        ...state, 
        loan: action.payload,
        added: true,
      };
    case CREATE_LOAN_FAILURE:
      return { 
        ...state,
        loan: undefined,
        added: false,
        error: action.payload,
      };

    case EDIT_LOAN:
      return {
        ...state,
        edited: false,
      };
    case EDIT_LOAN_SUCCESS:
      return { 
        ...state, 
        loan: action.payload,
        edited: true,
      };
    case EDIT_LOAN_FAILURE:
      return { 
        ...state,
        edited: false,
        error: action.payload,
      };

    case DELETE_LOAN:
      return {
        ...state,
        loan: undefined,
        deleted: false,
      };
    case DELETE_LOAN_SUCCESS:
      return { 
        ...state, 
        loan: action.payload,
        deleted: true,
      };
    case DELETE_LOAN_FAILURE:
      return { 
        ...state,
        loan: undefined,
        deleted: false,
        error: action.payload,
      };

    case CLEAR_LOAN:
      return {
        ...state,
        loan: undefined,
      };

    case EDIT_LOAN_RATINGS:
      return {
        ...state,
        edited: false,
      };
    case EDIT_LOAN_RATINGS_SUCCESS:
      return { 
        ...state, 
        loan: action.payload,
        edited: true,
      };
    case EDIT_LOAN_RATINGS_FAILURE:
      return { 
        ...state,
        edited: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Loan;
