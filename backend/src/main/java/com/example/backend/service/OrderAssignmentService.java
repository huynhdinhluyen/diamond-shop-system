package com.example.backend.service;

import org.springframework.stereotype.Service;

@Service
public interface OrderAssignmentService {
    Long getNumberOfNewOrders(Integer staffId);
}
