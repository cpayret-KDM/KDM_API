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

// Get Sponsor
export const getSponsor = (sponsorId = '') => ({
  type: GET_SPONSOR,
  payload: { sponsorId },
});

export const getSponsorSuccess = (sponsor) => ({
  type: GET_SPONSOR_SUCCESS,
  payload: sponsor,
});

export const getSponsorFailure = (err) => ({
  type: GET_SPONSOR_FAILURE,
  payload: err,
});

// Create Sponsor
export const createSponsor = (sponsor = {}, loanId = '') => ({
  type: CREATE_SPONSOR,
  payload: { sponsor, loanId },
});

export const createSponsorSuccess = (sponsor) => ({
  type: CREATE_SPONSOR_SUCCESS,
  payload: sponsor,
});

export const createSponsorFailure = (err) => ({
  type: CREATE_SPONSOR_FAILURE,
  payload: err,
});

// Edit Sponsor
export const editSponsor = (sponsor = {}, loanId = '') => ({
  type: EDIT_SPONSOR,
  payload: { sponsor, loanId },
});

export const editSponsorSuccess = (sponsor) => ({
  type: EDIT_SPONSOR_SUCCESS,
  payload: sponsor,
});

export const editSponsorFailure = (err) => ({
  type: EDIT_SPONSOR_FAILURE,
  payload: err,
});

// Delete Sponsor
export const deleteSponsor = (sponsorId = '', loanId = '') => ({
  type: DELETE_SPONSOR,
  payload: { sponsorId, loanId },
});

export const deleteSponsorSuccess = () => ({
  type: DELETE_SPONSOR_SUCCESS,
  payload: {},
});

export const deleteSponsorFailure = (err) => ({
  type: DELETE_SPONSOR_FAILURE,
  payload: err,
});

// Clear Sponsor
export const clearSponsor = () => ({
  type: CLEAR_SPONSOR,
  payload: {  },
});