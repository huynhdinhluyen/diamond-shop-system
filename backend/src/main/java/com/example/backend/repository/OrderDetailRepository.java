package com.example.backend.repository;

import com.example.backend.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    @Query("SELECT dc.category, SUM(od.quantity * od.unitPrice) AS totalRevenue " +
            "FROM OrderDetail od " +
            "JOIN od.product p " +
            "JOIN p.diamondCasing dc " +
            "GROUP BY dc.category")
    List<Object[]> getCategoryRevenue();
}
