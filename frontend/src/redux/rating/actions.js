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

type RatingAction = { type: String, payload: {} | String };

// Get Ratings
export const getRatings = (): RatingAction => ({
  type: GET_RATINGS,
  payload: { },
});

export const getRatingsSuccess = (ratings: Array): RatingAction => ({
  type: GET_RATINGS_SUCCESS,
  payload: { ratings },
});

export const getRatingsFailure = (err: Object): RatingAction => ({
  type: GET_RATINGS_FAILURE,
  payload: err,
});

// Get Rating
export const getRating = (ratingId: String = ''): RatingAction => ({
  type: GET_RATING,
  payload: { ratingId },
});

export const getRatingSuccess = (rating: Object): RatingAction => ({
  type: GET_RATING_SUCCESS,
  payload: rating,
});

export const getRatingFailure = (err: Object): RatingAction => ({
  type: GET_RATING_FAILURE,
  payload: err,
});

// Create Rating
export const createRating = (rating: Object = {}, loanId: String = ''): RatingAction => ({
  type: CREATE_RATING,
  payload: { rating, loanId },
});

export const createRatingSuccess = (rating: Object): RatingAction => ({
  type: CREATE_RATING_SUCCESS,
  payload: rating,
});

export const createRatingFailure = (err: Object): RatingAction => ({
  type: CREATE_RATING_FAILURE,
  payload: err,
});

// Edit Rating
export const editRating = (rating: Object = {}, loanId: String = ''): RatingAction => ({
  type: EDIT_RATING,
  payload: { rating, loanId },
});

export const editRatingSuccess = (rating: Object): RatingAction => ({
  type: EDIT_RATING_SUCCESS,
  payload: rating,
});

export const editRatingFailure = (err: Object): RatingAction => ({
  type: EDIT_RATING_FAILURE,
  payload: err,
});

// Delete Rating
export const deleteRating = (ratingId: String = '', loanId: String = ''): RatingAction => ({
  type: DELETE_RATING,
  payload: { ratingId, loanId },
});

export const deleteRatingSuccess = (): RatingAction => ({
  type: DELETE_RATING_SUCCESS,
  payload: {},
});

export const deleteRatingFailure = (err: Object): RatingAction => ({
  type: DELETE_RATING_FAILURE,
  payload: err,
});

// Clear Rating
export const clearRating = (): LoanAction => ({
  type: CLEAR_RATING,
  payload: {  },
});