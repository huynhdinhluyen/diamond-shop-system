package com.example.backend.mapper;

import com.example.backend.dto.OrderDTO;
import com.example.backend.entity.Order;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class OrderMapper {
    private final UserRepository userRepository;

//    public static OrderDTO maptoOrderDTO(Order order) {
//        return new OrderDTO(
//                order.getId(),
//                order.getCustomer_id(),
//                order.getTransaction_id(),
//                order.getDeliveryFee(),
//                order.getDiscountPrice(),
//                order.getTotalPrice(),
//                order.getCreatedAt()
//        );
//    }

//    public static Order maptoOrderEntity(OrderDTO dto) {
//        return new Order(
//                dto.getId(),
//                dto.getCustomer_id(),
//                dto.getTransaction_id(),
//                dto.getDeliveryFee(),
//                dto.getDiscountPrice(),
//                dto.getTotalPrice(),
//                dto.getCreatedAt()
//        );
//    }
}
