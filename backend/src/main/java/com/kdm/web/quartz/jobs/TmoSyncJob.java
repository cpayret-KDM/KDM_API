package com.kdm.web.quartz.jobs;

import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;

import com.kdm.web.quartz.BaseJob;
import com.kdm.web.service.tmo.TmoSyncService;

public class TmoSyncJob extends BaseJob {
	
	@Autowired
	private TmoSyncService tmoSyncService;
	
	@Override
	public void execute() throws JobExecutionException {
		
		try {
			tmoSyncService.syncLoans();
		} catch (Exception e) {
			throw new JobExecutionException(e);
		}
		
	}

}
