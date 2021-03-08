package com.kdm.web.restclient.tmo.service.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdm.web.restclient.tmo.service.TMOLoanService;
import com.kdm.web.restclient.tmo.service.TMOLoanServiceImpl;

@TestConfiguration
public class SimpleContextConfiguration {
	
	@Bean
    public WebClient tmoWebClient() {
        return WebClient.builder()
                .baseUrl("https://absws.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.defaultHeader("Token", "FD1F722B2C3F48409050D9A52E5B2DDA")
				.defaultHeader("Database", "Korth Direct Mortgage Servicing")
				.build();
    }
	
	@Bean
	public ObjectMapper objectMapper() {
		return new ObjectMapper();
	}
	
	@Bean
	public TMOLoanService tmoLoanService() {
		return new TMOLoanServiceImpl();
	}
	
}
