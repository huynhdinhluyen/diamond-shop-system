package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "diamond")
public class Diamond {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "color", nullable = false, length = 25)
    private String color;

    @Nationalized
    @Column(name = "origin", nullable = false, length = 50)
    private String origin;

    @Column(name = "carat_weight", nullable = false, precision = 8, scale = 2)
    private BigDecimal caratWeight;

    @Nationalized
    @Column(name = "cut_type", nullable = false, length = 25)
    private String cutType;

    @Column(name = "clarity", nullable = false, length = 10)
    private String clarity;

    @Column(name = "GIA_certificate", nullable = false)
    private String giaCertificate;

    @Column(name = "price", nullable = false)
    private Long price;

}