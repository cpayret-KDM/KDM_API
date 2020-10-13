package com.kdm.web.model;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

@JsonRootName("loan")
public class Loan {

	@JsonProperty
	private Long id;
	
	@JsonProperty
	private String loanNumber;
	
	@JsonProperty
	private String dealName;
	
	@JsonProperty
	private ZonedDateTime originationDate;
	
	@JsonProperty
	private ZonedDateTime maturityDate;
	
	@JsonProperty
	private ZonedDateTime tradeDate;
	
	@JsonProperty
	private LoanStatus status;
	
	@JsonProperty
	private BigDecimal initialAmount;
	
	public Loan(){
		
	}

	public String getLoanNumber() {
		return loanNumber;
	}

	public void setLoanNumber(String loanNumber) {
		this.loanNumber = loanNumber;
	}

	public String getDealName() {
		return dealName;
	}

	public void setDealName(String dealName) {
		this.dealName = dealName;
	}

	public ZonedDateTime getOriginationDate() {
		return originationDate;
	}

	public void setOriginationDate(ZonedDateTime originationDate) {
		this.originationDate = originationDate;
	}

	public ZonedDateTime getMaturityDate() {
		return maturityDate;
	}

	public void setMaturityDate(ZonedDateTime maturityDate) {
		this.maturityDate = maturityDate;
	}

	public ZonedDateTime getTradeDate() {
		return tradeDate;
	}

	public void setTradeDate(ZonedDateTime tradeDate) {
		this.tradeDate = tradeDate;
	}

	public LoanStatus getStatus() {
		return status;
	}

	public void setStatus(LoanStatus status) {
		this.status = status;
	}

	public BigDecimal getInitialAmount() {
		return initialAmount;
	}

	public void setInitialAmount(BigDecimal initialAmount) {
		this.initialAmount = initialAmount;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
}
