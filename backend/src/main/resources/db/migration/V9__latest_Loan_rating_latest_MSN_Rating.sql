DO $$
BEGIN
	-- fixing an error with the ID sequence, from a previous script
	DROP TABLE IF EXISTS "public"."MSN_Rating" CASCADE;
	CREATE TABLE "public"."MSN_Rating" (
	  "msnRatingID" int4 NOT NULL DEFAULT nextval('"MSN_Rating_msnRatingID_seq"'::regclass),
	  "msnID" int4,
	  "ratingID" int4,
	  "date" timestamp(6),
	  "note" VARCHAR(256) COLLATE "pg_catalog"."default"
	);
	
	-- fixing an error with the ID sequence, from a previous script
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_msn_rating_loan'
	              )
	THEN
	    ALTER TABLE "public"."MSN_Rating" ADD CONSTRAINT "fk_msn_rating_loan" FOREIGN KEY ("msnID") REFERENCES "public"."MSN" ("msnID") ON DELETE NO ACTION ON UPDATE NO ACTION;
	END IF;
	
	-- fixing an error with the ID sequence, from a previous script
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_msn_rating_rating'
	              )
	THEN
	    ALTER TABLE "public"."MSN_Rating" ADD CONSTRAINT "fk_msn_rating_rating" FOREIGN KEY ("ratingID") REFERENCES "public"."Rating" ("ratingID") ON DELETE NO ACTION ON UPDATE NO ACTION;
	END IF;
	
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.table_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'Loan_Rating_pkey'
	              )
	THEN
		ALTER TABLE "public"."Loan_Rating" ADD CONSTRAINT "Loan_Rating_pkey" PRIMARY KEY ("loanRatingID");
	END IF;
	
	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.table_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'MSN_Rating_pkey'
	              )
	THEN
		ALTER TABLE "public"."MSN_Rating" ADD CONSTRAINT "MSN_Rating_pkey" PRIMARY KEY ("msnRatingID");
	END IF;
	
	CREATE OR REPLACE VIEW "LoanRatingLatestByLoanView" AS
	SELECT  "lnRtng"."loanRatingID", "lnRtng"."loanID", "lnRtng"."ratingID", "lnRtng"."date", "lnRtng"."note", "rtng"."agency", "rtng"."rating"
	FROM    "Loan_Rating" AS "lnRtng"
	INNER JOIN "Rating" AS "rtng" ON "lnRtng"."ratingID" = "rtng"."ratingID"
	WHERE   ROW("loanID", "agency", "date") IN ( 
	    SELECT  internal."loanID", "int_rtng"."agency", MAX(internal."date") as "date" 
	    FROM    "Loan_Rating" as internal
	    INNER JOIN "Rating" AS "int_rtng" ON "internal"."ratingID" = "int_rtng"."ratingID"
	    WHERE   "int_rtng"."ratingID" = internal."ratingID"
	    GROUP BY internal."loanID", "int_rtng"."agency"
	    );
	    
	CREATE OR REPLACE VIEW "MSNRatingLatestByMSNView" AS
	SELECT  "msnRtng"."msnRatingID", "msnRtng"."msnID", "msnRtng"."ratingID", "msnRtng"."date", "msnRtng"."note", "rtng"."agency", "rtng"."rating"
	FROM    "MSN_Rating" AS "msnRtng"
	INNER JOIN "Rating" AS "rtng" ON "msnRtng"."ratingID" = "rtng"."ratingID"
	WHERE   ROW("msnID", "agency", "date") IN ( 
	    SELECT  internal."msnID", "int_rtng"."agency", MAX(internal."date") as "date" 
	    FROM    "MSN_Rating" as internal
	    INNER JOIN "Rating" AS "int_rtng" ON "internal"."ratingID" = "int_rtng"."ratingID"
	    WHERE   "int_rtng"."ratingID" = internal."ratingID"
	    GROUP BY internal."msnID", "int_rtng"."agency"
	    );
	
END$$;