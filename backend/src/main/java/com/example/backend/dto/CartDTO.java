package com.example.backend.dto;

import com.example.backend.entity.Product;
import com.example.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
    private Integer id;
    private Integer user_id;
    private Integer product_id;
    private int quantity;
}
