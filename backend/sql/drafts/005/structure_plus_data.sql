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

 Date: 03/11/2020 08:08:00
*/


-- ----------------------------
-- Sequence structure for Address_addressID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Address_addressID_seq";
CREATE SEQUENCE "public"."Address_addressID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Address_addressID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for Appraisal_appraisalID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Appraisal_appraisalID_seq";
CREATE SEQUENCE "public"."Appraisal_appraisalID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Appraisal_appraisalID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for Borrower_borrowerId_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Borrower_borrowerId_seq";
CREATE SEQUENCE "public"."Borrower_borrowerId_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Borrower_borrowerId_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for CUSIP_cusipID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."CUSIP_cusipID_seq";
CREATE SEQUENCE "public"."CUSIP_cusipID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."CUSIP_cusipID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for Loan_loanID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Loan_loanID_seq";
CREATE SEQUENCE "public"."Loan_loanID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Loan_loanID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for MSN_msnID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."MSN_msnID_seq";
CREATE SEQUENCE "public"."MSN_msnID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."MSN_msnID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for Property_propertyID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Property_propertyID_seq";
CREATE SEQUENCE "public"."Property_propertyID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Property_propertyID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for Rating_ratingID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Rating_ratingID_seq";
CREATE SEQUENCE "public"."Rating_ratingID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Rating_ratingID_seq" OWNER TO "cs_korth";

-- ----------------------------
-- Sequence structure for Sponsor_sponsorID_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Sponsor_sponsorID_seq";
CREATE SEQUENCE "public"."Sponsor_sponsorID_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Sponsor_sponsorID_seq" OWNER TO "cs_korth";

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
ALTER TABLE "public"."Address" OWNER TO "cs_korth";

-- ----------------------------
-- Records of Address
-- ----------------------------
BEGIN;
INSERT INTO "public"."Address" VALUES (1, '4771 78th Avenue', NULL, 'Miami', 'fl', '33101');
INSERT INTO "public"."Address" VALUES (2, '14120 Palm Street', NULL, 'Miami', 'fl', '33101');
INSERT INTO "public"."Address" VALUES (3, '8440 Grand Canal Dr', NULL, 'Miami', 'fl', '33101');
INSERT INTO "public"."Address" VALUES (5, '345 NE 80 St', NULL, 'Miami', 'fl', '33138');
COMMIT;

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
ALTER TABLE "public"."Appraisal" OWNER TO "cs_korth";

-- ----------------------------
-- Records of Appraisal
-- ----------------------------
BEGIN;
INSERT INTO "public"."Appraisal" VALUES (1, 1, 960000.00, '2020-10-27 13:34:30');
INSERT INTO "public"."Appraisal" VALUES (2, 2, 960000.00, '2020-10-27 13:35:03');
INSERT INTO "public"."Appraisal" VALUES (3, 3, 1605000.00, '2020-10-27 13:56:37');
COMMIT;

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
ALTER TABLE "public"."Borrower" OWNER TO "cs_korth";

-- ----------------------------
-- Records of Borrower
-- ----------------------------
BEGIN;
INSERT INTO "public"."Borrower" VALUES (1, NULL, '4771 78th Avenue LLC', NULL, NULL, NULL, NULL);
INSERT INTO "public"."Borrower" VALUES (2, NULL, '14120 Palm Street LLC', NULL, NULL, NULL, NULL);
INSERT INTO "public"."Borrower" VALUES (3, NULL, '8400 Grand Canal Dr LLC', NULL, NULL, NULL, NULL);
INSERT INTO "public"."Borrower" VALUES (5, 5, '345 NE LLC', NULL, NULL, NULL, NULL);
COMMIT;

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
ALTER TABLE "public"."CUSIP" OWNER TO "cs_korth";

-- ----------------------------
-- Records of CUSIP
-- ----------------------------
BEGIN;
INSERT INTO "public"."CUSIP" VALUES (1, NULL, 'AI', NULL, '50067AAC6');
INSERT INTO "public"."CUSIP" VALUES (2, NULL, 'AI', NULL, '50067AAD4');
COMMIT;

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
ALTER TABLE "public"."Loan" OWNER TO "cs_korth";

-- ----------------------------
-- Records of Loan
-- ----------------------------
BEGIN;
INSERT INTO "public"."Loan" VALUES (1, NULL, 1, 'KDM2017-L001', NULL, NULL, '2027-05-01 00:00:01', NULL, 'PERFORMING', 1059000.00, 'CLOSED', 53.70, NULL, 5.25);
INSERT INTO "public"."Loan" VALUES (2, NULL, 2, 'KDM2017-L002', NULL, NULL, '2020-12-21 00:00:01', NULL, 'PERFORMING', 950000.00, 'CLOSED', 59.19, NULL, 6.50);
INSERT INTO "public"."Loan" VALUES (4, NULL, 4, 'KDM2018-L001', NULL, NULL, '2023-03-13 00:00:01', NULL, 'PERFORMING', 1850000.00, 'CLOSED', 66.67, NULL, 6.50);
INSERT INTO "public"."Loan" VALUES (5, NULL, NULL, 'KDM2018-L002', NULL, NULL, '2021-02-04 00:00:01', NULL, 'PERFORMING', 341250.00, 'CLOSED', 59.21, NULL, 6.50);
INSERT INTO "public"."Loan" VALUES (6, NULL, NULL, 'KDM2018-L003', NULL, NULL, '2023-05-25 00:00:01', NULL, 'PERFORMING', 6300000.00, 'CLOSED', 60.00, NULL, 6.50);
INSERT INTO "public"."Loan" VALUES (7, NULL, NULL, 'KDM2018-L004', NULL, NULL, '2023-09-25 00:00:01', NULL, 'PERFORMING', 2700000.00, 'CLOSED', 64.98, NULL, 6.75);
COMMIT;

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
ALTER TABLE "public"."MSN" OWNER TO "cs_korth";

