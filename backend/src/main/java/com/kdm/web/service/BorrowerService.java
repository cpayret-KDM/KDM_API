package com.kdm.web.service;

import com.kdm.web.model.Borrower;
import com.kdm.web.model.Property;

public interface BorrowerService {
	
	/**
	 * creates the given borrower
	 * @param property
	 * @param borrower
	 * @return
	 */
	Borrower createBorrower(Borrower borrower);
	
	/**
	 * assign the given borrower to the property
	 * @param property
	 * @param borrower
	 * @return
	 */
	Borrower createBorrower(Property property, Borrower borrower);
	
	/**
	 * updates the given borrower
	 * @param borrower
	 * @return
	 */
	Borrower updateBorrower(Borrower borrower);
	
	/**
	 * deletes the given borrower, and take care of relationship with other entities
	 */
	void deleteBorrower(Borrower borrower);
	
}
