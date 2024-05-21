package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.entity.DiamondCasing;
import com.example.backend.entity.Product;
import com.example.backend.entity.ProductDiamond;
import com.example.backend.repository.DiamondCasingRepository;
import com.example.backend.repository.DiamondRepository;
import com.example.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private DiamondRepository diamondRepository;
    @Autowired
    private DiamondCasingRepository diamondCasingRepository;

    private ProductDTO convertToDTO(Product product) {
        Long costPrice = calculateCostPrice(product);
        Long salePrice = calculateSalePrice(product);

        DiamondDTO mainDiamondDTO = product.getProductDiamonds().stream()
                .filter(ProductDiamond::getIsMain)
                .findFirst()
                .map(productDiamond -> new DiamondDTO(
                        productDiamond.getDiamond().getId(),
                        productDiamond.getDiamond().getColor(),
                        productDiamond.getDiamond().getOrigin(),
                        productDiamond.getDiamond().getCaratWeight(),
                        productDiamond.getDiamond().getCutType(),
                        productDiamond.getDiamond().getClarity(),
                        productDiamond.getDiamond().getGiaCertificate(),
                        productDiamond.getDiamond().getPrice()
                ))
                .orElse(null);

        // Lấy danh sách kim cương phụ (nếu có)
        List<DiamondDTO> auxiliaryDiamondDTOs = product.getProductDiamonds().stream()
                .filter(productDiamond -> !productDiamond.getIsMain())
                .map(productDiamond -> new DiamondDTO(
                        productDiamond.getDiamond().getId(),
                        productDiamond.getDiamond().getColor(),
                        productDiamond.getDiamond().getOrigin(),
                        productDiamond.getDiamond().getCaratWeight(),
                        productDiamond.getDiamond().getCutType(),
                        productDiamond.getDiamond().getClarity(),
                        productDiamond.getDiamond().getGiaCertificate(),
                        productDiamond.getDiamond().getPrice()
                ))
                .collect(Collectors.toList());

        DiamondCasing diamondCasing = product.getDiamondCasing();
        DiamondCasingDTO diamondCasingDTO = null;
        if (diamondCasing != null) {
            diamondCasingDTO = new DiamondCasingDTO(
                    diamondCasing.getId(),
                    diamondCasing.getMaterial(),
                    diamondCasing.getPrice(),
                    diamondCasing.getCategory() != null ? new CategoryDTO(diamondCasing.getCategory().getId(), diamondCasing.getCategory().getName(), diamondCasing.getCategory().getImageUrl()) : null,
                    diamondCasing.getSize() != null ? new SizeDTO(diamondCasing.getSize().getId(), diamondCasing.getSize().getName(), diamondCasing.getSize().getDiameter()) : null
            );
        }

        PromotionDTO promotionDTO = null;
        if (product.getPromotion() != null) {
            promotionDTO = new PromotionDTO(
                    product.getPromotion().getId(),
                    product.getPromotion().getName(),
                    product.getPromotion().getDescription(),
                    product.getPromotion().getDiscountRate(),
                    product.getPromotion().getStartDate(),
                    product.getPromotion().getEndDate()
            );
        }

        WarrantyDTO warrantyDTO = null;
        if (product.getWarranty() != null) {
            warrantyDTO = new WarrantyDTO(
                    product.getWarranty().getId(),
                    product.getWarranty().getWarrantyFree(),
                    product.getWarranty().getWarrantyPaid(),
                    product.getWarranty().getWarrantyExcluded(),
                    product.getWarranty().getWarrantyStartDate(),
                    product.getWarranty().getWarrantyEndDate(),
                    product.getWarranty().getCategory() != null ? new CategoryDTO(product.getWarranty().getCategory().getId(), product.getWarranty().getCategory().getName(), product.getWarranty().getCategory().getImageUrl()) : null
            );
        }

        return new ProductDTO(product.getId(),
                diamondCasingDTO,
                product.getName(),
                product.getImageUrl(),
                product.getLaborCost(),
                product.getProfitMargin(),
                product.getStockQuantity(),
                promotionDTO,
                warrantyDTO,
                mainDiamondDTO,
                auxiliaryDiamondDTOs,
                salePrice);
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDTO getProductById(Integer id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            return convertToDTO(product);
        } else {
            return null;
        }
    }

    private Long calculateCostPrice(Product product) {
        long diamondPrice = product.getProductDiamonds().stream()
                .mapToLong(productDiamond -> productDiamond.getDiamond().getPrice())
                .sum();
        long casingPrice = product.getDiamondCasing().getPrice();
        return diamondPrice + casingPrice + product.getLaborCost();
    }

    private Long calculateSalePrice(Product product) {
        long costPrice = calculateCostPrice(product);
        BigDecimal salePriceDecimal = BigDecimal.valueOf(costPrice)
                .multiply(BigDecimal.ONE.add(product.getProfitMargin()));
        return salePriceDecimal.longValue();
    }
}
