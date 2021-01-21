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

@JsonRootName("msn")
@Entity
@Table
public class MSN {

    @Id
    @JsonProperty
    @Column(name = "msnID")
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

    public MSN() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    /*
    public Cusip getCusip() {
        return cusip;
    }

    public void setCusip(Cusip cusip) {
        this.cusip = cusip;
    }
    */

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public ZonedDateTime getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(ZonedDateTime tradeDate) {
        this.tradeDate = tradeDate;
    }

    public ZonedDateTime getMaturityDate() {
        return maturityDate;
    }

    public void setMaturityDate(ZonedDateTime maturityDate) {
        this.maturityDate = maturityDate;
    }

    public BigDecimal getNoteRate() {
        return noteRate;
    }

    public void setNoteRate(BigDecimal noteRate) {
        this.noteRate = noteRate;
    }

}
