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

import com.kdm.web.data.repository.LoanRepository;
import com.kdm.web.model.Loan;
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
@RequestMapping(ApiConstants.LOAN_MAPPING)
public class LoanController {
	
	Logger logger = LoggerFactory.getLogger(LoanController.class);
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private EntityManager entityManager; 
	
	@Autowired
	private LoanRepository loanRepository;
	
	@Operation(
		summary = "Get list of loans according to search criteria and pagination options", 
		tags = "loan",
		parameters = { 
			@Parameter(
				name = "loanNumber",
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
				example = "loanNumber,desc",
				schema = @Schema(
					type = "string"
				),
				required = false
			)},
		responses = {
			@ApiResponse(
				responseCode = "200", 
				description = "pagination response with content of loans matching to search criteria", 
				content = @Content(
					schema = @Schema(implementation = Page.class)
				)
			)
		}
	)
	@ResponseBody
	@GetMapping
	public ResponseEntity<Page<Loan>> getLoans(
			@Parameter(hidden = true) LoanSpec loanSpec, 
			@PageableDefault(size = 25) @Parameter(hidden = true) Pageable pageable) {
		
		Page<Loan> page = loanRepository.findAll(loanSpec, pageable); 
		return new ResponseEntity<Page<Loan>>(page, OK); 

	}

	@Operation(summary = "Get information of a loan", tags = "loan", responses = {
			@ApiResponse(responseCode = "200", description = "loan information"),
			@ApiResponse(responseCode = "404", description = "loan not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@GetMapping(path = "/{loanId}")
	public ResponseEntity<Loan> getLoan(
			@PathVariable("loanId") Long loanId) throws Exception {

		if (ObjectUtils.isEmpty(loanId)) {
			throw new ResponseStatusException(BAD_REQUEST,
					messageSource.getMessage("controller.invalid_id", Arrays.array(loanId), Locale.US));
		}
		
		Optional<Loan> loan = loanRepository.findById(loanId);
		if (loan.isPresent()) {
			return new ResponseEntity<Loan>(loan.get(), OK);
		} else {
			throw new ResponseStatusException(NOT_FOUND,
					messageSource.getMessage("controller.entity_no_exists", Arrays.array(loanId), Locale.US));
		}
	}
	
	@Operation(summary = "Create a loan", tags = "loan", responses = {
			@ApiResponse(responseCode = "200", description = "loan created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@PostMapping(path = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Loan> saveLoan(@RequestBody @Valid Loan loan, BindingResult bindingResult) throws BindException {
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}
		Loan newLoan = loanRepository.saveAndFlush(loan);
		
		return new ResponseEntity<Loan>(newLoan, OK);
	}
	
	@Operation(summary = "updates a loan", tags = "loan", responses = {
			@ApiResponse(responseCode = "200", description = "loan updated"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "loan not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@PutMapping(path = "/{loanId}")
	@Transactional
	public ResponseEntity<Loan> updateLoan(@PathVariable("loanId") Long loanId, @RequestBody @Valid Loan loan, BindingResult bindingResult) throws BindException {
		
		if (loan.getId() != loanId) {
			throw new ResponseStatusException(BAD_REQUEST,
					messageSource.getMessage("controller.id_not_match", Arrays.array(loanId, loan.getId()), Locale.US));
		}
		
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}
		
		Optional<Loan> prevloan = loanRepository.findById(loanId);
		if (!prevloan.isPresent()) {
			throw new ResponseStatusException(NOT_FOUND,
					messageSource.getMessage("controller.entity_no_exists", Arrays.array(loanId), Locale.US));
		}
		
		Loan updatedLoan = entityManager.merge(loan);
		
		return new ResponseEntity<Loan>(updatedLoan, OK);
	}
	
	@Operation(summary = "delete a loan", tags = "loan", responses = {
			@ApiResponse(responseCode = "200", description = "loan deleted"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "loan not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@DeleteMapping(path = "/{loanId}")
	public ResponseEntity<Void> deleteLoan(@PathVariable("loanId") Long loanId) {
		if (ObjectUtils.isEmpty(loanId)) {
			throw new ResponseStatusException(BAD_REQUEST,
					messageSource.getMessage("controller.bad_request", Arrays.array("loanId is invalid"), Locale.US));
		}
		
		Optional<Loan> loan = loanRepository.findById(loanId);
		if (!loan.isPresent()) {
			throw new ResponseStatusException(NOT_FOUND,
					messageSource.getMessage("controller.entity_no_exists", Arrays.array(loanId), Locale.US));
		} 
		
		loanRepository.delete(loan.get());
		
		return new ResponseEntity<Void>(OK);
	}

}


@And({
	@Spec(path = "dealName", spec = Like.class),
	@Spec(path = "loanNumber", spec = Like.class)
})
interface LoanSpec extends Specification<Loan> {
}
