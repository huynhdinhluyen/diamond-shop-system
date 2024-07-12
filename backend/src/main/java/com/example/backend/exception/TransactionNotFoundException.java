package com.example.backend.exception;

public class TransactionNotFoundException extends RuntimeException{
    public TransactionNotFoundException(Integer id) {
        super("Transaction Not Found");
    }
}
