package com.kdm.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Sponsor", schema = "public")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Sponsor {

	@JsonProperty
	@Id
	@Column(name = "sponsorID")
	private Long id;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "addressId", referencedColumnName = "addressID", nullable = true)
	private Address address;
	
	
	@JsonProperty
	@Column(name = "addressId", insertable = false, updatable = false)
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
	
}
