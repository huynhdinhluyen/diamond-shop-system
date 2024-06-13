package com.example.backend.service;

import com.example.backend.dto.OrderDTO;
import com.example.backend.dto.ProductSalesDTO;
import com.example.backend.entity.Order;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface OrderService {
    Long getTotalOrders();
    Long getTotalRevenue();
    Map<String, Long> getMonthlySales(String startDate, String endDate);
    Map<String, Long> getCategoryRevenue();
    void addOrder(OrderDTO orderDTO);
    List<Order> getOrdersByUserId(Integer userId);
    List<ProductSalesDTO> getProductSales();
}
