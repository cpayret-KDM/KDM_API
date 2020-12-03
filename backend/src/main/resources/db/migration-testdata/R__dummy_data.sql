DO $$
BEGIN
	
	INSERT INTO "public"."Sponsor" ("addressId", "Company", "firstName", "lastName", "phone", "email", "registrationState") 
	SELECT 1, 'Codingscape-BackEnd', 'Diego', 'Bolanos', '+506 8817-6566', 'diego@codingscape.com', 'UT'
	WHERE 
		NOT EXISTS (
			SELECT email FROM "public"."Sponsor" WHERE email = 'diego@codingscape.com'
		);
		
	INSERT INTO "public"."Sponsor" ("addressId", "Company", "firstName", "lastName", "phone", "email", "registrationState")
	SELECT 1, 'Codingscape-FrontEnd', 'Jen', 'Wilhelm', '+1 555 777-7777', 'jen@codingscape.com', 'AK'
	WHERE 
		NOT EXISTS (
			SELECT email FROM "public"."Sponsor" WHERE email = 'jen@codingscape.com'
		);
		
	INSERT INTO "public"."Sponsor" ("addressId", "Company", "firstName", "lastName", "phone", "email", "registrationState") 
	SELECT 1, 'Codingscape-Manager', 'Jimmy', 'Jacobson', '+1 555 777-8888', 'jimmy@codingscape.com', 'HI'
	WHERE 
		NOT EXISTS (
			SELECT email FROM "public"."Sponsor" WHERE email = 'jimmy@codingscape.com'
		);
		
	INSERT INTO "public"."Sponsor" ("addressId", "Company", "firstName", "lastName", "phone", "email", "registrationState") 
	SELECT 1, 'Codingscape-FullStack', 'Rich', 'Hoppes', '+1 555 777-9999', 'rich@codingscape.com', 'FL'
	WHERE 
		NOT EXISTS (
			SELECT email FROM "public"."Sponsor" WHERE email = 'rich@codingscape.com'
		);
END$$;