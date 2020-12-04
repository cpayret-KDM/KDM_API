package com.kdm.web.controller.api.v1;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.kdm.web.data.repository.LoanRepository;
import com.kdm.web.data.repository.PropertyRepository;
import com.kdm.web.data.repository.SponsorRepository;
import com.kdm.web.model.Loan;
import com.kdm.web.model.Property;
import com.kdm.web.model.PropertyType;
import com.kdm.web.model.Sponsor;

@WebMvcTest(controllers = LoanController.class)
public class LoanControllerTest extends BaseControllerTest {

	@MockBean
	private LoanRepository loanRepository;
	
	@MockBean
	private SponsorRepository sponsorRepository;
	
	@MockBean
	private PropertyRepository propertyRepository;
	
	@MockBean
	private EntityManager entityManager;
	
	@Autowired
	private MockMvc mvc;

	@Test
	public void getLoanTest() throws Exception {
		Property property = Property.builder()
				.type(PropertyType.MULTI_FAMILY)
				.id(1L)
				.build();
		List<Property> properties = new ArrayList<Property>();
		properties.add(property);
		
		Sponsor sponsor = Sponsor.builder()
				.company("SomeCompany")
				.id(2L)
				.build();
		
		Loan loan = Loan.builder()
				.dealName("Loan-DealName")
				.sponsor(sponsor)
				.properties(properties)
				.id(3L)
				.build();
		
		when(entityManager.find(any(), any()))
			.thenReturn(loan)
			.thenReturn(new Sponsor());
		
		mvc.perform(
				get(ApiConstants.LOAN_MAPPING + "/1").contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.id").value(3L))
			.andExpect(jsonPath("$.properties[0].id").value(1L))
			.andExpect(jsonPath("$.sponsor.id").value(2L));
	}
	
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
