package com.kdm.web.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.kdm.web.util.error.ErrorResponse;
import com.kdm.web.util.error.ValidationError;

@ControllerAdvice
public class RestResponseEntityExceptionHandler  {

	Logger logger = LoggerFactory.getLogger(RestResponseEntityExceptionHandler.class);

	@ExceptionHandler(MissingServletRequestParameterException.class)
	public ResponseEntity<Void> handleMissingParams(MissingServletRequestParameterException ex) {
		logger.error(String.format("MissingServletRequestParameterException: %s", ex.getMessage()), ex);
		return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex, WebRequest request) {
		logger.debug(String.format("MethodArgumentNotValidException: %s", ex.getMessage()), ex);
		
		return handleBindingResult(ex.getBindingResult(), request);
	}
	
	@ExceptionHandler(BindException.class)
	public ResponseEntity<ErrorResponse> handleBidingException(BindException ex, WebRequest request) {
		logger.debug(String.format("BindException: %s", ex.getMessage()), ex);
		
		return handleBindingResult(ex.getBindingResult(), request);
		
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleException(Exception ex, WebRequest request) {
		logger.debug(String.format("Exception: %s", ex.getMessage()), ex);
		
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	private ResponseEntity<ErrorResponse> handleBindingResult(BindingResult bindingResult, WebRequest request) {
		ErrorResponse response = new ErrorResponse();
		response.setError("Bad Request");
		response.setStatus(HttpStatus.BAD_REQUEST.value());
		response.setTimestamp(LocalDateTime.now());
		
		response.setPath(request.getDescription(false));
		
		String errorMessage = "unhandled error";
		if (bindingResult.hasGlobalErrors() && bindingResult.getGlobalError().getDefaultMessage() != null) {
			errorMessage = bindingResult.getGlobalError().getDefaultMessage();
		} else if (bindingResult.hasFieldErrors()) {
			errorMessage = bindingResult.getFieldError().getDefaultMessage();
		}
		response.setMessage(errorMessage);
		
		List<ValidationError> errors = bindingResult.getFieldErrors().stream()
				.map(er -> {
					return ValidationError.builder()
							.withCode(er.getCode())
							.withDefaultMessage(er.getDefaultMessage())
							.withField(er.getField())
							.withRejectedValue(er.getRejectedValue() == null? null : er.getRejectedValue().toString())
							.build();
				})
				.collect(Collectors.toList());
		response.setErrors(errors);
		
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}
}
