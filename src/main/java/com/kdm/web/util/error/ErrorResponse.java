package com.kdm.web.util.error;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class ErrorResponse {

	@JsonProperty
	private LocalDateTime timestamp;

	@JsonProperty
	private Integer status;

	@JsonProperty
	private String error;

	@JsonProperty
	private String message;

	@JsonProperty
	private String path;

	@JsonProperty(required = false)
	private ValidationError errors[];

	@JsonProperty(required = false)
	private String exception;

}
