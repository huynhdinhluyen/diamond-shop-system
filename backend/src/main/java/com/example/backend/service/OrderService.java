package com.example.backend.service;

import com.example.backend.dto.OrderDTO;
import com.example.backend.entity.Order;
import com.example.backend.entity.Order;
import com.example.backend.entity.OrderDetail;
import com.example.backend.entity.Transaction;
import com.example.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface OrderService {
    Long getTotalOrders();
    Long getTotalRevenue();
    Map<String, Long> getMonthlySales();
    Map<String, Long> getCategoryRevenue();
    void addOrder(OrderDTO orderDTO);
    List<Order> getOrdersByUserId(Integer userId);
}
