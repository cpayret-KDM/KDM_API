package com.kdm.web.data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kdm.web.model.Lender;


@Repository
public interface LenderRepository extends JpaRepository<Lender, Long> {
	
	Optional<Lender> findByNameAndLoanId(String name, Long loanId);

}
