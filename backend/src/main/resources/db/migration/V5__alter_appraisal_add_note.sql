DO $$
BEGIN
	ALTER TABLE "public"."Appraisal"
	ADD COLUMN IF NOT EXISTS "note" VARCHAR(256) COLLATE "pg_catalog"."default";
	
	CREATE OR REPLACE VIEW "AppraisalLatestByPropertyView" AS
	SELECT  "appraisalID", "propertyID", "value", "date", "note"
	FROM    "Appraisal" as appra
	WHERE   ROW("propertyID", "date") = ( 
	    SELECT  internal."propertyID", MAX(internal."date") as "date" 
	    FROM    "Appraisal" as internal
	    WHERE   appra."propertyID" = internal."propertyID"
	    GROUP BY internal."propertyID"
	    );
END$$;