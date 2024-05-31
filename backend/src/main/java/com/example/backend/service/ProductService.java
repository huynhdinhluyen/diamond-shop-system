package com.example.backend.service;

import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.Product;
import java.util.List;


public interface ProductService {
    ProductDTO convertToDTO(Product product);
    List<ProductDTO> getAllProducts();
    ProductDTO getProductById(Integer id);
    Long countProducts();
    //ProductDTO addProduct(ProductDTO product);

}
