package com.kdm.web.quartz;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class BaseJob implements Job {

	private Logger logger = LoggerFactory.getLogger(BaseJob.class);

	@Autowired
	private JobFactory jobFactory;
	
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		// is job enabled?
		String jobName = context.getJobDetail().getKey().getName();
		boolean jobEnabled = jobFactory.isJobEnable(jobName);
		
		if (jobEnabled) {
			if (logger.isDebugEnabled()) {
				logger.debug(String.format("Job %s started", jobName));
			}
			executeInternal(jobName);
			if (logger.isDebugEnabled()) {
				logger.debug(String.format("Job %s ended", jobName));
			}
		}
	}
	
	private void executeInternal(String jobName) throws JobExecutionException {
		try {
			
			this.execute();
			
		} catch (Exception e) {
			logger.error(String.format("Job=%s,Exception=%s", jobName, e.getMessage()), e);
			throw new JobExecutionException(e);
		}
	}
	
	public abstract void execute() throws JobExecutionException;
}
