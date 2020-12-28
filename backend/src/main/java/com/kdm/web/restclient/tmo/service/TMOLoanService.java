package com.kdm.web.restclient.tmo.service;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kdm.web.restclient.tmo.model.Loan;
import com.kdm.web.restclient.tmo.model.Property;

public interface TMOLoanService {

	List<Loan> getLoans() throws JsonProcessingException;
	
	List<Property> getProperties(String loanAccount) throws JsonProcessingException;
}
