package com.example.backend.repository;

import com.example.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT SUM(o.totalPrice) FROM Order o")
    Long getTotalRevenue();

    @Query(value =
            "SELECT " +
                    "FORMAT(o.created_at, 'MM/yyyy') AS monthYear, " +
                    "SUM(o.total_price) AS totalSales " + // Sửa lại trường tính tổng là total_price (doanh thu)
                    "FROM [order] o " +
                    "WHERE o.created_at BETWEEN :startDate AND :endDate " +
                    "GROUP BY FORMAT(o.created_at, 'MM/yyyy') " +
                    "ORDER BY monthYear",
            nativeQuery = true
    )
    List<Object[]> getMonthlySales(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
    List<Order> findByCustomerId(Integer customerId);
}
