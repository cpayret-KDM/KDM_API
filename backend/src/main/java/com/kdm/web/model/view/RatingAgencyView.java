package com.kdm.web.model.view;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RatingAgencyView {

	@JsonProperty(value = "name")
	private String name;
	
	@JsonProperty(value = "ratings")
	private List<RatingValueView> ratings;
	
}
