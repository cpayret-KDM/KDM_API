package com.kdm.web.controller.api.v1.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

import com.kdm.web.service.EntityUtil;
import com.kdm.web.service.EntityUtilImpl;

@TestConfiguration
public class SimpleContextConfiguration {
	
	@Bean
    public EntityUtil entityUtil() {
        return new EntityUtilImpl();
    }
	
	@MockBean
	private WebClient tmoWebClient;

}
