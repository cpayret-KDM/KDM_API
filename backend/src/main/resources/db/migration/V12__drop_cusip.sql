DO $$
BEGIN
	ALTER TABLE "public"."MSN"
        ADD COLUMN IF NOT EXISTS "cusip" varchar(256) COLLATE "pg_catalog"."default";
        
    UPDATE "public"."MSN"
    SET "cusip" = subquery.ticker
    FROM (
    	SELECT "cusipID", ticker
    	FROM "public"."CUSIP" 
    	) AS subquery
    WHERE "public"."MSN"."cusipID" = subquery."cusipID";

    ALTER TABLE "public"."MSN"
    	DROP CONSTRAINT IF EXISTS "fk_msn_cusip";
    
    DROP TABLE IF EXISTS "public"."CUSIP";
    	
    DROP SEQUENCE IF EXISTS "public"."CUSIP_cusipID_seq";
    
    ALTER TABLE "public"."MSN"
        DROP COLUMN IF EXISTS "cusipID";

END$$;