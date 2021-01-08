package com.kdm.web.model;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kdm.web.model.view.LoanRatingLatestByLoanView;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Loan", schema = "public")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Loan {

	@JsonProperty(value = "id")
	@Id
	@Column(name = "loanID")
	@SequenceGenerator(name="Loan_loanID_seq", sequenceName="Loan_loanID_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "Loan_loanID_seq")
	private Long id;
	
	@JsonProperty
	@OneToMany(mappedBy="loan", fetch = FetchType.EAGER, cascade = { CascadeType.ALL }, orphanRemoval = true)
	private List<Property> properties;
	
	@JsonProperty
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sponsorID", referencedColumnName = "sponsorID", nullable = true)
	private Sponsor sponsor;
	
	@JsonProperty
	@Column(name = "sponsorID", insertable = false, updatable = false)
	private Long sponsorID;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "msnID", referencedColumnName = "msnID", nullable = true)
	private MSN msn;
	
	@JsonProperty
	@Column(name = "msnID", insertable = false, updatable = false)
	private Long msnId;
	
	@JsonProperty(value = "loanNumber")
	@Column(name = "loanNumber", length = 16)
	@Size(max = 16)
	private String loanNumber;
	
	@JsonProperty(value = "dealName")
	@Column(length = 256, nullable = true)
	@Size(max = 256)
	private String dealName;
	
	@JsonProperty(value = "originationDate")
	@Column(nullable = true)
	private ZonedDateTime originationDate;
	
	@JsonProperty(value = "maturityDate")
	@Column
	private ZonedDateTime maturityDate;
	
	@JsonProperty(value = "tradeDate")
	@Column(nullable = true)
	private ZonedDateTime tradeDate;
	
	@JsonProperty(value = "loanStatus")
	@Enumerated(EnumType.STRING)
	private LoanStatus loanStatus;
	
	@JsonProperty(value = "initialAmount")
	@Column(precision = 12, scale = 2)
	private BigDecimal initialAmount;
	
	@JsonProperty(value = "pipelineStatus")
	@Enumerated(EnumType.STRING)
	private PipelineStatus pipelineStatus;
	
	@JsonProperty(value = "ltv")
	@Column(name = "LTV", precision = 5, scale = 2)
	private BigDecimal ltv;
	
	@JsonProperty(value = "loanRate")
	@Column(precision = 5, scale = 2)
	private BigDecimal loanRate;
	
	@JsonProperty(value = "memoUrl")
	@Column(name = "memoURL", length = 256, nullable = true)
	@Size(max = 256)
	private String memoUrl;
	
	@JsonProperty(value = "KDMRating")
	@Column(name="KDMRating")
	@Size(max = 256)
	private String kdmRating;
	
	@JsonProperty(value = "prepayMonths")
	@Column(name = "prepayMonths")
	private Long prepayMonths;
	
	@Column(name = "loanTermMonths")
	private Long loanTermMonths;
	
	@JsonProperty(value = "principalBalance")
	@Column(precision = 12, scale = 2)
	private BigDecimal principalBalance;
	
	@JsonProperty
	@OneToMany(mappedBy="loan", fetch = FetchType.EAGER, cascade = { CascadeType.ALL }, orphanRemoval = true)
	private Set<LoanRatingLatestByLoanView> ratings;
	
	public void addProperty(Property property) {
		if (this.properties == null) {
			this.properties = new ArrayList<>();
		}
		
		if (!this.properties.contains(property)) {
			this.properties.add(property);
		}
		
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((loanNumber == null) ? 0 : loanNumber.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Loan other = (Loan) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (loanNumber == null) {
			if (other.loanNumber != null)
				return false;
		} else if (!loanNumber.equals(other.loanNumber))
			return false;
		return true;
	}
	
}
