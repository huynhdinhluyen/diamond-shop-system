package com.example.backend.exception;

public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(Integer id) {
        super("Could not find order with id: " + id);
    }
}
