package com.kdm.web.data.repository;

import com.kdm.web.model.Address;
import com.kdm.web.model.Cusip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CusipRepository extends JpaRepository<Cusip, Long>{

}
