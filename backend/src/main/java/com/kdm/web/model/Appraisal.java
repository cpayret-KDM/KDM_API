package com.kdm.web.model;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
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
@Table(name="Appraisal", schema = "public")
@JsonRootName("appraisal")
@Getter @Setter @NoArgsConstructor @EqualsAndHashCode @AllArgsConstructor @Builder
public class Appraisal {

	@JsonProperty(value="id")
	@Id
	@Column(name = "appraisalID")
	@SequenceGenerator(name="Appraisal_appraisalID_seq", sequenceName="Appraisal_appraisalID_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "Appraisal_appraisalID_seq")
	private Long id;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "propertyID", referencedColumnName = "propertyID", nullable = true)
	private Property property;
	
	@JsonProperty
	@Column(name = "propertyID", insertable = false, updatable = false)
	private Long propertyId;
	
	@JsonProperty
	@Column(name = "note", nullable = true)
	@Size(max = 256)
	private String note;
	
	@JsonProperty(value = "value")
	@Column(name = "value", precision = 5, scale = 2, nullable = false)
	private BigDecimal value;
	
	@JsonProperty(value = "date")
	@Column(name = "date", precision = 5, scale = 2, updatable = false, nullable = false)
	private ZonedDateTime date;
	
	@PrePersist
    public void prePersist() {
        this.date = ZonedDateTime.now();
    }
	
}