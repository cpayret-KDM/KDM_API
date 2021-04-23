DO $$
BEGIN
	
	UPDATE "public"."Address" SET street1 = '' WHERE street1 IS NULL;
	
	UPDATE "public"."Address" SET street2 = '' WHERE street2 IS NULL;
	
	UPDATE "public"."Address" SET city = '' WHERE city IS NULL;
	
	UPDATE "public"."Address" SET state = '' WHERE state IS NULL;
	
	UPDATE "public"."Address" SET zip = '' WHERE zip IS NULL;
	
	UPDATE "public"."Address" SET name = '' WHERE name IS NULL;
	
END$$;