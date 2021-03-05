package com.kdm.web.model.comparator.tmo;

import java.util.Comparator;

import com.kdm.web.model.Appraisal;

public class AppraisalComparator implements Comparator<Appraisal> {

	@Override
	public int compare(Appraisal appraisal1, Appraisal appraisal2) {
		
		return Comparator.comparing(Appraisal::getValue).compare(appraisal1, appraisal2);
	}

}
