package com.kdm.web.data.repository;

import com.kdm.web.model.Address;
import com.kdm.web.model.Cusip;
import com.kdm.web.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CusipRepository extends JpaRepository<Cusip, Long>, JpaSpecificationExecutor<Cusip> {

}
