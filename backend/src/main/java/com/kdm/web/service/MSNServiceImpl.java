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
import com.kdm.web.model.Loan;
import com.kdm.web.model.MSN;

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

}
