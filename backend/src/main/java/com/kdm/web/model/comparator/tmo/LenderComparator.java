package com.kdm.web.model.comparator.tmo;

import java.util.Comparator;

import com.google.common.collect.ComparisonChain;
import com.google.common.collect.Ordering;
import com.kdm.web.model.Lender;

public class LenderComparator implements Comparator<Lender> {

	@Override
	public int compare(Lender lender1, Lender lender2) {
		
		return ComparisonChain.start()
			.compare(lender1.getInitialAmount(), lender2.getInitialAmount(), Ordering.natural().nullsFirst())
			.compare(lender1.getLenderRate(), lender2.getLenderRate(), Ordering.natural().nullsFirst())
			.compare(lender1.getPrincipalBalance(), lender2.getPrincipalBalance(), Ordering.natural().nullsFirst())
			.result();
	}

}
