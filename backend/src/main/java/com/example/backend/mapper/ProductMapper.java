package com.example.backend.mapper;

import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.Product;

public class ProductMapper {
    public static ProductDTO maptoDto(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getImageUrl(),
                product.getCostPrice(),
                product.getSalePrice()
        );
    }

//    public static Product maptoProductEntity(ProductDTO productDTO) {
//        return new Product(
//                productDTO.getId(),
//                productDTO.getName(),
//                productDTO.getImageUrl(),
//                productDTO.getCostPrice(),
//                productDTO.getSalePrice()
//        );
//    }
}
