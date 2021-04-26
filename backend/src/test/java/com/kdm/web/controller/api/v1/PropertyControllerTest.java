package com.kdm.web.controller.api.v1;

import static org.hamcrest.CoreMatchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.persistence.EntityManager;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.kdm.web.data.repository.AppraisalRepository;
import com.kdm.web.data.repository.PropertyRepository;
import com.kdm.web.model.Address;
import com.kdm.web.model.Property;
import com.kdm.web.service.AddressService;
import com.kdm.web.service.BorrowerService;
import com.kdm.web.service.LoanService;

@WebMvcTest(controllers = PropertyController.class)
public class PropertyControllerTest extends BaseControllerTest {

	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private LoanService loanService;
	
	@MockBean
	private EntityManager entityManager;
	
	@MockBean
	private PropertyRepository propertyRepository;
	
	@MockBean
	private AppraisalRepository appraisalRepository;
	
	@MockBean
	private BorrowerService propertyService;
	
	@MockBean
	private AddressService addressService;
	
	@Test
	public void getPropertyTest() throws Exception {
		Address address = Address.builder()
				.name("address name")
				.build();
		
		Property property = Property.builder()
				.address(address)
				.build();
		
		when(entityManager.find(any(), any()))
			.thenReturn(property);
		
		mvc.perform(
				get(ApiConstants.PROPERTY_MAPPING + "/1").contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.address.name", containsString("address name")));

	}
	
	@Test 
	public void getPropertyNotFoundTest() throws Exception {
		
		when(entityManager.find(any(), any()))
			.thenReturn(null);
		
		mvc.perform(
				get(ApiConstants.PROPERTY_MAPPING + "/0").contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isNotFound());
	}

	@Test
	public void savePropertyInvalidDataTest() throws Exception {
		mvc.perform(
				post(ApiConstants.PROPERTY_MAPPING + "/").contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().is4xxClientError());
	}
}
