package com.example.backend.repository;

import com.example.backend.entity.OrderAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderAssignmentRepository extends JpaRepository<OrderAssignment, Long> {
    List<OrderAssignment> findByOrderId(Integer id);

    @Query("SELECT oa " +
            "FROM OrderAssignment oa " +
            "WHERE oa.order.id = :orderId AND oa.staff.roleName='SALES_STAFF'")
    Optional<OrderAssignment> findByOrderIdAndSalesStaff(@Param("orderId") Integer orderId);

    @Query("SELECT oa " +
            "FROM OrderAssignment oa " +
            "WHERE oa.order.id = :orderId AND oa.staff.roleName='DELIVERY_STAFF'")
    Optional<OrderAssignment> findByOrderIdAndDeliveryStaff(@Param("orderId") Integer orderId);

    @Query(value = "SELECT TOP 1 u.id " +
            "FROM [user] as u " +
            "LEFT JOIN order_assignment as oa ON u.id = oa.staff_id " +
            "AND oa.order_status_id = (SELECT id FROM order_status WHERE name = 'PENDING') " +
            "WHERE u.role = 'SALES_STAFF' " +
            "GROUP BY u.id " +
            "ORDER BY COUNT(oa.staff_id) ", nativeQuery = true)
    Integer findSalesStaffWithLeastTasks();

    @Query(value = "SELECT TOP 1 u.id " +
            "FROM [user] as u " +
            "LEFT JOIN order_assignment as oa ON u.id = oa.staff_id " +
            "AND oa.order_status_id = (SELECT id FROM order_status WHERE name = 'WAITING_FOR_PICKUP') " +
            "WHERE u.role = 'DELIVERY_STAFF' " +
            "GROUP BY u.id " +
            "ORDER BY COUNT(oa.staff_id) ", nativeQuery = true)
    Integer findDeliveryStaffWithLeastTasks();

    @Query("SELECT oa " +
            "FROM OrderAssignment oa " +
            "WHERE oa.staff.id = :staffId ")
    List<OrderAssignment> findOrderAssignmentsByStaff(@Param("staffId") Integer staffId);

    @Query("SELECT COUNT(oa.order) " +
            "FROM OrderAssignment oa " +
            "WHERE oa.staff.id = :staffId AND oa.orderStatus.name = 'PENDING' " +
            "GROUP BY oa.staff")
    Long countNewOrdersByStaffId(@Param("staffId") Integer staffId);
}