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
	public static final String MSN_MAPPING = V1 + "/msn";
	public static final String RATING_MAPPING = V1 + "/rating";
	public static final String BORROWER_MAPPING = V1 + "/borrower";
	public static final String TMO_MAPPING = V1 + "/tmo";
	public static final String CUSIP_MAPPING = V1 + "/cusip";
}
