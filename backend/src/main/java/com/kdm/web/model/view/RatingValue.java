package com.kdm.web.model.view;

import java.time.ZonedDateTime;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RatingValue {

	@JsonProperty(value = "ratingId")
	private Long ratingId;

	@JsonProperty(value = "note")
	private String note;
	
	@JsonProperty(value = "date")
	@Column(nullable = true)
	private ZonedDateTime date;
}
