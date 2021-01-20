package com.kdm.web.restclient.tmo.service;

import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import com.kdm.web.restclient.tmo.service.config.SimpleContextConfiguration;


@RunWith(SpringRunner.class)
@ExtendWith(SpringExtension.class)
@ActiveProfiles("no_kdm_security")
@Import({SimpleContextConfiguration.class})
public class TMOLoanServiceTest {
	
	@Autowired
	private TMOLoanService tmoLoanService;
	
	@Test
	public void getLoansTest() throws Exception {
		
	}
}
