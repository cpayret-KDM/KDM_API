package com.kdm.web.restclient.tmo.model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@JsonIgnoreProperties(ignoreUnknown=true)
@Getter @Setter @NoArgsConstructor @ToString
public class Funding {

	//@JsonProperty("Amount")
	//private 
	
	@JsonProperty("BrokerFeeFlat")
	private BigDecimal BrokerFeeFlat;
	
	@JsonProperty("BrokerFeeMin")
	private BigDecimal BrokerFeeMin;
	
	@JsonProperty("BrokerFeePct")
	private BigDecimal BrokerFeePct;
	
	@JsonProperty("DrawControl")
	private BigDecimal DrawControl;
	
	//@JsonProperty("EffRateType")
	//@JsonProperty("EffRateValue")
	@JsonProperty("FundControl")
	private BigDecimal FundControl;
	
	//@JsonProperty("GSTUse")
	//@JsonProperty("LenderAccount")
	//@JsonProperty("LenderCategory")
	@JsonProperty("LenderName")
	private String LenderName;
	
	@JsonProperty("LenderRate")
	private BigDecimal LenderRate;
	
	//@JsonProperty("LenderRecID")
	//@JsonProperty("LoanAccount")
	//@JsonProperty("LoanRecID")
	
	@JsonProperty("PctOwn")
	private BigDecimal PctOwn;
	
	//@JsonProperty("PennyError")
	@JsonProperty("PrincipalBalance")
	private BigDecimal PrincipalBalance;
	//@JsonProperty("RecID")
	//@JsonProperty("Reference")
	
	@JsonProperty("RegularPayment")
	private BigDecimal RegularPayment;
	
	@JsonProperty("TransDate")
	private String TransDate;
	//@JsonProperty("VendorAccount")
	//@JsonProperty("VendorFeeFlat")
	//@JsonProperty("VendorFeeMin")
	//@JsonProperty("VendorFeePct")
	//@JsonProperty("VendorRecID")
}
