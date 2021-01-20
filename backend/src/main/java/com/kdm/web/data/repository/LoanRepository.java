package com.kdm.web.data.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kdm.web.model.Loan;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long>, JpaSpecificationExecutor<Loan>{

	@Query("SELECT l FROM Loan l LEFT JOIN FETCH Property p ON l.id = p.loanId WHERE l.id = :id")
	Optional<Loan> getLoanById(@Param("id") Long id);
	
	// query method
	Optional<Loan> findBySponsorID(Long sponsorID);
	
	// query is defined in jpa-named-queries.properties
	@Query(nativeQuery=true)
	Page<Loan> findAniversaryNextDays(int days, Pageable page);

	// query method
	Optional<Loan> findByLoanNumber(String loanNumber);
}
