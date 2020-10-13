package com.kdm.web.model;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

@JsonRootName("property")
public class Property {

	@JsonProperty
	private Long propertyId;

	@JsonProperty
	@NotNull
	private String name;

	// empty constructor so MVC Binding works 
	public Property() {
		
	}

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
