package com.kdm.web.model.view;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kdm.web.model.Property;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="AppraisalLatestByPropertyView", schema = "public")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class LatestAppraisalView {
	
	@JsonIgnore
	@Id
	@Column(name = "appraisalID")
	private Long id;
	
	@JsonProperty(value = "value")
	@Column(name = "value", precision = 5, scale = 2, nullable = false)
	@NotNull
	private BigDecimal value;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "propertyID", referencedColumnName = "propertyID", nullable = true)
	private Property property;
	
	@JsonIgnore
	@Column(name = "propertyID", insertable = false, updatable = false)
	private Long propertyId;
	
	@JsonProperty(value = "date")
	@Column(nullable = true)
	private ZonedDateTime date;
	
	@JsonProperty(value = "note")
	@Column(length = 256, nullable = true)
	@Size(max = 256)
	private String note;
}
