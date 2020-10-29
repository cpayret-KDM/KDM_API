package com.kdm.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="Property", schema = "public")
public class Property {

	@JsonProperty(value = "id")
	@Id
	@Column(name = "propertyID")
	private Long id;

	@JsonProperty
	@Column(name = "addressID" /*, insertable = false, updatable = false*/)
	private Long addressID;
	
	/*
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loanID", referencedColumnName = "loanID", nullable = true)
	private Loan loan;
	*/
	
	@JsonProperty
	@Column(name = "loanID"/*, insertable = false, updatable = false*/)
	private Long loanId;
	
	@JsonProperty
	@Column(name = "borrowerID")
	private Long borrowerID;
	
	@JsonProperty(value = "type")
	@Column(length = 256, nullable = true)
	@Size(max = 256)
	private String type;

	public Property() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAddressID() {
		return addressID;
	}

	public void setAddressID(Long addressID) {
		this.addressID = addressID;
	}

	public Long getLoanId() {
		return loanId;
	}

	public void setLoanId(Long loanId) {
		this.loanId = loanId;
	}

	public Long getBorrowerID() {
		return borrowerID;
	}

	public void setBorrowerID(Long borrowerID) {
		this.borrowerID = borrowerID;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
