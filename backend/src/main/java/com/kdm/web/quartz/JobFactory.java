package com.kdm.web.quartz;

import org.quartz.Job;
import org.quartz.JobDetail;
import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;

public interface JobFactory {

	public CronTriggerFactoryBean createCronTrigger(JobDetail jobDetail, String name, String description);
	
	public JobDetailFactoryBean createJobDetail(Class<? extends Job> jobClass, String name, String description);
	
	/**
	 * find out if the job is enable or not
	 */
	public boolean isJobEnable(String name);
}
