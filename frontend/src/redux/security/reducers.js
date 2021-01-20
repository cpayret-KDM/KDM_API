import {
  GET_SECURITIES,
  GET_SECURITIES_SUCCESS,
  GET_SECURITIES_FAILURE,
  // GET_60_DAY_SECURITIES,
  // GET_60_DAY_SECURITIES_SUCCESS,
  // GET_60_DAY_SECURITIES_FAILURE,

  GET_SECURITY,
  GET_SECURITY_SUCCESS,
  GET_SECURITY_FAILURE,
  CREATE_SECURITY,
  CREATE_SECURITY_SUCCESS,
  CREATE_SECURITY_FAILURE,
  EDIT_SECURITY,
  EDIT_SECURITY_SUCCESS,
  EDIT_SECURITY_FAILURE,
  DELETE_SECURITY,
  DELETE_SECURITY_SUCCESS,
  DELETE_SECURITY_FAILURE,
  CLEAR_SECURITY,
} from './constants';

type Action = { type: string, payload: {} };
type State = { +value: boolean };

const Security = (state: State = {}, action: Action) => {
  switch (action.type) {
    /* Securities */
    case GET_SECURITIES:
      return {
        ...state,
        securities: null,
      };
    case GET_SECURITIES_SUCCESS:
      return {
        ...state,
        securities: action.payload,
      };
    case GET_SECURITIES_FAILURE:
      return {
        ...state,
        securities: action.payload,
      };

    // case GET_60_DAY_SECURITIES:
    //   return {
    //     ...state,
    //     securities: null,
    //   };
    // case GET_60_DAY_SECURITIES_SUCCESS:
    //   return {
    //     ...state,
    //     securities: action.payload,
    //   };
    // case GET_60_DAY_SECURITIES_FAILURE:
    //   return {
    //     ...state,
    //     securities: action.payload,
    //   };

    /* Security */
    case GET_SECURITY:
      return {
        ...state,
      };
    case GET_SECURITY_SUCCESS:
      return {
        ...state,
        security: action.payload,
        loaded: true,
      };
    case GET_SECURITY_FAILURE:
      return {
        ...state,
        security: action.payload,
        loaded: true,
      };

    case CREATE_SECURITY:
      return {
        ...state,
        security: undefined,
      };
    case CREATE_SECURITY_SUCCESS:
      return {
        ...state,
        security: action.payload,
      };
    case CREATE_SECURITY_FAILURE:
      return {
        ...state,
        security: action.payload,
      };

    case EDIT_SECURITY:
      return {
        ...state,
      };
    case EDIT_SECURITY_SUCCESS:
      return {
        ...state,
        security: action.payload,
      };
    case EDIT_SECURITY_FAILURE:
      return {
        ...state,
      };

    case DELETE_SECURITY:
      return {
        ...state,
        security: undefined,
        deleted: false,
      };
    case DELETE_SECURITY_SUCCESS:
      return {
        ...state,
        security: action.payload,
        deleted: true,
      };
    case DELETE_SECURITY_FAILURE:
      return {
        ...state,
        security: action.payload,
        deleted: false,
      };

    case CLEAR_SECURITY:
      return {
        ...state,
        security: undefined,
      };

    default:
      return state;
  }
};

export default Security;