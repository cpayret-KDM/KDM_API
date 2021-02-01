DO $$
BEGIN
	-- Address fields
    ALTER TABLE "public"."Address"
        ADD COLUMN IF NOT EXISTS "createdAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "updatedAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "createdBy" varchar(256) COLLATE "pg_catalog"."default",
        ADD COLUMN IF NOT EXISTS "updatedBy" varchar(256) COLLATE "pg_catalog"."default";

    -- Appraisal fields
    ALTER TABLE "public"."Appraisal"
        ADD COLUMN IF NOT EXISTS "createdAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "updatedAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "createdBy" varchar(256) COLLATE "pg_catalog"."default",
        ADD COLUMN IF NOT EXISTS "updatedBy" varchar(256) COLLATE "pg_catalog"."default";

    -- Borrower fields
    ALTER TABLE "public"."Borrower"
        ADD COLUMN IF NOT EXISTS "createdAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "updatedAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "createdBy" varchar(256) COLLATE "pg_catalog"."default",
        ADD COLUMN IF NOT EXISTS "updatedBy" varchar(256) COLLATE "pg_catalog"."default";

    -- Property fields
    ALTER TABLE "public"."Property"
        ADD COLUMN IF NOT EXISTS "createdAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "updatedAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "createdBy" varchar(256) COLLATE "pg_catalog"."default",
        ADD COLUMN IF NOT EXISTS "updatedBy" varchar(256) COLLATE "pg_catalog"."default";

    -- CUSIP fields
    ALTER TABLE "public"."CUSIP"
        ADD COLUMN IF NOT EXISTS "createdAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "updatedAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "createdBy" varchar(256) COLLATE "pg_catalog"."default",
        ADD COLUMN IF NOT EXISTS "updatedBy" varchar(256) COLLATE "pg_catalog"."default";

    -- Loan fields
    ALTER TABLE "public"."Loan"
        ADD COLUMN IF NOT EXISTS "createdAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "updatedAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "createdBy" varchar(256) COLLATE "pg_catalog"."default",
        ADD COLUMN IF NOT EXISTS "updatedBy" varchar(256) COLLATE "pg_catalog"."default";

    -- Sponsor fields
    ALTER TABLE "public"."Sponsor"
        ADD COLUMN IF NOT EXISTS "createdAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "updatedAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "createdBy" varchar(256) COLLATE "pg_catalog"."default",
        ADD COLUMN IF NOT EXISTS "updatedBy" varchar(256) COLLATE "pg_catalog"."default";

    -- MSN fields
    ALTER TABLE "public"."MSN"
        ADD COLUMN IF NOT EXISTS "createdAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "updatedAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "createdBy" varchar(256) COLLATE "pg_catalog"."default",
        ADD COLUMN IF NOT EXISTS "updatedBy" varchar(256) COLLATE "pg_catalog"."default";

    -- Rating fields
    ALTER TABLE "public"."Rating"
        ADD COLUMN IF NOT EXISTS "createdAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "updatedAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "createdBy" varchar(256) COLLATE "pg_catalog"."default",
        ADD COLUMN IF NOT EXISTS "updatedBy" varchar(256) COLLATE "pg_catalog"."default";

    -- Loan_Rating fields
    ALTER TABLE "public"."Loan_Rating"
        ADD COLUMN IF NOT EXISTS "createdAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "updatedAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "createdBy" varchar(256) COLLATE "pg_catalog"."default",
        ADD COLUMN IF NOT EXISTS "updatedBy" varchar(256) COLLATE "pg_catalog"."default";

    -- MSN_Rating fields
    ALTER TABLE "public"."MSN_Rating"
        ADD COLUMN IF NOT EXISTS "createdAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "updatedAt" timestamp(6),
        ADD COLUMN IF NOT EXISTS "createdBy" varchar(256) COLLATE "pg_catalog"."default",
        ADD COLUMN IF NOT EXISTS "updatedBy" varchar(256) COLLATE "pg_catalog"."default";
END$$;