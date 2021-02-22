package com.kdm.web.service;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.assertj.core.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.kdm.web.data.repository.LoanRepository;
import com.kdm.web.data.repository.MSNRatingRepository;
import com.kdm.web.data.repository.RatingRepository;
import com.kdm.web.model.Loan;
import com.kdm.web.model.MSN;
import com.kdm.web.model.MSNRating;
import com.kdm.web.model.Rating;
import com.kdm.web.model.view.RatingValue;

@Service
public class MSNServiceImpl implements MSNService {

	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private LoanRepository loanRepository;
	
	@Autowired
	private EntityUtil entityUtil;
	
	@Autowired
	private MSNRatingRepository msnRatingRepository;
	
	@Autowired
	private RatingRepository ratingRepository;
	
	@Override
	@Transactional
	public void syncLoans(MSN msn, List<Long> loanIds) {
		if (msn == null) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("msn object is null"), Locale.US));
		}
		
		//list of current loans for the MSN
		List<Loan> loans = loanRepository.findByMsnId(msn.getId());
		
		//list of loans to remove from MSN realtionship
		List<Loan> toRemove = loans.stream()
				.filter( loan -> !loanIds.contains(loan.getId()))
				.collect(Collectors.toList());
		
		for (Loan loan: toRemove) {
			loan.setMsn(null);
			loanRepository.save(loan);
		}
		
		//list of loans to add
		List<Long> currentLoanIds = loans.stream().map(Loan::getId).collect(Collectors.toList());
		List<Long> loanIdsToAdd = loanIds.stream()
				.filter( loanId -> !currentLoanIds.contains(loanId))
				.collect(Collectors.toList());
		
		for (Long loanID: loanIdsToAdd) {
			Loan loan = entityUtil.tryGetEntity(Loan.class, loanID);
			loan.setMsn(msn);
			loanRepository.save(loan);
		}
	}
	
	@Override
	@Transactional
	public void syncRatings(MSN msn, List<RatingValue> ratings) {
		
		// list to update
		for (RatingValue ratingValue: ratings) {
			//add rating
			Rating rating = entityUtil.tryGetEntity(Rating.class, ratingValue.getRatingId());
			
			MSNRating msnRtng = MSNRating.builder()
					.msn(msn)
					.msnId(msn.getId())
					.rating(rating)
					.ratingId(rating.getId())
					.note(ratingValue.getNote())
					.date(ratingValue.getDate())
					.build();
			
			
			msnRtng = msnRatingRepository.saveAndFlush(msnRtng);
			rating.addMSNRating(msnRtng);
			
			ratingRepository.saveAndFlush(rating);
		}
	}

}
