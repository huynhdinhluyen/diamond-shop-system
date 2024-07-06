package com.example.backend.repository;

import com.example.backend.entity.Order;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT SUM(o.totalPrice) " +
            "FROM Order o " +
            "WHERE o.status.name = 'COMPLETED'")
    Long getTotalRevenue();

    @Query(value =
            "SELECT " +
                    "FORMAT(o.created_at, 'MM/yyyy') AS monthYear, " +
                    "SUM(o.total_price) AS totalSales " +
                    "FROM [order] o " +
                    "JOIN dbo.order_status os ON o.status_id = os.id " +
                    "WHERE o.created_at BETWEEN :startDate AND :endDate " +
                    "AND os.name = 'COMPLETED' " +
                    "GROUP BY FORMAT(o.created_at, 'MM/yyyy') " +
                    "ORDER BY monthYear",
            nativeQuery = true
    )
    List<Object[]> getMonthlySales(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    List<Order> findByUser(@Param("user") User user);
}