DO $$
BEGIN
	ALTER TABLE "public"."Loan"
	ALTER COLUMN "KDMRating" TYPE VARCHAR(256) COLLATE "pg_catalog"."default";
	
	UPDATE "public"."Loan"
	SET "KDMRating" = NULL;
	
	ALTER TABLE "public"."Address"
	ADD COLUMN IF NOT EXISTS "name" VARCHAR(256);
END$$;