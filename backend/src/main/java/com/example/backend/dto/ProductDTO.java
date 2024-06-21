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
public class ProductDTO {
    private Integer id;
    private String name;
    private String imageUrl;
    private Long laborCost;
    private BigDecimal profitMargin;
    private int stockQuantity;
    private PromotionDTO promotion;
    private DiamondCasingDTO diamondCasing;
    private Long costPrice;
    private Long salePrice;
    private DiamondDTO mainDiamond;
    private DiamondDTO auxiliaryDiamond;
    private CategoryDTO category;
}
