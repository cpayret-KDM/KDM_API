package com.kdm.web.model;

import java.time.ZonedDateTime;

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
import com.fasterxml.jackson.annotation.JsonView;
import com.kdm.web.security.SecurityUtil;
import com.kdm.web.util.View;

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

	@JsonProperty(value="id")
	@Id
	@Column(name = "sponsorID")
	@SequenceGenerator(name="Sponsor_sponsorID_seq", sequenceName="Sponsor_sponsorID_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "Sponsor_sponsorID_seq")
	@JsonView(View.ExtendedBasic.class)
	private Long id;
	
	@JsonProperty
	@OneToOne
    @JoinColumn(name = "addressId", referencedColumnName = "addressID", nullable = true)
	@JsonView(View.Basic.class)
	private Address address;
	
	@JsonIgnore
	@Column(name = "addressId", insertable = false, updatable = false)
	private Long addressId;
	
	@JsonProperty
	@Column(name = "Company")
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String company;
	
	@JsonProperty
	@Column
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String firstName;
	
	@JsonProperty
	@Column
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String lastName;
	
	@JsonProperty
	@Column
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String phone;
	
	@JsonProperty
	@Column
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String email;
	
	@JsonProperty
	@Column
	@Size(max = 64)
	@JsonView(View.Basic.class)
	private String registrationState;

	@JsonProperty(value = "createdAt")
	@Column(name = "createdAt", precision = 5, scale = 2, updatable = false, nullable = false)
	@JsonView(View.ReadOnly.class)
	private ZonedDateTime createdAt;

	@JsonProperty(value = "updatedAt")
	@Column(name = "updatedAt", precision = 5, scale = 2, updatable = false, nullable = false)
	@JsonView(View.ReadOnly.class)
	private ZonedDateTime updatedAt;

	@JsonProperty(value = "createdBy")
	@Column(name = "createdBy", insertable = false, updatable = false)
	@JsonView(View.ReadOnly.class)
	private String createdBy;

	@JsonProperty(value = "updatedBy")
	@Column(name = "updatedBy", insertable = false, updatable = false)
	@JsonView(View.ReadOnly.class)
	private String updatedBy;

	@PrePersist
	public void prePersist() {
		this.createdAt = ZonedDateTime.now();
		this.updatedAt = this.createdAt;
		this.createdBy = SecurityUtil.getSystemOrLoggedInUserName();
		this.updatedBy = this.createdBy;
	}

	@PreUpdate
	public void preUpdate() {
		this.updatedAt = ZonedDateTime.now();
		this.updatedBy = SecurityUtil.getSystemOrLoggedInUserName();
	}

}
