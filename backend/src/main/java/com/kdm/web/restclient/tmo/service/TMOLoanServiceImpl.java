package com.kdm.web.restclient.tmo.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdm.web.restclient.tmo.model.Funding;
import com.kdm.web.restclient.tmo.model.Loan;
import com.kdm.web.restclient.tmo.model.Property;
import com.kdm.web.restclient.tmo.model.RawResponse;

@Service
public class TMOLoanServiceImpl implements TMOLoanService {
	
	
	@Autowired
	private WebClient tmoWebClient;

	@Override
	public List<Loan> getLoans() throws JsonProcessingException {
		RawResponse response = tmoWebClient.get()
			.uri("/TmoAPI/v1/LSS.svc/GetLoans")
			.exchange()
			.block()
			.bodyToMono(RawResponse.class)
			.block();
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		Loan[] results = objectMapper.treeToValue(response.getRawData(), Loan[].class);
		
		return Arrays.asList(results);
	}
	
	public List<Property> getProperties(String loanAccount) throws JsonProcessingException {
		RawResponse response = tmoWebClient.get()
				.uri(uriBuilder -> uriBuilder
					    .path("/TmoAPI/v1/LSS.svc/GetLoanProperties/{Account}")
					    .build(loanAccount))
				.exchange()
				.block()
				.bodyToMono(RawResponse.class)
				.block();
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		Property[] results = objectMapper.treeToValue(response.getRawData(), Property[].class);
		
		return Arrays.asList(results);	
	}
	
	public List<Funding> getFunding(String loanAccount) throws JsonProcessingException {
		RawResponse response = tmoWebClient.get()
				.uri(uriBuilder -> uriBuilder
					    .path("/TmoAPI/v1/LSS.svc/GetLoanFunding/{Account}")
					    .build(loanAccount))
				.exchange()
				.block()
				.bodyToMono(RawResponse.class)
				.block();
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		Funding[] results = objectMapper.treeToValue(response.getRawData(), Funding[].class);
		
		return Arrays.asList(results);
	}

}
