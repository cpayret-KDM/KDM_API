package com.kdm.web.model.comparator.tmo;

import java.util.Comparator;

import com.google.common.collect.ComparisonChain;
import com.google.common.collect.Ordering;
import com.kdm.web.model.Borrower;

public class BorrowerComparator implements Comparator<Borrower> {

	@Override
	public int compare(Borrower borrower1, Borrower borrower2) {
		return ComparisonChain.start()
				.compare(borrower1.getCompany(), borrower2.getCompany(), Ordering.natural().nullsFirst())
				.compare(borrower1.getEmail(), borrower2.getEmail(), Ordering.natural().nullsFirst())
				.compare(borrower1.getFirstName(), borrower2.getFirstName(), Ordering.natural().nullsFirst())
				.compare(borrower1.getLastName(), borrower2.getLastName(), Ordering.natural().nullsFirst())
				.compare(borrower1.getPhone(), borrower2.getPhone(), Ordering.natural().nullsFirst())
				.result();
	}

}
