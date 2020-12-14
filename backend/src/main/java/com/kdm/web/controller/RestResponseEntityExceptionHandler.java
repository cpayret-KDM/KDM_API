package com.kdm.web.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;

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
	
	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
		logger.debug(String.format("AccessDeniedException: %s", ex.getMessage()), ex);
		
		ErrorResponse response = buildResponse(HttpStatus.FORBIDDEN, request.getDescription(false), ex.getMessage());
		return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
	}
	
	@ExceptionHandler(ResponseStatusException.class)
	public ResponseEntity<ErrorResponse> handleException(ResponseStatusException ex, WebRequest request) {
		logger.debug(String.format("Exception: %s", ex.getMessage()), ex);
		
		ErrorResponse response = buildResponse(ex.getStatus(), request.getDescription(false), ex.getReason());
		
		return new ResponseEntity<>(response, ex.getStatus());
	}
	
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
		logger.debug(String.format("Exception: %s", ex.getMessage()), ex);
		
		ErrorResponse response = buildResponse(HttpStatus.BAD_REQUEST, request.getDescription(false), ex.getMessage());
		
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ErrorResponse> handleMessageNotReadableException(HttpMessageNotReadableException ex, WebRequest request) {
		logger.debug(String.format("Exception: %s", ex.getMessage()), ex);
		
		ErrorResponse response = buildResponse(HttpStatus.BAD_REQUEST, request.getDescription(false), ex.getMostSpecificCause().getMessage());
		
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleException(Exception ex, WebRequest request) {
		logger.debug(String.format("Exception: %s", ex.getMessage()), ex);
		
		ErrorResponse response = buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, request.getDescription(false), ex.getMessage());
		
		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	private ResponseEntity<ErrorResponse> handleBindingResult(BindingResult bindingResult, WebRequest request) {
						
		String errorMessage = "";
		if (bindingResult.hasGlobalErrors() && bindingResult.getGlobalError().getDefaultMessage() != null) {
			errorMessage = bindingResult.getGlobalError().getDefaultMessage();
		} else if (bindingResult.hasFieldErrors()) {
			errorMessage = bindingResult.getFieldError().getDefaultMessage();
		}
		
		ErrorResponse response = buildResponse(HttpStatus.BAD_REQUEST, request.getDescription(false), errorMessage);

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
	
	private ErrorResponse buildResponse(HttpStatus httpStatus, String requestPath, String errorMessage) {	
		ErrorResponse response = new ErrorResponse();
		response.setError(httpStatus.getReasonPhrase());
		response.setStatus(httpStatus.value());
		response.setTimestamp(LocalDateTime.now());
		response.setPath(requestPath);
		response.setMessage(errorMessage);
		return response;
	}
}
