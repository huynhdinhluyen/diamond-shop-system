package com.example.backend.mapper;

import com.example.backend.dto.OrderDetailDTO;
import com.example.backend.entity.OrderDetail;
import org.springframework.stereotype.Component;

@Component
public class OrderDetailMapper {
    public OrderDetailDTO convertToDto(OrderDetail orderDetail) {
        if (orderDetail == null) {
            return null;
        }
        OrderDetailDTO orderDetailDTO = new OrderDetailDTO();
        orderDetailDTO.setProductId(orderDetail.getProductId());
        orderDetailDTO.setQuantity(orderDetail.getQuantity());
        orderDetailDTO.setUnitPrice(orderDetail.getUnitPrice());
        orderDetailDTO.setSize(orderDetail.getSize());
        return orderDetailDTO;
    }
}
