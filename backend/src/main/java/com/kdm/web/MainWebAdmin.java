package com.kdm.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(info = @Info(title = "KDM API", version = "1.0.0", description = "RESTFull API - KDM", contact = @Contact(url = "https://korthdirect.com/", name = "Korth Direct", email = "info@korthdirect.com ")))
@SpringBootApplication
public class MainWebAdmin {

	public static void main(String[] args) {
		SpringApplication.run(MainWebAdmin.class, args);

		/* The following code is used for generating the audit tables script,
		 * just do the following:
		 * - Comment out the line above (SpringApplication.run(MainWebAdmin.class, args)
		 * - Remove the comment block below
		 * - Run the application
		 * - The generate sql statements can be found in the file: db-schema.sql
		 */
		
		/*
		Map<String, String> settings = new HashMap<>();
        settings.put("connection.driver_class", "com.mysql.jdbc.Driver");
        settings.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQL9Dialect");
        settings.put("hibernate.connection.url", "jdbc:postgresql://localhost:5432/kdm");
        settings.put("hibernate.connection.username", "kdm");
        settings.put("hibernate.connection.password", "dbpassword");
        settings.put("hibernate.hbm2ddl.auto", "create");
        settings.put("hibernate.naming.physical-strategy", "org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl");
        settings.put("hibernate.globally_quoted_identifiers", "true");
        settings.put("hibernate.temp.use_jdbc_metadata_defaults", "false");
        settings.put("show_sql", "true");
 
        ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
                .applySettings(settings).build();
        
        MetadataSources metadata = new MetadataSources(serviceRegistry);        
        metadata.addAnnotatedClass(Loan.class);
        metadata.addAnnotatedClass(MSN.class);
        metadata.addAnnotatedClass(Property.class);
        metadata.addAnnotatedClass(Rating.class);
        metadata.addAnnotatedClass(Sponsor.class);
        metadata.addAnnotatedClass(Address.class);
        metadata.addAnnotatedClass(Borrower.class);
        metadata.addAnnotatedClass(LoanRating.class);
        metadata.addAnnotatedClass(Lender.class);
        metadata.addAnnotatedClass(MSNRating.class);
        metadata.addAnnotatedClass(LoanRatingLatestByLoanView.class);
        metadata.addAnnotatedClass(MSNRatingLatestByMSNView.class);
        metadata.addAnnotatedClass(Appraisal.class);
        metadata.addAnnotatedClass(LatestAppraisalView.class);
       
        

        EnumSet<TargetType> enumSet = EnumSet.of(TargetType.SCRIPT);
        
		SchemaExport schemaExport = new SchemaExport();
        schemaExport.setHaltOnError(false);
        schemaExport.setFormat(true);
        schemaExport.setDelimiter(";");
        schemaExport.setOutputFile("db-schema.sql");
        schemaExport.execute(enumSet, SchemaExport.Action.CREATE, metadata.buildMetadata());
        */
	}

}