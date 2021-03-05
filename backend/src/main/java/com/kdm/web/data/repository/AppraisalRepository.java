package com.kdm.web.data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kdm.web.model.Appraisal;

public interface AppraisalRepository extends JpaRepository<Appraisal, Long>{

	// query method
	Optional<Appraisal> findFirstByPropertyIdOrderByIdDesc(Long id);
}
