package com.kdm.web.controller.api.v1;

public class ApiConstants {

	// private constructor so we don't allow any instances
	private ApiConstants() {
	}

	// Base Mapping
	public static final String API = "/api";
	public static final String V1 = API + "/v1";

	public static final String SWAGGER_UI = "/swagger-ui.html#!";

	// API endpoints
	public static final String PROPERTY_MAPPING = V1 + "/property";
	public static final String LOAN_MAPPING = V1 + "/loan";
	public static final String SPONSOR_MAPPING = V1 + "/sponsor";

}