package com.kdm.web.restclient.tmo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class RawResponse {
	
	@JsonProperty("ErrorMessage")
	private String errorMessage;
	
	@JsonProperty("ErrorNumber")
	private int errorNumber;
	
	@JsonProperty("Status")
	private int status;
	
	@JsonProperty("Data")
	private JsonNode rawData;
}
