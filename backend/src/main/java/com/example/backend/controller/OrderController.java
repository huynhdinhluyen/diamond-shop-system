package com.example.backend.controller;

import com.example.backend.dto.OrderDTO;
import com.example.backend.request.CancelOrderRequest;
import com.example.backend.request.NoteRequest;
import com.example.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<OrderDTO> addOrder(@RequestBody OrderDTO orderDTO) {
        OrderDTO newOrder = orderService.addOrder(orderDTO);
        return ResponseEntity.ok(newOrder);
    }

    @GetMapping("/get/user/{userId}")
    public List<OrderDTO> getOrdersByUserId(@PathVariable Integer userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @GetMapping("/get/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Integer orderId) {
        OrderDTO order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }

    @PostMapping("/update-transaction/{orderId}")
    public ResponseEntity<String> updateTransactionId(@PathVariable Integer orderId, @RequestParam Integer transactionId) {
        orderService.updateTransactionId(orderId, transactionId);
        return ResponseEntity.ok("Transaction method updated successfully");
    }

    @PostMapping("/{orderId}/note")
    public ResponseEntity<String> updateOrderNote(@PathVariable Integer orderId, @RequestBody NoteRequest noteRequest) {
        orderService.updateOrderNote(orderId, noteRequest.getNote());
        return ResponseEntity.ok("Đã thêm ghi chú!");
    }

    @PostMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Integer orderId, @RequestBody CancelOrderRequest cancelReasonRequest) {
        try {
            orderService.cancelOrder(orderId, cancelReasonRequest.getCancelReason());
            return ResponseEntity.ok("Đã hủy");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}
