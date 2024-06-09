package com.example.backend.controller;

import com.example.backend.dto.DashboardDataDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.enums.RoleName;
import com.example.backend.service.AdminService;
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
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final OrderService orderService;
    private final UserService userService;
    private final ProductService productService;
    private final AdminService adminService;

    @Transactional(readOnly = true)
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDataDTO> getDashboardData() {
        Long totalOrders = orderService.getTotalOrders();
        Long totalCustomers = userService.getTotalCustomers();
        Long totalRevenue = orderService.getTotalRevenue();
        Long totalProducts = productService.countProducts();
        Map<String, Long> monthlySales = orderService.getMonthlySales();
        Map<String, Long> categoryRevenue = orderService.getCategoryRevenue();
        DashboardDataDTO data = new DashboardDataDTO(totalOrders, totalCustomers, totalRevenue, totalProducts,
                monthlySales, categoryRevenue);
        return ResponseEntity.ok(data);
    }

    //Get all users REST API
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> employees = userService.getAllUsers();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/getUsersByRole")
    public ResponseEntity<List<UserDTO>> findUsersByRole(@RequestParam RoleName role) {
        List<UserDTO> users = adminService.findByRole(role);
        return ResponseEntity.ok(users);
    }

}
