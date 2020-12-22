package com.kdm.web.service;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import java.util.Locale;

import javax.persistence.EntityManager;

import org.apache.commons.lang3.ObjectUtils;
import org.assertj.core.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EntityUtilImpl implements EntityUtil {

	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private MessageSource messageSource;
	
	@Override
	public <T> T tryGetEntity(Class<T> clazz, Object primaryKey) {
		if (ObjectUtils.isEmpty(primaryKey)) {
			throw new ResponseStatusException(BAD_REQUEST,
					messageSource.getMessage("controller.bad_request", Arrays.array("id is invalid"), Locale.US));
		}
		
		T entity = entityManager.find(clazz, primaryKey);
		if (entity == null) {
			throw new ResponseStatusException(NOT_FOUND,
					messageSource.getMessage("controller.entity_no_exists", Arrays.array(primaryKey.toString()), Locale.US));
		}
		
		return entity;
	}

}