-- ----------------------------
-- Records of MSN
-- ----------------------------
BEGIN;
INSERT INTO "public"."MSN" VALUES (1, 1, 'KDM2017-N001', NULL, '2017-05-01 00:00:00', 5.00);
INSERT INTO "public"."MSN" VALUES (2, 2, 'KDM2017-N002', NULL, '2020-12-21 00:00:01', 6.00);
INSERT INTO "public"."MSN" VALUES (4, NULL, 'KDM2018-L001', NULL, '2023-03-13 00:00:01', 5.50);
COMMIT;

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
ALTER TABLE "public"."Property" OWNER TO "cs_korth";

-- ----------------------------
-- Records of Property
-- ----------------------------
BEGIN;
INSERT INTO "public"."Property" VALUES (1, 1, 1, 1, 'multi-family');
INSERT INTO "public"."Property" VALUES (2, 2, 1, 2, 'multi-family');
INSERT INTO "public"."Property" VALUES (3, 3, 2, 3, 'multi-family');
INSERT INTO "public"."Property" VALUES (6, 5, 4, 5, 'warehouse flex-space');
COMMIT;

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
ALTER TABLE "public"."Rating" OWNER TO "cs_korth";

-- ----------------------------
-- Records of Rating
-- ----------------------------
BEGIN;
INSERT INTO "public"."Rating" VALUES (1, 1, '2020-10-27 13:38:36', 'EJ', 'A+');
INSERT INTO "public"."Rating" VALUES (2, 2, '2020-10-27 13:55:43', 'EJ', 'A');
INSERT INTO "public"."Rating" VALUES (4, 4, '2020-11-02 17:56:31', 'EJ', 'A-');
COMMIT;

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
ALTER TABLE "public"."Sponsor" OWNER TO "cs_korth";

-- ----------------------------
-- Records of Sponsor
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Address_addressID_seq"
OWNED BY "public"."Address"."addressID";
SELECT setval('"public"."Address_addressID_seq"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Appraisal_appraisalID_seq"
OWNED BY "public"."Appraisal"."appraisalID";
SELECT setval('"public"."Appraisal_appraisalID_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Borrower_borrowerId_seq"
OWNED BY "public"."Borrower"."borrowerId";
SELECT setval('"public"."Borrower_borrowerId_seq"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."CUSIP_cusipID_seq"
OWNED BY "public"."CUSIP"."cusipID";
SELECT setval('"public"."CUSIP_cusipID_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Loan_loanID_seq"
OWNED BY "public"."Loan"."loanID";
SELECT setval('"public"."Loan_loanID_seq"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."MSN_msnID_seq"
OWNED BY "public"."MSN"."msnID";
SELECT setval('"public"."MSN_msnID_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Property_propertyID_seq"
OWNED BY "public"."Property"."propertyID";
SELECT setval('"public"."Property_propertyID_seq"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Rating_ratingID_seq"
OWNED BY "public"."Rating"."ratingID";
SELECT setval('"public"."Rating_ratingID_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Sponsor_sponsorID_seq"
OWNED BY "public"."Sponsor"."sponsorID";
SELECT setval('"public"."Sponsor_sponsorID_seq"', 3, false);

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

-- ----------------------------
-- Foreign Keys structure for table Appraisal
-- ----------------------------
ALTER TABLE "public"."Appraisal" ADD CONSTRAINT "fk_appraisal_property" FOREIGN KEY ("propertyID") REFERENCES "public"."Property" ("propertyID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table Borrower
-- ----------------------------
ALTER TABLE "public"."Borrower" ADD CONSTRAINT "fk_borrower_address" FOREIGN KEY ("addressId") REFERENCES "public"."Address" ("addressID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table Loan
-- ----------------------------
ALTER TABLE "public"."Loan" ADD CONSTRAINT "fk_loan_msn" FOREIGN KEY ("msnID") REFERENCES "public"."MSN" ("msnID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."Loan" ADD CONSTRAINT "fk_loan_sponsor" FOREIGN KEY ("sponsorID") REFERENCES "public"."Sponsor" ("sponsorID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table MSN
-- ----------------------------
ALTER TABLE "public"."MSN" ADD CONSTRAINT "fk_msn_cusip" FOREIGN KEY ("cusipID") REFERENCES "public"."CUSIP" ("cusipID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table Property
-- ----------------------------
ALTER TABLE "public"."Property" ADD CONSTRAINT "fk_property_address" FOREIGN KEY ("addressID") REFERENCES "public"."Address" ("addressID") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."Property" ADD CONSTRAINT "fk_property_borrower" FOREIGN KEY ("borrowerID") REFERENCES "public"."Borrower" ("borrowerId") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."Property" ADD CONSTRAINT "fk_property_loan" FOREIGN KEY ("loanID") REFERENCES "public"."Loan" ("loanID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table Rating
-- ----------------------------
ALTER TABLE "public"."Rating" ADD CONSTRAINT "fk_rating_msn" FOREIGN KEY ("msnID") REFERENCES "public"."MSN" ("msnID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table Sponsor
-- ----------------------------
ALTER TABLE "public"."Sponsor" ADD CONSTRAINT "fk_sponsor_address" FOREIGN KEY ("addressId") REFERENCES "public"."Address" ("addressID") ON DELETE NO ACTION ON UPDATE NO ACTION;
