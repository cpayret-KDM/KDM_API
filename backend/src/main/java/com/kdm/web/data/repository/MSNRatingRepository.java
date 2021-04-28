package com.kdm.web.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kdm.web.model.MSNRating;

@Repository
public interface MSNRatingRepository extends JpaRepository<MSNRating, Long> {

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("Delete MSNRating WHERE msnId = :msnId")
	void clearMSNRatings(@Param("msnId") Long msnId);
	
}
