package com.example.backend.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RemoveFromCartRequest {
    private Integer userId;
    private Integer productId;
}
