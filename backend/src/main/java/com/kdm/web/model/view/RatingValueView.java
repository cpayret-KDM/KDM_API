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
	
	public int compareTo(RatingValueView that) {
		if (that == null) {
			return 1;
		}
		
		return this.id.compareTo(that.getId());
	}
}
