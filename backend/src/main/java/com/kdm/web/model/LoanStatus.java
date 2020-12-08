package com.kdm.web.model;

public enum LoanStatus {
	PERFORMING("Performing"),
	LATE_30_DAYS("30 Days Late"),
	LATE_60_DAYS("60 Days Late"),
	LATE_90_DAYS("90 Days Late"),
	DEFAULT("Default"),
	FORECLOSURE("Foreclosure");
	
	private final String label;
	
	LoanStatus(String label) {
		this.label = label;
	}
	
	//@JsonValue
	public String getLabel() {
		return this.label;
	}
}
