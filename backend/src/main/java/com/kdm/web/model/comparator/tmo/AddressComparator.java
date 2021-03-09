package com.kdm.web.model.comparator.tmo;

import java.util.Comparator;

import com.google.common.collect.ComparisonChain;
import com.google.common.collect.Ordering;
import com.kdm.web.model.Address;

public class AddressComparator implements Comparator<Address> {

	@Override
	public int compare(Address address1, Address address2) {
		
		return ComparisonChain.start()
			.compare(address1.getStreet1(), address2.getStreet1(), Ordering.natural().nullsFirst())
			.compare(address1.getStreet2(), address2.getStreet2(), Ordering.natural().nullsFirst())
			.compare(address1.getCity(), address2.getCity(), Ordering.natural().nullsFirst())
			.compare(address1.getState(), address2.getState(), Ordering.natural().nullsFirst())
			.compare(address1.getName(), address2.getName(), Ordering.natural().nullsFirst())
			.compare(address1.getZip(), address2.getZip(), Ordering.natural().nullsFirst())
			.result();
	}

}
