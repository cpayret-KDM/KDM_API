package com.kdm.web.util.error;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ErrorResponse {

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
	private List<ValidationError> errors;

	@JsonProperty(required = false)
	private String exception;

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public List<ValidationError> getErrors() {
		return errors;
	}

	public void setErrors(List<ValidationError> errors) {
		this.errors = errors;
	}

	public String getException() {
		return exception;
	}

	public void setException(String exception) {
		this.exception = exception;
	}
	
	

}
