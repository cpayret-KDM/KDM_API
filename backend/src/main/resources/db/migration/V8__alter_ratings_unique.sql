DO $$
BEGIN
	ALTER TABLE "public"."Rating" 
	DROP CONSTRAINT IF EXISTS "unq_agncy_rtng";
	
	ALTER TABLE "public"."Rating" 
	ADD CONSTRAINT unq_agncy_rtng UNIQUE(agency,rating);
	
END$$;