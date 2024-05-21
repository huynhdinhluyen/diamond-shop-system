package com.example.backend.service;

import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.Product;
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
        return new ProductDTO(product.getId(), product.getName(), product.getImageUrl(), costPrice, salePrice);
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
