package com.example.backend.exception;

public class WarrantyNotFoundException extends RuntimeException{
    public WarrantyNotFoundException(Integer id) {
        super("Could not find warranty with id: " + id);
    }
}
