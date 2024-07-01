package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MembershipLevelDTO {
    private Integer id;
    private String name;
    private Integer minPoints;
    private Integer maxPoints;
    private BigDecimal discountRate;
}
