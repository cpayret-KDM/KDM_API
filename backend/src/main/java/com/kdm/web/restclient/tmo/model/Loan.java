package com.kdm.web.restclient.tmo.model;

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
}
