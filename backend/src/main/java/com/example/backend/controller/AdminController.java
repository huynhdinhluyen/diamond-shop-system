package com.example.backend.controller;

import com.example.backend.dto.DashboardDataDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.enums.RoleName;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.response.AuthenticationResponse;
import com.example.backend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

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
    private final AuthenticationService authService;

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
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/users")
    public ResponseEntity<AuthenticationResponse> createUser(
            @RequestBody User request
    ) throws Exception {
        return ResponseEntity.ok(authService.register(request));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<AuthenticationResponse> updateUser(@PathVariable Integer id,
                                                             @RequestBody User request){
        try{
            AuthenticationResponse user = authService.updateUser(id, request);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getUsersByRole")
    public ResponseEntity<List<UserDTO>> findUsersByRole(@RequestParam RoleName role) {
        List<UserDTO> users = adminService.findByRole(role);
        return ResponseEntity.ok(users);
    }
}
