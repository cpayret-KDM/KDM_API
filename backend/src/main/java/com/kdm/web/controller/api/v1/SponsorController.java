package com.kdm.web.controller.api.v1;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;

import javax.validation.Valid;

import org.apache.commons.lang3.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.kdm.web.model.Sponsor;
import com.kdm.web.util.error.ErrorResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping(ApiConstants.SPONSOR_MAPPING)
public class SponsorController {
	
	Logger logger = LoggerFactory.getLogger(SponsorController.class);

	@Operation(summary = "Get information of a sponsor", tags = "sponsor", responses = {
			@ApiResponse(responseCode = "200", description = "sponsor information"),
			@ApiResponse(responseCode = "404", description = "sponsor not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@GetMapping(path = "/{sponsorId}")
	public ResponseEntity<Sponsor> getSponsor(@PathVariable("sponsorId") Long sponsorId) throws Exception {

		if (ObjectUtils.isEmpty(sponsorId)) {
			throw new ResponseStatusException(NOT_FOUND,
					String.format("entity with key %d, do not exists", sponsorId));
		}
		
		//TODO: call here the repository to get a sponsor

		Sponsor dummySponsor = new Sponsor();
		dummySponsor.setId(sponsorId);
		dummySponsor.setFirstName("firstName");
		
		return new ResponseEntity<Sponsor>(dummySponsor, OK);
	}
	
	@Operation(summary = "Create a sponsor", tags = "sponsor", responses = {
			@ApiResponse(responseCode = "200", description = "sponsor created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@PostMapping(path = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Sponsor> saveSponsor(@RequestBody @Valid Sponsor sponsor, BindingResult bindingResult) throws BindException {
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}


		//TODO: call here a Service or a Repo for creating a sponsor
		
		return new ResponseEntity<>(sponsor, OK);
	}
	
	@Operation(summary = "updates a sponsor", tags = "sponsor", responses = {
			@ApiResponse(responseCode = "200", description = "sponsor updated"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "sponsor not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@PutMapping(path = "/{sposorId}")
	public ResponseEntity<Sponsor> updateSponsor(@PathVariable("sponsorId") Long sponsorId, @RequestBody @Valid Sponsor sponsor) {
		
		if (sponsor.getId() != sponsorId) {
			throw new ResponseStatusException(BAD_REQUEST,
					String.format("bad request id %d do not match %d", sponsorId, sponsor.getId()));
		}
		//TODO: call here a Service or a Repo for updating a sponsor
		
		//original = repo.findOne(sponsorId);
		// if null
		//    throw new ResponseStatusException(NOT_FOUND,
		//    String.format("entity with key %d, do not exists", sponsorId));
		
		// merge objects
		
		//update merged objects
		
		return new ResponseEntity<>(sponsor, OK);
	}
	
	@Operation(summary = "delete a sponsor", tags = "sponsor", responses = {
			@ApiResponse(responseCode = "200", description = "sponsor created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "sponsor not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@DeleteMapping(path = "/{sponsorId}")
	public ResponseEntity<Void> deleteSponsor(@PathVariable("sponsorId") Long sponsorId) {
		if (ObjectUtils.isEmpty(sponsorId)) {
			throw new ResponseStatusException(BAD_REQUEST,
					String.format("bad or insufficient information", sponsorId));
		}
		
		// TODO: call here a Service or a Repo for getting a sponsor
		
		//original = repo.findOne(sponsorId);
		// if null
		//    throw new ResponseStatusException(NOT_FOUND,
		//    String.format("entity with key %d, do not exists", sponsorId));
		
		// original.setStatus(DELETED);
		
		// repo.save(original)
		
		return new ResponseEntity<Void>(OK);
	}

}
