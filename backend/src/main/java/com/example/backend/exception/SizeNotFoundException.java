package com.example.backend.exception;

public class SizeNotFoundException extends RuntimeException {
    public SizeNotFoundException(Integer id) {
        super("Could not find size with id: " + id);
    }
}
