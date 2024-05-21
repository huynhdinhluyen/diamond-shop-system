package com.example.backend.serviceImplementation;

import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.Product;
import com.example.backend.repository.DiamondCasingRepository;
import com.example.backend.repository.DiamondRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductServiceImp implements ProductService {

    private ProductRepository productRepository;
    private DiamondRepository diamondRepository;
    private DiamondCasingRepository diamondCasingRepository;


    @Override
    public ProductDTO convertToDTO(Product product) {
            Long costPrice = calculateCostPrice(product);
            Long salePrice = calculateSalePrice(product);
            return new ProductDTO(product.getId(), product.getName(), product.getImageUrl(), costPrice, salePrice);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProducts() {
        return List.of();
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
