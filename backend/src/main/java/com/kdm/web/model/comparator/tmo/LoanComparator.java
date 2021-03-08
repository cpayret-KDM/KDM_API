package com.kdm.web.model.comparator.tmo;

import java.util.Comparator;

import com.google.common.collect.ComparisonChain;
import com.google.common.collect.Ordering;
import com.kdm.web.model.Loan;

public class LoanComparator implements Comparator<Loan> {

	@Override
	public int compare(Loan loan1, Loan loan2) {
		
		return ComparisonChain.start()
			.compare(loan1.getInitialAmount(), loan2.getInitialAmount(), Ordering.natural().nullsFirst())
			.compare(loan1.getLoanRate(), loan2.getLoanRate(), Ordering.natural().nullsFirst())
			.compare(loan1.getLtv(), loan2.getLtv(), Ordering.natural().nullsFirst())
			.compare(loan1.getMaturityDate(), loan2.getMaturityDate(), Ordering.natural().nullsFirst())
			.compare(loan1.getPrincipalBalance(), loan2.getPrincipalBalance(), Ordering.natural().nullsFirst())
			.compare(loan1.getOriginationDate(), loan2.getOriginationDate(), Ordering.natural().nullsFirst())
			.compare(loan1.getLoanTermMonths(), loan2.getLoanTermMonths(), Ordering.natural().nullsFirst())
			.compare(loan1.getPrepayMonths(), loan2.getPrepayMonths(), Ordering.natural().nullsFirst())
			.compare(loan1.getDealName(), loan2.getDealName(), Ordering.natural().nullsFirst())
			.result();
	}

}
