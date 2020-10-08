package com.kdm.web.util.error;

import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class ValidationError {

	@JsonProperty
	private String defaultMessage;

	@JsonProperty
	private String objectName;

	@JsonProperty
	private String field;

	@JsonProperty
	private String rejectedValue;

	@JsonProperty
	private boolean bindingFailure;

	@JsonProperty
	private String code;
}
