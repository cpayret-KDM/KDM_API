package com.kdm.web.model;

import java.time.ZonedDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Rating", schema = "public")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Rating {

	@JsonProperty(value = "id")
	@Id
	@Column(name = "ratingID")
	@SequenceGenerator(name="Rating_ratingID_seq", sequenceName="Rating_ratingID_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "Rating_ratingID_seq")
	private Long id;
	
	@JsonProperty(value = "agency")
	@Column(length = 256, nullable = false)
	@Size(max = 256)
	@NotBlank
	private String agency;
	
	@JsonProperty(value = "rating")
	@Column(length = 8, nullable = false)
	@Size(max = 8)
	@NotBlank
	private String rating;
	
	@JsonIgnore
	@OneToMany(mappedBy = "rating", fetch = FetchType.LAZY)
	private Set<LoanRating> loanRatings;
	
	public void addLoanRating(LoanRating loanRating) {
		if (this.loanRatings == null) {
			this.loanRatings = new LinkedHashSet<LoanRating>();
		}
		this.loanRatings.add(loanRating);
	}

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
