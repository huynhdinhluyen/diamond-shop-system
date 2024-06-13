package com.example.backend.service.impl;

import com.example.backend.dto.OrderDTO;
import com.example.backend.dto.ProductDTO;
import com.example.backend.dto.ProductSalesDTO;
import com.example.backend.entity.Category;
import com.example.backend.entity.Order;
import com.example.backend.entity.User;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.mapper.OrderMapper;
import com.example.backend.mapper.ProductMapper;
import com.example.backend.repository.*;
import com.example.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final OrderStatusRepository orderStatusRepository;
    private final ProductMapper productMapper;

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
    public Map<String, Long> getMonthlySales(String startDate, String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDateTime startDateTime = startDate != null
                ? LocalDate.parse(startDate, formatter).atStartOfDay()
                : LocalDate.now().minusMonths(11).atStartOfDay();

        LocalDateTime endDateTime = endDate != null
                ? LocalDate.parse(endDate, formatter).plusDays(1).atStartOfDay() // Cộng 1 ngày để bao gồm cả endDate
                : LocalDate.now().plusDays(1).atStartOfDay();

        if (startDateTime.isAfter(endDateTime)) {
            throw new IllegalArgumentException("Start date cannot be after end date");
        }

        List<Object[]> results = orderRepository.getMonthlySales(startDateTime, endDateTime);

        Map<String, Long> monthlySales = new LinkedHashMap<>(); // Sử dụng LinkedHashMap để giữ thứ tự
        for (Object[] result : results) {
            String monthYear = (String) result[0];
            Long totalSales = ((Number) result[1]).longValue();
            monthlySales.put(monthYear, totalSales);
        }

        // Điền các tháng còn thiếu bằng 0
        LocalDate startDateWithoutTime = startDateTime.toLocalDate();
        LocalDate endDateWithoutTime = endDateTime.toLocalDate().minusDays(1); // Trừ 1 ngày để loại trừ ngày hiện tại
        for (LocalDate date = startDateWithoutTime; date.isBefore(endDateWithoutTime); date = date.plusMonths(1)) {
            String monthYear = String.format("%02d/%d", date.getMonthValue(), date.getYear());
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

    @Override
    public void addOrder(OrderDTO orderDTO) {
        User user = userRepository.findById(orderDTO.getCustomer_id())
                .orElseThrow(() -> new RuntimeException("User not found"));
        orderRepository.save(OrderMapper.maptoOrderEntity(orderDTO));
    }

    @Override
    public List<Order> getOrdersByUserId(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        return orderRepository.findByCustomerId(userId);
    }

    @Override
    public List<ProductSalesDTO> getProductSales() {
        List<Object[]> productSalesData = orderDetailRepository.getProductSales();
        return productSalesData.stream()
                .map(result -> {
                    Integer productId = (Integer) result[0];
                    String productName = (String) result[1];
                    String imageUrl = (String) result[2];
                    Long totalQuantity = ((Number) result[3]).longValue();
                    Long totalRevenue = ((Number) result[4]).longValue();
                    ProductDTO productDTO = new ProductDTO();
                    productDTO.setId(productId);
                    productDTO.setName(productName);
                    productDTO.setImageUrl(imageUrl);
                    return new ProductSalesDTO(productDTO, totalRevenue, totalQuantity);
                })
                .collect(Collectors.toList());
    }
}