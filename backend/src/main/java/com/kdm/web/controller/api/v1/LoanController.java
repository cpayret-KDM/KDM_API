package com.kdm.web.controller.api.v1;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Locale;

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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kdm.web.data.repository.AddressRepository;
import com.kdm.web.data.repository.AppraisalRepository;
import com.kdm.web.data.repository.BorrowerRepository;
import com.kdm.web.data.repository.LoanRepository;
import com.kdm.web.data.repository.PropertyRepository;
import com.kdm.web.model.Address;
import com.kdm.web.model.Appraisal;
import com.kdm.web.model.Borrower;
import com.kdm.web.model.Loan;
import com.kdm.web.model.Property;
import com.kdm.web.model.Sponsor;
import com.kdm.web.restclient.tmo.service.TMOLoanService;
import com.kdm.web.service.EntityUtil;
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
@RequestMapping(ApiConstants.LOAN_MAPPING)
//@PreAuthorize(LoanController.CREATE_LOAN_PERMISSION)
public class LoanController {
	
	Logger logger = LoggerFactory.getLogger(LoanController.class);
	
	public static final String CREATE_LOAN_PERMISSION = "hasAuthority('PERMISSION_create:loan')";
	public static final String READ_LOAN_PERMISSION = "hasAuthority('PERMISSION_read:loan')";
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private EntityUtil entityUtil; 
	 
	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private LoanRepository loanRepository;
	
	@Autowired
	private PropertyRepository propertyRepository;
	
	@Autowired
	private LoanService loanService;
	
	@Autowired
	private TMOLoanService tmoLoanService;
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private AppraisalRepository appraisalRepository;
	
	@Autowired
	private BorrowerRepository borrowerRepository;
	
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
	@PreAuthorize(LoanController.READ_LOAN_PERMISSION)
	public ResponseEntity<Page<Loan>> getLoans(
			@Parameter(hidden = true) LoanSpec loanSpec, 
			@PageableDefault(size = 25) @Parameter(hidden = true) Pageable pageable) {
		
		Page<Loan> page = loanRepository.findAll(loanSpec, pageable); 
		return new ResponseEntity<Page<Loan>>(page, OK); 

	}
	
