package com.kdm.web.model.comparator.tmo;

import java.util.Comparator;

import com.google.common.collect.ComparisonChain;
import com.google.common.collect.Ordering;
import com.kdm.web.model.Property;

public class PropertyComparator implements Comparator<Property> {

	@Override
	public int compare(Property property1, Property property2) {
		
		return ComparisonChain.start()
			.compare(property1.getAddress().getId(), property2.getAddress().getId(), Ordering.natural().nullsFirst())
			.compare(property1.getType(), property2.getType(), Ordering.natural().nullsFirst())
			.result();
	}

}
