package com.example.backend.exception;

public class DiamondNotFoundException extends RuntimeException{
    public DiamondNotFoundException(Integer id) {
        super("Diamond " + id + " not found");
    }
}
