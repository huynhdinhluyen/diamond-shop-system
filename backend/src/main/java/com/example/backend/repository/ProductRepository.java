package com.example.backend.repository;

import com.example.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT p FROM Product p JOIN FETCH p.diamondCasing dc JOIN FETCH p.productDiamonds pd JOIN FETCH pd.diamond d")
    List<Product> findAllWithDetails();

    @Query("SELECT p FROM Product p " +
            "JOIN FETCH p.diamondCasing " +
            "JOIN FETCH p.productDiamonds pd " +
            "JOIN FETCH pd.diamond " +
            "WHERE p.id = :id")
    Optional<Product> findByIdWithDetails(Integer id);
    Long countByStockQuantityLessThan(Integer threshold);
    @Query("SELECT p FROM Product p " +
            "LEFT JOIN FETCH p.category c " +
            "LEFT JOIN FETCH p.diamondCasing dc " +
            "LEFT JOIN FETCH p.promotion pr " +
            "LEFT JOIN FETCH p.warranty w " +
            "LEFT JOIN FETCH p.productDiamonds pd " +
            "LEFT JOIN FETCH pd.diamond d " +
            "WHERE c.id = :categoryId")
    List<Product> findByCategoryId(@Param("categoryId") Integer categoryId);

}
