package com.kdm.web.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum PipelineStatus {
	CLOSED("Closed"),
	OPEN("Open");
	
	private final String label;
	
	PipelineStatus(String label) {
		this.label = label;
	}
	
	@JsonValue
	public String getLabel() {
		return this.label;
	}
}
