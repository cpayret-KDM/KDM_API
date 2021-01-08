package com.kdm.web.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.kdm.web.model.MSN;

public interface MSNRepository extends JpaRepository<MSN, Long>, JpaSpecificationExecutor<MSN>{

}
