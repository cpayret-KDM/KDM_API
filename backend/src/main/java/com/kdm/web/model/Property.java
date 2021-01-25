package com.kdm.web.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kdm.web.model.view.LatestAppraisalView;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Property", schema = "public")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Property {

	@JsonProperty(value = "id")
	@Id
	@Column(name = "propertyID")
	@SequenceGenerator(name="Property_propertyID_seq", sequenceName="Property_propertyID_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "Property_propertyID_seq")
	private Long id;

	@JsonProperty
	@OneToOne
    @JoinColumn(name = "addressID", referencedColumnName = "addressID", nullable = true)
	@Valid
	private Address address;
	
	@JsonIgnore
	@Column(name = "addressID", insertable = false, updatable = false)
	private Long addressID;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loanID", referencedColumnName = "loanID", nullable = true)
	private Loan loan;
	
	@JsonProperty
	@Column(name = "loanID", insertable = false, updatable = false)
	private Long loanId;
	
	@JsonProperty
	@Column(name = "borrowerID", insertable = false, updatable = false)
	private Long borrowerId;
	
	@JsonProperty
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "borrowerID", referencedColumnName = "borrowerId", nullable = true)
	private Borrower borrower;
	
	@JsonProperty(value = "type")
	@Enumerated(EnumType.STRING)
	@Column(name = "type")
	private PropertyType type;
	
	@OneToOne(mappedBy="property", fetch = FetchType.EAGER, cascade = { CascadeType.ALL }, orphanRemoval = true)
	private LatestAppraisalView appraisal;
		
	/*  use this one for historical, maybe ?
	@JsonProperty
	@OneToMany(mappedBy="property", fetch = FetchType.EAGER, cascade = { CascadeType.ALL }, orphanRemoval = true)
	private List<LatestAppraisalView> appraisals;
	*/

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((addressID == null) ? 0 : addressID.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Property other = (Property) obj;
		if (addressID == null) {
			if (other.addressID != null)
				return false;
		} else if (!addressID.equals(other.addressID))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (type != other.type)
			return false;
		return true;
	}


}
