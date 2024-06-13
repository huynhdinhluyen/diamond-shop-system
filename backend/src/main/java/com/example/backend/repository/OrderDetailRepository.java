package com.example.backend.repository;

import com.example.backend.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    @Query("SELECT p.category, SUM(od.quantity * od.unitPrice) AS totalRevenue " +
            "FROM OrderDetail od " +
            "JOIN Product p ON od.productId = p.id " +
            "GROUP BY p.category")
    List<Object[]> getCategoryRevenue();
}
