package com.kdm.web.controller.api.v1;

import static org.hamcrest.CoreMatchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import javax.persistence.EntityManager;

import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.kdm.web.data.repository.BorrowerRepository;
import com.kdm.web.model.Address;
import com.kdm.web.model.Borrower;
import com.kdm.web.service.AddressService;
import com.kdm.web.service.BorrowerService;

@WebMvcTest(controllers = BorrowerController.class)
public class BorrowerControllerTest extends BaseControllerTest {
	
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private EntityManager entityManager;
	
	@MockBean
	private BorrowerRepository borrowerRepository;
	
	@MockBean
	private BorrowerService borrowerService;
	
	@MockBean
	private AddressService addressService;
	
	private String borrowerOnlyJson;
	
	private ObjectWriter objectWriter;
	
	@Before
	public void initObjects() throws JsonProcessingException {
		
		ObjectMapper mapper = new ObjectMapper();
	    mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
	    objectWriter = mapper.writer().withDefaultPrettyPrinter();
	    	    
    }
	
	@Test
	public void getBorrowerTest() throws Exception {
		
		Address address = Address.builder()
				.name("address name")
				.build();
		
		Borrower borrower = Borrower.builder()
				.address(address)
				.company("company name")
				.build();
		
		when(entityManager.find(any(), any()))
		.thenReturn(borrower);
		
		mvc.perform(
				get(ApiConstants.BORROWER_MAPPING + "/1").contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.address.name", containsString("address name")))
			.andExpect(jsonPath("$.company", containsString("company name")));
	}
	
	@Test 
	public void getBorrowerNotFoundTest() throws Exception {
		
		when(entityManager.find(any(), any()))
			.thenReturn(null);
		
		mvc.perform(
				get(ApiConstants.BORROWER_MAPPING + "/0").contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isNotFound());
	}
	
	@Test
	public void updateBorrowerNoDataTest() throws Exception {
		mvc.perform(
				put(ApiConstants.BORROWER_MAPPING + "/1").contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().is4xxClientError());
	}
	
	@Test
	public void updateBorrowerNoIdDataTest() throws Exception {
		Borrower borrower = Borrower.builder()
				.build();
		String borrowerJson = objectWriter.writeValueAsString(borrower);
		
		mvc.perform(
				put(ApiConstants.BORROWER_MAPPING + "/1").contentType(MediaType.APPLICATION_JSON)
				.content(borrowerJson))
			//.andDo(print())
			.andExpect(status().is4xxClientError())
			.andExpect(jsonPath("$.message", containsString("do not match null")));
	}
	
	@Test
	public void updateBorrowerWrongIdDataTest() throws Exception {
		Borrower borrower = Borrower.builder()
				.id(2L)
				.build();
		String borrowerJson = objectWriter.writeValueAsString(borrower);
		
		mvc.perform(
				put(ApiConstants.BORROWER_MAPPING + "/1").contentType(MediaType.APPLICATION_JSON)
				.content(borrowerJson))
			//.andDo(print())
			.andExpect(status().is4xxClientError());
	}
	
	@Test
	public void updateBorrowerNoAddressTest() throws Exception {
		Borrower borrower = Borrower.builder()
				.id(1L)
				.build();
		String borrowerJson = objectWriter.writeValueAsString(borrower);
		
		when(entityManager.find(any(), any()))
		.thenReturn(borrower);
		
		when(addressService.getOrPersistAddress(any(), any()))
		.thenReturn(Optional.ofNullable(null));
		
		mvc.perform(
				put(ApiConstants.BORROWER_MAPPING + "/1").contentType(MediaType.APPLICATION_JSON)
				.content(borrowerJson))
			//.andDo(print())
			.andExpect(status().is4xxClientError());
	}
	
	@Test
	public void updateBorrowerWithAddressTest() throws Exception {
		Address address = Address.builder()
				.state("UT")
				.build();
		Borrower borrower = Borrower.builder()
				.id(1L)
				.address(address)
				.build();
		
		String borrowerJson = objectWriter.writeValueAsString(borrower);
		
		when(entityManager.find(any(), any()))
		.thenReturn(borrower);
		
		when(addressService.getOrPersistAddress(any(), any()))
		.thenReturn(Optional.of(address));
		
		when(borrowerService.updateBorrower(any()))
		.thenReturn(borrower);
		
		mvc.perform(
				put(ApiConstants.BORROWER_MAPPING + "/1").contentType(MediaType.APPLICATION_JSON)
				.content(borrowerJson))
			.andDo(print())
			.andExpect(status().is2xxSuccessful());
	}

}
