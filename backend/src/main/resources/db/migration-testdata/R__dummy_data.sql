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
		
	INSERT INTO "public"."Address" ("street1", "street2", "city", "state", "zip", "name")
	SELECT '4771 78th Avenue', NULL, 'Miami', 'fl', '33101'
	WHERE
		NOT EXISTS (
			SELECT street1 FROM "public"."Address" WHERE street1 = '4771 78th Avenue'
		);
		
	INSERT INTO "public"."Address" ("street1", "street2", "city", "state", "zip", "name")
	SELECT '14120 Palm Street', NULL, 'Miami', 'fl', '33101'
	WHERE
		NOT EXISTS (
			SELECT street1 FROM "public"."Address" WHERE street1 = '14120 Palm Street'
		);
	
	INSERT INTO "public"."Address" ("street1", "street2", "city", "state", "zip", "name")
	SELECT '8440 Grand Canal Dr', NULL, 'Miami', 'fl', '33101'
	WHERE
		NOT EXISTS (
			SELECT street1 FROM "public"."Address" WHERE street1 = '8440 Grand Canal Dr'
		);
		
	INSERT INTO "public"."Appraisal" ("propertyID", "value", "date")
	SELECT 1, 960000.00, '2020-10-27 13:34:30'
	WHERE
		NOT EXISTS (
			SELECT "propertyID" FROM "public"."Appraisal" WHERE "propertyID" = 1
		);
		
	INSERT INTO "public"."Appraisal" ("propertyID", "value", "date")
	SELECT 2, 960000.00, '2020-10-27 13:35:03'
	WHERE
		NOT EXISTS (
			SELECT "propertyID" FROM "public"."Appraisal" WHERE "propertyID" = 2
		);
		
	INSERT INTO "public"."Appraisal" ("propertyID", "value", "date")
	SELECT 3, 1605000.00, '2020-10-27 13:56:37'
	WHERE
		NOT EXISTS (
			SELECT "propertyID" FROM "public"."Appraisal" WHERE "propertyID" = 3
		);
		
	INSERT INTO "public"."Borrower" ("addressId", "Company", "firstName", "lastName", "phone", "email")
	SELECT NULL, '4771 78th Avenue LLC', NULL, NULL, NULL, NULL
	WHERE
		NOT EXISTS (
			SELECT "Company" FROM "public"."Borrower" WHERE "Company" = '4771 78th Avenue LLC'
		);
		
	INSERT INTO "public"."Borrower" ("addressId", "Company", "firstName", "lastName", "phone", "email")
	SELECT NULL, '14120 Palm Street LLC', NULL, NULL, NULL, NULL
	WHERE
		NOT EXISTS (
			SELECT "Company" FROM "public"."Borrower" WHERE "Company" = '14120 Palm Street LLC'
		);
		
	INSERT INTO "public"."Borrower" ("addressId", "Company", "firstName", "lastName", "phone", "email")
	SELECT NULL, '8400 Grand Canal Dr LLC', NULL, NULL, NULL, NULL
	WHERE
		NOT EXISTS (
			SELECT "Company" FROM "public"."Borrower" WHERE "Company" = '8400 Grand Canal Dr LLC'
		);
		
	INSERT INTO "public"."CUSIP" ("crossID", "class", "type", "ticker")
	SELECT NULL, 'AI', NULL, '50067AAC6'
	WHERE
		NOT EXISTS (
			SELECT "ticker" FROM "public"."Borrower" WHERE "ticker" = '50067AAC6'
		);
		
	INSERT INTO "public"."CUSIP" ("crossID", "class", "type", "ticker")
	SELECT NULL, 'AI', NULL, '50067AAD4'
	WHERE
		NOT EXISTS (
			SELECT "ticker" FROM "public"."Borrower" WHERE "ticker" = '50067AAD4'
		);
		
	INSERT INTO "public"."Loan" ("sponsorID", "msnID", "loanNumber", "dealName", "originationDate", "maturityDate", "tradeDate", "loanStatus", "initialAmount", "pipelineStatus", "LTV", "memoURL", "loanRate")
	SELECT NULL, 1, 'KDM2017-L001', NULL, NULL, '2027-05-01 00:00:01', NULL, 'PERFORMING', 1059000.00, 'CLOSED', 53.70, NULL, 5.25
	WHERE
		NOT EXISTS (
			SELECT "loanNumber" FROM "public"."Loan" WHERE "loanNumber" = 'KDM2017-L001'
		);
		
	INSERT INTO "public"."Loan" ("sponsorID", "msnID", "loanNumber", "dealName", "originationDate", "maturityDate", "tradeDate", "loanStatus", "initialAmount", "pipelineStatus", "LTV", "memoURL", "loanRate")
	SELECT NULL, NULL, 'KDM2017-L002', NULL, NULL, '2020-12-21 00:00:01', NULL, 'PERFORMING', 950000.00, 'CLOSED', 59.19, NULL, 6.50
	WHERE
		NOT EXISTS (
			SELECT "loanNumber" FROM "public"."Loan" WHERE "loanNumber" = 'KDM2017-L002'
		);
		
	INSERT INTO "public"."MSN" ("cusipID", "number", "tradeDate", "maturityDate", "noteRate")
	SELECT 1, 'KDM2017-N001', NULL, '2017-05-01 00:00:00', 5.00
	WHERE
		NOT EXISTS (
			SELECT "number" FROM "public"."MSN" WHERE "number" = 'KDM2017-N001'
		);
	
	INSERT INTO "public"."MSN" ("cusipID", "number", "tradeDate", "maturityDate", "noteRate")
	SELECT 1, 'KDM2017-N002', NULL, '2020-12-21 00:00:01', 6.00
	WHERE
		NOT EXISTS (
			SELECT "number" FROM "public"."MSN" WHERE "number" = 'KDM2017-N002'
		);
		
	INSERT INTO "public"."Property" ("addressID", "loanID", "borrowerID", "type")
	SELECT 1, 1, 1, 'multi-family'
	WHERE
		NOT EXISTS (
			SELECT "addressID" FROM "public"."Property" WHERE "addressID" = 1
		);
	
	INSERT INTO "public"."Property" ("addressID", "loanID", "borrowerID", "type")
	SELECT 2, 1, 1, 'multi-family'
	WHERE
		NOT EXISTS (
			SELECT "addressID" FROM "public"."Property" WHERE "addressID" = 2
		);
		
	INSERT INTO "public"."Property" ("addressID", "loanID", "borrowerID", "type")
	SELECT 3, 2, 1, 'multi-family'
	WHERE
		NOT EXISTS (
			SELECT "addressID" FROM "public"."Property" WHERE "addressID" = 3
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'EJ', 'A+'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'EJ' and rating = 'A+'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'EJ', 'A'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'EJ' and rating = 'A'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'EJ', 'A-'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'EJ' and rating = 'A-'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'JPMorgan', 'A+'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'C21' and rating = 'A+'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'JPMorgan', 'A'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'C21' and rating = 'A'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'EJ', 'A-'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'C21' and rating = 'A-'
		);
END$$;
