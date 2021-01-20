package com.kdm.web.service;

import com.kdm.web.model.Borrower;
import com.kdm.web.model.Property;

public interface PropertyService {
	
	/**
	 * assign the given borrower to the property
	 * @param loan
	 * @param sponsor
	 * @return
	 */
	Borrower createBorrower(Property property, Borrower borrower);
	
	/**
	 * updates the given sponsor
	 * @param sponsor
	 * @return
	 */
	//Sponsor updateSponsor(Sponsor sponsor);
	
	/**
	 * deletes the given sponsor, and take care of relationship with other entities
	 */
	//void deleteSponsor(Sponsor sponsor);
}
