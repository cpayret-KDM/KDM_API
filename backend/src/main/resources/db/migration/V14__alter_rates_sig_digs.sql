DO $$
BEGIN
    ALTER TABLE "public"."MSN" ALTER COLUMN "noteRate" TYPE numeric(6,3);
    ALTER TABLE "public"."Loan" alter column "loanRate" TYPE numeric(6,3);

END$$;