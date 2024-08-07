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
            "JOIN od.order o " +
            "JOIN Product p ON od.productId = p.id " +
            "WHERE o.status.name = 'COMPLETED' " +
            "GROUP BY p.category")
    List<Object[]> getCategoryRevenue();

    @Query(value = "SELECT p.id, p.name, p.image_url, SUM(od.quantity) AS totalQuantity, SUM(od.quantity * od.unit_price) AS totalRevenue " +
            "FROM order_detail od " +
            "INNER JOIN product p ON od.product_id = p.id " +
            "INNER JOIN [order] o ON od.order_id = o.id " +
            "WHERE o.status_id = (SELECT id FROM order_status WHERE name = 'COMPLETED') " +
            "GROUP BY p.id, p.name, p.image_url " +
            "ORDER BY totalQuantity DESC", nativeQuery = true)
    List<Object[]> getProductSales();
}
