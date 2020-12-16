package com.kdm.web.service.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import com.kdm.web.service.EntityUtil;
import com.kdm.web.service.EntityUtilImpl;

@TestConfiguration
public class SimpleContextConfiguration {
	
	@Bean
    public EntityUtil entityUtil() {
        return new EntityUtilImpl();
    }

}
