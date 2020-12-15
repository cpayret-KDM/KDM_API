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

type Action = { type: string, payload: {} };
type State = { +value: boolean };

const Loan = (state: State = {}, action: Action) => {
  switch (action.type) {
    /* Loans */
    case GET_LOANS:
      return {
        ...state,
        loans: null,
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
      };

      case GET_60_DAY_LOANS:
        return {
          ...state,
          loans: null,
        };
      case GET_60_DAY_LOANS_SUCCESS:
        return { 
          ...state, 
          loans: action.payload,
        };
      case GET_60_DAY_LOANS_FAILURE:
        return { 
          ...state,
          loans: action.payload,
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
      };
    case GET_LOAN_FAILURE:
      return { 
        ...state,
        loan: action.payload,
        loaded: true,
      };

    case CREATE_LOAN:
      return {
        ...state,
        loan: undefined,
      };
    case CREATE_LOAN_SUCCESS:
      return { 
        ...state, 
        loan: action.payload,
      };
    case CREATE_LOAN_FAILURE:
      return { 
        ...state,
        loan: action.payload,
      };

    case EDIT_LOAN:
      return {
        ...state,
      };
    case EDIT_LOAN_SUCCESS:
      return { 
        ...state, 
        loan: action.payload,
      };
    case EDIT_LOAN_FAILURE:
      return { 
        ...state,
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
        loan: action.payload,
        deleted: false,
      };

    case CLEAR_LOAN:
      return {
        ...state,
        loan: undefined,
      };

    default:
      return state;
  }
};

export default Loan;
