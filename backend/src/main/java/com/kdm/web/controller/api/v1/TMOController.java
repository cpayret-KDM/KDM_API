package com.kdm.web.controller.api.v1;

import static org.springframework.http.HttpStatus.OK;

import java.math.BigDecimal;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.apache.commons.lang3.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
import com.kdm.web.restclient.tmo.service.TMOLoanService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping(ApiConstants.TMO_MAPPING)

public class TMOController {

	Logger logger = LoggerFactory.getLogger(TMOController.class);
	
	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private LoanRepository loanRepository;
	
	@Autowired
	private TMOLoanService tmoLoanService;
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private AppraisalRepository appraisalRepository;
	
	@Autowired
	private BorrowerRepository borrowerRepository;
	
	@Autowired
	private PropertyRepository propertyRepository;
	
	@Operation(summary = "runs an integration call to the TMO API", tags = "tmo")
	@PostMapping
	@Transactional
	public ResponseEntity<Void> syncLoans() throws Exception {
		
		logger.trace("Starting to process Loans from TMO API");
		
		List<com.kdm.web.restclient.tmo.model.Loan> loans = getLoans();
		
		loans.stream().forEach( loan -> {
			Loan syncedLoan = syncLoan(loan);
			
			syncProperties(syncedLoan, loan);
			
			syncFunding(syncedLoan, loan);
			
		});
		
		logger.trace("Ended processing Loans from TMO API");
		return new ResponseEntity<Void>(OK); 

	}

	

	private List<com.kdm.web.restclient.tmo.model.Loan> getLoans() throws Exception {
		logger.trace("getLoans");
		List<com.kdm.web.restclient.tmo.model.Loan> loans = tmoLoanService.getLoans();
		logger.trace(String.format("\tloans lenght=%d",loans.size()));
		
		loans.stream().forEach(loan -> {
			
			try {
				logger.trace(String.format("GetLoanProperties for loan account %s", loan.getAccount()) );
				List<com.kdm.web.restclient.tmo.model.Property> properties = tmoLoanService.getProperties(loan.getAccount());
				loan.setProperties(properties);				
				logger.trace(String.format("\tProperties lenght=%d",properties.size()));
				
				logger.trace(String.format("GetLoanFunding for loan account %s", loan.getAccount()) );
				List<com.kdm.web.restclient.tmo.model.Funding> fundings = tmoLoanService.getFunding(loan.getAccount());
				loan.setFundings(fundings);
				logger.trace(String.format("\tFundings lenght=%d", fundings.size()));
				
			} catch (Exception e) {
				this.logger.error("Unhandle exception",e);
			}
			
			try {
				
			} catch (Exception e) {
				this.logger.error("Unhandle exception",e);
			}
		});
		return loans;
	}

	@Transactional
	private Loan syncLoan(com.kdm.web.restclient.tmo.model.Loan loan) {
		
		BigDecimal ltv = null;
		if (loan.getProperties() != null && loan.getProperties().size() > 0) {
			ltv = loan.getProperties().get(0).getLtv();
		}
		Loan newLoan = Loan.builder()
				.loanNumber(loan.getAccount())
				.dealName(loan.getSortName())
				.ltv(ltv)
				.build();
		Loan savedLoan = saveLoan(newLoan);
		
		return savedLoan;
	}
	
	@Transactional
	private void syncProperties(Loan loan, com.kdm.web.restclient.tmo.model.Loan tmoLoan) {
		// List<Property> currentProperties = propertyRepository.findByLoanId(loan.getId());
		
		// delete any property that is not in the TMO property list
		
		tmoLoan.getProperties().stream().forEach(property -> {
			syncLoanProperty(loan, tmoLoan, property);
		});
		
	}
	
	@Transactional
	private void syncLoanProperty(Loan loan, com.kdm.web.restclient.tmo.model.Loan tmoLoan, com.kdm.web.restclient.tmo.model.Property tmoProperty) {
		Address newAddress = Address.builder()
				.name(tmoProperty.getDescription())
				.street1(tmoProperty.getStreet())
				.city(tmoProperty.getCity())
				.state(tmoProperty.getState())
				.zip(tmoProperty.getZipCode())
				.build();
		
		newAddress = addressRepository.save(newAddress);
		
		Property newProperty = Property.builder()
				.address(newAddress)
				.loan(loan)
				.build();
		
		newProperty = propertyRepository.saveAndFlush(newProperty);
		logger.trace(String.format("\tProperty = %s", newProperty.toString()));
		
		if (tmoProperty.getAppraisalDate() != null) {
			Appraisal newAppraisal = Appraisal.builder()
					.property(newProperty)
					.note("appraisal from TMO data")
					.value(tmoProperty.getAppraiserFMV())
					.date(ZonedDateTime.ofInstant(tmoProperty.getAppraisalDate().toInstant(),
	                        ZoneId.systemDefault()))
					.build();
			
			newAppraisal = appraisalRepository.saveAndFlush(newAppraisal);
			logger.trace(String.format("\t\tAppraisal = %.2f", newAppraisal.getValue()));
		}
		
		if (tmoLoan.getPrimaryBorrower() != null) {
			//Borrower
			com.kdm.web.restclient.tmo.model.Borrower primary = tmoLoan.getPrimaryBorrower();
			
			
			Address borrowerAddress = Address.builder()
					.street1(primary.getStreet())
					.city(primary.getCity())
					.state(primary.getState())
					.zip(primary.getZipCode())
					.build();
			
			borrowerAddress = addressRepository.save(borrowerAddress);
			
			Borrower newBorrower = Borrower.builder()
					.email(ObjectUtils.firstNonNull(tmoLoan.getEmailAddress(), primary.getEmailAddress()))
					.phone(ObjectUtils.firstNonNull(primary.getPhoneCell(), primary.getPhoneHome(), primary.getPhoneWork()))
					.firstName(primary.getFirstName())
					.lastName(primary.getLastName())
					.address(borrowerAddress)
					.build();
			
			newBorrower = borrowerRepository.saveAndFlush(newBorrower);
			
		}
		
	}
	
	@Transactional
	private void syncFunding(Loan syncedLoan, com.kdm.web.restclient.tmo.model.Loan loan) {
		loan.getFundings().stream()
		.forEach(funding -> {
			this.logger.trace(String.format("\t\t funding data: %s", funding.toString()));
		});
	}

	@Transactional
	private Loan saveLoan(Loan newLoan) {
		Optional<Loan> existingLoanOp = loanRepository.findByLoanNumber(newLoan.getLoanNumber());
		
		if (existingLoanOp.isPresent()) {
			Loan loan = existingLoanOp.get();
			if (!loan.getDealName().equals(newLoan.getDealName()) || !loan.getLtv().equals(newLoan.getLtv())) {
				return entityManager.merge(newLoan);
			}
			return loan;
		} else {
			entityManager.persist(newLoan);
			return newLoan;
		}
	}
	
}
