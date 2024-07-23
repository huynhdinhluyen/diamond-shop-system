package com.example.backend.controller;

import com.example.backend.dto.DashboardDataDTO;
import com.example.backend.dto.ProductSalesDTO;
import com.example.backend.service.OrderAssignmentService;
import com.example.backend.service.OrderService;
import com.example.backend.service.ProductService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final OrderService orderService;
    private final UserService userService;
    private final ProductService productService;
    private final OrderAssignmentService orderAssignmentService;

    @Transactional(readOnly = true)
    @GetMapping
    public ResponseEntity<DashboardDataDTO> getDashboardData(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        Long totalOrders = orderService.getTotalOrders();
        Long totalCustomers = userService.getTotalCustomers();
        Long totalRevenue = orderService.getTotalRevenue();
        Long totalProducts = productService.countProducts();
        Map<String, Long> monthlySales = orderService.getMonthlySales(startDate, endDate);
        Map<String, Long> categoryRevenue = orderService.getCategoryRevenue();
        DashboardDataDTO data = new DashboardDataDTO(totalOrders, totalCustomers, totalRevenue, totalProducts,
                monthlySales, categoryRevenue);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/best-sellers")
    public ResponseEntity<List<ProductSalesDTO>> getBestSellingProducts() {
        List<ProductSalesDTO> productSales = orderService.getProductSales();
        return ResponseEntity.ok(productSales);
    }

}