package com.kdm.web.controller.api.v1;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.persistence.EntityManager;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.kdm.web.data.repository.LoanRepository;
import com.kdm.web.data.repository.SponsorRepository;
import com.kdm.web.model.Loan;
import com.kdm.web.model.Sponsor;

@WebMvcTest(controllers = LoanController.class)
public class LoanControllerTest extends BaseControllerTest {

	@MockBean
	private LoanRepository loanRepository;
	
	@MockBean
	private SponsorRepository sponsorRepository;
	
	@MockBean
	private EntityManager entityManager;
	
	@Autowired
	private MockMvc mvc;

	@Test
	public void assignSponsorNotFoundTest() throws Exception {

		when(entityManager.find(any(), any())).thenReturn(null);
		
		mvc.perform(
				put(ApiConstants.LOAN_MAPPING + "/1/sponsor/2").contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().is4xxClientError());
	}
	
	@Test
	public void assignSponsorNoLoanTest() throws Exception {

		when(entityManager.find(any(), any()))
			.thenReturn(new Loan())
			.thenReturn(null);
		
		mvc.perform(
				put(ApiConstants.LOAN_MAPPING + "/1/sponsor/2").contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().is4xxClientError());
	}
	
	@Test
	public void assignSponsorTest() throws Exception {
		when(entityManager.find(any(), any()))
			.thenReturn(new Loan())
			.thenReturn(new Sponsor());
		
		mvc.perform(
				put(ApiConstants.LOAN_MAPPING + "/1/sponsor/2").contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk());
	}

}
