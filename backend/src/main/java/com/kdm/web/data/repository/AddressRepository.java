package com.kdm.web.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kdm.web.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{

}
