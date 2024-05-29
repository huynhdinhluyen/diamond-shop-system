package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiamondCasingDTO {
    private Integer id;
    private String material;
    private Long price;
    private CategoryDTO category;
    private SizeDTO size;
}
