import {
  CREATE_SPONSOR,
  CREATE_SPONSOR_SUCCESS,
  CREATE_SPONSOR_FAILURE,
  EDIT_SPONSOR,
  EDIT_SPONSOR_SUCCESS,
  EDIT_SPONSOR_FAILURE,
  DELETE_SPONSOR,
  DELETE_SPONSOR_SUCCESS,
  DELETE_SPONSOR_FAILURE,
} from './constants';

type Action = { type: string, payload: {} };
type State = { +value: boolean };

const sponsor = (state: State = {}, action: Action) => {
  switch (action.type) {
    case CREATE_SPONSOR:
      return {
        ...state,
        sponsor: undefined,
        added: false,
      };
    case CREATE_SPONSOR_SUCCESS:
      return { 
        ...state, 
        sponsor: action.payload,
        added: true,
      };
    case CREATE_SPONSOR_FAILURE:
      return { 
        ...state,
        sponsor: action.payload,
        added: false,
      };

    case EDIT_SPONSOR:
      return {
        ...state,
        sponsor: undefined,
        edited: false,
      };
    case EDIT_SPONSOR_SUCCESS:
      return { 
        ...state, 
        sponsor: action.payload,
        edited: true,
      };
    case EDIT_SPONSOR_FAILURE:
      return { 
        ...state,
        edited: false,
      };

    case DELETE_SPONSOR:
      return {
        ...state,
        sponsor: undefined,
        deleted: false,
      };
    case DELETE_SPONSOR_SUCCESS:
      return { 
        ...state, 
        sponsor: action.payload,
        deleted: true,
      };
    case DELETE_SPONSOR_FAILURE:
      return { 
        ...state,
        sponsor: action.payload,
        deleted: false,
      };

    default:
      return state;
  }
};

export default sponsor;
