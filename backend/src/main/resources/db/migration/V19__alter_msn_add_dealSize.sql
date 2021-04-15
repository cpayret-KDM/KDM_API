DO $$
BEGIN
	ALTER TABLE "public"."MSN"
	ADD COLUMN IF NOT EXISTS "dealSize" numeric(12,2);
	
	ALTER TABLE "public"."MSN_AUD"
	ADD COLUMN IF NOT EXISTS "dealSize" numeric(12,2);
END$$;