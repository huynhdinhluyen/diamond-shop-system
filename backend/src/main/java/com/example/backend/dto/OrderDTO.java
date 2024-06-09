package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private Integer id;
    private Integer customer_id;
    private Integer transaction_id;
    private Long deliveryFee;
    private Long discountPrice;
    private Long totalPrice;
    private LocalDateTime createdAt;
}
