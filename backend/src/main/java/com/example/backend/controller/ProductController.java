package com.example.backend.controller;

import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.Product;
import com.example.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Transactional(readOnly = true)
    @GetMapping
    public List<ProductDTO> getAllProducts(){
        return productService.getAllProducts();
    }

    @Transactional(readOnly = true)
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Integer id) {
        ProductDTO productDTO = productService.getProductById(id);
        if (productDTO != null) {
            return ResponseEntity.ok(productDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//    @PostMapping("/addProduct")
//    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO productDTO) {
//        ProductDTO dto = productService.addProduct
//    }
}
