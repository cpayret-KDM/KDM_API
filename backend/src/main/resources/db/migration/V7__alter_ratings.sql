DO $$
BEGIN
	ALTER TABLE "public"."Rating" 
	DROP COLUMN IF EXISTS "msnID";
	
	ALTER TABLE "public"."Rating" 
	DROP COLUMN IF EXISTS "date";
	
	DROP SEQUENCE IF EXISTS "public"."Loan_Rating_loanRatingID_seq" CASCADE;
	CREATE SEQUENCE "public"."Loan_Rating_loanRatingID_seq" 
	INCREMENT 1
	MINVALUE  1
	MAXVALUE 2147483647
	START 1000000
	CACHE 1;
	
	DROP SEQUENCE IF EXISTS "public"."MSN_Rating_msnRatingID_seq" CASCADE;
	CREATE SEQUENCE "public"."MSN_Rating_msnRatingID_seq" 
	INCREMENT 1
	MINVALUE  1
	MAXVALUE 2147483647
	START 1000000
	CACHE 1;
	
	-- ----------------------------
	-- Table  Loan Rating
	-- ----------------------------
	DROP TABLE IF EXISTS "public"."Loan_Rating";
	CREATE TABLE "public"."Loan_Rating" (
	  "loanRatingID" int4 NOT NULL DEFAULT nextval('"Loan_Rating_loanRatingID_seq"'::regclass),
	  "loanID" int4,
	  "ratingID" int4,
	  "date" timestamp(6),
	  "note" VARCHAR(256) COLLATE "pg_catalog"."default"
	);

	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_loan_rating_loan'
	              )
	THEN
	    ALTER TABLE "public"."Loan_Rating" ADD CONSTRAINT "fk_loan_rating_loan" FOREIGN KEY ("loanID") REFERENCES "public"."Loan" ("loanID") ON DELETE NO ACTION ON UPDATE NO ACTION;
	END IF;
	
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_loan_rating_rating'
	              )
	THEN
	    ALTER TABLE "public"."Loan_Rating" ADD CONSTRAINT "fk_loan_rating_rating" FOREIGN KEY ("ratingID") REFERENCES "public"."Rating" ("ratingID") ON DELETE NO ACTION ON UPDATE NO ACTION;
	END IF;
	
	-- ----------------------------
	-- Table  Loan Rating
	-- ----------------------------
	
	DROP TABLE IF EXISTS "public"."MSN_Rating" CASCADE;
	CREATE TABLE "public"."MSN_Rating" (
	  "msnRatingID" int4 NOT NULL DEFAULT nextval('"Loan_Rating_loanRatingID_seq"'::regclass),
	  "msnID" int4,
	  "ratingID" int4,
	  "date" timestamp(6),
	  "note" VARCHAR(256) COLLATE "pg_catalog"."default"
	);
	
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_msn_rating_loan'
	              )
	THEN
	    ALTER TABLE "public"."MSN_Rating" ADD CONSTRAINT "fk_msn_rating_loan" FOREIGN KEY ("msnID") REFERENCES "public"."MSN" ("msnID") ON DELETE NO ACTION ON UPDATE NO ACTION;
	END IF;
	
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_msn_rating_rating'
	              )
	THEN
	    ALTER TABLE "public"."MSN_Rating" ADD CONSTRAINT "fk_msn_rating_rating" FOREIGN KEY ("ratingID") REFERENCES "public"."Rating" ("ratingID") ON DELETE NO ACTION ON UPDATE NO ACTION;
	END IF;
	
END$$;