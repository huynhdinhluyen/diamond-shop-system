package com.example.backend.service.impl;

import com.example.backend.repository.OrderAssignmentRepository;
import com.example.backend.service.OrderAssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderAssignmentServiceImpl implements OrderAssignmentService {
    private final OrderAssignmentRepository orderAssignmentRepository;

    @Override
    public Long getNumberOfNewOrders(Integer staffId) {
        return orderAssignmentRepository.countNewOrdersByStaffId(staffId);
    }
}
