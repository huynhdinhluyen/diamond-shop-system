package com.example.backend.service.impl;

import com.example.backend.entity.Category;
import com.example.backend.repository.OrderDetailRepository;
import com.example.backend.repository.OrderRepository;
import com.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;
import java.util.LinkedHashMap;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    @Transactional(readOnly = true)
    public Long getTotalOrders() {
        return orderRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Long getTotalRevenue() {
        return orderRepository.getTotalRevenue();
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> getMonthlySales() {
        LocalDate currentDate = LocalDate.now();
        LocalDateTime startDateTime = currentDate.minusMonths(11).atStartOfDay(); // Chuyển đổi sang LocalDateTime
        LocalDateTime endDateTime = currentDate.plusDays(1).atStartOfDay(); // Chuyển đổi và cộng thêm 1 ngày
        List<Object[]> results = orderRepository.getMonthlySales(startDateTime, endDateTime);

        Map<String, Long> monthlySales = results.stream()
                .collect(Collectors.toMap(
                        result -> (String) result[0],
                        result -> ((Number) result[1]).longValue(),
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new
                ));

        // Điền các tháng còn thiếu bằng 0
        for (LocalDate date = startDateTime.toLocalDate(); date.isBefore(currentDate); date = date.plusMonths(1)) { // Thay đổi startDate thành startDateTime.toLocalDate()
            String monthYear = date.getMonthValue() + "/" + date.getYear();
            monthlySales.putIfAbsent(monthYear, 0L);
        }
        return monthlySales;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> getCategoryRevenue() {
        List<Object[]> results = orderDetailRepository.getCategoryRevenue();
        Map<String, Long> categoryRevenue = new TreeMap<>(results.stream()
                .collect(Collectors.toMap(
                        result -> ((Category) result[0]).getName(),
                        result -> ((Long) result[1]),
                        (oldValue, newValue) -> oldValue
                )));
        return categoryRevenue;
    }
}
