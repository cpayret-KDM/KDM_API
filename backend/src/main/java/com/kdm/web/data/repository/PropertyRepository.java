package com.kdm.web.data.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.kdm.web.model.Property;



@Repository
public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property>{
	
	List<Property> findByLoanId(Long loanId);
	
	// query method
	Optional<Property> findByBorrowerId(Long borrowerId);

}
