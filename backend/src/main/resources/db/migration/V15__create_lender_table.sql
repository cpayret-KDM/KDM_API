DO $$
BEGIN

	-- ----------------------------
	-- Sequence structure for Lender_lenderID_seq
	-- ----------------------------
	DROP SEQUENCE IF EXISTS "public"."Lender_lenderID_seq";
	CREATE SEQUENCE "public"."Lender_lenderID_seq" 
	INCREMENT 1
	MINVALUE  1
	MAXVALUE 2147483647
	start 1000000
	CACHE 1;
	
	DROP TABLE IF EXISTS "public"."Lender";
	CREATE TABLE "public"."Lender" (
	  "lenderID" int4 NOT NULL DEFAULT nextval('"Lender_lenderID_seq"'::regclass),
	  "loanID" int4,
	  "name" varchar(256) COLLATE "pg_catalog"."default",
	  "initialAmount" numeric(12,2),
	  "principalBalance" numeric(12,2),
	  "lenderRate" numeric(6,3)
	);

	IF NOT EXISTS ( SELECT  constraint_schema
	                ,       constraint_name 
	                FROM    information_schema.check_constraints 
	                WHERE   constraint_schema = 'public'
	                  AND   constraint_name = 'fk_lender_loan'
	              )
	THEN
		ALTER TABLE "public"."Lender" ADD CONSTRAINT "fk_lender_loan" FOREIGN KEY ("loanID") REFERENCES "public"."Loan" ("loanID") ON DELETE NO ACTION ON UPDATE NO ACTION;
	END IF;
	
END$$;