package com.example.backend.service.impl;

import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.Product;
import com.example.backend.repository.DiamondCasingRepository;
import com.example.backend.repository.DiamondRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImp implements ProductService {

    private final ProductRepository productRepository;
    private final DiamondRepository diamondRepository;
    private final DiamondCasingRepository diamondCasingRepository;


    @Override
    public ProductDTO convertToDTO(Product product) {
            Long costPrice = this.calculateCostPrice(product);
            Long salePrice = this.calculateSalePrice(product);
            return new ProductDTO(product.getId(), product.getName(), product.getImageUrl(), costPrice, salePrice);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDTO getProductById(Integer id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            return convertToDTO(product);
        } else {
            return null;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Long countProducts() {
        return productRepository.count();
    }

//    @Override
//    public ProductDTO addProduct(ProductDTO product) {
//
//    }


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
