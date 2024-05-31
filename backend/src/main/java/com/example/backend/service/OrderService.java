package com.example.backend.service;

import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public interface OrderService {
    Long getTotalOrders();
    Long getTotalRevenue();
    Map<String, Long> getMonthlySales();
    Map<String, Long> getCategoryRevenue();
}
