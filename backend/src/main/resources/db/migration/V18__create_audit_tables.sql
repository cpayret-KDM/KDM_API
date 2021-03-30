DO $$
BEGIN

	DROP VIEW "AppraisalLatestByPropertyView";
		
	ALTER TABLE "public"."Appraisal" ALTER COLUMN "value" TYPE numeric(12,3);
	
	CREATE OR REPLACE VIEW "AppraisalLatestByPropertyView" AS
	SELECT  "appraisalID", "propertyID", "value", "date", "note"
	FROM    "Appraisal" as appra
	WHERE   ROW("propertyID", "date") = ( 
	    SELECT  internal."propertyID", MAX(internal."date") as "date" 
	    FROM    "Appraisal" as internal
	    WHERE   appra."propertyID" = internal."propertyID"
	    GROUP BY internal."propertyID"
	    );
	
	DROP TABLE IF EXISTS "public"."Address_AUD";
	create table "public"."Address_AUD" (
       "addressID" int8 not null,
        "REV" int4 not null,
        "REVTYPE" int2,
        "city" varchar(255),
        "createdAt" timestamp,
        "createdBy" varchar(255),
        "name" varchar(255),
        "state" varchar(255),
        "street1" varchar(255),
        "street2" varchar(255),
        "updatedAt" timestamp,
        "updatedBy" varchar(255),
        "zip" varchar(255),
        primary key ("addressID", "REV")
    );


    DROP TABLE IF EXISTS "public"."Appraisal_AUD";
    create table "public"."Appraisal_AUD" (
       "appraisalID" int8 not null,
        "REV" int4 not null,
        "REVTYPE" int2,
        "createdAt" timestamp,
        "createdBy" varchar(255),
        "date" timestamp,
        "note" varchar(255),
        "propertyID" int8,
        "updatedAt" timestamp,
        "updatedBy" varchar(255),
        "value" numeric(12, 2),
        primary key ("appraisalID", "REV")
    );

  
	DROP TABLE IF EXISTS "public"."Borrower_AUD";
    create table "public"."Borrower_AUD" (
       "borrowerId" int8 not null,
        "REV" int4 not null,
        "REVTYPE" int2,
        "addressId" int8,
        "Company" varchar(256),
        "createdAt" timestamp,
        "createdBy" varchar(255),
        "email" varchar(256),
        "firstName" varchar(256),
        "lastName" varchar(256),
        "phone" varchar(256),
        "updatedAt" timestamp,
        "updatedBy" varchar(255),
        primary key ("borrowerId", "REV")
    );

   
	DROP TABLE IF EXISTS "public"."Lender_AUD";
    create table "public"."Lender_AUD" (
       "lenderID" int8 not null,
        "REV" int4 not null,
        "REVTYPE" int2,
        "initialAmount" numeric(12, 2),
        "lenderRate" numeric(6, 3),
        "loanID" int8,
        "name" varchar(256),
        "principalBalance" numeric(12, 2),
        primary key ("lenderID", "REV")
    );

    DROP TABLE IF EXISTS "public"."Loan_AUD";
    create table "public"."Loan_AUD" (
       "loanID" int8 not null,
        "REV" int4 not null,
        "REVTYPE" int2,
        "createdAt" timestamp,
        "createdBy" varchar(255),
        "dealName" varchar(256),
        "initialAmount" numeric(12, 2),
        "KDMRating" varchar(255),
        "loanNumber" varchar(16),
        "loanRate" numeric(6, 3),
        "loanStatus" varchar(255),
        "loanTermMonths" int8,
        "LTV" numeric(5, 2),
        "maturityDate" timestamp,
        "memoURL" varchar(256),
        "msnID" int8,
        "originationDate" timestamp,
        "pipelineStatus" varchar(255),
        "prepayMonths" int8,
        "principalBalance" numeric(12, 2),
        "sponsorID" int8,
        "tradeDate" timestamp,
        "updatedAt" timestamp,
        "updatedBy" varchar(255),
        primary key ("loanID", "REV")
    );

    DROP TABLE IF EXISTS "public"."Property_AUD";
    create table "public"."Property_AUD" (
       "propertyID" int8 not null,
        "REV" int4 not null,
        "REVTYPE" int2,
        "addressID" int8,
        "borrowerID" int8,
        "createdAt" timestamp,
        "createdBy" varchar(255),
        "loanID" int8,
        "type" varchar(255),
        "updatedAt" timestamp,
        "updatedBy" varchar(255),
        primary key ("propertyID", "REV")
    );

    DROP TABLE IF EXISTS "public"."Rating_AUD";
    create table "public"."Rating_AUD" (
       "ratingID" int8 not null,
        "REV" int4 not null,
        "REVTYPE" int2,
        "agency" varchar(256),
        "createdAt" timestamp,
        "createdBy" varchar(255),
        "rating" varchar(8),
        "updatedAt" timestamp,
        "updatedBy" varchar(255),
        primary key ("ratingID", "REV")
    );

    DROP TABLE IF EXISTS "public"."Sponsor_AUD";
    create table "public"."Sponsor_AUD" (
       "sponsorID" int8 not null,
        "REV" int4 not null,
        "REVTYPE" int2,
        "addressId" int8,
        "Company" varchar(255),
        "createdAt" timestamp,
        "createdBy" varchar(255),
        "email" varchar(255),
        "firstName" varchar(255),
        "lastName" varchar(255),
        "phone" varchar(255),
        "registrationState" varchar(255),
        "updatedAt" timestamp,
        "updatedBy" varchar(255),
        primary key ("sponsorID", "REV")
    );

	create sequence "hibernate_sequence" start 1 increment 1;

   
	DROP TABLE IF EXISTS "public"."MSN_AUD";
    create table "public"."MSN_AUD" (
       "msnID" int8 not null,
        "REV" int4 not null,
        "REVTYPE" int2,
        "createdAt" timestamp,
        "createdBy" varchar(255),
        "cusip" varchar(256),
        "maturityDate" timestamp,
        "noteRate" numeric(6, 3),
        "number" varchar(256),
        "tradeDate" timestamp,
        "updatedAt" timestamp,
        "updatedBy" varchar(255),
        primary key ("msnID", "REV")
    );

    DROP TABLE IF EXISTS "public"."REVINFO";
    create table "public"."REVINFO" (
       "REV" int4 not null,
        "REVTSTMP" int8,
        primary key ("REV")
    );

    IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_address_aud_rev'
	              )
	THEN
	    alter table "public"."Address_AUD" 
	       add constraint "fk_address_aud_rev" 
	       foreign key ("REV") 
	       references "REVINFO";
    END IF;

    IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_appraisal_aud_rev'
	              )
	THEN
	    alter table "public"."Appraisal_AUD" 
	       add constraint "fk_appraisal_aud_rev" 
	       foreign key ("REV") 
	       references "REVINFO";
	END IF;
	
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_borrower_aud_rev'
	              )
	THEN
	    alter table "public"."Borrower_AUD" 
	       add constraint "fk_borrower_aud_rev" 
	       foreign key ("REV") 
	       references "REVINFO";
	END IF;
	
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_lender_aud_rev'
	              )
	THEN
	    alter table "public"."Lender_AUD" 
	       add constraint "fk_lender_aud_rev" 
	       foreign key ("REV") 
	       references "REVINFO";
	END IF;
	
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_loan_aud_rev'
	              )
	THEN
	    alter table "public"."Loan_AUD" 
	       add constraint "fk_loan_aud_rev" 
	       foreign key ("REV") 
	       references "REVINFO";
	END IF;
	
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_property_aud_rev'
	              )
	THEN
	    alter table "public"."Property_AUD" 
	       add constraint "fk_property_aud_rev" 
	       foreign key ("REV") 
	       references "REVINFO";
	END IF;
	
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_rating_aud_rev'
	              )
	THEN
	    alter table "public"."Rating_AUD" 
	       add constraint "fk_rating_aud_rev" 
	       foreign key ("REV") 
	       references "REVINFO";
	END IF;
	
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_sponsor_aud_rev'
	              )
	THEN
	    alter table "public"."Sponsor_AUD" 
	       add constraint "fk_sponsor_aud_rev" 
	       foreign key ("REV") 
	       references "REVINFO";
	END IF;
	
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_msn_aud_rev'
	              )
	THEN
	    alter table "MSN_AUD" 
	       add constraint "fk_msn_aud_rev" 
	       foreign key ("REV") 
	       references "REVINFO";
	END IF;
	
END$$;