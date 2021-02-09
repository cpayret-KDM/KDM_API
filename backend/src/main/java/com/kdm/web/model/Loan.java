package com.kdm.web.model;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedNativeQuery;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.SequenceGenerator;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.kdm.web.model.view.LoanCashFlow;
import com.kdm.web.model.view.LoanRatingLatestByLoanView;
import com.kdm.web.security.SecurityUtil;
import com.kdm.web.util.View;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@SqlResultSetMapping(
	    name="cashFlowMapping",
	    classes={
	        @ConstructorResult(
	            targetClass=LoanCashFlow.class,
	            columns={
	                @ColumnResult(name="loanNumber", type = String.class),
	                @ColumnResult(name="principalBalance", type = BigDecimal.class),
	                @ColumnResult(name="loanRate", type = BigDecimal.class),
	                @ColumnResult(name="msnRate", type = BigDecimal.class),
	                @ColumnResult(name="anualRevenue", type = BigDecimal.class),
	                @ColumnResult(name="monthlyRevenue", type = BigDecimal.class),
	                @ColumnResult(name="dailyRevenue", type = BigDecimal.class)
	            }
	        )
	    }
	)
@NamedNativeQuery(
		name="getCashFlowReport", 
		query = "SELECT  l.\"loanNumber\", l.\"principalBalance\", l.\"loanRate\", m.\"noteRate\" as \"msnRate\", " + 
			"        (l.\"principalBalance\" * m.\"noteRate\") - (l.\"principalBalance\" * l.\"loanRate\") as \"anualRevenue\", " + 
			"        ((l.\"principalBalance\" * m.\"noteRate\") - (l.\"principalBalance\" * l.\"loanRate\"))/12 as \"monthlyRevenue\", " + 
			"        ((l.\"principalBalance\" * m.\"noteRate\") - (l.\"principalBalance\" * l.\"loanRate\"))/365 as \"dailyRevenue\" " + 
			"FROM    \"Loan\" as l " + 
			"    LEFT JOIN \"MSN\" as m ON l.\"msnID\" = m.\"msnID\" " + 
			"WHERE   l.\"loanStatus\" IN ('PERFORMING') ",
		resultSetMapping = "cashFlowMapping"
		)
@Entity
@Table(name="Loan", schema = "public")
@JsonView
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Loan {

	@JsonProperty(value = "id")
	@Id
	@Column(name = "loanID")
	@SequenceGenerator(name="Loan_loanID_seq", sequenceName="Loan_loanID_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "Loan_loanID_seq")
	@JsonView(View.ExtendedBasic.class)
	private Long id;
	
	@JsonProperty
	@OneToMany(mappedBy="loan", fetch = FetchType.EAGER, cascade = { CascadeType.ALL }, orphanRemoval = true)
	@JsonView(View.All.class)
	private List<Property> properties;
	
	@JsonProperty
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sponsorID", referencedColumnName = "sponsorID", nullable = true)
	@JsonView(View.All.class)
	private Sponsor sponsor;
	
	@JsonProperty
	@Column(name = "sponsorID", insertable = false, updatable = false)
	@JsonView(View.All.class)
	private Long sponsorID;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "msnID", referencedColumnName = "msnID", nullable = true)
	@JsonView(View.All.class)
	private MSN msn;
	
	@JsonProperty
	@Column(name = "msnID", insertable = false, updatable = false)
	@JsonView(View.All.class)
	private Long msnId;
	
	@JsonProperty(value = "loanNumber")
	@Column(name = "loanNumber", length = 16)
	@Size(max = 16)
	@JsonView(View.Basic.class)
	private String loanNumber;
	
	@JsonProperty(value = "dealName")
	@Column(length = 256, nullable = true)
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String dealName;
	
	@JsonProperty(value = "originationDate")
	@Column(nullable = true)
	@JsonView(View.Basic.class)
	private ZonedDateTime originationDate;
	
	@JsonProperty(value = "maturityDate")
	@Column
	@JsonView(View.Basic.class)
	private ZonedDateTime maturityDate;
	
	@JsonProperty(value = "tradeDate")
	@Column(nullable = true)
	@JsonView(View.Basic.class)
	private ZonedDateTime tradeDate;
	
	@JsonProperty(value = "loanStatus")
	@Enumerated(EnumType.STRING)
	@JsonView(View.Basic.class)
	private LoanStatus loanStatus;
	
	@JsonProperty(value = "initialAmount")
	@Column(precision = 12, scale = 2)
	@JsonView(View.Basic.class)
	private BigDecimal initialAmount;
	
	@JsonProperty(value = "pipelineStatus")
	@Enumerated(EnumType.STRING)
	@JsonView(View.Basic.class)
	private PipelineStatus pipelineStatus;
	
	@JsonProperty(value = "ltv")
	@Column(name = "LTV", precision = 5, scale = 2)
	@JsonView(View.Basic.class)
	private BigDecimal ltv;
	
	@JsonProperty(value = "loanRate")
	@Column(precision = 5, scale = 2)
	@JsonView(View.Basic.class)
	private BigDecimal loanRate;
	
	@JsonProperty(value = "memoUrl")
	@Column(name = "memoURL", length = 256, nullable = true)
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String memoUrl;
	
	@JsonProperty(value = "KDMRating")
	@Column(name="KDMRating")
	@Size(max = 256)
	@JsonView(View.Basic.class)
	private String kdmRating;
	
	@JsonProperty(value = "prepayMonths")
	@Column(name = "prepayMonths")
	@JsonView(View.Basic.class)
	private Long prepayMonths;
	
	@Column(name = "loanTermMonths")
	@JsonView(View.Basic.class)
	private Long loanTermMonths;
	
	@JsonProperty(value = "principalBalance")
	@Column(precision = 12, scale = 2)
	@JsonView(View.Basic.class)
	private BigDecimal principalBalance;
	
	@JsonProperty
	@OneToMany(mappedBy="loan", fetch = FetchType.EAGER, cascade = { CascadeType.ALL }, orphanRemoval = true)
	@JsonView(View.All.class)
	private Set<LoanRatingLatestByLoanView> ratings;
		
	@JsonProperty(value = "spread")
	@JsonView(View.All.class)
	public BigDecimal getSpread() {
		if ((this.msn == null) || (this.msn.getNoteRate() == null) || (this.loanRate == null) ){
			return null;	
		}
		
		BigDecimal spread = this.loanRate.subtract(this.msn.getNoteRate()); 
		return spread;
	}

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
