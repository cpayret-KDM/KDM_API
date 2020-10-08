package com.kdm.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Property {

	@JsonProperty(value = "id")
	private String propertyId;

	@JsonProperty
	private String name;

	public Property(String propertyid, String name) {
		this.propertyId = propertyid;
		this.name = name;
	}

	public String getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(String propertyId) {
		this.propertyId = propertyId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
