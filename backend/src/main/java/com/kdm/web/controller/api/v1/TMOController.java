package com.kdm.web.controller.api.v1;

import static org.springframework.http.HttpStatus.OK;

import java.math.BigDecimal;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;
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
import com.kdm.web.data.repository.SponsorRepository;
import com.kdm.web.model.Address;
import com.kdm.web.model.Appraisal;
import com.kdm.web.model.Borrower;
import com.kdm.web.model.Loan;
import com.kdm.web.model.LoanStatus;
import com.kdm.web.model.Property;
import com.kdm.web.model.PropertyType;
import com.kdm.web.restclient.tmo.model.Funding;
import com.kdm.web.restclient.tmo.model.LoanTerms;
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
	
	@Autowired
	private SponsorRepository sponsorRepository;
	
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
				logger.trace(String.format("GetLoan details for loan account %s", loan.getAccount()) );
				com.kdm.web.restclient.tmo.model.LoanDetail detail = tmoLoanService.getLoanDetail(loan.getAccount());
				loan.setLoanDetail(detail);
				
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
		this.logger.trace(String.format("sync loan %s", loan.getAccount()));
		BigDecimal ltv = null;
		
		//ltv = calculate weighted average
		if (loan.getProperties() != null && loan.getProperties().size() > 0) {
			ltv = getWeightedAverage(loan.getProperties());
		}
		
		LoanTerms terms = loan.getLoanDetail().getTerms();
		BigDecimal fundControlBD = null;
		BigDecimal principalBalanceBD = null;
		BigDecimal loanRate = null;
		Long prepayMonths = null;
		ZonedDateTime maturityDate = null;
		ZonedDateTime closingDate = null;
		if (Objects.nonNull(terms)) {
			fundControlBD = terms.getFundControl();
			principalBalanceBD = terms.getPrincipalBalance();
			prepayMonths = terms.getPrepayMon();
			loanRate = terms.getSoldRate();
			
			if (Objects.nonNull(terms.getMaturityDate())) {
				maturityDate = ZonedDateTime.ofInstant(terms.getMaturityDate().toInstant(), ZoneId.systemDefault());
			}
			
			if (Objects.nonNull(terms.getClosingDate())) {
				closingDate = ZonedDateTime.ofInstant(terms.getClosingDate().toInstant(), ZoneId.systemDefault());
			}
			
		} else {
			/*
			 * initialAmount is fundControl from TMO loandetails->terms object
			 * principalBalance is PrinBal from TMO loandetails->terms object
			 * but the following commented code is another source (secondary source) for that same info
			*/
			double fundControl = loan.getFundings().stream().filter(funding -> funding.getFundControl() != null)
					.map(Funding::getFundControl)
					.mapToDouble(BigDecimal::doubleValue)
					.sum();
			double principalBalance = loan.getFundings().stream().filter(funding -> funding.getPrincipalBalance() != null)
					.map(Funding::getPrincipalBalance)
					.mapToDouble(BigDecimal::doubleValue)
					.sum();
			
			fundControlBD = new BigDecimal(fundControl);
			principalBalanceBD = new BigDecimal(principalBalance);
		}
		
		Long loanTermMonths = null;
		if (Objects.nonNull(maturityDate) && Objects.nonNull(closingDate)) {
			loanTermMonths = closingDate.until(maturityDate, ChronoUnit.MONTHS); 
		}
		
		Loan newLoan = Loan.builder()
				.loanNumber(loan.getAccount())
				.dealName(loan.getSortName())
				.ltv(ltv)
				.initialAmount(fundControlBD)
				.principalBalance(principalBalanceBD)
				.prepayMonths(prepayMonths)
				.loanStatus(LoanStatus.PERFORMING)
				.loanRate(loanRate)
				.maturityDate(maturityDate)
				.originationDate(closingDate)
				.loanTermMonths(loanTermMonths)
				.build();
		Loan savedLoan = saveLoan(newLoan);
		
		return savedLoan;
	}
	
	private BigDecimal getWeightedAverage(List<com.kdm.web.restclient.tmo.model.Property> properties) {
		double sumWeights = properties.stream()
				.filter( property -> property.getLtv() != null && property.getAppraiserFMV() != null)
				.map(com.kdm.web.restclient.tmo.model.Property::getAppraiserFMV)
				.mapToDouble(BigDecimal::doubleValue)
				.sum();
		
		double sumData = properties.stream()
				.filter( property -> property.getLtv() != null && property.getAppraiserFMV() != null)
				.mapToDouble(property -> {
					return property.getLtv().multiply(property.getAppraiserFMV()).doubleValue();
				})
				.sum();
		if (sumData == 0 || sumWeights == 0) {
			return new BigDecimal( 0 );
		} else {
			return new BigDecimal( sumData / sumWeights );
		}
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
				.type(PropertyType.fromString(tmoProperty.getPropertyType()))
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
			
			newProperty.setBorrower(newBorrower);
			
			propertyRepository.saveAndFlush(newProperty);
			
		}
		
	}
	
	@Transactional
	private void syncFunding(Loan syncedLoan, com.kdm.web.restclient.tmo.model.Loan loan) {
		loan.getFundings().stream()
		.forEach(f -> {
			this.logger.trace(String.format("\t\t funding data: %s", f.toString()));
		});
		
		// nothing yet
		
		//loanRepository.saveAndFlush(syncedLoan);
	}

	@Transactional
	private Loan saveLoan(Loan newLoan) {
		Optional<Loan> existingLoanOp = loanRepository.findByLoanNumber(newLoan.getLoanNumber());
		
		if (existingLoanOp.isPresent()) {
			//Loan loan = existingLoanOp.get();
			//if (!loan.getDealName().equals(newLoan.getDealName()) || !loan.getLtv().equals(newLoan.getLtv())) {
				return entityManager.merge(newLoan);
			//}
			//return loan;
		} else {
			entityManager.persist(newLoan);
			return newLoan;
		}
	}
	
}
