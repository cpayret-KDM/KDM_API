package com.kdm.web.quartz;

import org.apache.commons.lang3.StringUtils;
import org.quartz.Job;
import org.quartz.JobDetail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class JobFactoryImpl implements JobFactory {

	private Logger logger = LoggerFactory.getLogger(JobFactoryImpl.class);
	
	private static final Long STARTUP_DELAY = 0L;
	private static final String DEFAULT_GROUP = "DAFAULT";
	
	@Autowired
	private Environment environment;
	
	@Override
	public CronTriggerFactoryBean createCronTrigger(JobDetail jobDetail, String name, String description) {
		if (StringUtils.isEmpty(name) || jobDetail == null) { 
			return null;
		}
		Assert.isTrue(!name.contains(" "), "Trigger name can't contain spaces");
		
		String jobName = jobDetail.getKey().getName();
		
		Long startupDelay = environment.getProperty("kdm.quartz." + jobName + ".startupDelay", Long.class, STARTUP_DELAY);
		String group = environment.getProperty("kdm.quartz." + jobName + ".group", String.class, DEFAULT_GROUP);
		String cronExpression = environment.getProperty("kdm.quartz." + jobName + ".cronExpression", String.class);
		if (StringUtils.isEmpty(cronExpression)) {
			throw new IllegalArgumentException(String.format("Unable to find required application property kdm.quartz.%s.cronExpression", jobName));
		}
		
		CronTriggerFactoryBean factoryBean = new CronTriggerFactoryBean();
        factoryBean.setJobDetail(jobDetail);
        factoryBean.setStartDelay(startupDelay);
        factoryBean.setGroup(group);
        factoryBean.setName(name);
        factoryBean.setDescription(StringUtils.isEmpty(description)? "" : description);
        factoryBean.setCronExpression(cronExpression);
        return factoryBean;
	}

	@Override
	public JobDetailFactoryBean createJobDetail(Class<? extends Job> jobClass, String name, String description) {
		JobDetailFactoryBean factoryBean = new JobDetailFactoryBean();
        factoryBean.setName(name);
        factoryBean.setDescription(description);
        factoryBean.setJobClass(jobClass);
        factoryBean.setDurability(true);
        return factoryBean;
	}

	@Override
	public boolean isJobEnable(String jobName) {
		String propertyKey = "kdm.quartz." + jobName + ".enable";
		
		Boolean jobEnabled = environment.getProperty(propertyKey, Boolean.class, Boolean.TRUE);
		
		if (logger.isDebugEnabled()) {
			logger.debug(String.format("Job=%s is %s", jobName, jobEnabled? "enable": "disable"));
		}
		
		return jobEnabled;
	}

}
