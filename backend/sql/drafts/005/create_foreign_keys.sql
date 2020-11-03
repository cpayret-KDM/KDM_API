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

 Date: 02/11/2020 17:33:10
*/

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
