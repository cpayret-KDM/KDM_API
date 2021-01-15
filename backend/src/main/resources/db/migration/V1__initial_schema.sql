/*
 Navicat PostgreSQL Data Transfer

 Source Server         : localhost
 Source Server Type    : PostgreSQL
 Source Server Version : 130000
 Source Host           : localhost:5432
 Source Catalog        : kdm
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 130000
 File Encoding         : 65001

 Date: 27/10/2020 13:57:04
*/


-- ----------------------------
-- Sequence structure for Address_addressID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Address_addressID_seq";
CREATE SEQUENCE "public"."Address_addressID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
start 1000000
CACHE 1;
-- ALTER SEQUENCE "public"."Address_addressID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for Appraisal_appraisalID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Appraisal_appraisalID_seq";
CREATE SEQUENCE "public"."Appraisal_appraisalID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
start 1000000
CACHE 1;
-- ALTER SEQUENCE "public"."Appraisal_appraisalID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for Borrower_borrowerId_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Borrower_borrowerId_seq";
CREATE SEQUENCE "public"."Borrower_borrowerId_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
start 1000000
CACHE 1;
-- ALTER SEQUENCE "public"."Borrower_borrowerId_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for CUSIP_cusipID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."CUSIP_cusipID_seq";
CREATE SEQUENCE "public"."CUSIP_cusipID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
start 1000000
CACHE 1;
-- ALTER SEQUENCE "public"."CUSIP_cusipID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for Loan_loanID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Loan_loanID_seq";
CREATE SEQUENCE "public"."Loan_loanID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
start 1000000
CACHE 1;
-- ALTER SEQUENCE "public"."Loan_loanID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for MSN_msnID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."MSN_msnID_seq";
CREATE SEQUENCE "public"."MSN_msnID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
start 1000000
CACHE 1;
-- ALTER SEQUENCE "public"."MSN_msnID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for Property_propertyID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Property_propertyID_seq";
CREATE SEQUENCE "public"."Property_propertyID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
start 1000000
CACHE 1;
-- ALTER SEQUENCE "public"."Property_propertyID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for Rating_ratingID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Rating_ratingID_seq";
CREATE SEQUENCE "public"."Rating_ratingID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
start 1000000
CACHE 1;
-- ALTER SEQUENCE "public"."Rating_ratingID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for Sponsor_sponsorID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Sponsor_sponsorID_seq";
CREATE SEQUENCE "public"."Sponsor_sponsorID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
start 1000000
CACHE 1;
-- ALTER SEQUENCE "public"."Sponsor_sponsorID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Table structure for Address
-- ----------------------------
DROP TABLE IF EXISTS "public"."Address";
CREATE TABLE "public"."Address" (
  "addressID" int4 NOT NULL DEFAULT nextval('"Address_addressID_seq"'::regclass),
  "street1" varchar(256) COLLATE "pg_catalog"."default",
  "street2" varchar(256) COLLATE "pg_catalog"."default",
  "city" varchar(256) COLLATE "pg_catalog"."default",
  "state" varchar(256) COLLATE "pg_catalog"."default",
  "zip" varchar(256) COLLATE "pg_catalog"."default"
)
;
-- ALTER TABLE "public"."Address" OWNER TO "cs_korth";

-- ----------------------------
-- Table structure for Appraisal
-- ----------------------------
DROP TABLE IF EXISTS "public"."Appraisal";
CREATE TABLE "public"."Appraisal" (
  "appraisalID" int4 NOT NULL DEFAULT nextval('"Appraisal_appraisalID_seq"'::regclass),
  "propertyID" int4,
  "value" numeric(12,2),
  "date" timestamp(6)
)
;
-- ALTER TABLE "public"."Appraisal" OWNER TO "cs_korth";

-- ----------------------------
-- Table structure for Borrower
-- ----------------------------
DROP TABLE IF EXISTS "public"."Borrower";
CREATE TABLE "public"."Borrower" (
  "borrowerId" int4 NOT NULL DEFAULT nextval('"Borrower_borrowerId_seq"'::regclass),
  "addressId" int4,
  "Company" varchar(256) COLLATE "pg_catalog"."default",
  "firstName" varchar(256) COLLATE "pg_catalog"."default",
  "lastName" varchar(256) COLLATE "pg_catalog"."default",
  "phone" varchar(256) COLLATE "pg_catalog"."default",
  "email" varchar(256) COLLATE "pg_catalog"."default"
)
;
-- ALTER TABLE "public"."Borrower" OWNER TO "cs_korth";

-- ----------------------------
-- Table structure for CUSIP
-- ----------------------------
DROP TABLE IF EXISTS "public"."CUSIP";
CREATE TABLE "public"."CUSIP" (
  "cusipID" int4 NOT NULL DEFAULT nextval('"CUSIP_cusipID_seq"'::regclass),
  "crossID" varchar(256) COLLATE "pg_catalog"."default",
  "class" varchar(256) COLLATE "pg_catalog"."default",
  "type" varchar(256) COLLATE "pg_catalog"."default",
  "ticker" varchar(16) COLLATE "pg_catalog"."default"
)
;
-- ALTER TABLE "public"."CUSIP" OWNER TO "cs_korth";

