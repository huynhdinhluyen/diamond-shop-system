package com.example.backend.mapper;
import com.example.backend.dto.DiamondDTO;
import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.Diamond;
import com.example.backend.entity.DiamondCasing;
import com.example.backend.entity.Product;
import com.example.backend.entity.ProductDiamond;
import com.example.backend.repository.DiamondRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final DiamondCasingMapper diamondCasingMapper;
    private final PromotionMapper promotionMapper;
    private final WarrantyMapper warrantyMapper;
    private final DiamondMapper diamondMapper;
    private final DiamondRepository diamondRepository;

    public ProductDTO toDto(Product product) {
        if (product == null) {
            return null;
        }
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setImageUrl(product.getImageUrl());
        productDTO.setLaborCost(product.getLaborCost());
        productDTO.setProfitMargin(product.getProfitMargin());
        productDTO.setStockQuantity(product.getStockQuantity());
        productDTO.setPromotion(promotionMapper.toDto(product.getPromotion()));
        productDTO.setWarranty(warrantyMapper.toDto(product.getWarranty()));
        productDTO.setDiamondCasing(diamondCasingMapper.toDto(product.getDiamondCasing()));
        for (ProductDiamond pd : product.getProductDiamonds()) {
            DiamondDTO diamondDTO = diamondMapper.toDto(pd.getDiamond());
            if (pd.getIsMain()) {
                productDTO.setMainDiamond(diamondDTO);
            } else {
                productDTO.setAuxiliaryDiamond(diamondDTO);
            }
        }
        productDTO.setCostPrice(calculateCostPrice(product));
        productDTO.setSalePrice(calculateSalePrice(product, productDTO.getCostPrice()));
        return productDTO;
    }

    public Product toEntity(ProductDTO productDTO) {
        if (productDTO == null) {
            throw new IllegalArgumentException("ProductDTO cannot be null");
        }

        Product product = new Product();
        product.setId(productDTO.getId());
        product.setName(productDTO.getName());
        product.setImageUrl(productDTO.getImageUrl());
        product.setLaborCost(productDTO.getLaborCost());
        product.setProfitMargin(productDTO.getProfitMargin());
        product.setStockQuantity(productDTO.getStockQuantity());
        product.setDiamondCasing(diamondCasingMapper.toEntity(productDTO.getDiamondCasing()));
        product.setPromotion(promotionMapper.toEntity(productDTO.getPromotion()));
        product.setWarranty(warrantyMapper.toEntity(productDTO.getWarranty()));

        List<ProductDiamond> productDiamonds = new ArrayList<>();
        if (productDTO.getMainDiamond() != null) {
            Diamond mainDiamond = diamondRepository.findById(productDTO.getMainDiamond().getId())
                    .orElseThrow(() -> new RuntimeException("Main diamond not found"));
            productDiamonds.add(new ProductDiamond(product, mainDiamond, true));
        }
        if (productDTO.getAuxiliaryDiamond() != null) {
            Diamond auxiliaryDiamond = diamondRepository.findById(productDTO.getAuxiliaryDiamond().getId())
                    .orElseThrow(() -> new RuntimeException("Auxiliary diamond not found"));
            productDiamonds.add(new ProductDiamond(product, auxiliaryDiamond, false));
        }
        product.setProductDiamonds(productDiamonds);
        return product;
    }

    public void updateProductFromDto(ProductDTO productDTO, Product product) {
        product.setName(productDTO.getName());
        product.setImageUrl(productDTO.getImageUrl());
        product.setLaborCost(productDTO.getLaborCost());
        product.setProfitMargin(productDTO.getProfitMargin());
        product.setStockQuantity(productDTO.getStockQuantity());

        if (productDTO.getDiamondCasing() != null) {
            product.setDiamondCasing(diamondCasingMapper.toEntity(productDTO.getDiamondCasing()));
        }
        if (productDTO.getPromotion() != null) {
            product.setPromotion(promotionMapper.toEntity(productDTO.getPromotion()));
        }
        if (productDTO.getWarranty() != null) {
            product.setWarranty(warrantyMapper.toEntity(productDTO.getWarranty()));
        }
    }

    private Long calculateCostPrice(Product product) {
        long totalDiamondPrice = product.getProductDiamonds().stream()
                .mapToLong(productDiamond -> productDiamond.getDiamond().getPrice())
                .sum();
        long casingPrice = Optional.ofNullable(product.getDiamondCasing())
                .map(DiamondCasing::getPrice)
                .orElse(0L);
        return totalDiamondPrice + casingPrice + product.getLaborCost();
    }

    private Long calculateSalePrice(Product product, Long costPrice) {
        BigDecimal salePriceDecimal = BigDecimal.valueOf(costPrice)
                .multiply(BigDecimal.ONE.add(product.getProfitMargin()));
        return salePriceDecimal.longValue();
    }
}
