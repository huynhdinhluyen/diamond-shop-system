package com.example.backend.service;

import com.example.backend.dto.OrderDTO;
import com.example.backend.dto.ProductSalesDTO;
import com.example.backend.entity.OrderAssignment;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface OrderService {
    Long getTotalOrders();

    Long getTotalRevenue();

    Map<String, Long> getMonthlySales(String startDate, String endDate);

    Map<String, Long> getCategoryRevenue();

    OrderDTO addOrder(OrderDTO orderDTO);

    List<OrderDTO> getOrdersByUserId(Integer userId);

    OrderDTO getOrderById(Integer orderId);

    void updateTransactionId(Integer orderId, Integer transactionId);

    void updateOrderNote(Integer orderId, String note);

    List<ProductSalesDTO> getProductSales();

    List<OrderAssignment> getOrderByStaff(Integer id);

    OrderAssignment confirmOrder(Integer orderId);

    OrderAssignment assignOrderToDeliveryStaff(Integer orderId);

    OrderAssignment pickUpOrder(Integer orderId);

    OrderAssignment completeOrder(Integer orderId);

    OrderAssignment cancelOrder(Integer orderId);
}