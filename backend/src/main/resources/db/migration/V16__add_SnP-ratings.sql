DO $$
BEGIN

	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'S&P', 'AAA'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'S&P' and rating = 'AAA'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'S&P', 'AA'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'S&P' and rating = 'AA'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'S&P', 'A'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'S&P' and rating = 'A'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'S&P', 'BBB'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'S&P' and rating = 'BBB'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'S&P', 'BB'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'S&P' and rating = 'BB'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'S&P', 'B'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'S&P' and rating = 'B'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'S&P', 'CCC'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'S&P' and rating = 'CCC'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'S&P', 'CC'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'S&P' and rating = 'CC'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'S&P', 'C'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'S&P' and rating = 'C'
		);
		
	INSERT INTO "public"."Rating" ("agency","rating")
	SELECT 'S&P', 'NR'
	WHERE
		NOT EXISTS (
			SELECT "agency" FROM "public"."Rating" WHERE "agency" = 'S&P' and rating = 'NR'
		);
	
END$$;