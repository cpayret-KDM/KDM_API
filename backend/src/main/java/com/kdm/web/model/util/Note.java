package com.kdm.web.model.util;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class Note {

	@JsonProperty
	@NotBlank
	@Size(max = 256)
	private String note;
	
	
	public String toString() {
		return this.note;
	}
}
