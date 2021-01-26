import {
  GET_SPONSOR,
  GET_SPONSOR_SUCCESS,
  GET_SPONSOR_FAILURE,
  CREATE_SPONSOR,
  CREATE_SPONSOR_SUCCESS,
  CREATE_SPONSOR_FAILURE,
  EDIT_SPONSOR,
  EDIT_SPONSOR_SUCCESS,
  EDIT_SPONSOR_FAILURE,
  DELETE_SPONSOR,
  DELETE_SPONSOR_SUCCESS,
  DELETE_SPONSOR_FAILURE,
  CLEAR_SPONSOR,
} from './constants';

type Action = { type: string, payload: {} };
type State = { +value: boolean };

const sponsor = (state: State = {}, action: Action) => {
  switch (action.type) {
    case GET_SPONSOR:
      return {
        ...state,
        sponsor: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case GET_SPONSOR_SUCCESS:
      return { 
        ...state, 
        sponsor: action.payload,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case GET_SPONSOR_FAILURE:
      return { 
        ...state,
        sponsor: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case CREATE_SPONSOR:
      return {
        ...state,
        sponsor: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case CREATE_SPONSOR_SUCCESS:
      return { 
        ...state, 
        sponsor: action.payload,
        added: true,
        edited: false,
        deleted: false,
        error: false,
      };
    case CREATE_SPONSOR_FAILURE:
      return { 
        ...state,
        sponsor: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case EDIT_SPONSOR:
      return {
        ...state,
        sponsor: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case EDIT_SPONSOR_SUCCESS:
      return { 
        ...state, 
        sponsor: action.payload,
        added: false,
        edited: true,
        deleted: false,
        error: false,
      };
    case EDIT_SPONSOR_FAILURE:
      return { 
        ...state,
        sponsor: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case DELETE_SPONSOR:
      return {
        ...state,
        sponsor: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case DELETE_SPONSOR_SUCCESS:
      return { 
        ...state, 
        sponsor: undefined,
        added: false,
        edited: false,
        deleted: true,
        error: false,
      };
    case DELETE_SPONSOR_FAILURE:
      return { 
        ...state,
        sponsor: action.payload,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case CLEAR_SPONSOR:
      return {
        ...state,
        sponsor: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: null,
      };

    default:
      return state;
  }
};

export default sponsor;
