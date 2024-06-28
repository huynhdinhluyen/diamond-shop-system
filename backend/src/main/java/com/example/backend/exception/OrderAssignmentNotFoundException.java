package com.example.backend.exception;

public class OrderAssignmentNotFoundException extends RuntimeException {
    public OrderAssignmentNotFoundException(Long id) {
        super("Could not found order assignment with id: " + id);
    }
}
