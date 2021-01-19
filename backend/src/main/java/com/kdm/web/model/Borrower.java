package com.kdm.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Borrower", schema = "public")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Borrower {
	
	@JsonProperty(value = "id")
	@Id
	@Column(name = "borrowerId")
	@SequenceGenerator(name="Borrower_borrowerId_seq", sequenceName="Borrower_borrowerId_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "Borrower_borrowerId_seq")
	private Long id;

	@JsonProperty
	@OneToOne
    @JoinColumn(name = "addressID", referencedColumnName = "addressID", nullable = true)
	@Valid
	private Address address;
	
	@JsonIgnore
	@Column(name = "addressID", insertable = false, updatable = false)
	private Long addressID;
	
	@JsonProperty
	@Column(name = "Company", length = 256)
	@Size(max = 256)
	private String company;
	
	@JsonProperty
	@Column(name = "firstName", length = 256)
	@Size(max = 256)
	private String firstName;
	
	@JsonProperty
	@Column(name = "lastName", length = 256)
	@Size(max = 256)
	private String lastName;
	
	@JsonProperty
	@Column(name = "phone", length = 256)
	@Size(max = 256)
	private String phone;
		
	@JsonProperty
	@Column(name = "email", length = 256)
	@Size(max = 256)
	private String email;

}
