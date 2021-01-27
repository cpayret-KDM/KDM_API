package com.kdm.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.SequenceGenerator;
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

import java.time.ZonedDateTime;

@Entity
@Table(name="Sponsor", schema = "public")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Sponsor {

	@JsonProperty(value="id")
	@Id
	@Column(name = "sponsorID")
	@SequenceGenerator(name="Sponsor_sponsorID_seq", sequenceName="Sponsor_sponsorID_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "Sponsor_sponsorID_seq")
	private Long id;
	
	@JsonProperty
	@OneToOne
    @JoinColumn(name = "addressId", referencedColumnName = "addressID", nullable = true)
	private Address address;
	
	@JsonIgnore
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

	@JsonProperty(value = "createdAt")
	@Column(name = "createdAt", precision = 5, scale = 2, updatable = false, nullable = false)
	private ZonedDateTime createdAt;

	@JsonProperty(value = "updatedAt")
	@Column(name = "updatedAt", precision = 5, scale = 2, updatable = false, nullable = false)
	private ZonedDateTime updatedAt;

	/* use once createdBy and updatedBy are being populated with user data
	@JsonProperty(value = "createdBy")
	@Column(name = "createdBy", insertable = false, updatable = false)
	private String createdBy;

	@JsonProperty(value = "updatedBy")
	@Column(name = "updatedBy", insertable = false, updatable = false)
	private String updatedBy;
	*/

	@PrePersist
	public void prePersist() {
		this.createdAt = ZonedDateTime.now();
		this.updatedAt = this.createdAt;
	}

	@PreUpdate
	public void preUpdate() {
		this.updatedAt = ZonedDateTime.now();
	}

}
