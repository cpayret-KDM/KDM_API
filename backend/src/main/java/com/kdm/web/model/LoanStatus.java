package com.kdm.web.model;

public enum LoanStatus {
	ENABLE("Enable"),
	DISABLED("Disabled");
	
	private final String label;
	
	LoanStatus(String label) {
		this.label = label;
	}
	
	public String getLabel() {
		return this.label;
	}
}
