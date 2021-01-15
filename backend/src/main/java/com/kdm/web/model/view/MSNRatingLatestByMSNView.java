package com.kdm.web.model.view;

import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kdm.web.model.MSN;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="MSNRatingLatestByMSNView", schema = "public")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class MSNRatingLatestByMSNView {

	@JsonIgnore
	@Id
	@Column(name = "msnRatingID")
	private Long id;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "msnID", referencedColumnName = "msnID", nullable = true)
	private MSN msn;
	
	@JsonIgnore
	@Column(name = "msnID", insertable = false, updatable = false)
	private Long msnId;
	
	@JsonProperty(value = "date")
	@Column(nullable = true)
	private ZonedDateTime date;
	
	@JsonProperty(value = "note")
	@Column(length = 256, nullable = true)
	@Size(max = 256)
	private String note;
	
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
}
