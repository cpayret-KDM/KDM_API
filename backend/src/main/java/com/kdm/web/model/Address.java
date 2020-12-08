package com.kdm.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Address", schema = "public")
@JsonRootName("address")
@Getter @Setter @NoArgsConstructor @EqualsAndHashCode
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
	@NotBlank
	private String city;
	
	@JsonProperty
	@Column(name = "state")
	@Size(max = 256)
	@NotBlank
	private String state;
	
	@JsonProperty
	@Column(name = "zip")
	@Size(max = 256)
	private String zip;
	
	@JsonProperty
	@Column(name = "name")
	@Size(max = 256)
	private String name;	

}
