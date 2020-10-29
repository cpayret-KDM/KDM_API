package com.kdm.web.model;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="Loan", schema = "public")
public class Loan {

	@JsonProperty(value = "id")
	@Id
	@Column(name = "loanID")
	private Long id;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sponsorID", referencedColumnName = "sponsorID", nullable = true)
	private Sponsor sponsor;
	
	@JsonProperty
	@Column(name = "sponsorID", insertable = false, updatable = false)
	private Long sponsorID;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "msnID", referencedColumnName = "msnID", nullable = true)
	private MSN msn;
	
	@JsonProperty
	@Column(name = "msnID", insertable = false, updatable = false)
	private Long msnId;
	
	@JsonProperty(value = "loanNumber")
	@Column(name = "loanNumber", length = 16)
	@Size(max = 16)
	private String loanNumber;
	
	@JsonProperty(value = "dealName")
	@Column(length = 256, nullable = true)
	@Size(max = 256)
	private String dealName;
	
	@JsonProperty(value = "originationDate")
	@Column(nullable = true)
	private ZonedDateTime originationDate;
	
	@JsonProperty(value = "maturityDate")
	@Column
	private ZonedDateTime maturityDate;
	
	@JsonProperty(value = "tradeDate")
	@Column(nullable = true)
	private ZonedDateTime tradeDate;
	
	@JsonProperty(value = "loanStatus")
	@Enumerated(EnumType.STRING)
	private LoanStatus loanStatus;
	
	@JsonProperty(value = "initialAmount")
	@Column(precision = 12, scale = 2)
	private BigDecimal initialAmount;
	
	@JsonProperty(value = "pipelineStatus")
	@Enumerated(EnumType.STRING)
	private PipelineStatus pipelineStatus;
	
	@JsonProperty(value = "ltv")
	@Column(name = "LTV", precision = 5, scale = 2)
	private BigDecimal ltv;
	
	@JsonProperty(value = "loanRate")
	@Column(precision = 5, scale = 2)
	private BigDecimal loanRate;
	
	@JsonProperty(value = "memoUrl")
	@Column(name = "memoURL", length = 256, nullable = true)
	@Size(max = 256)
	private String memoUrl;
	
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
	
	public Sponsor getSponsor() {
		return sponsor;
	}

	public void setSponsor(Sponsor sponsor) {
		this.sponsor = sponsor;
	}
	
	public Long getSponsorID() {
		return sponsorID;
	}

	public void setSponsorID(Long sponsorID) {
		this.sponsorID = sponsorID;
	}

	/*
	public MSN getMsn() {
		return msn;
	}

	public void setMsn(MSN msn) {
		this.msn = msn;
	}*/

	/*
	public Long getMsnId() {
		return msnId;
	}

	public void setMsnId(Long msnId) {
		this.msnId = msnId;
	}*/

	public LoanStatus getLoanStatus() {
		return loanStatus;
	}

	public void setLoanStatus(LoanStatus loanStatus) {
		this.loanStatus = loanStatus;
	}

	public PipelineStatus getPipelineStatus() {
		return pipelineStatus;
	}

	public void setPipelineStatus(PipelineStatus pipelineStatus) {
		this.pipelineStatus = pipelineStatus;
	}

	public BigDecimal getLtv() {
		return ltv;
	}

	public void setLtv(BigDecimal ltv) {
		this.ltv = ltv;
	}

	public BigDecimal getLoanRate() {
		return loanRate;
	}

	public void setLoanRate(BigDecimal loanRate) {
		this.loanRate = loanRate;
	}

	public String getMemoUrl() {
		return memoUrl;
	}

	public void setMemoUrl(String memoUrl) {
		this.memoUrl = memoUrl;
	}
	
}