	@Operation(summary = "Get loans with anniversay within the next given days", tags = "loan", responses = {
	@ApiResponse(responseCode = "200", description = "loan information"),
	@ApiResponse(responseCode = "404", description = "loan not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@GetMapping(path = "/anniversary")
	public ResponseEntity<Page<Loan>> getLoansInAnniversary(
			@RequestParam(name="days", defaultValue="30") int days,
			@PageableDefault(size = 25) @Parameter(hidden = true) Pageable pageable) {
		
		Page<Loan> page = loanRepository.findAniversaryNextDays(days, pageable); 
		return new ResponseEntity<Page<Loan>>(page, OK); 

	}

	@Operation(summary = "Get information of a loan", tags = "loan", responses = {
			@ApiResponse(responseCode = "200", description = "loan information"),
			@ApiResponse(responseCode = "404", description = "loan not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@GetMapping(path = "/{loanId}")
	@PreAuthorize(LoanController.READ_LOAN_PERMISSION)
	public ResponseEntity<Loan> getLoan(
			@PathVariable("loanId") Long loanId) throws Exception {

		Loan loan = entityUtil.tryGetEntity(Loan.class, loanId);
		
		return new ResponseEntity<Loan>(loan, OK);
	}
	
	@Operation(summary = "Create a loan", tags = "loan", responses = {
			@ApiResponse(responseCode = "200", description = "loan created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@PostMapping(path = {"/",""}, consumes = MediaType.APPLICATION_JSON_VALUE)
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
		
		// do this just to make sure it exist
		Loan prevloan = entityUtil.tryGetEntity(Loan.class, loanId);
		
		// merge will update the entity give by its id
		Loan updatedLoan = entityManager.merge(loan);
		
		return new ResponseEntity<Loan>(updatedLoan, OK);
	}
	
	@Operation(summary = "assign a sponsor to a loan, the sponsor is added to the database", tags = "loan", responses = {
			@ApiResponse(responseCode = "200", description = "sponsor assigned"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "loan or sponsor not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@PutMapping(path = "/{loanId}/sponsor/")
	@Transactional
	public ResponseEntity<Sponsor> assignSponsor(@PathVariable("loanId") Long loanId, @RequestBody @Valid Sponsor sponsor, BindingResult bindingResult) throws BindException {
		Loan loan = entityUtil.tryGetEntity(Loan.class, loanId);
		
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}
		
		Sponsor newSponsor = loanService.createSponsor(loan, sponsor);
		
		return new ResponseEntity<Sponsor>(newSponsor, OK);
	}
	
	/*
	@Operation(summary = "add a property to a loan", tags = "loan", responses = {
			@ApiResponse(responseCode = "200", description = "property added"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "loan or property not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@PutMapping(path = "/{loanId}/property/{propertyId}")
	@Transactional
	public ResponseEntity<Void> addProperty(@PathVariable("loanId") Long loanId, @PathVariable("propertyId") Long propertyId) {
		Loan loan = tryGetEntity(Loan.class, loanId);
		
		Property property = tryGetEntity(Property.class, propertyId);
		
		if ((property.getLoan() != null) && (property.getLoan().equals(loan))) {
			// nothing changed
			return new ResponseEntity<Void>(OK);
		}
				
		property.setLoan(loan);
		propertyRepository.saveAndFlush(property);
		
		return new ResponseEntity<Void>(OK);
	}*/
	
	@Operation(summary = "delete a loan", tags = "loan", responses = {
			@ApiResponse(responseCode = "200", description = "loan deleted"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "loan not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@DeleteMapping(path = "/{loanId}")
	public ResponseEntity<Void> deleteLoan(@PathVariable("loanId") Long loanId) {
		Loan loan = entityUtil.tryGetEntity(Loan.class, loanId);
		
		loanRepository.delete(loan);
		
		return new ResponseEntity<Void>(OK);
	}
	
	@Operation(summary = "runs a integration call to the TMO API", tags = "tmo")
	@GetMapping(path = "/tmo")
	public ResponseEntity<Void> getTmoLoans() throws JsonProcessingException {
		
		logger.trace("Starting to process Loans from TMO API");
		
		// getting loans
		logger.trace("GetLoans");
		List<com.kdm.web.restclient.tmo.model.Loan> loans = tmoLoanService.getLoans();
		logger.trace(String.format("\tloans lenght=%d",loans.size()));
		
		loans.stream().forEach(l -> {
			
			Loan newLoan = Loan.builder()
				.loanNumber(l.getAccount())
				.dealName(l.getSortName())
				.build();
			
			newLoan = loanRepository.saveAndFlush(newLoan);
			
			logger.trace(String.format("GetLoanProperties for loan account %s", l.getAccount()) );
			
			try {
				List<com.kdm.web.restclient.tmo.model.Property> properties = tmoLoanService.getProperties(l.getAccount());
				logger.trace(String.format("\tProperties lenght=%d",properties.size()));
				
				//takes LTV, it seems if multiple properties have it, all of them are equal
				if (properties.size() >0) {
					newLoan.setLtv(properties.get(0).getLtv());
					newLoan = loanRepository.saveAndFlush(newLoan);
				}
				
				final Loan loan = newLoan;
				
				properties.stream().forEach(property -> {
					
					Address newAddress = Address.builder()
							.name(property.getDescription())
							.street1(property.getStreet())
							.city(property.getCity())
							.state(property.getState())
							.zip(property.getZipCode())
							.build();
					
					newAddress = addressRepository.save(newAddress);
					
					Property newProperty = Property.builder()
							.address(newAddress)
							.loan(loan)
							.build();
					
					newProperty = propertyRepository.saveAndFlush(newProperty);
					logger.trace(String.format("\tProperty = %s", newProperty.toString()));
					
					if (property.getAppraisalDate() != null) {
						Appraisal newAppraisal = Appraisal.builder()
								.property(newProperty)
								.note("appraisal from TMO data")
								.value(property.getAppraiserFMV())
								.date(ZonedDateTime.ofInstant(property.getAppraisalDate().toInstant(),
                                        ZoneId.systemDefault()))
								.build();
						
						newAppraisal = appraisalRepository.saveAndFlush(newAppraisal);
						logger.trace(String.format("\t\tAppraisal = %.2f", newAppraisal.getValue()));
					}
					
					if (property.getPrimaryBorrower() != null) {
						//Borrower
						com.kdm.web.restclient.tmo.model.Borrower primary = property.getPrimaryBorrower();
						
						
						Address borrowerAddress = Address.builder()
								.street1(primary.getStreet())
								.city(primary.getCity())
								.state(primary.getState())
								.zip(primary.getZipCode())
								.build();
						
						borrowerAddress = addressRepository.save(borrowerAddress);
						
						Borrower newBorrower = Borrower.builder()
								.email(ObjectUtils.firstNonNull(property.getEmailAddress(), property.getPrimaryBorrower().getEmailAddress()))
								.phone(ObjectUtils.firstNonNull(primary.getPhoneCell(), primary.getPhoneHome(), primary.getPhoneWork()))
								.firstName(primary.getFirstName())
								.lastName(primary.getLastName())
								.address(borrowerAddress)
								.build();
						
						newBorrower = borrowerRepository.saveAndFlush(newBorrower);
						
					}
				});
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			try {
				List<com.kdm.web.restclient.tmo.model.Funding> fundings = tmoLoanService.getFunding(l.getAccount());
				logger.trace(String.format("\tFundings lenght=%d", fundings.size()));
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		});
		
		logger.trace("Ended processing Loans from TMO API");
		return new ResponseEntity<Void>(OK); 

	}
	

}


@And({
	@Spec(path = "dealName", spec = Like.class),
	@Spec(path = "loanNumber", spec = Like.class)
})
interface LoanSpec extends Specification<Loan> {
}
