package com.kdm.web.config;

import javax.sql.DataSource;

import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.configuration.FluentConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("flyway_testdata")
@Configuration
public class FlywayTestDataConfig {

	@Autowired
	DataSource dataSource;
	
	@Value("${spring.flyway.table}")
	String flywayTable;
	
	@Value("${spring.flyway.ignoreMissingMigrations:true}")
	boolean ignoreMissingMigrations;
	
	@Value("${spring.flyway.outOfOrder:true}")
	boolean outOfOrder;
	
	@Bean(initMethod = "migrate")
    public Flyway flyway() {
        Flyway flyway = new Flyway(fluentConfiguration());
        return flyway;
    }
	
	FluentConfiguration fluentConfiguration() {
		FluentConfiguration config = new FluentConfiguration();
		config.baselineOnMigrate(false)
			.ignoreMissingMigrations(ignoreMissingMigrations)
			.outOfOrder(outOfOrder)
			.table(flywayTable)
			.dataSource(dataSource)
			.locations("db/migration", "db/migration-testdata");
		return config;
	}
}
