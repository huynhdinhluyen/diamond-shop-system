package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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
    private WarrantyDTO warranty;
    private DiamondCasingDTO diamondCasing;
    private Long costPrice;
    private Long salePrice;
    private DiamondDTO mainDiamond;
    private List<DiamondDTO> auxiliaryDiamonds;

    public List<DiamondDTO> getDiamonds() {
        List<DiamondDTO> allDiamonds = new ArrayList<>();
        if (mainDiamond != null) {
            allDiamonds.add(mainDiamond);
        }
        allDiamonds.addAll(auxiliaryDiamonds);
        return allDiamonds;
    }
}

// Test
// Test conflict

