package com.kdm.web.service.tmo;

import java.math.BigDecimal;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.transaction.Transactional;

import org.apache.commons.lang3.ObjectUtils;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.AuditReaderFactory;
import org.hibernate.envers.query.AuditEntity;
import org.hibernate.envers.query.AuditQuery;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.kdm.web.data.repository.AddressRepository;
import com.kdm.web.data.repository.AppraisalRepository;
import com.kdm.web.data.repository.BorrowerRepository;
import com.kdm.web.data.repository.LenderRepository;
import com.kdm.web.data.repository.LoanRepository;
import com.kdm.web.data.repository.PropertyRepository;
import com.kdm.web.model.Address;
import com.kdm.web.model.Appraisal;
import com.kdm.web.model.Borrower;
import com.kdm.web.model.Lender;
import com.kdm.web.model.Loan;
import com.kdm.web.model.LoanStatus;
import com.kdm.web.model.Property;
import com.kdm.web.model.PropertyType;
import com.kdm.web.model.comparator.tmo.AddressComparator;
import com.kdm.web.model.comparator.tmo.AppraisalComparator;
import com.kdm.web.model.comparator.tmo.BorrowerComparator;
import com.kdm.web.model.comparator.tmo.LenderComparator;
import com.kdm.web.model.comparator.tmo.LoanComparator;
import com.kdm.web.model.comparator.tmo.PropertyComparator;
import com.kdm.web.restclient.tmo.model.Funding;
import com.kdm.web.restclient.tmo.model.LoanTerms;
import com.kdm.web.restclient.tmo.service.TMOLoanService;
import com.kdm.web.security.SecurityUtil;

@Service
public class TmoSyncServiceImpl implements TmoSyncService {

	Logger logger = LoggerFactory.getLogger(TmoSyncServiceImpl.class);
	
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
	private LenderRepository lenderRepository;
	
	@Autowired
	private EntityManagerFactory factory;
	
	@Override
	@Transactional
	public void syncLoans() throws Exception {
		logger.trace("Starting to process Loans from TMO API");
		
		List<com.kdm.web.restclient.tmo.model.Loan> loans = getLoans();
		
		loans.stream().forEach( loan -> {
			Loan syncedLoan = syncLoan(loan);
			
			if (syncedLoan != null) {
			
				syncProperties(syncedLoan, loan);
			
				syncFunding(syncedLoan, loan);
			}
			
			
		});
		
		logger.trace("Ended processing Loans from TMO API");

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

	/**
	 * syncs the given loan to the database
	 * @param loan
	 * @return null if sync of the given loan can't be done or is not allowed
	 */
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
			loanRate = terms.getNoteRate();
			
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
		savedLoan = loanRepository.getOne(savedLoan.getId());
		return savedLoan;
	}
	
