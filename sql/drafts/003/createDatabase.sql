CREATE TABLE "CUSIP" (
  "cusipID" SERIAL,
  "crossID" VARCHAR(256),
  "class" VARCHAR(256),
  "type" VARCHAR(256),
  "ticker" VARCHAR(16),
  PRIMARY KEY ("cusipID")
);

CREATE INDEX "KEY" ON  "CUSIP" ("ticker");

CREATE TABLE "Loan" (
  "loanID" SERIAL,
  "sponsorID" INTEGER,
  "msnID" INTEGER,
  "loanNumber" VARCHAR(16),
  "dealName" VARCHAR(256),
  "originationDate" TIMESTAMP,
  "maturityDate" TIMESTAMP,
  "tradeDate" TIMESTAMP,
  "loanStatus" VARCHAR(16),
  "initialAmount" NUMERIC(12,2),
  "pipelineStatus" VARCHAR(16),
  "LTV" NUMERIC(5,2),
  "memoURL" VARCHAR(256),
  "loanRate" NUMERIC(5,2),
  PRIMARY KEY ("loanID")
);

CREATE INDEX "Key" ON  "Loan" ("loanNumber");

CREATE TABLE "Sponsor" (
  "sponsorID" SERIAL,
  "addressId" INTEGER,
  "Company" Varchar(256),
  "firstName" VARCHAR(256),
  "lastName" VARCHAR(256,
  "phone" VARCHAR(256),
  "email" VARCHAR(256),
  "registrationState" VARCHAR(64),
  PRIMARY KEY ("sponsorID")
);

CREATE INDEX "Key" ON  "Sponsor" ("Company");

CREATE TABLE "Borrower" (
  "borrowerId" SERIAL,
  "addressId" INTEGER,
  "Company" VARCHAR(256),
  "firstName" VARCHAR(256),
  "lastName" VARCHAR(256,
  "phone" VARCHAR(256),
  "email" VARCHAR(256),
  PRIMARY KEY ("borrowerId")
);

CREATE INDEX "Key" ON  "Borrower" ("Company");

CREATE TABLE "Address" (
  "addressID" SERIAL,
  "street1" VARCHAR(256),
  "street2" VARCHAR(256),
  "city" VARCHAR(256),
  "state" VARCHAR(256),
  "zip" VARCHAR(256),
  PRIMARY KEY ("addressID")
);

CREATE TABLE "MSN" (
  "msnID" SERIAL,
  "cusipID" INTEGER,
  "number" VARCHAR(256),
  "tradeDate" TIMESTAMP,
  "maturityDate" TIMESTAMP,
  "noteRate" NUMERIC(5,2),
  PRIMARY KEY ("msnID")
);

CREATE INDEX "Key" ON  "MSN" ("number");

CREATE TABLE "Property" (
  "propertyID" Serial,
  "addressID" INTEGER,
  "loanID" INTEGER,
  "borrowerID" INTEGER,
  "type" VARCHAR(256),
  PRIMARY KEY ("propertyID")
);

CREATE TABLE "Appraisal" (
  "appraisalID" SERIAL,
  "propertyID" INTEGER,
  "value" NUMERIC(12,2),
  "date" TIMESTAMP,
  PRIMARY KEY ("appraisalID")
);

CREATE TABLE "Rating" (
  "ratingID" SERIAL,
  "msnID" INTEGER,
  "date" TIMESTAMP,
  "agency" VARCHAR(256),
  "rating" VARCHAR(8),
  PRIMARY KEY ("ratingID")
);

CREATE INDEX "Key" ON  "Rating" ("msnID");

