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

// Get Ratings
export const getRatings = () => ({
  type: GET_RATINGS,
  payload: { },
});

export const getRatingsSuccess = (ratings) => ({
  type: GET_RATINGS_SUCCESS,
  payload: { ratings },
});

export const getRatingsFailure = (err) => ({
  type: GET_RATINGS_FAILURE,
  payload: err,
});

// Get Rating
export const getRating = (ratingId = '') => ({
  type: GET_RATING,
  payload: { ratingId },
});

export const getRatingSuccess = (rating) => ({
  type: GET_RATING_SUCCESS,
  payload: rating,
});

export const getRatingFailure = (err) => ({
  type: GET_RATING_FAILURE,
  payload: err,
});

// Create Rating
export const createRating = (rating = {}, loanId = '') => ({
  type: CREATE_RATING,
  payload: { rating, loanId },
});

export const createRatingSuccess = (rating) => ({
  type: CREATE_RATING_SUCCESS,
  payload: rating,
});

export const createRatingFailure = (err) => ({
  type: CREATE_RATING_FAILURE,
  payload: err,
});

// Edit Rating
export const editRating = (rating = {}, loanId = '') => ({
  type: EDIT_RATING,
  payload: { rating, loanId },
});

export const editRatingSuccess = (rating) => ({
  type: EDIT_RATING_SUCCESS,
  payload: rating,
});

export const editRatingFailure = (err) => ({
  type: EDIT_RATING_FAILURE,
  payload: err,
});

// Delete Rating
export const deleteRating = (ratingId = '', loanId = '') => ({
  type: DELETE_RATING,
  payload: { ratingId, loanId },
});

export const deleteRatingSuccess = () => ({
  type: DELETE_RATING_SUCCESS,
  payload: {},
});

export const deleteRatingFailure = (err) => ({
  type: DELETE_RATING_FAILURE,
  payload: err,
});

// Clear Rating
export const clearRating = () => ({
  type: CLEAR_RATING,
  payload: {  },
});