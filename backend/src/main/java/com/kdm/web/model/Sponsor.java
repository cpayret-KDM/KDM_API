package com.kdm.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="Sponsor", schema = "public")
public class Sponsor {

	@JsonProperty
	@Id
	@Column(name = "sponsorID")
	private Long id;
	
	/*
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "addressId", referencedColumnName = "addressId", nullable = true)
	private Address address;
	*/
	
	@JsonProperty
	@Column(name = "addressId"/*, insertable = false, updatable = false*/)
	private Long addressId;
	
	@JsonProperty
	@Column(name = "Company")
	@Size(max = 256)
	private String company;
	
	@JsonProperty
	@Column
	@Size(max = 256)
	private String firstName;
	
	@JsonProperty
	@Column
	@Size(max = 256)
	private String lastName;
	
	@JsonProperty
	@Column
	@Size(max = 256)
	private String phone;
	
	@JsonProperty
	@Column
	@Size(max = 256)
	private String email;
	
	@JsonProperty
	@Column
	@Size(max = 64)
	private String registrationState;
	
	public Sponsor() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAddressId() {
		return addressId;
	}

	public void setAddressId(Long addressId) {
		this.addressId = addressId;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRegistrationState() {
		return registrationState;
	}

	public void setRegistrationState(String registrationState) {
		this.registrationState = registrationState;
	}

}
