package com.kdm.web.restclient.tmo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown=true)
@Getter @Setter @NoArgsConstructor
public class Borrower {
    
	@JsonProperty("City")
	private String city;
    
    @JsonProperty("FirstName")
	private String firstName;
    
    @JsonProperty("LastName")
	private String lastName;
    
	@JsonProperty("State")
	private String state;
	
	@JsonProperty("Street")
	private String street;
    
	@JsonProperty("ZipCode")
	private String zipCode;
	
	@JsonProperty("PhoneCell")
	private String phoneCell;
	
	@JsonProperty("PhoneHome")
	private String phoneHome;
    
	@JsonProperty("PhoneWork")
	private String phoneWork;
	
	@JsonProperty("EmailAddress")
	private String emailAddress;

	
}
