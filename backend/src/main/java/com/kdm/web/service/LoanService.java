package com.kdm.web.service;

import java.util.List;

import com.kdm.web.model.Loan;
import com.kdm.web.model.Property;
import com.kdm.web.model.Sponsor;
import com.kdm.web.model.view.RatingValue;

public interface LoanService {

	/**
	 * persist a property entity into the data source,
	 * it also handles the related address entity
	 * @param property
	 * @return the persisted object
	 */
	Property createProperty(Property property);
	
	/**
	 * updates a property into the data source
	 * it also handles the related address entity
	 * @param property
	 * @return the persisted object
	 */
	Property updateProperty(Property property);
	
	/**
	 * assign the given sponsor to the loan
	 * @param loan
	 * @param sponsor
	 * @return
	 */
	Sponsor createSponsor(Loan loan, Sponsor sponsor);
	
	/**
	 * updates the given sponsor
	 * @param sponsor
	 * @return
	 */
	Sponsor updateSponsor(Sponsor sponsor);
	
	/**
	 * deletes the given sponsor, and take care of relationship with other entities
	 */
	void deleteSponsor(Sponsor sponsor);
	
	/**
	 * sync the ratings values of given loan to match the value of the ratings list parameter
	 */
	void syncRatings(Loan loan, List<RatingValue> ratings);

}
