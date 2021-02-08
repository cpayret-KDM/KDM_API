package com.kdm.web.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kdm.web.model.LoanRating;

@Repository
public interface LoanRatingRepository extends JpaRepository<LoanRating, Long> {

	LoanRating findByLoanIdAndRatingId(Long loanId, Long ratingId);
}
