package com.kdm.web.controller;

import java.io.IOException;
import java.time.LocalDateTime;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdm.web.util.error.ErrorResponse;

public class CustomHttp403ForbiddenEntryPoint implements AuthenticationEntryPoint {
	
	@Autowired
	private ObjectMapper objectMapper;
	
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
    	response.setContentType("application/json");
    	response.setCharacterEncoding("UTF-8");
    	
    	ErrorResponse error = new ErrorResponse();
    	error.setTimestamp(LocalDateTime.now());
    	error.setError(HttpStatus.UNAUTHORIZED.getReasonPhrase());
    	error.setException(authException.getClass().getSimpleName());
    	error.setMessage(authException.getMessage());
    	error.setStatus(HttpStatus.UNAUTHORIZED.value());
    	error.setPath(request.getRequestURI());
 
    	String errorAsString = objectMapper.writeValueAsString(error);
        response.getWriter().print(errorAsString);
    }

}