	private boolean allowLoanSync(Loan loan) {
		// get overriden values from users updates
		AuditReader auditReader = AuditReaderFactory.get(entityManager);
		AuditQuery auditQuery = auditReader
				.createQuery()
				.forRevisionsOfEntity(Loan.class, true, false);
		auditQuery.add(AuditEntity.property("loanNumber").eq(loan.getLoanNumber()));
		List<Loan> loanRevisions = auditQuery.getResultList();
		if (loanRevisions.size() > 0) {
			Loan lastLoanRevision = loanRevisions.get(loanRevisions.size()-1);
			if (!SecurityUtil.SYSTEM_USER.equalsIgnoreCase(lastLoanRevision.getUpdatedBy())) {
				return false;
			}
		}
		return true;
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
			return new BigDecimal( sumData / sumWeights ).setScale(2, BigDecimal.ROUND_HALF_DOWN);
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
				.name(ObjectUtils.defaultIfNull(tmoProperty.getDescription(), ""))
				.street1(ObjectUtils.defaultIfNull(tmoProperty.getStreet(),""))
				.street2("")
				.city(ObjectUtils.defaultIfNull(tmoProperty.getCity(),""))
				.state(ObjectUtils.defaultIfNull(tmoProperty.getState(),""))
				.zip(ObjectUtils.defaultIfNull(tmoProperty.getZipCode(), ""))
				.build();
		
		Address savedAddress = saveAddress(newAddress);
		
		
		Property newProperty = Property.builder()
				.address(savedAddress)
				.loan(loan)
				.type(PropertyType.fromString(tmoProperty.getPropertyType()))
				.build();
		
		Property savedProperty = saveProperty(newProperty);
		
		logger.trace(String.format("\tProperty = %s", savedProperty.toString()));
		
		if (tmoProperty.getAppraiserFMV() != null) {
			Date appraisalDate = tmoProperty.getAppraisalDate() != null ? tmoProperty.getAppraisalDate() : new Date(); 
		
			Appraisal newAppraisal = Appraisal.builder()
					.property(savedProperty)
					.note("appraisal from TMO data")
					.value(tmoProperty.getAppraiserFMV())
					.date(ZonedDateTime.ofInstant(appraisalDate.toInstant(),
	                        ZoneId.systemDefault()))
					.build();
			
			Appraisal savedAppraisal = saveAppraisal(newAppraisal);
			
			logger.trace(String.format("\t\tAppraisal = %.2f", savedAppraisal.getValue()));
		}

		
		if (tmoLoan.getPrimaryBorrower() != null) {
			//Borrower
			com.kdm.web.restclient.tmo.model.Borrower primary = tmoLoan.getPrimaryBorrower();
			
			// address name
			String email = ObjectUtils.firstNonNull(tmoLoan.getEmailAddress(), primary.getEmailAddress());
			String firstName = primary.getFirstName();
			String addressName = ObjectUtils.firstNonNull(email, firstName);
			
			Address borrowerAddress = Address.builder()
					.name(addressName)
					.street1(primary.getStreet())
					.city(primary.getCity())
					.state(primary.getState())
					.zip(primary.getZipCode())
					.build();
			
			Address savedBorrowerAddress = saveAddress(borrowerAddress);
			
			Borrower newBorrower = Borrower.builder()
					.email(email)
					.phone(ObjectUtils.firstNonNull(primary.getPhoneCell(), primary.getPhoneHome(), primary.getPhoneWork()))
					.firstName(firstName)
					.lastName(primary.getLastName())
					.address(savedBorrowerAddress)
					.build();
			
			Borrower savedBorrower = saveBorrower(newBorrower);
			
			savedProperty.setBorrower(savedBorrower);
			
			propertyRepository.saveAndFlush(savedProperty);
			
		}
		
	}
	
	@Transactional
	private void syncFunding(Loan syncedLoan, com.kdm.web.restclient.tmo.model.Loan tmoLoan) {
		tmoLoan.getFundings().stream()
			.forEach(f -> {
				this.logger.trace(String.format("\t\t funding data: %s", f.toString()));
				syncLoanLender(syncedLoan, tmoLoan, f);
			});
	}
	
	@Transactional
	private void syncLoanLender(Loan loan, com.kdm.web.restclient.tmo.model.Loan tmoLoan, com.kdm.web.restclient.tmo.model.Funding funding) {
		Lender lender = Lender.builder()
				.lenderRate(funding.getLenderRate())
				.name(funding.getLenderName())
				.initialAmount(funding.getFundControl())
				.principalBalance(funding.getPrincipalBalance())
				.loan(loan)
				.build();
		
		Lender savedLender = saveLender(lender);
	}

	@Transactional
	private Loan saveLoan(Loan newLoan) {
		Optional<Loan> existingLoanOp = loanRepository.findByLoanNumber(newLoan.getLoanNumber());
		
		if (!allowLoanSync(newLoan)) {
			return existingLoanOp.get();
		}

		if (existingLoanOp.isPresent()) {
			LoanComparator comparator = new LoanComparator();
			if (comparator.compare(existingLoanOp.get(), newLoan) == 0) {
				return existingLoanOp.get();
			}
			newLoan.setId(existingLoanOp.get().getId());
			newLoan.setProperties(existingLoanOp.get().getProperties());
			newLoan.setRatings(existingLoanOp.get().getRatings());
			newLoan.setMsn(existingLoanOp.get().getMsn());
			newLoan.setMsnId(existingLoanOp.get().getMsnId());
			return entityManager.merge(newLoan);
		} else {
			entityManager.persist(newLoan);
			return newLoan;
		}
	}
	
