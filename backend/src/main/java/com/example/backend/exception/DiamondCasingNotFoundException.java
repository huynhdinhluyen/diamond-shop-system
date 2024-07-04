package com.example.backend.exception;

public class DiamondCasingNotFoundException extends RuntimeException {
    public DiamondCasingNotFoundException(Integer id) {
        super("Could not find diamond casing with id: " + id);
    }
}
