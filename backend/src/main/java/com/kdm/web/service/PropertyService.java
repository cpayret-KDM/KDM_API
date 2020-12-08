package com.kdm.web.service;

import com.kdm.web.model.Property;

public interface PropertyService {

	/**
	 * persist a property entity into the data source,
	 * it also handles the related address entity
	 * @param property
	 * @return the persisted object
	 */
	Property createProperty(Property property);
	
	/**
	 * updates a property into the data source
	 * it also handles the related address entity
	 * @param property
	 * @return the persisted object
	 */
	Property updateProperty(Property property);
}
