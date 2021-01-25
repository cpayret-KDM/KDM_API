package com.kdm.web.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name="CUSIP", schema = "public")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cusip {

    @JsonProperty(value = "id")
    @Id
    @Column(name = "cusipID")
    @SequenceGenerator(name="CUSIP_cusipID_seq", sequenceName="CUSIP_cusipID_seq", allocationSize=1)
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "CUSIP_cusipID_seq")
    private Long id;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @OneToMany(mappedBy="cusip", fetch = FetchType.EAGER)
    private List<MSN> msns;

    @JsonProperty(value = "class")
    @Column(name = "class", length = 256, nullable = true)
    @Size(max = 256)
    private String clazz;

    @JsonProperty(value = "type")
    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private CusipType type;

    @JsonProperty(value = "ticker")
    @Column(name = "ticker", length = 16, nullable = true)
    @Size(max = 16)
    private String ticker;

}
