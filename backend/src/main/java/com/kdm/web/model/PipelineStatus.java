package com.kdm.web.model;

public enum PipelineStatus {
	
	NEW("New"),
	IN_PROGRESS("In Progress"),
	UNDERWRITING("Underwriting"),
	FUNDED("Funded"),
	CLOSED("Closed");
	
	
	private final String label;
	
	PipelineStatus(String label) {
		this.label = label;
	}
	
	//@JsonValue
	public String getLabel() {
		return this.label;
	}
}
