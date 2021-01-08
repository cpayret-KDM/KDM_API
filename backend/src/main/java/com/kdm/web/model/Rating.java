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
	
}
