package com.kdm.web.restclient.tmo.service;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdm.web.restclient.tmo.model.Funding;
import com.kdm.web.restclient.tmo.model.Loan;
import com.kdm.web.restclient.tmo.model.Property;
import com.kdm.web.restclient.tmo.model.RawResponse;

@Service
public class TMOLoanServiceImpl implements TMOLoanService {
	
	Logger logger = LoggerFactory.getLogger(TMOLoanService.class);
	
	@Autowired
	private WebClient tmoWebClient;

	@Override
	public List<Loan> getLoans() throws Exception {
		RawResponse response = tmoWebClient.get()
			.uri("/TmoAPI/v1/LSS.svc/GetLoans")
			.exchange()
			.block()
			.bodyToMono(RawResponse.class)
			.block();
		
		if (response.getStatus() != 0) {
			String errorMessage = String.format("Error when calling TMO api, status=%d, errorNumber=%d, errorMessage=%s", response.getStatus(), response.getErrorNumber(), response.getErrorMessage());
			this.logger.error(errorMessage);
			throw new Exception(errorMessage);
		}
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		Loan[] results = objectMapper.treeToValue(response.getRawData(), Loan[].class);
		
		return Arrays.asList(results);
	}
	
	public List<Property> getProperties(String loanAccount) throws Exception {
		RawResponse response = tmoWebClient.get()
				.uri(uriBuilder -> uriBuilder
					    .path("/TmoAPI/v1/LSS.svc/GetLoanProperties/{Account}")
					    .build(loanAccount))
				.exchange()
				.block()
				.bodyToMono(RawResponse.class)
				.block();
		
		if (response.getStatus() != 0) {
			String errorMessage = String.format("Error when calling TMO api, status=%d, errorNumber=%d, errorMessage=%s", response.getStatus(), response.getErrorNumber(), response.getErrorMessage());
			this.logger.error(errorMessage);
			throw new Exception(errorMessage);
		}
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		Property[] results = objectMapper.treeToValue(response.getRawData(), Property[].class);
		
		return Arrays.asList(results);	
	}
	
	public List<Funding> getFunding(String loanAccount) throws Exception {
		RawResponse response = tmoWebClient.get()
				.uri(uriBuilder -> uriBuilder
					    .path("/TmoAPI/v1/LSS.svc/GetLoanFunding/{Account}")
					    .build(loanAccount))
				.exchange()
				.block()
				.bodyToMono(RawResponse.class)
				.block();
		
		if (response.getStatus() != 0) {
			String errorMessage = String.format("Error when calling TMO api, status=%d, errorNumber=%d, errorMessage=%s", response.getStatus(), response.getErrorNumber(), response.getErrorMessage());
			this.logger.error(errorMessage);
			throw new Exception(errorMessage);
		}
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		Funding[] results = objectMapper.treeToValue(response.getRawData(), Funding[].class);
		
		return Arrays.asList(results);
	}

}
