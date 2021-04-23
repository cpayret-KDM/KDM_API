DO $$
BEGIN
	ALTER TABLE "public"."Appraisal"
	ADD COLUMN IF NOT EXISTS "note" VARCHAR(256) COLLATE "pg_catalog"."default";
	
	CREATE OR REPLACE VIEW "AppraisalLatestByPropertyView" AS
	SELECT  "appraisalID", "propertyID", "value", "date", "note", "createdAt", "createdBy", "updatedAt", "updatedBy"
	FROM    "Appraisal" as appra
	WHERE   ROW("propertyID", "appraisalID") = ( 
	    SELECT  internal."propertyID", MAX(internal."appraisalID") as "appraisalID" 
	    FROM    "Appraisal" as internal
	    WHERE   appra."propertyID" = internal."propertyID"
	    GROUP BY internal."propertyID"
	);
END$$;