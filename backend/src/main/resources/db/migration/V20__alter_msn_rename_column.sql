DO $$
BEGIN
	ALTER TABLE "public"."MSN" 
	RENAME COLUMN "tradeDate" TO "settlementDate";
	
	ALTER TABLE "public"."MSN_AUD" 
	RENAME COLUMN "tradeDate" TO "settlementDate";
END$$;