-- ----------------------------
-- Table structure for Loan
-- ----------------------------
DROP TABLE IF EXISTS "public"."Loan";
CREATE TABLE "public"."Loan" (
  "loanID" int4 NOT NULL DEFAULT nextval('"Loan_loanID_seq"'::regclass),
  "sponsorID" int4,
  "msnID" int4,
  "loanNumber" varchar(16) COLLATE "pg_catalog"."default",
  "dealName" varchar(256) COLLATE "pg_catalog"."default",
  "originationDate" timestamp(6),
  "maturityDate" timestamp(6),
  "tradeDate" timestamp(6),
  "loanStatus" varchar(16) COLLATE "pg_catalog"."default",
  "initialAmount" numeric(12,2),
  "pipelineStatus" varchar(16) COLLATE "pg_catalog"."default",
  "LTV" numeric(5,2),
  "memoURL" varchar(256) COLLATE "pg_catalog"."default",
  "loanRate" numeric(5,2)
)
;
-- ALTER TABLE "public"."Loan" OWNER TO "cs_korth";

-- ----------------------------
-- Table structure for MSN
-- ----------------------------
DROP TABLE IF EXISTS "public"."MSN";
CREATE TABLE "public"."MSN" (
  "msnID" int4 NOT NULL DEFAULT nextval('"MSN_msnID_seq"'::regclass),
  "cusipID" int4,
  "number" varchar(256) COLLATE "pg_catalog"."default",
  "tradeDate" timestamp(6),
  "maturityDate" timestamp(6),
  "noteRate" numeric(5,2)
)
;
-- ALTER TABLE "public"."MSN" OWNER TO "cs_korth";

-- ----------------------------
-- Table structure for Property
-- ----------------------------
DROP TABLE IF EXISTS "public"."Property";
CREATE TABLE "public"."Property" (
  "propertyID" int4 NOT NULL DEFAULT nextval('"Property_propertyID_seq"'::regclass),
  "addressID" int4,
  "loanID" int4,
  "borrowerID" int4,
  "type" varchar(256) COLLATE "pg_catalog"."default"
)
;
-- ALTER TABLE "public"."Property" OWNER TO "cs_korth";

-- ----------------------------
-- Table structure for Rating
-- ----------------------------
DROP TABLE IF EXISTS "public"."Rating";
CREATE TABLE "public"."Rating" (
  "ratingID" int4 NOT NULL DEFAULT nextval('"Rating_ratingID_seq"'::regclass),
  "msnID" int4,
  "date" timestamp(6),
  "agency" varchar(256) COLLATE "pg_catalog"."default",
  "rating" varchar(8) COLLATE "pg_catalog"."default"
)
;
-- ALTER TABLE "public"."Rating" OWNER TO "cs_korth";

-- ----------------------------
-- Table structure for Sponsor
-- ----------------------------
DROP TABLE IF EXISTS "public"."Sponsor";
CREATE TABLE "public"."Sponsor" (
  "sponsorID" int4 NOT NULL DEFAULT nextval('"Sponsor_sponsorID_seq"'::regclass),
  "addressId" int4,
  "Company" varchar(256) COLLATE "pg_catalog"."default",
  "firstName" varchar(256) COLLATE "pg_catalog"."default",
  "lastName" varchar(256) COLLATE "pg_catalog"."default",
  "phone" varchar(256) COLLATE "pg_catalog"."default",
  "email" varchar(256) COLLATE "pg_catalog"."default",
  "registrationState" varchar(64) COLLATE "pg_catalog"."default"
)
;
-- ALTER TABLE "public"."Sponsor" OWNER TO "cs_korth";


-- ----------------------------
-- Primary Key structure for table Address
-- ----------------------------
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("addressID");

-- ----------------------------
-- Primary Key structure for table Appraisal
-- ----------------------------
ALTER TABLE "public"."Appraisal" ADD CONSTRAINT "Appraisal_pkey" PRIMARY KEY ("appraisalID");

-- ----------------------------
-- Indexes structure for table Borrower
-- ----------------------------
CREATE UNIQUE INDEX "unique_borrower_company" ON "public"."Borrower" USING btree (
  "Company" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Borrower
-- ----------------------------
ALTER TABLE "public"."Borrower" ADD CONSTRAINT "Borrower_pkey" PRIMARY KEY ("borrowerId");

-- ----------------------------
-- Indexes structure for table CUSIP
-- ----------------------------
CREATE UNIQUE INDEX "unique_cusip_ticker" ON "public"."CUSIP" USING btree (
  "ticker" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table CUSIP
-- ----------------------------
ALTER TABLE "public"."CUSIP" ADD CONSTRAINT "CUSIP_pkey" PRIMARY KEY ("cusipID");

-- ----------------------------
-- Indexes structure for table Loan
-- ----------------------------
CREATE UNIQUE INDEX "unique_loan_loanNumber" ON "public"."Loan" USING btree (
  "loanNumber" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Loan
-- ----------------------------
ALTER TABLE "public"."Loan" ADD CONSTRAINT "Loan_pkey" PRIMARY KEY ("loanID");

-- ----------------------------
-- Indexes structure for table MSN
-- ----------------------------
CREATE UNIQUE INDEX "unique_msn_number" ON "public"."MSN" USING btree (
  "number" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table MSN
-- ----------------------------
ALTER TABLE "public"."MSN" ADD CONSTRAINT "MSN_pkey" PRIMARY KEY ("msnID");

-- ----------------------------
-- Primary Key structure for table Property
-- ----------------------------
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_pkey" PRIMARY KEY ("propertyID");

-- ----------------------------
-- Primary Key structure for table Rating
-- ----------------------------
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_pkey" PRIMARY KEY ("ratingID");

-- ----------------------------
-- Indexes structure for table Sponsor
-- ----------------------------
CREATE UNIQUE INDEX "unique_sponsor_company" ON "public"."Sponsor" USING btree (
  "Company" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Sponsor
-- ----------------------------
ALTER TABLE "public"."Sponsor" ADD CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("sponsorID");
