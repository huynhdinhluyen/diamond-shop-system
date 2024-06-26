package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private Integer id;
    private Integer userId;
    private TransactionDTO transaction;
    private Long deliveryFee;
    private Long discountPrice;
    private Long totalPrice;
    private LocalDateTime createdAt;
    private String customerName;
    private String shippingAddress;
    private String phoneNumber;
    private String note;
    private OrderStatusDTO status;
    private List<OrderDetailDTO> orderDetails;
}
