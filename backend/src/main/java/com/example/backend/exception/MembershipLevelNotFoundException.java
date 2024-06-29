package com.example.backend.exception;

public class MembershipLevelNotFoundException extends RuntimeException {
    public MembershipLevelNotFoundException(String name) {
        super("Membership Level " + name + " not found");
    }
}
