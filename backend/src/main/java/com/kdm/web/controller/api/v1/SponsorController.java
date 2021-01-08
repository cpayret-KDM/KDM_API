package com.kdm.web.controller.api.v1;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;

import java.util.Locale;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.apache.commons.lang3.ObjectUtils;
import org.assertj.core.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.kdm.web.data.repository.SponsorRepository;
import com.kdm.web.model.Sponsor;
import com.kdm.web.service.LoanService;
import com.kdm.web.util.error.ErrorResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;

@RestController
@RequestMapping(ApiConstants.SPONSOR_MAPPING)
public class SponsorController {
	
	Logger logger = LoggerFactory.getLogger(SponsorController.class);
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private SponsorRepository sponsorRepository;
	
	@Autowired
	private LoanService loanService;
	
	@Operation(
		summary = "Get list of sponsors according to search criteria and pagination options", 
		tags = "sponsor",
		parameters = { 
			@Parameter(
				name = "Company",
				schema = @Schema(
					type = "string"
				),
				required = false
			),
			@Parameter(
				name = "firstName",
				schema = @Schema(
					type = "string"
				),
				required = false
			),
			@Parameter(
				name = "lastName",
				schema = @Schema(
					type = "string"
				),
				required = false
			),
			@Parameter(
				name = "email",
				schema = @Schema(
					type = "string"
				),
				required = false
			),
			@Parameter(
				name = "size",
				description = "amount of records per page",
				schema = @Schema(
					type = "int"
				),
				required = false
			),
			@Parameter(
				name = "page",
				description = "page number to get",
				schema = @Schema(
					type = "int"
				),
				required = false
			),
			@Parameter(
				name = "sort",
				description = "sort criteria, can have multiple values",
				example = "firstName,desc",
				schema = @Schema(
					type = "string"
				),
				required = false
			)},
		responses = {
			@ApiResponse(
				responseCode = "200", 
				description = "pagination response with content of sponsors matching to search criteria", 
				content = @Content(
					schema = @Schema(implementation = Page.class)
				)
			)
		}
	)
	@ResponseBody
	@GetMapping
	public ResponseEntity<Page<Sponsor>> getSponsors(
			@Parameter(hidden = true) SponsorSpec sponsorSpec, 
			@PageableDefault(size = 25) @Parameter(hidden = true) Pageable pageable) {
		
		Page<Sponsor> page = sponsorRepository.findAll(sponsorSpec, pageable); 
		return new ResponseEntity<Page<Sponsor>>(page, OK); 

	}

	@Operation(summary = "Get information of a sponsor", tags = "sponsor", responses = {
			@ApiResponse(responseCode = "200", description = "sponsor information"),
			@ApiResponse(responseCode = "404", description = "sponsor not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@GetMapping(path = "/{sponsorId}")
	public ResponseEntity<Sponsor> getSponsor(@PathVariable("sponsorId") Long sponsorId) throws Exception {

		if (ObjectUtils.isEmpty(sponsorId)) {
			throw new ResponseStatusException(BAD_REQUEST,
					messageSource.getMessage("controller.invalid_id", Arrays.array(sponsorId), Locale.US));
		}
		
		Optional<Sponsor> sponsor = sponsorRepository.findById(sponsorId);
		if (sponsor.isPresent()) {
			return new ResponseEntity<Sponsor>(sponsor.get(), OK);
		} else {
			throw new ResponseStatusException(NOT_FOUND,
					messageSource.getMessage("controller.entity_no_exists", Arrays.array(sponsorId), Locale.US));
		}
	}
	
	/*
	@Operation(summary = "Create a sponsor", tags = "sponsor", responses = {
			@ApiResponse(responseCode = "200", description = "sponsor created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@PostMapping(path = {"/",""}, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Sponsor> saveSponsor(@RequestBody @Valid Sponsor sponsor, BindingResult bindingResult) throws BindException {
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}

		Sponsor newSponsor = sponsorRepository.saveAndFlush(sponsor);
		
		return new ResponseEntity<Sponsor>(newSponsor, OK);
	}*/
	
	@Operation(summary = "updates a sponsor", tags = "sponsor", responses = {
			@ApiResponse(responseCode = "200", description = "sponsor updated"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "sponsor not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@PutMapping(path = "/{sponsorId}")
	@Transactional
	public ResponseEntity<Sponsor> updateSponsor(@PathVariable("sponsorId") Long sponsorId, @RequestBody @Valid Sponsor sponsor, BindingResult bindingResult) throws BindException {
		
		if (sponsor.getId() != sponsorId) {
			throw new ResponseStatusException(BAD_REQUEST,
					messageSource.getMessage("controller.id_not_match", Arrays.array(sponsorId, sponsor.getId()), Locale.US));
		}
		
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}
		
		Optional<Sponsor> prevSponsor = sponsorRepository.findById(sponsorId);
		if (!prevSponsor.isPresent()) {
			throw new ResponseStatusException(NOT_FOUND,
					messageSource.getMessage("controller.entity_no_exists", Arrays.array(sponsorId), Locale.US));
		}
		
		Sponsor updatedSponsor = loanService.updateSponsor(sponsor);
		
		return new ResponseEntity<Sponsor>(updatedSponsor, OK);
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
					messageSource.getMessage("controller.bad_request", Arrays.array("sponsorId is invalid"), Locale.US));
		}
		
		Optional<Sponsor> sponsor = sponsorRepository.findById(sponsorId);
		if (!sponsor.isPresent()) {
			throw new ResponseStatusException(NOT_FOUND,
					messageSource.getMessage("controller.entity_no_exists", Arrays.array(sponsorId), Locale.US));
		} 
		
		sponsorRepository.delete(sponsor.get());
		
		return new ResponseEntity<Void>(OK);
	}

}

@And({
	@Spec(path = "company", spec = Like.class),
	@Spec(path = "firstName", spec = Like.class),
	@Spec(path = "lastName", spec = Like.class),
	@Spec(path = "email", spec = Like.class)
})
interface SponsorSpec extends Specification<Sponsor> {
}