import {
  GET_PROPERTY,
  GET_PROPERTY_SUCCESS,
  GET_PROPERTY_FAILURE,
  CREATE_PROPERTY,
  CREATE_PROPERTY_SUCCESS,
  CREATE_PROPERTY_FAILURE,
  EDIT_PROPERTY,
  EDIT_PROPERTY_SUCCESS,
  EDIT_PROPERTY_FAILURE,
  DELETE_PROPERTY,
  DELETE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAILURE,
  ASSIGN_APPRAISAL,
  ASSIGN_APPRAISAL_SUCCESS,
  ASSIGN_APPRAISAL_FAILURE,
  ASSIGN_BORROWER,
  ASSIGN_BORROWER_SUCCESS,
  ASSIGN_BORROWER_FAILURE,
  EDIT_BORROWER,
  EDIT_BORROWER_SUCCESS,
  EDIT_BORROWER_FAILURE,
  CLEAR_PROPERTY,
} from './constants';

type Action = { type: string, payload: {} };
type State = { +value: boolean };

const property = (state: State = {}, action: Action) => {
  switch (action.type) {
    case GET_PROPERTY:
      return {
        ...state,
        property: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: null,
      };
    case GET_PROPERTY_SUCCESS:
      return {
        ...state,
        property: action.payload,
        added: false,
        edited: false,
        deleted: false,
        error: null,
      };
    case GET_PROPERTY_FAILURE:
      return {
        ...state,
        property: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case CREATE_PROPERTY:
      return {
        ...state,
        property: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: null,
      };
    case CREATE_PROPERTY_SUCCESS:
      return {
        ...state,
        property: action.payload,
        added: true,
        edited: false,
        deleted: false,
        error: null,
      };
    case CREATE_PROPERTY_FAILURE:
      return {
        ...state,
        property: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case EDIT_PROPERTY:
      return {
        ...state,
        property: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: null,
      };
    case EDIT_PROPERTY_SUCCESS:
      return {
        ...state,
        property: action.payload,
        added: false,
        edited: true,
        deleted: false,
        error: null,
      };
    case EDIT_PROPERTY_FAILURE:
      return {
        ...state,
        property: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case DELETE_PROPERTY:
      return {
        ...state,
        property: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: null,
      };
    case DELETE_PROPERTY_SUCCESS:
      return {
        ...state,
        property: action.payload,
        added: false,
        edited: false,
        deleted: true,
        error: null,
      };
    case DELETE_PROPERTY_FAILURE:
      return {
        ...state,
        property: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case ASSIGN_APPRAISAL:
      return {
        ...state,
      };
    case ASSIGN_APPRAISAL_SUCCESS:
      return {
        ...state,
      };
    case ASSIGN_APPRAISAL_FAILURE:
      return {
        ...state,
      };

    case ASSIGN_BORROWER:
      return {
        ...state,
      };
    case ASSIGN_BORROWER_SUCCESS:
      return {
        ...state,
      };
    case ASSIGN_BORROWER_FAILURE:
      return {
        ...state,
      };
    
    case EDIT_BORROWER:
      return {
        ...state,
        added: false,
        edited: false,
        deleted: false,
        error: null,
      }
    case EDIT_BORROWER_SUCCESS:
      return {
        ...state,
        added: false,
        edited: true,
        deleted: false,
        error: null,
      }
    case EDIT_BORROWER_FAILURE:
      return {
        ...state,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case CLEAR_PROPERTY:
      return {
        ...state,
        property: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: null,
      };

    default:
      return state;
  }
};

export default property;
