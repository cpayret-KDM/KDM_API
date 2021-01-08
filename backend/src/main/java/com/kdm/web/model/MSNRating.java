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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="MSN_Rating", schema = "public")
@JsonRootName("msnRating")
@Getter @Setter @NoArgsConstructor @EqualsAndHashCode @AllArgsConstructor @Builder
public class MSNRating {

	@JsonProperty(value="id")
	@Id
	@Column(name = "msnRatingID")
	@SequenceGenerator(name="MSN_Rating_msnRatingID_seq", sequenceName="MSN_Rating_msnRatingID_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "MSN_Rating_msnRatingID_seq")
	private Long id;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "msnID", referencedColumnName = "msnID", nullable = true)
	private MSN msn;
	
	@JsonProperty
	@Column(name = "msnID", insertable = false, updatable = false)
	private Long msnId;
	
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
	
}
