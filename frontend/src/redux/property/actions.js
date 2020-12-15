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

type PropertyAction = { type: string, payload: {} | string };

// Create Property
export const createProperty = (property: object = {}): PropertyAction => {
  return ({
  type: CREATE_PROPERTY,
  payload: { property },
})};

export const createPropertySuccess = (property: object): PropertyAction => ({
  type: CREATE_PROPERTY_SUCCESS,
  payload: property,
});

export const createPropertyFailure = (err: object): PropertyAction => ({
  type: CREATE_PROPERTY_FAILURE,
  payload: err,
});

// Edit Property
export const editProperty = (property: object = {}): PropertyAction => ({
  type: EDIT_PROPERTY,
  payload: { property },
});

export const editPropertySuccess = (property: object): PropertyAction => ({
  type: EDIT_PROPERTY_SUCCESS,
  payload: property,
});

export const editPropertyFailure = (err: object): PropertyAction => ({
  type: EDIT_PROPERTY_FAILURE,
  payload: err,
});

// Delete Property
export const deleteProperty = (propertyId: string = '', loanId: string = ''): PropertyAction => ({
  type: DELETE_PROPERTY,
  payload: { propertyId, loanId },
});

export const deletePropertySuccess = (): PropertyAction => {
  return({
  type: DELETE_PROPERTY_SUCCESS,
  payload: {},
})};

export const deletePropertyFailure = (err: object): PropertyAction => ({
  type: DELETE_PROPERTY_FAILURE,
  payload: err,
});