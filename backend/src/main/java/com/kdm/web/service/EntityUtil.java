package com.kdm.web.service;

import org.springframework.web.server.ResponseStatusException;

public interface EntityUtil {

	/**
	 * tries to retreive an entity from the datasouce, given the primaryKey
	 * @param clazz is the type of the entity
	 * @param primaryKey key object that uniquely identifies the entity
	 * @return
	 * @throws ResponseStatusException if it is not possible to find the entity
	 */
	<T> T tryGetEntity(Class<T> clazz, Object primaryKey);
}
