package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDataDTO {
    private Long totalOrders;
    private Long totalCustomers;
    private Long totalRevenue;
    private Long totalProducts;
    private Map<String, Long> monthlySales;
    private Map<String, Long> categoryRevenue;
}
