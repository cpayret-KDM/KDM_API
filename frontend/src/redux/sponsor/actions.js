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

type SponsorAction = { type: String, payload: {} | String };

// Get Sponsor
export const getSponsor = (sponsorId: String = ''): SponsorAction => ({
  type: GET_SPONSOR,
  payload: { sponsorId },
});

export const getSponsorSuccess = (sponsor: Object): SponsorAction => ({
  type: GET_SPONSOR_SUCCESS,
  payload: sponsor,
});

export const getSponsorFailure = (err: Object): SponsorAction => ({
  type: GET_SPONSOR_FAILURE,
  payload: err,
});

// Create Sponsor
export const createSponsor = (sponsor: Object = {}, loanId: String = ''): SponsorAction => ({
  type: CREATE_SPONSOR,
  payload: { sponsor, loanId },
});

export const createSponsorSuccess = (sponsor: Object): SponsorAction => ({
  type: CREATE_SPONSOR_SUCCESS,
  payload: sponsor,
});

export const createSponsorFailure = (err: Object): SponsorAction => ({
  type: CREATE_SPONSOR_FAILURE,
  payload: err,
});

// Edit Sponsor
export const editSponsor = (sponsor: Object = {}, loanId: String = ''): SponsorAction => ({
  type: EDIT_SPONSOR,
  payload: { sponsor, loanId },
});

export const editSponsorSuccess = (sponsor: Object): SponsorAction => ({
  type: EDIT_SPONSOR_SUCCESS,
  payload: sponsor,
});

export const editSponsorFailure = (err: Object): SponsorAction => ({
  type: EDIT_SPONSOR_FAILURE,
  payload: err,
});

// Delete Sponsor
export const deleteSponsor = (sponsorId: String = '', loanId: String = ''): SponsorAction => ({
  type: DELETE_SPONSOR,
  payload: { sponsorId, loanId },
});

export const deleteSponsorSuccess = (): SponsorAction => ({
  type: DELETE_SPONSOR_SUCCESS,
  payload: {},
});

export const deleteSponsorFailure = (err: Object): SponsorAction => ({
  type: DELETE_SPONSOR_FAILURE,
  payload: err,
});

// Clear Sponsor
export const clearSponsor = (): LoanAction => ({
  type: CLEAR_SPONSOR,
  payload: {  },
});