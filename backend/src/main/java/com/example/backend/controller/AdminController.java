package com.example.backend.controller;

import com.example.backend.dto.DashboardDataDTO;
import com.example.backend.entity.User;
import com.example.backend.enums.RoleName;
import com.example.backend.service.AdminService;
import com.example.backend.service.OrderService;
import com.example.backend.service.ProductService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
public class AdminController {
    @Autowired
    @Qualifier("orderServiceImpl")
    private OrderService orderService;
    @Autowired
    @Qualifier("userServiceImpl")
    private UserService userService;
    @Autowired
    @Qualifier("productServiceImpl")
    private ProductService productService;
    @Autowired
    private  AdminService adminService;


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

//        @GetMapping("/getByRole")
//        public ResponseEntity<List<User>> findUsersByRole(@RequestParam RoleName role) {
//            List<User> users = adminService.findByRole(role);
//            return ResponseEntity.ok(users);
//        }

}