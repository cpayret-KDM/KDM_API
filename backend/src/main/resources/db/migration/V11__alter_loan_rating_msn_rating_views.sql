DO $$
BEGIN
	CREATE OR REPLACE VIEW "LoanRatingLatestByLoanView" AS
	SELECT  "lnRtng"."loanRatingID", "lnRtng"."loanID", "rtng"."ratingID", "lnRtng"."date", "lnRtng"."note", "rtng"."agency", "rtng"."rating"
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
	SELECT  "msnRtng"."msnRatingID", "msnRtng"."msnID", "rtng"."ratingID", "msnRtng"."date", "msnRtng"."note", "rtng"."agency", "rtng"."rating"
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