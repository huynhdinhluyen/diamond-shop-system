package com.example.backend.repository;

import com.example.backend.entity.Product;
import com.example.backend.entity.ProductDiamond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDiamondRepository extends JpaRepository<ProductDiamond, Integer> {
    void deleteByProduct(Product product);
}
