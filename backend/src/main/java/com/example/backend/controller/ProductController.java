package com.example.backend.controller;

import com.example.backend.dto.ProductDTO;
import com.example.backend.exception.ProductNotFoundException;
import com.example.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Integer id) {
        try{
            return ResponseEntity.ok(productService.getProductById(id));
        }catch (ProductNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(productDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Integer id,
                                                    @Valid @RequestBody ProductDTO productDTO) {
        try {
            return ResponseEntity.ok(productService.updateProduct(id, productDTO));
        } catch (ProductNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (ProductNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/by-category")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@RequestParam Integer categoryId) {
        List<ProductDTO> products = productService.getProductsByCategory(categoryId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/get-range-price")
    public List<ProductDTO> getFilteredProducts(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Long minPrice,
            @RequestParam(required = false) Long maxPrice) {
        return productService.getFilteredProducts(categoryId, query, minPrice, maxPrice);
    }
}
