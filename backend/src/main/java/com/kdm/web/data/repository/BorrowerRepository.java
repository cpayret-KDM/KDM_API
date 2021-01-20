package com.kdm.web.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kdm.web.model.Borrower;

public interface BorrowerRepository extends JpaRepository<Borrower, Long>{

}