package com.kdm.web.controller.api.v1;

import static org.springframework.http.HttpStatus.OK;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kdm.web.service.tmo.TmoSyncService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping(ApiConstants.TMO_MAPPING)

public class TMOController {

	Logger logger = LoggerFactory.getLogger(TMOController.class);
	
	@Autowired
	private TmoSyncService tmoSyncService;
	
	@Operation(summary = "runs an integration call to the TMO API", tags = "tmo")
	@PostMapping
	@Transactional
	public ResponseEntity<Void> syncLoans() throws Exception {

		tmoSyncService.syncLoans();
		
		return new ResponseEntity<Void>(OK);

	}

	
	
}
