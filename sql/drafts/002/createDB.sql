CREATE TABLE "CUSIP" (
  "cusipID" SERIAL,
  "crossID" VARCHAR(256),
  "class" VARCHAR(256),
  "type" VARCHAR(256),
  PRIMARY KEY ("cusipID")
);

CREATE TABLE "Loan" (
  "loanID" INTEGER,
  "sponsorID" INTEGER,
  "borrowerID" INTEGER,
  "msnID" INTEGER,
  "propertyID" INTEGER,
  "loanNumber" VARCHAR(16),
  "dealName" VARCHAR(256),
  "originationDate" TIMESTAMP,
  "maturityDate" TIMESTAMP,
  "tradeDate" TIMESTAMP,
  "loanStatus" VARCHAR(16),
  "initialAmount" NUMERIC(12,2),
  "pipelineStatus" VARCHAR(16),
  "underwritenLTV" NUMERIC(2,2),
  "offeringMemoURL" VARCHAR(256),
  PRIMARY KEY ("loanID")
);

CREATE INDEX "Key" ON  "Loan" ("loanNumber");

CREATE TABLE "Sponsor" (
  "sponsorID" SERIAL,
  "addressId" INTEGER,
  "Company" Varchar(256),
  "firstName" VARCHAR(256),
  "lastName" VARCHAR(256),
  "phone" VARCHAR(256),
  "email" VARCHAR(256),
  PRIMARY KEY ("sponsorID")
);

CREATE INDEX "Key" ON  "Sponsor" ("Company");

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
  "cuspiID" INTEGER,
  "number" VARCHAR(256),
  "tradeDate" TIMESTAMP,
  "maturityDate" TIMESTAMP,
  "rating" NUMERIC(2,2),
  PRIMARY KEY ("msnID")
);

CREATE INDEX "Key" ON  "MSN" ("number");

CREATE TABLE "Property" (
  "propertyID" Serial,
  "addressID" INTEGER,
  "loanID" INTEGER,
  PRIMARY KEY ("propertyID")
);

CREATE TABLE "Borrower" (
  "borrowerId" SERIAL,
  "addressId" INTEGER,
  "Company" Varchar(256),
  "firstName" VARCHAR(256),
  "lastName" VARCHAR(256),
  "phone" VARCHAR(256),
  "email" VARCHAR(256),
  PRIMARY KEY ("borrowerId")
);

CREATE INDEX "Key" ON  "Borrower" ("Company");

