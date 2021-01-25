package com.kdm.web.restclient.tmo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown=true)
@Getter @Setter @NoArgsConstructor
public class Loan {

	@JsonProperty("Account")
	private String account;
	
	@JsonProperty("SortName")
	private String sortName;
	
	@JsonProperty("EmailAddress")
	private String emailAddress;
	
	@JsonProperty("PrimaryBorrower")
	private Borrower primaryBorrower;
	
	@JsonIgnore
	private List<Property> properties;
	
	@JsonIgnore
	private List<Funding> fundings;
}
