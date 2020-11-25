DO $$
BEGIN
	ALTER TABLE "public"."Loan"
	ADD COLUMN IF NOT EXISTS "KDMRating" numeric(5,2);
	
	UPDATE "public"."Property"
	SET "type" = 'MULTI_FAMILY'
	WHERE "type" = 'multi-family';
END$$;