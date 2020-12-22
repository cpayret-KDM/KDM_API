package com.kdm.web.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.MessageSource;
import org.springframework.web.server.ResponseStatusException;

import com.kdm.web.model.Loan;

public class EntityUtilTest extends BaseServiceTest {
	
	@MockBean
	private DataSource dataSource;
	
	@MockBean
	private EntityManager entityManager;
	
	@MockBean
	private MessageSource messageSource;
	
	@Autowired 
	private EntityUtil entityUtil;
	
	@Test(expected = ResponseStatusException.class)
	public void tryGetEntityInvalidId() {
		entityUtil.tryGetEntity(Loan.class, null);
	}
	
	@Test(expected = ResponseStatusException.class)
	public void tryGetEntityNoOject() {
		
		when(entityManager.find(any(), any()))
		.thenReturn(null);
		
		entityUtil.tryGetEntity(Loan.class, 1L);
	}
	
	@Test()
	public void tryGetEntityOneOject() {
		Loan loan = new Loan();
		when(entityManager.find(any(), any()))
		.thenReturn(loan);
		
		Loan someLoan = entityUtil.tryGetEntity(Loan.class, 1L);
		
		assertNotNull(someLoan, "expected a returned loan");
	}
	
}
