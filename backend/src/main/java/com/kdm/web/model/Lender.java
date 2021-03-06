package com.kdm.web.model;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.envers.Audited;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.kdm.web.util.View;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Lender", schema = "public")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Audited
public class Lender {
	
	@JsonProperty(value = "id")
	@Id
	@Column(name = "lenderID")
	@SequenceGenerator(name="Lender_lenderID_seq", sequenceName="Lender_lenderID_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "Lender_lenderID_seq")
	@JsonView(View.ExtendedBasic.class)
	private Long id;
	
	@JsonProperty(value = "initialAmount")
	@Column(precision = 12, scale = 2)
	@JsonView(View.Basic.class)
	private BigDecimal initialAmount;
	
	@JsonProperty(value = "principalBalance")
	@Column(precision = 12, scale = 2)
	@JsonView(View.Basic.class)
	private BigDecimal principalBalance;
	
	@JsonProperty(value = "name")
	@Column(length = 256, nullable = true)
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String name;
	
	@JsonProperty(value = "lenderRate")
	@Column(precision = 6, scale = 3)
	@JsonView(View.Basic.class)
	private BigDecimal lenderRate;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loanID", referencedColumnName = "loanID", nullable = true)
	private Loan loan;
	
	@JsonProperty
	@Column(name = "loanID", insertable = false, updatable = false)
	@JsonView(View.Basic.class)
	private Long loanId;
	
}
