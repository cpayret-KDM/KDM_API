package com.kdm.web.restclient.tmo.model;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown=true)
@Getter @Setter @NoArgsConstructor
public class LoanTerms {

	

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
	@JsonProperty("ClosingDate")
	private ZonedDateTime closingDate;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
	@JsonProperty("MaturityDate")
	private ZonedDateTime maturityDate;
	
	@JsonProperty("PrepayMon")
	private Long prepayMon;

	@JsonProperty("SoldRate")
	private BigDecimal soldRate;
	
	@JsonProperty("FundControl")
	private BigDecimal fundControl;
	
	@JsonProperty("OrigBal")
	private BigDecimal origBal;
	
//    "BookingDate": "",

//    "DefaultRateAfterPeriod": "0",
//    "DefaultRateAfterValue": "15",
//    "DefaultRateLenderPct": "100.00000000",
//    "DefaultRateMethod": "0",
//    "DefaultRateUntil": "0",
//    "DefaultRateValue": "0.00000000",
//    "DefaultRateVendorPct": "0.00000000",
//    "DiscRecapMethod": "0",

//    "DueDay": "1",

//    "FirstPaymentDate": "11/1/2020",
//    


//    "NextDueDate": "3/1/2021",

//    "NoteRate": "5.35000000",
//    "OrigBal": "44000000.00",

//    "PaidOffDate": "",
//    "PaidToDate": "1/31/2021",
//    "PaymentFrequency": "Monthly",
//    "PmtImpound": "37202.00",
//    "PmtTrust": "37202.00",
//    "PrepayExp": "10/30/2022",
//    "PrepayLenderPct": "100.00000000",

	
//    "PrepayPct": "20.00000000",
//    "PrinBal": "44000000.00",

//    "RegularPayment": "236229.43",



//    "UnpaidInterest": "4574.76",

	
}
