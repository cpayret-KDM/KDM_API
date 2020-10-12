CREATE TABLE "CUSIP" (
  "cusipID" SERIAL,
  "crossID" VARCHAR(256),
  "class" VARCHAR(256),
  "type" VARCHAR(256),
  PRIMARY KEY ("cusipID")
);

CREATE TABLE "Sponsor" (
  "sponsorID" SERIAL,
  "firstName" VARCHAR(256),
  "lastName" VARCHAR(256,
  "phone" VARCHAR(256),
  "email" VARCHAR(256),
  "addressId" INTEGER,
  PRIMARY KEY ("sponsorID")
);

CREATE TABLE "Property" (
  "propertyID" Serial,
  "addressID" INTEGER,
  "loanID" INTEGER,
  PRIMARY KEY ("propertyID")
);

CREATE TABLE "Loan" (
  "loanID" INTEGER,
  "sponsorID" INTEGER,
  "cusipID" Type,
  "loanNumber" UUID,
  "dealName" VARCHAR(256),
  "originationDate" TIMESTAMP,
  "maturityDate" TIMESTAMP,
  "tradeDate" TIMESTAMP,
  "statusID" INTEGER,
  "initialAmount" NUMERIC(12,2),
  PRIMARY KEY ("loanID")
);

CREATE TABLE "Address" (
  "addressID" SERIAL,
  "street1" VARCHAR(256),
  "street2" VARCHAR(256),
  "city" VARCHAR(256),
  "state" VARCHAR(256),
  "zip" VARCHAR(256),
  PRIMARY KEY ("addressID")
);

CREATE TABLE "LoanStatus" (
  "statusID" SERIAL,
  "order" INTEGER,
  "value" VARCHAR(256),
  PRIMARY KEY ("statusID")
);

