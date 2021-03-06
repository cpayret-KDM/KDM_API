package com.kdm.web.controller.api.v1;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;

import java.util.Locale;
import java.util.Objects;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.assertj.core.util.Arrays;
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

import com.fasterxml.jackson.annotation.JsonView;
import com.kdm.web.data.repository.BorrowerRepository;
import com.kdm.web.model.Address;
import com.kdm.web.model.Borrower;
import com.kdm.web.service.AddressService;
import com.kdm.web.service.BorrowerService;
import com.kdm.web.service.EntityUtil;
import com.kdm.web.util.View;
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
@RequestMapping(ApiConstants.BORROWER_MAPPING)
public class BorrowerController {
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private BorrowerRepository borrowerRepository;
	
	@Autowired
	private BorrowerService borrowerService;
	
	@Autowired
	private AddressService addressService;
	
	@Autowired
	private EntityUtil entityUtil;

	@Operation(
			summary = "Get list of borrowers according to search criteria and pagination options", 
			tags = "borrower",
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
						name = "phone",
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
					example = "Company,desc",
					schema = @Schema(
						type = "string"
					),
					required = false
				)},
			responses = {
				@ApiResponse(
					responseCode = "200", 
					description = "pagination response with content of borrowers matching to search criteria", 
					content = @Content(
						schema = @Schema(implementation = Page.class)
					)
				)
			}
		)
		@ResponseBody
		@GetMapping
		public ResponseEntity<Page<Borrower>> getBorrowers(
				@Parameter(hidden = true) BorrowerSpec borrowerSpec, 
				@PageableDefault(size = 25) @Parameter(hidden = true) Pageable pageable) {
			
			Page<Borrower> page = borrowerRepository.findAll(borrowerSpec, pageable); 
			return new ResponseEntity<Page<Borrower>>(page, OK); 

		}
	
	@Operation(summary = "Get information of a borrower", tags = "borrower", responses = {
			@ApiResponse(responseCode = "200", description = "rating information"),
			@ApiResponse(responseCode = "404", description = "rating not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@GetMapping(path = "/{borrowerId}")
	public ResponseEntity<Borrower> getBorrower(
			@PathVariable("borrowerId") Long borrowerId) throws Exception {

		Borrower borrower = entityUtil.tryGetEntity(Borrower.class, borrowerId);
		
		return new ResponseEntity<Borrower>(borrower, OK);
	}
	
	@Operation(summary = "Create a borrower", tags = "borrower", responses = {
			@ApiResponse(responseCode = "200", description = "borrower created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@PostMapping(path = {"/",""}, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Borrower> saveBorrower(@RequestBody @Valid @JsonView(View.Basic.class) Borrower borrower, BindingResult bindingResult) throws BindException {
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}
		Borrower newBorrower = borrowerService.createBorrower(borrower);
		
		return new ResponseEntity<Borrower>(newBorrower, OK);
	}

	@Operation(summary = "updates a borrower", tags = "borrower", responses = {
			@ApiResponse(responseCode = "200", description = "borrower updated"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "borrower not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@PutMapping(path = "/{borrowerId}")
	@Transactional
	public ResponseEntity<Borrower> updateBorrower(@PathVariable("borrowerId") Long borrowerId, @RequestBody @Valid @JsonView(View.ExtendedBasic.class) Borrower borrower, BindingResult bindingResult) throws BindException {
		
		if (!Objects.equals(borrowerId,borrower.getId())) {
			throw new ResponseStatusException(BAD_REQUEST,
					messageSource.getMessage("controller.id_not_match", Arrays.array(borrowerId, borrower.getId()), Locale.US));
		}
		
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}
		
		Optional<Address> address = addressService.getOrPersistAddress(null, borrower.getAddress());
		
		if (!address.isPresent()) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("address object is null"), Locale.US));
		}
		
		borrower.setAddress(address.get());
		borrower.setAddressID(address.get().getId());
		
		Borrower updatedBorrower = borrowerService.updateBorrower(borrower);
		
		return new ResponseEntity<Borrower>(updatedBorrower, OK);
	}
	
	@Operation(summary = "delete a borrower", tags = "borrower", responses = {
			@ApiResponse(responseCode = "200", description = "borrower deleted"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "borrower not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@DeleteMapping(path = "/{borrowerId}")
	public ResponseEntity<Void> deleteBorrower(@PathVariable("borrowerId") Long borrowerId) {
		Borrower borrower = entityUtil.tryGetEntity(Borrower.class, borrowerId);
		
		borrowerService.deleteBorrower(borrower);
		
		return new ResponseEntity<Void>(OK);
	}
	
}

@And({
	@Spec(path = "Company", spec = Like.class),
	@Spec(path = "firstName", spec = Like.class),
	@Spec(path = "lastName", spec = Like.class),
	@Spec(path = "phone", spec = Like.class),
	@Spec(path = "email", spec = Like.class)
})
interface BorrowerSpec extends Specification<Borrower> {

}
