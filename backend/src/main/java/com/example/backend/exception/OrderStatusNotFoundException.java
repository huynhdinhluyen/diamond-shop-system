package com.example.backend.exception;

public class OrderStatusNotFoundException extends RuntimeException {
    public OrderStatusNotFoundException(String status) {
        super("Order status " + status + " not found!");
    }
}
