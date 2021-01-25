package com.kdm.web.model;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.kdm.web.model.view.MSNRatingLatestByMSNView;
import lombok.*;

@JsonRootName("msn")
@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MSN {

    @JsonProperty(value = "id")
    @Id
    @Column(name = "msnID")
    @SequenceGenerator(name="MSN_msnID_seq", sequenceName="MSN_msnID_seq", allocationSize=1)
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "MSN_msnID_seq")
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cusipID", referencedColumnName = "cusipID", nullable = false)
    private Cusip cusip;

    @JsonProperty
    @Column(length = 256)
    @Size(max = 256)
    private String number;

    @JsonProperty
    @Column(nullable = true)
    private ZonedDateTime tradeDate;

    @JsonProperty
    @Column(nullable = false)
    private ZonedDateTime maturityDate;

    @JsonProperty
    @Column(precision = 5, scale = 2)
    private BigDecimal noteRate;

    @JsonProperty
    @OneToMany(mappedBy="msn", fetch = FetchType.EAGER, cascade = { CascadeType.ALL }, orphanRemoval = true)
    private Set<MSNRatingLatestByMSNView> ratings;

}
