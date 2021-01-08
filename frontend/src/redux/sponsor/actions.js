import {
  CREATE_SPONSOR,
  CREATE_SPONSOR_SUCCESS,
  CREATE_SPONSOR_FAILURE,
  EDIT_SPONSOR,
  EDIT_SPONSOR_SUCCESS,
  EDIT_SPONSOR_FAILURE,
  DELETE_SPONSOR,
  DELETE_SPONSOR_SUCCESS,
  DELETE_SPONSOR_FAILURE,
} from './constants';

type SponsorAction = { type: string, payload: {} | string };

// Create Sponsor
export const createSponsor = (sponsor: object = {}, loanId: string = ''): SponsorAction => {
  return ({
  type: CREATE_SPONSOR,
  payload: { sponsor, loanId },
})};

export const createSponsorSuccess = (sponsor: object): SponsorAction => ({
  type: CREATE_SPONSOR_SUCCESS,
  payload: sponsor,
});

export const createSponsorFailure = (err: object): SponsorAction => ({
  type: CREATE_SPONSOR_FAILURE,
  payload: err,
});

// Edit Sponsor
export const editSponsor = (sponsor: object = {}, loanId: string = ''): SponsorAction => ({
  type: EDIT_SPONSOR,
  payload: { sponsor, loanId },
});

export const editSponsorSuccess = (sponsor: object): SponsorAction => ({
  type: EDIT_SPONSOR_SUCCESS,
  payload: sponsor,
});

export const editSponsorFailure = (err: object): SponsorAction => ({
  type: EDIT_SPONSOR_FAILURE,
  payload: err,
});

// Delete Sponsor
export const deleteSponsor = (sponsorId: string = '', loanId: string = ''): SponsorAction => ({
  type: DELETE_SPONSOR,
  payload: { sponsorId, loanId },
});

export const deleteSponsorSuccess = (): SponsorAction => {
  return({
  type: DELETE_SPONSOR_SUCCESS,
  payload: {},
})};

export const deleteSponsorFailure = (err: object): SponsorAction => ({
  type: DELETE_SPONSOR_FAILURE,
  payload: err,
});