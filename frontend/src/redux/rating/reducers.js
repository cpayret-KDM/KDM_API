import {
  GET_RATINGS,
  GET_RATINGS_SUCCESS,
  GET_RATINGS_FAILURE,
  GET_RATING,
  GET_RATING_SUCCESS,
  GET_RATING_FAILURE,
  CREATE_RATING,
  CREATE_RATING_SUCCESS,
  CREATE_RATING_FAILURE,
  EDIT_RATING,
  EDIT_RATING_SUCCESS,
  EDIT_RATING_FAILURE,
  DELETE_RATING,
  DELETE_RATING_SUCCESS,
  DELETE_RATING_FAILURE,
  CLEAR_RATING,
} from './constants';




const initialState = {
  ratings: [],
  rating: {},
  added: false,
  edited: false,
  deleted: false,
  error: false
}

const rating = (state = initialState, action) => {
  switch (action.type) {
    case GET_RATINGS:
      return {
        ...state,
        ratings: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case GET_RATINGS_SUCCESS:
      return { 
        ...state, 
        ratings: action.payload,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case GET_RATINGS_FAILURE:
      return { 
        ...state,
        ratings: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case GET_RATING:
      return {
        ...state,
        rating: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case GET_RATING_SUCCESS:
      return { 
        ...state, 
        rating: action.payload,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case GET_RATING_FAILURE:
      return { 
        ...state,
        rating: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case CREATE_RATING:
      return {
        ...state,
        rating: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case CREATE_RATING_SUCCESS:
      return { 
        ...state, 
        rating: action.payload,
        added: true,
        edited: false,
        deleted: false,
        error: false,
      };
    case CREATE_RATING_FAILURE:
      return { 
        ...state,
        rating: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case EDIT_RATING:
      return {
        ...state,
        rating: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case EDIT_RATING_SUCCESS:
      return { 
        ...state, 
        rating: action.payload,
        added: false,
        edited: true,
        deleted: false,
        error: false,
      };
    case EDIT_RATING_FAILURE:
      return { 
        ...state,
        rating: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case DELETE_RATING:
      return {
        ...state,
        rating: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: false,
      };
    case DELETE_RATING_SUCCESS:
      return { 
        ...state, 
        rating: undefined,
        added: false,
        edited: false,
        deleted: true,
        error: false,
      };
    case DELETE_RATING_FAILURE:
      return { 
        ...state,
        rating: action.payload,
        added: false,
        edited: false,
        deleted: false,
        error: action.payload,
      };

    case CLEAR_RATING:
      return {
        ...state,
        rating: undefined,
        added: false,
        edited: false,
        deleted: false,
        error: null,
      };

    default:
      return state;
  }
};

export default rating;
