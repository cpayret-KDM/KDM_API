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
} from './constants';

type Action = { type: string, payload: {} };
type State = { +value: boolean };

const property = (state: State = {}, action: Action) => {
  switch (action.type) {
    case CREATE_PROPERTY:
      return {
        ...state,
        property: null,
        createPropertySuccess: false,
      };
    case CREATE_PROPERTY_SUCCESS:
      return { 
        ...state, 
        property: action.payload,
        createPropertySuccess: true,
      };
    case CREATE_PROPERTY_FAILURE:
      return { 
        ...state,
        property: action.payload,
        createPropertySuccess: false,
      };

    case EDIT_PROPERTY:
      return {
        ...state,
        editPropertySuccess: false,
      };
    case EDIT_PROPERTY_SUCCESS:
      return { 
        ...state, 
        property: action.payload,
        editPropertySuccess: true,
      };
    case EDIT_PROPERTY_FAILURE:
      return { 
        ...state,
        editPropertySuccess: false,
      };

    case DELETE_PROPERTY:
      return {
        ...state,
        property: null,
        deletePropertySuccess: false,
      };
    case DELETE_PROPERTY_SUCCESS:
      return { 
        ...state, 
        property: action.payload,
        deletePropertySuccess: true,
      };
    case DELETE_PROPERTY_FAILURE:
      return { 
        ...state,
        property: action.payload,
        deletePropertySuccess: false,
      };

    default:
      return state;
  }
};

export default property;
