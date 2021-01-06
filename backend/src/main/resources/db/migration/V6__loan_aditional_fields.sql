DO $$
BEGIN
	ALTER TABLE "public"."Loan"
	ADD COLUMN IF NOT EXISTS "prepayMonths" int4;
	
	ALTER TABLE "public"."Loan"
	ADD COLUMN IF NOT EXISTS "loanTermMonths" int4;
	
	ALTER TABLE "public"."Loan"
	ADD COLUMN IF NOT EXISTS "principalBalance" numeric(12,2);
END$$;