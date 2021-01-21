package com.kdm.web.model;

public enum CusipType {

	DEFAULT("Default-Type");

	private final String label;

	CusipType(String label) {
		this.label = label;
	}
	
	public String getLabel() {
		return this.label;
	}

}
