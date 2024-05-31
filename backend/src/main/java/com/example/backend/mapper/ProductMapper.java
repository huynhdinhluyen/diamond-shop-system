package com.example.backend.mapper;
import com.example.backend.dto.DiamondDTO;
import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.*;
import com.example.backend.exception.PromotionNotFoundException;
import com.example.backend.exception.WarrantyNotFoundException;
import com.example.backend.repository.DiamondRepository;
import com.example.backend.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class ProductMapper {
    @Autowired
    private DiamondCasingMapper diamondCasingMapper;
    @Autowired
    private PromotionMapper promotionMapper;
    @Autowired
    private WarrantyMapper warrantyMapper;
    @Autowired
    private DiamondMapper diamondMapper;
    @Autowired
    private DiamondRepository diamondRepository;
    @Autowired
    private PromotionRepository promotionRepository;

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
        productDTO.setDiamondCasing(diamondCasingMapper.toDto(product.getDiamondCasing()));

        List<DiamondDTO> diamondDTOs = product.getProductDiamonds().stream()
                .map(productDiamond -> diamondMapper.toDto(productDiamond.getDiamond()))
                .toList();

        productDTO.setMainDiamond(diamondDTOs.stream()
                .filter(diamondDTO -> product.getProductDiamonds().stream()
                        .filter(pd -> pd.getDiamond().getId().equals(diamondDTO.getId()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Product diamond not found"))
                        .getIsMain())
                .findFirst()
                .orElse(null));

        productDTO.setAuxiliaryDiamonds(diamondDTOs.stream()
                .filter(diamondDTO -> !product.getProductDiamonds().stream()
                        .filter(pd -> pd.getDiamond().getId().equals(diamondDTO.getId()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Product diamond not found"))
                        .getIsMain())
                .collect(Collectors.toList()));

        if (product.getPromotion() != null) {
            productDTO.setPromotion(promotionMapper.toDto(product.getPromotion()));
        } else {
            productDTO.setPromotion(null); // Or set a default PromotionDTO
        }

        productDTO.setWarranty(
                Optional.ofNullable(product.getWarranty())
                        .map(warrantyMapper::toDto)
                        .orElseThrow(() -> new WarrantyNotFoundException(product.getWarranty().getId()))
        );

        Long costPrice = calculateCostPrice(product);
        Long salePrice = calculateSalePrice(product, costPrice);
        productDTO.setCostPrice(costPrice);
        productDTO.setSalePrice(salePrice);

        return productDTO;

    }
    public Product toEntity(ProductDTO productDTO) {
        if (productDTO == null) {
            throw new IllegalArgumentException("ProductDTO cannot be null");
        }

        Product product = new Product();

        // Copy basic properties directly
        product.setId(productDTO.getId());
        product.setName(productDTO.getName());
        product.setImageUrl(productDTO.getImageUrl());
        product.setLaborCost(productDTO.getLaborCost());
        product.setProfitMargin(productDTO.getProfitMargin());
        product.setStockQuantity(productDTO.getStockQuantity());

        // Handle Diamond Casing (requires database lookup or creation)
        product.setDiamondCasing(diamondCasingMapper.toEntity(productDTO.getDiamondCasing()));

        // Handle Promotion (requires database lookup or creation)
        product.setPromotion(productDTO.getPromotion() != null ? promotionRepository.findById(productDTO.getPromotion().getId())
                .orElseThrow(() -> new PromotionNotFoundException(productDTO.getPromotion().getId())) : null);

        // Handle Warranty (requires database lookup or creation)
        product.setWarranty(warrantyMapper.toEntity(productDTO.getWarranty()));

        // Handle Diamonds (requires database lookup and relationship creation)
        List<ProductDiamond> productDiamonds = new ArrayList<>();
        for (DiamondDTO diamondDTO : productDTO.getDiamonds()) {
            Diamond diamond = diamondRepository.findById(diamondDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Diamond not found"));

            // Tìm ProductDiamond tương ứng với diamondDTO
            Optional<ProductDiamond> productDiamondOptional = product.getProductDiamonds().stream()
                    .filter(pd -> pd.getDiamond().getId().equals(diamondDTO.getId()))
                    .findFirst();

            ProductDiamond productDiamond = productDiamondOptional.orElseGet(() -> new ProductDiamond(product, diamond, false));
            productDiamond.setIsMain(productDTO.getMainDiamond() != null && productDTO.getMainDiamond().getId().equals(diamondDTO.getId()));

            productDiamonds.add(productDiamond);
        }
        product.setProductDiamonds(productDiamonds);

        return product;
    }
    private static Long calculateCostPrice(Product product) {
        long diamondPrice = product.getProductDiamonds().stream()
                .mapToLong(productDiamond -> productDiamond.getDiamond().getPrice())
                .sum();
        long casingPrice = product.getDiamondCasing().getPrice();
        return diamondPrice + casingPrice + product.getLaborCost();
    }
    private static Long calculateSalePrice(Product product, Long costPrice) {
        BigDecimal salePriceDecimal = BigDecimal.valueOf(costPrice)
                .multiply(BigDecimal.ONE.add(product.getProfitMargin()));
        return salePriceDecimal.longValue();
    }


}
