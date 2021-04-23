package com.kdm.web.data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kdm.web.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{

	// query method
	Optional<Address> findFirstByNameAndStreet1OrderByIdDesc(String name, String street1);

}
