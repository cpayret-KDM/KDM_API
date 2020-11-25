package com.kdm.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="Property", schema = "public")
public class Property {

	@JsonProperty(value = "id")
	@Id
	@Column(name = "propertyID")
	private Long id;

	@JsonProperty
	@OneToOne
    @JoinColumn(name = "addressID", referencedColumnName = "addressID", nullable = true)
	private Address address;
	
	@JsonIgnore
	@Column(name = "addressID", insertable = false, updatable = false)
	private Long addressID;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loanID", referencedColumnName = "loanID", nullable = true)
	private Loan loan;
	
	@JsonProperty
	@Column(name = "loanID", insertable = false, updatable = false)
	private Long loanId;
	
	@JsonProperty
	@Column(name = "borrowerID")
	private Long borrowerID;
	
	@JsonProperty(value = "type")
	@Enumerated(EnumType.STRING)
	@Column(name = "type")
	private PropertyType type;

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

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public PropertyType getType() {
		return type;
	}

	public void setType(PropertyType type) {
		this.type = type;
	}

}
