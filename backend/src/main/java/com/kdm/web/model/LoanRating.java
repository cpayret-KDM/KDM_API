package com.kdm.web.model;

import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.kdm.web.security.SecurityUtil;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Loan_Rating", schema = "public")
@JsonRootName("loanRating")
@Getter @Setter @NoArgsConstructor @EqualsAndHashCode @AllArgsConstructor @Builder
public class LoanRating {

	@JsonProperty(value="id")
	@Id
	@Column(name = "loanRatingID")
	@SequenceGenerator(name="Loan_Rating_loanRatingID_seq", sequenceName="Loan_Rating_loanRatingID_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "Loan_Rating_loanRatingID_seq")
	private Long id;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loanID", referencedColumnName = "loanID", nullable = true)
	private Loan loan;
	
	@JsonProperty
	@Column(name = "loanID", insertable = false, updatable = false)
	private Long loanId;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ratingID", referencedColumnName = "ratingID", nullable = true)
	private Rating rating;
	
	@JsonProperty
	@Column(name = "ratingID", insertable = false, updatable = false)
	private Long ratingId;
	
	@JsonProperty(value = "date")
	@Column(name = "date", precision = 5, scale = 2, updatable = false, nullable = false)
	private ZonedDateTime date;
	
	@JsonProperty
	@Column(name = "note", nullable = true)
	@Size(max = 256)
	private String note;

	@JsonProperty(value = "createdAt")
	@Column(name = "createdAt", precision = 5, scale = 2, updatable = false, nullable = false)
	private ZonedDateTime createdAt;

	@JsonProperty(value = "updatedAt")
	@Column(name = "updatedAt", precision = 5, scale = 2, nullable = false)
	private ZonedDateTime updatedAt;

	@JsonProperty(value = "createdBy")
	@Column(name = "createdBy", nullable = false, updatable = false)
	private String createdBy;

	@JsonProperty(value = "updatedBy")
	@Column(name = "updatedBy", nullable = false)
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
