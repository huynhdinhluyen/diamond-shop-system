package com.example.backend.mapper;

import com.example.backend.dto.OrderStatusDTO;
import com.example.backend.entity.OrderStatus;
import org.springframework.stereotype.Component;

@Component
public class OrderStatusMapper {
    public OrderStatusDTO convertOrderStatusToDTO(OrderStatus status) {
        if (status == null) {
            return null;
        }
        OrderStatusDTO statusDTO = new OrderStatusDTO();
        statusDTO.setId(status.getId());
        statusDTO.setName(status.getName());
        return statusDTO;
    }
}
