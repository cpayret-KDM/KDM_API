import {
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
} from './constants';

type Action = { type: string, payload: {} };
type State = { +value: boolean };

const property = (state: State = {}, action: Action) => {
  switch (action.type) {
    case CREATE_PROPERTY:
      return {
        ...state,
        property: undefined,
        added: false,
      };
    case CREATE_PROPERTY_SUCCESS:
      return { 
        ...state, 
        property: action.payload,
        added: true,
      };
    case CREATE_PROPERTY_FAILURE:
      return { 
        ...state,
        property: undefined,
        added: false,
        error: action.payload,
      };

    case EDIT_PROPERTY:
      return {
        ...state,
        property: undefined,
        edited: false,
      };
    case EDIT_PROPERTY_SUCCESS:
      return { 
        ...state, 
        property: action.payload,
        edited: true,
      };
    case EDIT_PROPERTY_FAILURE:
      return { 
        ...state,
        edited: false,
        error: action.payload,
      };

    case DELETE_PROPERTY:
      return {
        ...state,
        property: undefined,
        deleted: false,
      };
    case DELETE_PROPERTY_SUCCESS:
      return { 
        ...state, 
        property: action.payload,
        deleted: true,
      };
    case DELETE_PROPERTY_FAILURE:
      return { 
        ...state,
        property: undefined,
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

    default:
      return state;
  }
};

export default property;