	@Transactional
	private Address saveAddress(Address newAddress) {
		Optional<Address> existingAddress = Optional.empty();
		if (Objects.nonNull(newAddress) && Objects.nonNull(newAddress.getName())) {
			ExampleMatcher caseInsensitiveExampleMatcher = ExampleMatcher.matchingAll().withIgnoreCase();
			//search if address already exist
			List<Address> actualAddresses = addressRepository.findAll(Example.of(newAddress, caseInsensitiveExampleMatcher));
			
			if (!actualAddresses.isEmpty()) {
				existingAddress = Optional.of(actualAddresses.get(0));
			} 
		}
		
		if (existingAddress.isPresent()) {
			AddressComparator comparator = new AddressComparator();
			if (comparator.compare(existingAddress.get(), newAddress) == 0) {
				return existingAddress.get();
			}
			newAddress.setId(existingAddress.get().getId());
			return entityManager.merge(newAddress);
		} else {
			return addressRepository.save(newAddress);
		}
	}
	
	@Transactional
	private Property saveProperty(Property property) {
		Optional<Property> existingProperty = Optional.empty();
		
		Long addressId = ObjectUtils.firstNonNull(property.getAddress().getId(), property.getAddressID());
		Long loanId = ObjectUtils.firstNonNull(property.getLoanId(), property.getLoan().getId());
		
		if (Objects.nonNull(property) && Objects.nonNull(addressId)  && Objects.nonNull(loanId)){
			existingProperty = propertyRepository.findByAddressIdAndLoanId(addressId, loanId);
		}
		
		if (existingProperty.isPresent()) {
			PropertyComparator comparator = new PropertyComparator();
			if (comparator.compare(existingProperty.get(), property) == 0) {
				return existingProperty.get();
			}
			property.setAppraisal(existingProperty.get().getAppraisal());
			property.setBorrower(existingProperty.get().getBorrower());
			property.setId(existingProperty.get().getId());
			return entityManager.merge(property);
		} else {
			return propertyRepository.save(property);
		}
	}
	
	@Transactional
	private Appraisal saveAppraisal(Appraisal newAppraisal) {
		Optional<Appraisal> existingAppraisal = Optional.empty();
		
		Long propertyId = newAppraisal.getProperty().getId();
		
		if (Objects.nonNull(propertyId)){
			existingAppraisal = appraisalRepository.findFirstByPropertyIdOrderByIdDesc(propertyId);
		}
		
		//if there is appraisal
		if (existingAppraisal.isPresent() ) {
			
			// if current appraisal is from a user, or if the value is the same, then keep current appraisal
			AppraisalComparator comparator = new AppraisalComparator();
			if ((!SecurityUtil.SYSTEM_USER.equalsIgnoreCase(existingAppraisal.get().getUpdatedBy())) 
					|| (comparator.compare(existingAppraisal.get(), newAppraisal) == 0))
				return existingAppraisal.get();
		}
		return appraisalRepository.save(newAppraisal);

	}
	
	@Transactional
	private Borrower saveBorrower(Borrower newBorrower) {
		Optional<Borrower> existingBorrower = Optional.empty();
		
		Long addressId = ObjectUtils.firstNonNull(newBorrower.getAddress().getId(), newBorrower.getAddressID());
		//Long loanId = ObjectUtils.firstNonNull(property.getLoanId(), property.getLoan().getId());
		
		if (Objects.nonNull(newBorrower) && Objects.nonNull(addressId)){
			existingBorrower = borrowerRepository.findByAddressID(addressId);
		}
		
		if (existingBorrower.isPresent()) {
			BorrowerComparator comparator = new BorrowerComparator();
			if (comparator.compare(existingBorrower.get(), newBorrower) == 0) {
				return existingBorrower.get();
			}
			newBorrower.setAddress(existingBorrower.get().getAddress());
			newBorrower.setId(existingBorrower.get().getId());
			return entityManager.merge(newBorrower);
		} else {
			return borrowerRepository.save(newBorrower);
		}
		
	}
	
	@Transactional
	private Lender saveLender(Lender lender) {
		Optional<Lender> existingLender = Optional.empty();
		
		String lenderName = lender.getName();
		Long loanId = ObjectUtils.firstNonNull(lender.getLoanId(), lender.getLoan().getId());
		
		if (Objects.nonNull(lender) && Objects.nonNull(lenderName)  && Objects.nonNull(loanId)){
			existingLender = lenderRepository.findFirstByNameAndLoanIdOrderByIdDesc(lenderName, loanId);
		}
		
		if (existingLender.isPresent()) {
			LenderComparator comparator = new LenderComparator();
			if (comparator.compare(existingLender.get(), lender) == 0) {
				return existingLender.get();
			}
			lender.setLoan(existingLender.get().getLoan());
			return entityManager.merge(lender);
		} else {
			return lenderRepository.save(lender);
		}
	}

}
