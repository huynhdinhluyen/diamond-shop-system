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

public interface ProductService {
    ProductDTO convertToDTO(Product product);
    List<ProductDTO> getAllProducts();//{
//        List<Product> products = productRepository.findAll();
//        return products.stream().map(this::convertToDTO).collect(Collectors.toList());
//    }
    ProductDTO getProductById(Integer id);


}
