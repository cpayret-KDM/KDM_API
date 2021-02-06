import {
  GET_BORROWERS,
  GET_BORROWERS_SUCCESS,
  GET_BORROWERS_FAILURE,
  GET_BORROWER,
  GET_BORROWER_SUCCESS,
  GET_BORROWER_FAILURE,
  CREATE_BORROWER,
  CREATE_BORROWER_SUCCESS,
  CREATE_BORROWER_FAILURE,
  EDIT_BORROWER,
  EDIT_BORROWER_SUCCESS,
  EDIT_BORROWER_FAILURE,
  DELETE_BORROWER,
  DELETE_BORROWER_SUCCESS,
  DELETE_BORROWER_FAILURE,
  CLEAR_BORROWER,
} from './constants';

type Action = { type: string, payload: {} };
type State = { +value: boolean };

const borrower = (state: State = {}, action: Action) => {
  switch (action.type) {
    case GET_BORROWERS:
      return {
        ...state,
        borrowers: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case GET_BORROWERS_SUCCESS:
      return {
        ...state,
        borrowers: action.payload,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case GET_BORROWERS_FAILURE:
      return {
        ...state,
        borrowers: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case GET_BORROWER:
      return {
        ...state,
        borrower: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case GET_BORROWER_SUCCESS:
      return {
        ...state,
        borrower: action.payload,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case GET_BORROWER_FAILURE:
      return {
        ...state,
        borrower: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case CREATE_BORROWER:
      return {
        ...state,
        borrower: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case CREATE_BORROWER_SUCCESS:
      return {
        ...state,
        borrower: action.payload,
        added: true,
        edited: false,
        deleted: false,
        error: false,
      };
    case CREATE_BORROWER_FAILURE:
      return {
        ...state,
        borrower: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case EDIT_BORROWER:
      return {
        ...state,
        borrower: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case EDIT_BORROWER_SUCCESS:
      return {
        ...state,
        borrower: action.payload,
        added: false,
        edited: true,
        deleted: false,
        error: false,
      };
    case EDIT_BORROWER_FAILURE:
      return {
        ...state,
        borrower: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case DELETE_BORROWER:
      return {
        ...state,
        borrower: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case DELETE_BORROWER_SUCCESS:
      return {
        ...state,
        borrower: undefined,
        added: false,
        edited: false,
        deleted: true,
        error: false,
      };
    case DELETE_BORROWER_FAILURE:
      return {
        ...state,
        borrower: action.payload,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case CLEAR_BORROWER:
      return {
        ...state,
        borrower: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: null,
      };

    default:
      return state;
  }
};

export default borrower;
