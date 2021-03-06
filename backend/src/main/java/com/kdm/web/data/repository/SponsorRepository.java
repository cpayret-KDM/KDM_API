package com.kdm.web.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.kdm.web.model.Sponsor;

@Repository
public interface SponsorRepository extends JpaRepository<Sponsor, Long>, JpaSpecificationExecutor<Sponsor>{

	Sponsor findByCompany(String company);
}
