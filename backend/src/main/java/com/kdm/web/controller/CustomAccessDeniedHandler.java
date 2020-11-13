package com.kdm.web.controller;

import java.io.IOException;
import java.time.LocalDateTime;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdm.web.util.error.ErrorResponse;

public class CustomAccessDeniedHandler implements AccessDeniedHandler {
	
	@Autowired
	private ObjectMapper objectMapper;
	
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedExcp)
            throws IOException, ServletException {
       	response.setContentType("application/json");
    	response.setCharacterEncoding("UTF-8");
    	
    	ErrorResponse error = new ErrorResponse();
    	error.setTimestamp(LocalDateTime.now());
    	error.setError(HttpStatus.UNAUTHORIZED.getReasonPhrase());
    	error.setException(accessDeniedExcp.getClass().getSimpleName());
    	error.setMessage(accessDeniedExcp.getMessage());
    	error.setStatus(HttpStatus.UNAUTHORIZED.value());
    	error.setPath(request.getRequestURI());
 
    	String errorAsString = objectMapper.writeValueAsString(error);
        response.getWriter().print(errorAsString);
    }

}