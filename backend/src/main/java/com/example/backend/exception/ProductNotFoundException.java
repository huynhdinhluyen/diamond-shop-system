package com.example.backend.exception;

public class ProductNotFoundException extends RuntimeException{
    public ProductNotFoundException(Integer id) {
        super("Could not find product with id: " + id);
    }
}
