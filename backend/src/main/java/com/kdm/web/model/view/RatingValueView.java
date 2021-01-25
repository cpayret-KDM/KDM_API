package com.kdm.web.model.view;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RatingValueView {

	@JsonProperty(value = "id")
	private Long id;

	@JsonProperty(value = "value")
	private String value;
}
