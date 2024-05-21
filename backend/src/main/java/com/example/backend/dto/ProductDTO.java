package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Integer id;
    private DiamondCasingDTO diamondCasing;
    private String name;
    private String imageUrl;
    private Long laborCost;
    private BigDecimal profitMargin;
    private Integer stockQuantity;
    private PromotionDTO promotion;
    private WarrantyDTO warranty;
    private DiamondDTO mainDiamond;
    private List<DiamondDTO> auxiliaryDiamondDTOs;
    private Long salePrice;
}
