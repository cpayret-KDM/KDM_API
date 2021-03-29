DO $$
BEGIN
	
	UPDATE "public"."Rating" 
	SET "agency" = 'EJ', "createdAt" = NOW(), "updatedAt" = NOW(), "createdBy" = 'SYSTEM', "updatedBy" = 'SYSTEM'
	WHERE "agency" = 'S&P';

	INSERT INTO "public"."Rating" ("agency","rating", "createdAt", "updatedAt", "createdBy", "updatedBy")
	SELECT 'KDM', 'AAA', NOW(), NOW(), 'SYSTEM', 'SYSTEM'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'KDM' and rating = 'AAA'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating", "createdAt", "updatedAt", "createdBy", "updatedBy")
	SELECT 'KDM', 'AA', NOW(), NOW(), 'SYSTEM', 'SYSTEM'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'KDM' and rating = 'AA'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating", "createdAt", "updatedAt", "createdBy", "updatedBy")
	SELECT 'KDM', 'A', NOW(), NOW(), 'SYSTEM', 'SYSTEM'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'KDM' and rating = 'A'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating", "createdAt", "updatedAt", "createdBy", "updatedBy")
	SELECT 'KDM', 'BBB', NOW(), NOW(), 'SYSTEM', 'SYSTEM'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'KDM' and rating = 'BBB'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating", "createdAt", "updatedAt", "createdBy", "updatedBy")
	SELECT 'KDM', 'BB', NOW(), NOW(), 'SYSTEM', 'SYSTEM'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'KDM' and rating = 'BB'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating", "createdAt", "updatedAt", "createdBy", "updatedBy")
	SELECT 'KDM', 'B', NOW(), NOW(), 'SYSTEM', 'SYSTEM'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'KDM' and rating = 'B'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating", "createdAt", "updatedAt", "createdBy", "updatedBy")
	SELECT 'KDM', 'CCC', NOW(), NOW(), 'SYSTEM', 'SYSTEM'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'KDM' and rating = 'CCC'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating", "createdAt", "updatedAt", "createdBy", "updatedBy")
	SELECT 'KDM', 'CC', NOW(), NOW(), 'SYSTEM', 'SYSTEM'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'KDM' and rating = 'CC'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating", "createdAt", "updatedAt", "createdBy", "updatedBy")
	SELECT 'KDM', 'C', NOW(), NOW(), 'SYSTEM', 'SYSTEM'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'KDM' and rating = 'C'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating", "createdAt", "updatedAt", "createdBy", "updatedBy")
	SELECT 'KDM', 'NR', NOW(), NOW(), 'SYSTEM', 'SYSTEM'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'KDM' and rating = 'NR'
		);
	
END$$;