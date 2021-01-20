package com.kdm.web.data.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.kdm.web.model.Rating;

public interface RatingRepository extends JpaRepository<Rating, Long>, JpaSpecificationExecutor<Rating>{

	@Query("SELECT r FROM Rating r ORDER BY agency ASC")
	List<Rating> findAll();
}
