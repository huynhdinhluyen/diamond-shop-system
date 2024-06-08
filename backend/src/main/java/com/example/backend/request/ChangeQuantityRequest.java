package com.example.backend.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeQuantityRequest {
    private Integer userId;
    private Integer productId;
    private int quantity;
}
