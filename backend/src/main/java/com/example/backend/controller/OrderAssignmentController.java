package com.example.backend.controller;

import com.example.backend.entity.OrderAssignment;
import com.example.backend.exception.OrderAssignmentNotFoundException;
import com.example.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-assignments")
@RequiredArgsConstructor
public class OrderAssignmentController {
    private final OrderService orderService;

    @GetMapping("/orders/staffs/{id}")
    public ResponseEntity<List<OrderAssignment>> getOrdersByStaffId(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(orderService.getOrderByStaff(id));
        } catch (OrderAssignmentNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/orders/{id}/confirm")
    public ResponseEntity<OrderAssignment> confirmOrder(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(orderService.confirmOrder(id));
        } catch (OrderAssignmentNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/orders/{id}/sales-staff/assign")
    public ResponseEntity<OrderAssignment> assignOrderToDeliveryStaff(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(orderService.assignOrderToDeliveryStaff(id));
        } catch (OrderAssignmentNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/orders/{id}/delivery-staff/pick-up")
    public ResponseEntity<OrderAssignment> pickUpOrder(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(orderService.pickUpOrder(id));
        } catch (OrderAssignmentNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/orders/{id}/delivery-staff/complete")
    public ResponseEntity<OrderAssignment> completeOrder(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(orderService.completeOrder(id));
        } catch (OrderAssignmentNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/orders/{id}/cancel")
    public ResponseEntity<OrderAssignment> cancelOrder(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(orderService.cancelOrder(id));
        } catch (OrderAssignmentNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}