package com.kdm.web.service;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.assertj.core.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.kdm.web.data.repository.AddressRepository;
import com.kdm.web.data.repository.LoanRatingRepository;
import com.kdm.web.data.repository.LoanRepository;
import com.kdm.web.data.repository.PropertyRepository;
import com.kdm.web.data.repository.RatingRepository;
import com.kdm.web.data.repository.SponsorRepository;
import com.kdm.web.model.Address;
import com.kdm.web.model.Loan;
import com.kdm.web.model.LoanRating;
import com.kdm.web.model.Property;
import com.kdm.web.model.Rating;
import com.kdm.web.model.Sponsor;
import com.kdm.web.model.view.RatingValue;

@Service
public class LoanServiceImpl implements LoanService {
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	EntityManager entityManager;
	
	@Autowired
	PropertyRepository propertyRepository;
	
	@Autowired
	SponsorRepository sponsorRepository;
	
	@Autowired
	AddressRepository addressRepository; 
	
	@Autowired
	LoanRepository loanRepository;
	
	@Autowired
	AddressService addressService;
	
	@Autowired
	private LoanRatingRepository loanRatingRepository;
	
	@Autowired
	private EntityUtil entityUtil;
	
	@Autowired
	private RatingRepository ratingRepository;

	@Override
	@Transactional
	public Property createProperty(Property property) {
		if (property == null) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("property object is null"), Locale.US));
		}
	
		// lets figure if the address already exists
		Optional<Address> address = addressService.getOrPersistAddress(property.getAddressID(), property.getAddress());
		if (!address.isPresent()) {
			return null;		
		}
		
		property.setAddressID(address.get().getId());
		Property savedProperty = propertyRepository.save(property); 
			
		// link the property to a loan
		if (property.getLoanId() != null) {
			Optional<Loan> loan = loanRepository.getLoanById(property.getLoanId());
			if (loan.isPresent()) {
				property.setLoan(loan.get());
				propertyRepository.save(property);
			}
		}
		
		return savedProperty; 
	}

	@Transactional
	public Property updateProperty(Property property) {
		if ((property == null) || (property.getId() == null)) {
			return null;
		}
	
		// lets figure if the address already exists
		Optional<Address> address = addressService.getOrPersistAddress(property.getAddressID(), property.getAddress());
		if (!address.isPresent()) {
			return null;		
		}
		
		property.setAddressID(address.get().getId());
		
		// link the property to a loan
		if (property.getLoanId() != null) {
			Optional<Loan> loan = loanRepository.getLoanById(property.getLoanId());
			if (loan.isPresent()) {
				property.setLoan(loan.get());
				//propertyRepository.save(property);
			}
		}
				
		return entityManager.merge(property);

	}
	
	@Override
	@Transactional
	public Sponsor createSponsor(Loan loan, Sponsor sponsor) {
		
		if (loan == null) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("loan object is null"), Locale.US));
		}
		
		if (sponsor == null) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("sponsor object is null"), Locale.US));
		}
	
		// lets figure if the address already exists
		Optional<Address> address = addressService.getOrPersistAddress(sponsor.getAddressId(), sponsor.getAddress());
		if (!address.isPresent()) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("address object is null"), Locale.US));
		}
		
		sponsor.setAddressId(address.get().getId());
		Sponsor savedSponsor = sponsorRepository.save(sponsor); 
			
		loan.setSponsor(savedSponsor);
		loanRepository.saveAndFlush(loan);
		
		return savedSponsor;
	}
	
	@Override
	@Transactional
	public Sponsor updateSponsor(Sponsor sponsor) {
		if (sponsor == null) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("sponsor object is null"), Locale.US));
		}
	
		// lets figure if the address already exists
		Optional<Address> address = addressService.getOrPersistAddress(sponsor.getAddressId(), sponsor.getAddress());
		if (!address.isPresent()) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("address object is null"), Locale.US));
		}
		
		sponsor.setAddressId(address.get().getId());
		Sponsor savedSponsor = sponsorRepository.saveAndFlush(sponsor);
		
		return savedSponsor;
	}
	
	@Override
	@Transactional
	public void deleteSponsor(Sponsor sponsor) {
		if (sponsor == null || sponsor.getId() == null) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("borrower object is null"), Locale.US));
		}
		
		//check for a loan related to this sponsor
		Optional<Loan> loanOp = loanRepository.findBySponsorID(sponsor.getId());
		
		if (loanOp.isPresent()) {
			Loan loan = loanOp.get();
			loan.setSponsor(null);
			loanRepository.save(loan);
		}
		
		sponsorRepository.delete(sponsor);	
	}
	
	@Override
	@Transactional
	public void syncRatings(Loan loan, List<RatingValue> ratings) {
		
		// list to update
		for (RatingValue ratingValue: ratings) {
			LoanRating loanRating = loanRatingRepository.findByLoanIdAndRatingId(loan.getId(), ratingValue.getRatingId());
			if (Objects.nonNull(loanRating)) {
				loanRating.setNote(ratingValue.getNote());
				loanRating.setDate(ratingValue.getDate());
			} else {
				//add rating
				Rating rating = entityUtil.tryGetEntity(Rating.class, ratingValue.getRatingId());
				
				LoanRating lnRtng = LoanRating.builder()
						.loan(loan)
						.loanId(loan.getId())
						.rating(rating)
						.ratingId(rating.getId())
						.note(ratingValue.getNote())
						.date(ratingValue.getDate())
						.build();
				
				
				lnRtng = loanRatingRepository.saveAndFlush(lnRtng);
				rating.addLoanRating(lnRtng);
				
				ratingRepository.saveAndFlush(rating);
			}
		}
	}

	
}
