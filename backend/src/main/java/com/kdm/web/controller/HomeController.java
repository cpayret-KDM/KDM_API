package com.kdm.web.controller;

import static org.springframework.http.HttpStatus.OK;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import io.swagger.v3.oas.annotations.Hidden;

@Controller
@Hidden
public class HomeController {

	@GetMapping("/")
	@ResponseBody
	public ResponseEntity<String> home() {
        return new ResponseEntity<String>("up and running", OK);
    }
	 
}
