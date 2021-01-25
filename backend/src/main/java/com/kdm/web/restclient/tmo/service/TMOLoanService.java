package com.kdm.web.restclient.tmo.service;

import java.util.List;

import com.kdm.web.restclient.tmo.model.Funding;
import com.kdm.web.restclient.tmo.model.Loan;
import com.kdm.web.restclient.tmo.model.Property;

public interface TMOLoanService {

	List<Loan> getLoans() throws Exception;
	
	List<Property> getProperties(String loanAccount) throws Exception;
	
	List<Funding> getFunding(String loanAccount) throws Exception;
}
