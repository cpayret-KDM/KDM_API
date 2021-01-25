package com.kdm.web.service;

import java.util.Optional;

import com.kdm.web.model.Address;

public interface AddressService {

	/**
	 * checks persist the given address into the data source
	 * @param addressID  id of the address, if already exist, can be null if it is a new address
	 * @param address address information to persist can't be null
	 * @return 
	 */
	Optional<Address> getOrPersistAddress(Long addressID, Address address);
}
