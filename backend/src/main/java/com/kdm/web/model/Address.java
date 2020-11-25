package com.kdm.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="Address", schema = "public")
public class Address {
	
	@JsonProperty(value="id")
	@Id
	@Column(name = "addressID")
	@SequenceGenerator(name="Address_addressID_seq", sequenceName="Address_addressID_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "Address_addressID_seq")
	private Long id;
	
	@JsonProperty
	@Column(name = "street1")
	@Size(max = 256)
	private String street1;
	
	@JsonProperty
	@Column(name = "street2")
	@Size(max = 256)
	private String street2;
	
	@JsonProperty
	@Column(name = "city")
	@Size(max = 256)
	private String city;
	
	@JsonProperty
	@Column(name = "state")
	@Size(max = 256)
	private String state;
	
	@JsonProperty
	@Column(name = "zip")
	@Size(max = 256)
	private String zip;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStreet1() {
		return street1;
	}

	public void setStreet1(String street1) {
		this.street1 = street1;
	}

	public String getStreet2() {
		return street2;
	}

	public void setStreet2(String street2) {
		this.street2 = street2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}
	
}
