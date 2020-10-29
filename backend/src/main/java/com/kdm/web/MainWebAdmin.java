package com.kdm.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(info = @Info(title = "KDM API", version = "1.0.0", description = "RESTFull API - KDM", contact = @Contact(url = "https://www.kdmrealestate.com", name = "Kasondra", email = "kasondra@kdmrealestate.com")))
@SpringBootApplication
public class MainWebAdmin {

	public static void main(String[] args) {
		SpringApplication.run(MainWebAdmin.class, args);
	}

}