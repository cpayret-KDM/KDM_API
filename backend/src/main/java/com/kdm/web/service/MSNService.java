package com.kdm.web.service;

import java.util.List;

import com.kdm.web.model.MSN;
import com.kdm.web.model.view.RatingValue;

public interface MSNService {
	
	/**
	 * sync the ratings values of given loan to match the value of the ratings list parameter
	 */
	void syncLoans(MSN msn, List<Long> loanIds);
	
	/**
	 * sync the ratings values of given msn to match the value of the ratings list parameter
	 */
	void syncRatings(MSN msn, List<RatingValue> ratings);

}
