package com.example.backend.exception;

public class PromotionNotFoundException extends RuntimeException{
    public PromotionNotFoundException(Integer id) {
        super("Could not find promotion with id: " + id);
    }
}
