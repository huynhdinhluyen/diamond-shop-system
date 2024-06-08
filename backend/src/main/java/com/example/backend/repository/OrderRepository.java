package com.example.backend.repository;

import com.example.backend.entity.Order;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT SUM(o.totalPrice) FROM Order o")
    Long getTotalRevenue();

    @Query(value = "SELECT FORMAT(o.created_at, 'MM/yyyy') AS monthYear, COUNT(o.id) AS totalSales " +
            "FROM [order] o " +
            "WHERE o.created_at BETWEEN :startDate AND :endDate " +
            "GROUP BY FORMAT(o.created_at, 'MM/yyyy') " +
            "ORDER BY monthYear", nativeQuery = true)
    List<Object[]> getMonthlySales(LocalDateTime startDate, LocalDateTime endDate);
    List<Order> findByCustomerId(Integer customerId);
}
