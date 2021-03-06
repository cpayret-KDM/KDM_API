package com.kdm.web.model;

import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.envers.Audited;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.annotation.JsonView;
import com.kdm.web.security.SecurityUtil;
import com.kdm.web.util.View;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Address", schema = "public")
@JsonRootName("address")
@JsonView
@Getter @Setter @NoArgsConstructor @EqualsAndHashCode @AllArgsConstructor @Builder
@Audited
public class Address {
	
	@JsonProperty(value="id")
	@Id
	@Column(name = "addressID")
	@SequenceGenerator(name="Address_addressID_seq", sequenceName="Address_addressID_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "Address_addressID_seq")
	@JsonView(View.ExtendedBasic.class)
	private Long id;
	
	@JsonProperty
	@Column(name = "street1")
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String street1;
	
	@JsonProperty
	@Column(name = "street2")
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String street2;
	
	@JsonProperty
	@Column(name = "city")
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String city;
	
	@JsonProperty
	@Column(name = "state")
	@Size(max = 256)
	@NotBlank
	@JsonView(View.Basic.class)
	private String state;
	
	@JsonProperty
	@Column(name = "zip")
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String zip;
	
	@JsonProperty
	@Column(name = "name")
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String name;

	@JsonProperty(value = "createdAt")
	@Column(name = "createdAt", precision = 5, scale = 2, updatable = false, nullable = false)
	@JsonView(View.ReadOnly.class)
	private ZonedDateTime createdAt;

	@JsonProperty(value = "updatedAt")
	@Column(name = "updatedAt", precision = 5, scale = 2, nullable = false)
	@JsonView(View.ReadOnly.class)
	private ZonedDateTime updatedAt;

	@JsonProperty(value = "createdBy")
	@Column(name = "createdBy", nullable = false, updatable = false)
	@JsonView(View.ReadOnly.class)
	private String createdBy;

	@JsonProperty(value = "updatedBy")
	@Column(name = "updatedBy", nullable = false)
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
