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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.kdm.web.data.repository.AddressRepository;
import com.kdm.web.data.repository.AppraisalRepository;
import com.kdm.web.data.repository.BorrowerRepository;
import com.kdm.web.data.repository.LoanRatingRepository;
import com.kdm.web.data.repository.LoanRepository;
import com.kdm.web.data.repository.PropertyRepository;
import com.kdm.web.data.repository.SponsorRepository;
import com.kdm.web.model.Address;
import com.kdm.web.model.Loan;
import com.kdm.web.model.Property;
import com.kdm.web.model.PropertyType;
import com.kdm.web.model.Sponsor;
import com.kdm.web.restclient.tmo.service.TMOLoanService;
import com.kdm.web.service.LoanService;
import com.kdm.web.service.BorrowerService;

@WebMvcTest(controllers = LoanController.class)
public class LoanControllerTest extends BaseControllerTest {

	@MockBean
	private LoanRepository loanRepository;
	
	@MockBean
	private LoanService loanService;
	
	@MockBean
	private SponsorRepository sponsorRepository;
	
	@MockBean
	private PropertyRepository propertyRepository;
	
	@MockBean
	private LoanRatingRepository loanRatingRepository;
	
	@MockBean
	private AddressRepository addressRepository;
	
	@MockBean
	private AppraisalRepository appraisalRepository;
	
	@MockBean
	private BorrowerRepository borrowerRepository;
	
	@MockBean
	private EntityManager entityManager;
	
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private TMOLoanService tmoOLoanService;
	
	@MockBean
	private BorrowerService propertyService;

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
				put(ApiConstants.LOAN_MAPPING + "/1/sponsor/").contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().is4xxClientError());
	}
	
	@Test
	public void assignSponsorTest() throws Exception {
		Address address = Address.builder().street1("some stree line 1").build();
		Sponsor sponsor = Sponsor.builder()
				.address(address)
				.company("Some Comany")
				.build();
		
		ObjectMapper mapper = new ObjectMapper();
	    mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
	    ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
	    String requestJson=ow.writeValueAsString(sponsor);
	    
	    
		when(entityManager.find(any(), any()))
			.thenReturn(new Loan());
		
		mvc.perform(
				put(ApiConstants.LOAN_MAPPING + "/1/sponsor/")
				.content(requestJson)
				.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk());
	}

}
