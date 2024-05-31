package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiamondDTO {
    private Integer id;
    private String color;
    private String origin;
    private BigDecimal caratWeight;
    private String cutType;
    private String clarity;
    private String giaCertificate;
    private Long price;
}
