package com.example.backend.service;

import com.example.backend.dto.OrderDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface OrderService {
    Long getTotalOrders();
    Long getTotalRevenue();
    Map<String, Long> getMonthlySales();
    Map<String, Long> getCategoryRevenue();
    OrderDTO addOrder(OrderDTO orderDTO);
    List<OrderDTO> getOrdersByUserId(Integer userId);
    OrderDTO getOrderById(Integer orderId);
    void updateTransactionId(Integer orderId, Integer transactionId);
    void updateOrderNote(Integer orderId, String note);
}