package com.kdm.web.model;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.kdm.web.model.view.MSNRatingLatestByMSNView;
import com.kdm.web.util.View;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@JsonView
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class MSN {

	@JsonProperty(value = "id")
	@Id
	@Column(name = "msnID")
	@SequenceGenerator(name="MSN_msnID_seq", sequenceName="MSN_msnID_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "MSN_msnID_seq")
	@JsonView(View.All.class)
	private Long id;
	
	/*
	@JsonProperty
	@ManyToOne
    @JoinColumn(name = "cusipID", referencedColumnName = "cusipID", nullable = false)
	private Cusip cusip;
	*/
	
	@JsonProperty
	@Column
	@JsonView(View.All.class)
	private Long cusipID;
	
	@JsonProperty
	@Column(length = 256)
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String number;
	
	@JsonProperty
	@Column(nullable = true)
	@JsonView(View.Basic.class)
	private ZonedDateTime tradeDate;
	
	@JsonProperty
	@Column(nullable = false)
	@JsonView(View.Basic.class)
	private ZonedDateTime maturityDate;
	
	@JsonProperty
	@Column(precision = 5, scale = 2)
	@JsonView(View.Basic.class)
	private BigDecimal noteRate;
	
	@JsonProperty
	@OneToMany(mappedBy="msn", fetch = FetchType.EAGER, cascade = { CascadeType.ALL }, orphanRemoval = true)
	@JsonView(View.All.class)
	private Set<MSNRatingLatestByMSNView> ratings;
	
}
