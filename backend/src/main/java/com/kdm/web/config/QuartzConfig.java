package com.kdm.web.config;

import org.quartz.JobDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;

import com.kdm.web.quartz.JobFactory;
import com.kdm.web.quartz.jobs.TmoSyncJob;

@Configuration
public class QuartzConfig {

	@Autowired
	private JobFactory jobFactory;
	
	/*
	 * The job name parameter is very important, because it is used to search for configuration properties, like the following:
	 * kdm:
	 *   quartz:
	 *    tmoSyncJob:
	 *      enable: true
	 *      cronExpression:  0 * * ? * * * 
	 * 
	 * the main properties are:
	 * kdm.quartz.tmoSyncJob.enable				indicates if the job is enable or not, it the value do not exist them the job is enable
	 * kdm.quartz.tmoSyncJob.cronExpression:		cron expression for setting the intervals the job is going to be executed
	 */
	@Bean(name = "tmoSyncJob")
	public JobDetailFactoryBean tmoSyncJob() {
        return jobFactory.createJobDetail(TmoSyncJob.class, "tmoSyncJob", "TMO sync job for all Loan information");
    }
	
    @Bean(name = "tmoSyncJobTrigger")
    public CronTriggerFactoryBean sampleJobTrigger(@Qualifier("tmoSyncJob") JobDetail jobDetail) {
        return jobFactory.createCronTrigger(jobDetail, "tmoSyncJobTrigger", "Cron Trigger for TMO Sync Job");
    }

	
}
