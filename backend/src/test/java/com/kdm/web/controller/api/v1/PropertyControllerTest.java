package com.kdm.web.controller.api.v1;

import static org.hamcrest.CoreMatchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = PropertyController.class)
public class PropertyControllerTest {

	@Autowired
	private MockMvc mvc;

	@Ignore
	@Test
	public void getCustomerTest() throws Exception {
		mvc.perform(
				get(ApiConstants.PROPERTY_MAPPING + "/1").contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.name", containsString("Dummy")));

	}
	
	@Ignore
	@Test 
	public void getCustomerTestNotFound() throws Exception {
		mvc.perform(
				get(ApiConstants.PROPERTY_MAPPING + "/0").contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isNotFound());
	}

}
