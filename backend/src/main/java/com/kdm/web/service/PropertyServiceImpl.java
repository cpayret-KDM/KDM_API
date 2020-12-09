package com.kdm.web.service;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kdm.web.data.repository.AddressRepository;
import com.kdm.web.data.repository.PropertyRepository;
import com.kdm.web.model.Address;
import com.kdm.web.model.Property;

@Service
public class PropertyServiceImpl implements PropertyService {
	
	@Autowired
	EntityManager entityManager;
	
	@Autowired
	PropertyRepository propertyRepository;
	
	@Autowired
	AddressRepository addressRepository; 

	@Override
	@Transactional
	public Property createProperty(Property property) {
		if (property == null) {
			return null;
		}
	
		// lets figure if the address already exists
		Optional<Address> address = getOrPersistAddress(property.getAddressID(), property.getAddress());
		if (!address.isPresent()) {
			return null;		
		}
		
		property.setAddressID(address.get().getId());
		return propertyRepository.saveAndFlush(property);

	}

	/**
	 * checks persist the given address into the data source
	 * @param addressID  id of the address, if already exist, can be null if it is a new address
	 * @param address address information to persist can't be null
	 * @return 
	 */
	private Optional<Address> getOrPersistAddress(Long addressID, Address address) {
		Long givenAddressId = null;
		if (address != null) {
			givenAddressId = address.getId();
		}
		
		Long actualAddressId = ObjectUtils.firstNonNull(addressID, givenAddressId);
		if (actualAddressId != null) {
			
			Optional<Address> existingAddress = addressRepository.findById(actualAddressId);
			if (existingAddress.isPresent() && !existingAddress.get().equals(address)) {
				//address is different, lets updated it
				address.setId(actualAddressId);
				return Optional.of(entityManager.merge(address));
			}
			return existingAddress;
		}
		
		
		// no id so lets try to create the address
		if (address == null) {
			return Optional.ofNullable(null);
		}
		
		// lets force Uppercasing for the state field 
		address.setState(address.getState().toUpperCase());
		
		return Optional.of(addressRepository.save(address));
	}
	

	@Transactional
	public Property updateProperty(Property property) {
		if ((property == null) || (property.getId() == null)) {
			return null;
		}
	
		// lets figure if the address already exists
		Optional<Address> address = getOrPersistAddress(property.getAddressID(), property.getAddress());
		if (!address.isPresent()) {
			return null;		
		}
		
		property.setAddressID(address.get().getId());
		return entityManager.merge(property);

	}

	
}
