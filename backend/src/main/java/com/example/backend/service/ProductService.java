package com.example.backend.service;
import com.example.backend.dto.*;
import com.example.backend.entity.Product;
import com.example.backend.exception.ProductNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {
    List<ProductDTO> getAllProducts();
    ProductDTO getProductById(Integer id) throws ProductNotFoundException;
    ProductDTO createProduct(ProductDTO productDTO);
    ProductDTO updateProduct(Integer id, ProductDTO productDTO) throws ProductNotFoundException;
    void deleteProduct(Integer id);
    Long countProducts();
    Product getProductId(Integer id) throws ProductNotFoundException;

}
