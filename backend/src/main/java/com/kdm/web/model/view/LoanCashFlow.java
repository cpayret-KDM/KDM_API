package com.kdm.web.model.view;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class LoanCashFlow {
	
	@JsonProperty(value="id")
	private Long loanID;
	
	@JsonProperty
	private String loanNumber;
	
	@JsonProperty
	private BigDecimal principalBalance;
	
	@JsonProperty
	private BigDecimal loanRate;
	
	@JsonProperty
	private BigDecimal msnRate;
	
	@JsonProperty
	private BigDecimal anualRevenue;
	
	@JsonProperty
	private BigDecimal monthlyRevenue;
	
	@JsonProperty
	private Long monthsToMaturity;
	
}
