package com.kdm.web.service;

import java.util.Locale;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.apache.commons.lang3.ObjectUtils;
import org.assertj.core.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.kdm.web.data.repository.AddressRepository;
import com.kdm.web.data.repository.LoanRepository;
import com.kdm.web.data.repository.PropertyRepository;
import com.kdm.web.model.Address;
import com.kdm.web.model.Loan;
import com.kdm.web.model.Property;

@Service
public class PropertyServiceImpl implements PropertyService {
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	EntityManager entityManager;
	
	@Autowired
	PropertyRepository propertyRepository;
	
	@Autowired
	AddressRepository addressRepository; 
	
	@Autowired
	LoanRepository loanRepository;

	@Override
	@Transactional
	public Property createProperty(Property property) {
		if (property == null) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("property object is null"), Locale.US));
		}
	
		// lets figure if the address already exists
		Optional<Address> address = getOrPersistAddress(property.getAddressID(), property.getAddress());
		if (!address.isPresent()) {
			return null;		
		}
		
		property.setAddressID(address.get().getId());
		Property savedProperty = propertyRepository.save(property); 
			
		// link the property to a loan
		if (property.getLoanId() != null) {
			Optional<Loan> loan = loanRepository.getLoanById(property.getLoanId());
			if (loan.isPresent()) {
				property.setLoan(loan.get());
				propertyRepository.save(property);
			}
		}
		
		return savedProperty; 
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
		
		// link the property to a loan
		if (property.getLoanId() != null) {
			Optional<Loan> loan = loanRepository.getLoanById(property.getLoanId());
			if (loan.isPresent()) {
				property.setLoan(loan.get());
				//propertyRepository.save(property);
			}
		}
				
		return entityManager.merge(property);

	}

	
}
