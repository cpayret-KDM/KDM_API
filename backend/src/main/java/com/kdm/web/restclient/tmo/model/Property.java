package com.kdm.web.restclient.tmo.model;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown=true)
@Getter @Setter @NoArgsConstructor
public class Property {
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
	@JsonProperty("AppraisalDate")
	private Date AppraisalDate;
	
	@JsonProperty("AppraiserFMV")
	private BigDecimal appraiserFMV;
	
	@JsonProperty("City")
	private String city;
	
	@JsonProperty("Description")
	private String description;
    
	@JsonProperty("LTV")
	private BigDecimal ltv;
	
	@JsonProperty("PropertyType")
	private String propertyType; 
    
	@JsonProperty("State")
	private String state;
	
	@JsonProperty("Street")
	private String street;
    
	@JsonProperty("ZipCode")
	private String zipCode;
	
	@JsonProperty("EmailAddress")
	private String emailAddress;
	
    //County
    //LegalDescription
    //Occupancy
    //PledgedEquity
    //Primary
    //Priority
	//ThomasMap
    //Zoning

}
