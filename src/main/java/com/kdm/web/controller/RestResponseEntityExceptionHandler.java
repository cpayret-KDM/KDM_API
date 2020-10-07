package com.kdm.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler {

	Logger logger = LoggerFactory.getLogger(RestResponseEntityExceptionHandler.class);

	@ExceptionHandler(MissingServletRequestParameterException.class)
	public ResponseEntity<Void> handleMissingParams(MissingServletRequestParameterException ex) {
		logger.error(String.format("MissingServletRequestParameterException: %s", ex.getMessage()), ex);
		return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
	}
}
