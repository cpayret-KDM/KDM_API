package com.kdm.web.restclient.tmo.model;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown=true)
@Getter @Setter @NoArgsConstructor
public class LoanTerms {

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "M/dd/yyyy")
	@JsonProperty("ClosingDate")
	private Date closingDate;	
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "M/d/yyyy")
	@JsonProperty("MaturityDate")
	private Date maturityDate;
	
	@JsonProperty("PrepayMon")
	private Long prepayMon;

	@JsonProperty("SoldRate")
	private BigDecimal soldRate;
	
	@JsonProperty("FundControl")
	private BigDecimal fundControl;
	
	@JsonProperty("OrigBal")
	private BigDecimal originalBalance;
	
	@JsonProperty("PrinBal")
	private BigDecimal principalBalance;
	
	// interesting fields we may need
	//    "NoteRate": "5.35000000",
	//    "RegularPayment": "236229.43",
	
}
