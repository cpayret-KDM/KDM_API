package com.kdm.web.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum LoanStatus {
	PERFORMING("Performing");
	
	private final String label;
	
	LoanStatus(String label) {
		this.label = label;
	}
	
	@JsonValue
	public String getLabel() {
		return this.label;
	}
}
