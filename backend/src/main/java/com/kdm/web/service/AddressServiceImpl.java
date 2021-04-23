package com.kdm.web.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.kdm.web.data.repository.AddressRepository;
import com.kdm.web.model.Address;

@Service
public class AddressServiceImpl implements AddressService {
	
	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private AddressRepository addressRepository;

	@Override
	public Optional<Address> getOrPersistAddress(Long addressID, Address address) {
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
		
		ExampleMatcher caseInsensitiveExampleMatcher = ExampleMatcher.matchingAll().withIgnoreCase();
		//search if address already exist
		List<Address> actualAddresses = addressRepository.findAll(Example.of(address, caseInsensitiveExampleMatcher));
		
		if (actualAddresses.isEmpty()) {
			return Optional.of(addressRepository.save(address));
		} 
		
		return Optional.of(actualAddresses.get(0));
	}

}
