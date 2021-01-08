package com.kdm.web.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kdm.web.model.MSNRating;

@Repository
public interface MSNRatingRepository extends JpaRepository<MSNRating, Long> {

}
