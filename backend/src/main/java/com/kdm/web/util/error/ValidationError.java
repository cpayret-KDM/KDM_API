package com.kdm.web.util.error;

import javax.annotation.Generated;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ValidationError {

	@JsonProperty
	private String defaultMessage;

	@JsonProperty
	private String field;

	@JsonProperty
	private String rejectedValue;

	@JsonProperty
	private String code;

	@Generated("SparkTools")
	private ValidationError(Builder builder) {
		this.defaultMessage = builder.defaultMessage;
		this.field = builder.field;
		this.rejectedValue = builder.rejectedValue;
		this.code = builder.code;
	}
	
	public ValidationError() {
		
	}

	public String getDefaultMessage() {
		return defaultMessage;
	}

	public void setDefaultMessage(String defaultMessage) {
		this.defaultMessage = defaultMessage;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getRejectedValue() {
		return rejectedValue;
	}

	public void setRejectedValue(String rejectedValue) {
		this.rejectedValue = rejectedValue;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * Creates builder to build {@link ValidationError}.
	 * @return created builder
	 */
	@Generated("SparkTools")
	public static Builder builder() {
		return new Builder();
	}

	/**
	 * Builder to build {@link ValidationError}.
	 */
	@Generated("SparkTools")
	public static final class Builder {
		private String defaultMessage;
		private String field;
		private String rejectedValue;
		private String code;

		private Builder() {
		}

		public Builder withDefaultMessage(String defaultMessage) {
			this.defaultMessage = defaultMessage;
			return this;
		}

		public Builder withField(String field) {
			this.field = field;
			return this;
		}

		public Builder withRejectedValue(String rejectedValue) {
			this.rejectedValue = rejectedValue;
			return this;
		}

		public Builder withCode(String code) {
			this.code = code;
			return this;
		}

		public ValidationError build() {
			return new ValidationError(this);
		}
	}
}
