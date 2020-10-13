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

import com.kdm.web.model.Loan;
import com.kdm.web.util.error.ErrorResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping(ApiConstants.LOAN_MAPPING)
public class LoanController {
	
	Logger logger = LoggerFactory.getLogger(LoanController.class);

	@Operation(summary = "Get information of a loan", tags = "loan", responses = {
			@ApiResponse(responseCode = "200", description = "loan information"),
			@ApiResponse(responseCode = "404", description = "loan not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@GetMapping(path = "/{loanId}")
	public ResponseEntity<Loan> getLoan(@PathVariable("loanId") Long loanId) throws Exception {

		if (ObjectUtils.isEmpty(loanId)) {
			throw new ResponseStatusException(NOT_FOUND,
					String.format("entity with key %d, do not exists", loanId));
		}
		
		//TODO: call here the repository to get a loan

		Loan dummyLoan = new Loan();
		dummyLoan.setId(loanId);
		dummyLoan.setDealName("Greatest Deal Loan");
		
		return new ResponseEntity<Loan>(dummyLoan, OK);
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


		//TODO: call here a Service or a Repo for creating a loan
		
		return new ResponseEntity<Loan>(loan, OK);
	}
	
	@Operation(summary = "updates a loan", tags = "loan", responses = {
			@ApiResponse(responseCode = "200", description = "loan updated"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "loan not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@PutMapping(path = "/{loanId}")
	public ResponseEntity<Loan> updateLoan(@PathVariable("loanId") Long loanId, @RequestBody @Valid Loan loan) {
		
		if (loan.getId() != loanId) {
			throw new ResponseStatusException(BAD_REQUEST,
					String.format("bad request id %d do not match %d", loanId, loan.getId()));
		}
		//TODO: call here a Service or a Repo for updating a loan
		
		//original = repo.findOne(loanId);
		// if null
		//    throw new ResponseStatusException(NOT_FOUND,
		//    String.format("entity with key %d, do not exists", loanId));
		
		// merge objects
		
		//update merged objects
		
		return new ResponseEntity<Loan>(loan, OK);
	}
	
	@Operation(summary = "delete a loan", tags = "loan", responses = {
			@ApiResponse(responseCode = "200", description = "loan created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "loan not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@DeleteMapping(path = "/{loanId}")
	public ResponseEntity<Void> deleteLoan(@PathVariable("loanId") Long loanId) {
		if (ObjectUtils.isEmpty(loanId)) {
			throw new ResponseStatusException(BAD_REQUEST,
					String.format("bad or insufficient information", loanId));
		}
		
		// TODO: call here a Service or a Repo for getting a loan
		
		//original = repo.findOne(loanId);
		// if null
		//    throw new ResponseStatusException(NOT_FOUND,
		//    String.format("entity with key %d, do not exists", loanId));
		
		// original.setStatus(DELETED);
		
		// repo.save(original)
		
		return new ResponseEntity<Void>(OK);
	}

}
