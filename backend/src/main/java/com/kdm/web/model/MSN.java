package com.kdm.web.model;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

@JsonRootName("msn")
@Entity
@Table
public class MSN {

	@Id
	@JsonProperty
	@Column(name = "msnID")
	private Long id;
	
	/*
	@JsonProperty
	@ManyToOne
    @JoinColumn(name = "cusipID", referencedColumnName = "cusipID", nullable = false)
	private Cusip cusip;
	*/
	
	@JsonProperty
	@Column
	private Long cusipID;
	
	@JsonProperty
	@Column(length = 256)
	@Size(max = 256)
	private String number;
	
	@JsonProperty
	@Column(nullable = true)
	private ZonedDateTime tradeDate;
	
	@JsonProperty
	@Column(nullable = false)
	private ZonedDateTime maturityDate;
	
	@JsonProperty
	@Column(precision = 5, scale = 2)
	private BigDecimal noteRate;
	
	public MSN() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	/*
	public Cusip getCusip() {
		return cusip;
	}

	public void setCusip(Cusip cusip) {
		this.cusip = cusip;
	}
	*/

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public ZonedDateTime getTradeDate() {
		return tradeDate;
	}

	public void setTradeDate(ZonedDateTime tradeDate) {
		this.tradeDate = tradeDate;
	}

	public ZonedDateTime getMaturityDate() {
		return maturityDate;
	}

	public void setMaturityDate(ZonedDateTime maturityDate) {
		this.maturityDate = maturityDate;
	}

	public BigDecimal getNoteRate() {
		return noteRate;
	}

	public void setNoteRate(BigDecimal noteRate) {
		this.noteRate = noteRate;
	}
	
}
